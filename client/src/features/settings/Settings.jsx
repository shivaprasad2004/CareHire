import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Shield, Bell, Palette, Lock, ChevronRight, Moon, Sun, Eye, EyeOff, Mail, Smartphone } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import useAuthStore from '../../stores/authStore';
import useUiStore from '../../stores/uiStore';
import toast from 'react-hot-toast';

const Settings = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const { theme, toggleTheme } = useUiStore();
  const [activeSection, setActiveSection] = useState(section || 'account');

  const sections = [
    { id: 'account', label: 'Account', icon: User, description: 'Personal info, email, phone' },
    { id: 'privacy', label: 'Privacy', icon: Shield, description: 'Profile visibility, blocking' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email, push notification preferences' },
    { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme, display preferences' },
    { id: 'security', label: 'Security', icon: Lock, description: 'Password, login sessions' },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Section Nav */}
        <div className="lg:col-span-1">
          <Card padding="p-2">
            <nav className="space-y-1">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                    activeSection === s.id
                      ? 'bg-carehire-50 dark:bg-carehire-950 text-carehire-700 dark:text-carehire-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <s.icon size={18} />
                  <span className="text-sm font-medium">{s.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'account' && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="font-medium text-sm">Email</div>
                    <div className="text-sm text-slate-500">{user?.email}</div>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="font-medium text-sm">Name</div>
                    <div className="text-sm text-slate-500">{user?.firstName} {user?.lastName}</div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="font-medium text-sm">Phone</div>
                    <div className="text-sm text-slate-500">{user?.phone || 'Not set'}</div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-sm text-red-600">Delete Account</div>
                    <div className="text-sm text-slate-500">Permanently delete your account and data</div>
                  </div>
                  <Button variant="danger" size="sm">Delete</Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'privacy' && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <ToggleSetting label="Public Profile" description="Allow anyone to see your profile" defaultChecked={true} />
                <ToggleSetting label="Show Email" description="Display email on your profile" defaultChecked={false} />
                <ToggleSetting label="Open to Work" description="Let recruiters know you're available" defaultChecked={user?.openToWork} />
                <ToggleSetting label="Open to Hire" description="Show that your organization is hiring" defaultChecked={user?.openToHire} />
              </div>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <ToggleSetting label="Email Notifications" description="Receive notifications via email" defaultChecked={true} icon={Mail} />
                <ToggleSetting label="Push Notifications" description="Receive push notifications" defaultChecked={true} icon={Smartphone} />
                <ToggleSetting label="Job Alerts" description="Get notified about new job postings" defaultChecked={true} icon={Bell} />
                <ToggleSetting label="Connection Requests" description="Notifications for new connection requests" defaultChecked={true} icon={User} />
                <ToggleSetting label="Message Notifications" description="Notifications for new messages" defaultChecked={true} />
              </div>
            </Card>
          )}

          {activeSection === 'appearance' && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Appearance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon size={20} className="text-blue-400" /> : <Sun size={20} className="text-amber-400" />}
                    <div>
                      <div className="font-medium text-sm">Theme</div>
                      <div className="text-sm text-slate-500">Currently using {theme} mode</div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={toggleTheme}>
                    {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="font-medium text-sm">Change Password</div>
                    <div className="text-sm text-slate-500">Update your password regularly for security</div>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-sm">Active Sessions</div>
                    <div className="text-sm text-slate-500">Manage devices where you're logged in</div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const ToggleSetting = ({ label, description, defaultChecked = false, icon: Icon }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon size={18} className="text-slate-400" />}
        <div>
          <div className="font-medium text-sm">{label}</div>
          <div className="text-sm text-slate-500">{description}</div>
        </div>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-carehire-600' : 'bg-slate-300 dark:bg-slate-600'}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
};

export default Settings;
