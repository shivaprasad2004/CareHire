import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { userService } from '../../services/userService';
import useAuthStore from '../../stores/authStore';
import Tabs from '../../components/ui/Tabs';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import {
  UserPlus, Users, Search, Building2, MessageSquare,
  Check, X, Clock, UserCheck, Sparkles, ArrowRight
} from 'lucide-react';

// ---------------------------------------------------------------------------
// API helpers (connection endpoints live under /api/connections)
// ---------------------------------------------------------------------------
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const api = {
  getConnections: () =>
    fetch(`${API_BASE}/api/connections`, { headers: authHeaders() }).then(r => r.json()),
  getPendingRequests: () =>
    fetch(`${API_BASE}/api/connections/requests`, { headers: authHeaders() }).then(r => r.json()),
  sendRequest: (recipientId) =>
    fetch(`${API_BASE}/api/connections/request`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ recipientId }),
    }).then(r => r.json()),
  respondToRequest: (connectionId, status) =>
    fetch(`${API_BASE}/api/connections/respond/${connectionId}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    }).then(r => r.json()),
};

// ---------------------------------------------------------------------------
// Main Network component
// ---------------------------------------------------------------------------
const Network = ({ user, defaultTab = 'grow' }) => {
  const authUser = useAuthStore((s) => s.user);
  const currentUser = user || authUser;

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Data state
  const [suggestions, setSuggestions] = useState([]);
  const [connections, setConnections] = useState([]);
  const [invitations, setInvitations] = useState([]);

  // Loading / error
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [loadingInvitations, setLoadingInvitations] = useState(true);

  // Track already-connected IDs so we can exclude them from suggestions
  const connectedIds = useMemo(
    () => new Set(connections.map((c) => c.id)),
    [connections],
  );

  // ------------------------------------------------------------------
  // Fetch helpers
  // ------------------------------------------------------------------
  const fetchSuggestions = useCallback(async () => {
    setLoadingSuggestions(true);
    try {
      const data = await userService.getAllUsers({ limit: 50 });
      const users = (data?.data?.users || [])
        .filter((u) => u.id !== currentUser?.id)
        .map((u) => ({
          id: u.id,
          name: `${u.firstName} ${u.lastName}`,
          headline: u.specialty || u.role || 'Healthcare Professional',
          organization: u.organization || '',
          avatarUrl: u.avatarUrl || null,
          mutual: Math.floor(Math.random() * 15),
        }));
      setSuggestions(users);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoadingSuggestions(false);
    }
  }, [currentUser?.id]);

  const fetchConnections = useCallback(async () => {
    setLoadingConnections(true);
    try {
      const data = await api.getConnections();
      const list = (data?.data?.connections || []).map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        headline: u.specialty || u.role || 'Healthcare Professional',
        organization: u.organization || '',
        avatarUrl: u.avatarUrl || null,
      }));
      setConnections(list);
    } catch (err) {
      console.error('Error fetching connections:', err);
    } finally {
      setLoadingConnections(false);
    }
  }, []);

  const fetchInvitations = useCallback(async () => {
    setLoadingInvitations(true);
    try {
      const data = await api.getPendingRequests();
      const list = (data?.data?.requests || []).map((req) => ({
        connectionId: req.id,
        id: req.requester?.id,
        name: `${req.requester?.firstName} ${req.requester?.lastName}`,
        headline: req.requester?.specialty || req.requester?.role || 'Healthcare Professional',
        organization: req.requester?.organization || '',
        avatarUrl: req.requester?.avatarUrl || null,
        createdAt: req.createdAt,
      }));
      setInvitations(list);
    } catch (err) {
      console.error('Error fetching invitations:', err);
    } finally {
      setLoadingInvitations(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
    fetchConnections();
    fetchInvitations();
  }, [fetchSuggestions, fetchConnections, fetchInvitations]);

  // ------------------------------------------------------------------
  // Actions
  // ------------------------------------------------------------------
  const handleConnect = async (personId) => {
    try {
      await api.sendRequest(personId);
      // Move person from suggestions to a "pending" visual state
      setSuggestions((prev) =>
        prev.map((p) => (p.id === personId ? { ...p, pending: true } : p)),
      );
    } catch (err) {
      console.error('Error sending connection request:', err);
    }
  };

  const handleAccept = async (connectionId, personId) => {
    try {
      await api.respondToRequest(connectionId, 'accepted');
      setInvitations((prev) => prev.filter((inv) => inv.connectionId !== connectionId));
      // Refresh connections list
      fetchConnections();
    } catch (err) {
      console.error('Error accepting invitation:', err);
    }
  };

  const handleIgnore = async (connectionId) => {
    try {
      await api.respondToRequest(connectionId, 'rejected');
      setInvitations((prev) => prev.filter((inv) => inv.connectionId !== connectionId));
    } catch (err) {
      console.error('Error ignoring invitation:', err);
    }
  };

  const handleRemoveConnection = async (personId) => {
    // Optimistic removal from local state
    setConnections((prev) => prev.filter((c) => c.id !== personId));
  };

  // ------------------------------------------------------------------
  // Filtered lists
  // ------------------------------------------------------------------
  const query = searchQuery.toLowerCase().trim();

  const filteredSuggestions = useMemo(
    () =>
      suggestions
        .filter((p) => !connectedIds.has(p.id))
        .filter(
          (p) =>
            !query ||
            p.name.toLowerCase().includes(query) ||
            (p.headline && p.headline.toLowerCase().includes(query)) ||
            (p.organization && p.organization.toLowerCase().includes(query)),
        ),
    [suggestions, connectedIds, query],
  );

  const filteredConnections = useMemo(
    () =>
      connections.filter(
        (c) =>
          !query ||
          c.name.toLowerCase().includes(query) ||
          (c.headline && c.headline.toLowerCase().includes(query)) ||
          (c.organization && c.organization.toLowerCase().includes(query)),
      ),
    [connections, query],
  );

  const filteredInvitations = useMemo(
    () =>
      invitations.filter(
        (inv) =>
          !query ||
          inv.name.toLowerCase().includes(query) ||
          (inv.headline && inv.headline.toLowerCase().includes(query)),
      ),
    [invitations, query],
  );

  // ------------------------------------------------------------------
  // Tab definitions
  // ------------------------------------------------------------------
  const tabs = [
    { id: 'grow', label: 'Grow', icon: Sparkles, count: filteredSuggestions.length },
    { id: 'connections', label: 'Connections', icon: Users, count: filteredConnections.length },
    { id: 'invitations', label: 'Invitations', icon: UserPlus, count: filteredInvitations.length },
  ];

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 lg:px-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Network</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Grow your professional healthcare network
        </p>
      </div>

      {/* Stats bar */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatsCard label="Connections" value={connections.length} icon={Users} color="text-blue-500 dark:text-blue-400" />
        <StatsCard label="Pending" value={invitations.length} icon={Clock} color="text-amber-500 dark:text-amber-400" />
        <StatsCard label="Suggestions" value={suggestions.filter((s) => !connectedIds.has(s.id)).length} icon={UserPlus} color="text-emerald-500 dark:text-emerald-400" />
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, role, or organization..."
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-carehire-500/20 focus:border-carehire-500/40 transition-all placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={14} className="text-slate-400" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'grow' && (
          <TabPanel key="grow">
            {loadingSuggestions ? (
              <SkeletonGrid />
            ) : filteredSuggestions.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title="No suggestions right now"
                description={query ? 'Try a different search term.' : 'Check back later for new people to connect with.'}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSuggestions.map((person) => (
                  <SuggestionCard
                    key={person.id}
                    person={person}
                    onConnect={handleConnect}
                  />
                ))}
              </div>
            )}
          </TabPanel>
        )}

        {activeTab === 'connections' && (
          <TabPanel key="connections">
            {loadingConnections ? (
              <SkeletonGrid />
            ) : filteredConnections.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No connections yet"
                description={query ? 'No connections match your search.' : 'Start growing your network by connecting with people.'}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConnections.map((person) => (
                  <ConnectionCard
                    key={person.id}
                    person={person}
                    onRemove={handleRemoveConnection}
                  />
                ))}
              </div>
            )}
          </TabPanel>
        )}

        {activeTab === 'invitations' && (
          <TabPanel key="invitations">
            {loadingInvitations ? (
              <SkeletonList />
            ) : filteredInvitations.length === 0 ? (
              <EmptyState
                icon={UserPlus}
                title="No pending invitations"
                description={query ? 'No invitations match your search.' : 'When someone sends you a connection request, it will appear here.'}
              />
            ) : (
              <div className="space-y-3">
                {filteredInvitations.map((inv) => (
                  <InvitationCard
                    key={inv.connectionId}
                    invitation={inv}
                    onAccept={handleAccept}
                    onIgnore={handleIgnore}
                  />
                ))}
              </div>
            )}
          </TabPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tab panel wrapper with enter/exit animation
// ---------------------------------------------------------------------------
const TabPanel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

// ---------------------------------------------------------------------------
// Suggestion Card ("Grow" tab) -- people you may know
// ---------------------------------------------------------------------------
const SuggestionCard = ({ person, onConnect }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onConnect(person.id);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col items-center text-center transition-shadow hover:shadow-lg hover:border-carehire-200 dark:hover:border-slate-600"
    >
      <Avatar src={person.avatarUrl} name={person.name} size="lg" />
      <h3 className="mt-3 font-semibold text-slate-900 dark:text-white truncate w-full">
        {person.name}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate w-full">
        {person.headline}
      </p>
      {person.organization && (
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate w-full flex items-center justify-center gap-1">
          <Building2 size={10} /> {person.organization}
        </p>
      )}
      {person.mutual > 0 && (
        <Badge variant="default" size="xs" className="mt-2">
          {person.mutual} mutual
        </Badge>
      )}

      <div className="mt-4 w-full">
        {person.pending ? (
          <button
            disabled
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-default"
          >
            <Clock size={14} /> Pending
          </button>
        ) : (
          <button
            onClick={handleClick}
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-xl border-2 border-carehire-600 text-carehire-600 dark:border-carehire-400 dark:text-carehire-400 hover:bg-carehire-600 hover:text-white dark:hover:bg-carehire-500 dark:hover:text-white transition-colors disabled:opacity-50"
          >
            <UserPlus size={14} /> {loading ? 'Sending...' : 'Connect'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Connection Card ("Connections" tab) -- already connected
// ---------------------------------------------------------------------------
const ConnectionCard = ({ person, onRemove }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -2 }}
    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col items-center text-center transition-shadow hover:shadow-lg"
  >
    <div className="relative">
      <Avatar src={person.avatarUrl} name={person.name} size="lg" />
      <span className="absolute -bottom-0.5 -right-0.5 bg-green-500 h-3.5 w-3.5 rounded-full ring-2 ring-white dark:ring-slate-800" />
    </div>
    <h3 className="mt-3 font-semibold text-slate-900 dark:text-white truncate w-full">
      {person.name}
    </h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate w-full">
      {person.headline}
    </p>
    {person.organization && (
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate w-full flex items-center justify-center gap-1">
        <Building2 size={10} /> {person.organization}
      </p>
    )}

    <Badge variant="success" size="xs" className="mt-2" icon={<UserCheck size={10} />}>
      Connected
    </Badge>

    <div className="mt-4 w-full flex gap-2">
      <button className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-xl bg-carehire-600 text-white hover:bg-carehire-700 transition-colors">
        <MessageSquare size={14} /> Message
      </button>
      <button
        onClick={() => onRemove(person.id)}
        className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-800 transition-colors"
        title="Remove connection"
      >
        <X size={14} />
      </button>
    </div>
  </motion.div>
);

// ---------------------------------------------------------------------------
// Invitation Card ("Invitations" tab) -- pending requests from others
// ---------------------------------------------------------------------------
const InvitationCard = ({ invitation, onAccept, onIgnore }) => {
  const [accepting, setAccepting] = useState(false);
  const [ignoring, setIgnoring] = useState(false);

  const handleAccept = async () => {
    setAccepting(true);
    await onAccept(invitation.connectionId, invitation.id);
    setAccepting(false);
  };

  const handleIgnore = async () => {
    setIgnoring(true);
    await onIgnore(invitation.connectionId);
    setIgnoring(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <Avatar src={invitation.avatarUrl} name={invitation.name} size="lg" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-900 dark:text-white truncate">{invitation.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{invitation.headline}</p>
        {invitation.organization && (
          <p className="text-xs text-slate-400 dark:text-slate-500 truncate flex items-center gap-1 mt-0.5">
            <Building2 size={10} /> {invitation.organization}
          </p>
        )}
        {invitation.createdAt && (
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            Sent {new Date(invitation.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleIgnore}
          disabled={ignoring}
          className="px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
          {ignoring ? '...' : 'Ignore'}
        </button>
        <button
          onClick={handleAccept}
          disabled={accepting}
          className="px-4 py-2 text-xs font-medium rounded-xl bg-carehire-600 text-white hover:bg-carehire-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <Check size={14} /> {accepting ? 'Accepting...' : 'Accept'}
        </button>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Stats card
// ---------------------------------------------------------------------------
const StatsCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
    <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center ${color} shrink-0`}>
      <Icon size={18} />
    </div>
    <div className="min-w-0">
      <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-none">
        {value}
      </div>
      <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 truncate">
        {label}
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
      <Icon size={24} className="text-slate-400 dark:text-slate-500" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">{description}</p>
  </div>
);

// ---------------------------------------------------------------------------
// Skeleton placeholders
// ---------------------------------------------------------------------------
const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col items-center">
        <Skeleton variant="circle" width={56} height={56} />
        <Skeleton width="70%" height={14} className="mt-3 rounded-lg" />
        <Skeleton width="50%" height={10} className="mt-2 rounded-lg" />
        <Skeleton width="100%" height={34} className="mt-4 rounded-xl" />
      </div>
    ))}
  </div>
);

const SkeletonList = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center gap-4">
        <Skeleton variant="circle" width={56} height={56} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={14} className="rounded-lg" />
          <Skeleton width="40%" height={10} className="rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Skeleton width={60} height={32} className="rounded-xl" />
          <Skeleton width={72} height={32} className="rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

export default Network;
