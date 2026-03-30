import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, User, Briefcase, Building2, FileText } from 'lucide-react';
import { searchService } from '../../services/searchService';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';
  const [activeTab, setActiveTab] = useState(type);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) performSearch();
  }, [query, activeTab]);

  const performSearch = async () => {
    try {
      setLoading(true);
      const res = await searchService.search(query, activeTab);
      if (res.status === 'success') setResults(res.data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'users', label: 'People', icon: User },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
    { id: 'organizations', label: 'Companies', icon: Building2 },
    { id: 'posts', label: 'Posts', icon: FileText },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Search Results</h1>
        {query && <p className="text-slate-500">Results for "<span className="font-medium text-slate-700 dark:text-slate-300">{query}</span>"</p>}
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      {loading ? (
        <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>
      ) : (
        <div className="space-y-4">
          {/* People */}
          {(activeTab === 'all' || activeTab === 'users') && results.users?.rows?.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">People</h2>
              <div className="space-y-3">
                {results.users.rows.map(u => (
                  <div key={u.id} onClick={() => navigate(`/in/${u.id}`)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <Avatar src={u.avatarUrl} name={`${u.firstName} ${u.lastName}`} size="md" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{u.firstName} {u.lastName}</h3>
                      <p className="text-xs text-slate-500 truncate">{u.headline || u.title || u.specialty}</p>
                      {u.location && <p className="text-xs text-slate-400">{u.location}</p>}
                    </div>
                    <button className="btn btn-outline text-xs py-1 px-3">Connect</button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Jobs */}
          {(activeTab === 'all' || activeTab === 'jobs') && results.jobs?.rows?.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Jobs</h2>
              <div className="space-y-3">
                {results.jobs.rows.map(j => (
                  <div key={j.id} onClick={() => navigate(`/jobs/${j.id}`)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-carehire-50 dark:bg-carehire-900/30 flex items-center justify-center shrink-0">
                      <Briefcase size={20} className="text-carehire-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{j.title}</h3>
                      <p className="text-xs text-slate-500">{j.location} · {j.type}</p>
                    </div>
                    <Badge variant="success" size="xs">{j.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Organizations */}
          {(activeTab === 'all' || activeTab === 'organizations') && results.organizations?.rows?.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Companies</h2>
              <div className="space-y-3">
                {results.organizations.rows.map(o => (
                  <div key={o.id} onClick={() => navigate(`/organization/${o.slug}`)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <Building2 size={20} className="text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{o.name}</h3>
                      <p className="text-xs text-slate-500">{o.industry} · {o.followersCount || 0} followers</p>
                    </div>
                    <button className="btn btn-outline text-xs py-1 px-3">Follow</button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Posts */}
          {(activeTab === 'all' || activeTab === 'posts') && results.posts?.rows?.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Posts</h2>
              <div className="space-y-3">
                {results.posts.rows.map(p => (
                  <div key={p.id} onClick={() => navigate(`/post/${p.id}`)} className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar src={p.author?.avatarUrl} name={`${p.author?.firstName} ${p.author?.lastName}`} size="xs" />
                      <span className="text-sm font-medium">{p.author?.firstName} {p.author?.lastName}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">{p.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* No Results */}
          {!loading && Object.keys(results).length === 0 && (
            <EmptyState icon={Search} title="No results found" description={`We couldn't find anything matching "${query}". Try different keywords.`} />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
