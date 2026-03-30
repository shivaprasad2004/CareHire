import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, CheckCheck, UserPlus, Heart, MessageSquare, Briefcase, Building2 } from 'lucide-react';
import { notificationService } from '../../services/notificationService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import useNotificationStore from '../../stores/notificationStore';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, setNotifications, markAsRead, markAllAsRead } = useNotificationStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationService.getAllNotifications()
      .then(data => {
        if (data.status === 'success') setNotifications(data.data.notifications || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      markAsRead(id);
    } catch (err) {
      console.error(err);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      connection: UserPlus,
      like: Heart,
      comment: MessageSquare,
      job: Briefcase,
      organization: Building2,
    };
    return icons[type] || Bell;
  };

  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.some(n => !n.isRead) && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead} icon={<CheckCheck size={16} />}>
            Mark all as read
          </Button>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
      ) : notifications.length === 0 ? (
        <Card>
          <EmptyState icon={Bell} title="No notifications" description="You're all caught up! Notifications about your connections, posts, and jobs will appear here." />
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map(notif => {
            const Icon = getNotificationIcon(notif.type);
            return (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-4 rounded-xl transition-colors cursor-pointer ${
                  !notif.isRead
                    ? 'bg-carehire-50/50 dark:bg-carehire-950/20 border border-carehire-200/30 dark:border-carehire-800/30'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                  !notif.isRead ? 'bg-carehire-100 dark:bg-carehire-900/50' : 'bg-slate-100 dark:bg-slate-800'
                }`}>
                  <Icon size={18} className={!notif.isRead ? 'text-carehire-600' : 'text-slate-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${!notif.isRead ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {notif.message}
                  </p>
                  <span className="text-xs text-slate-400 mt-1 block">{new Date(notif.createdAt).toLocaleString()}</span>
                </div>
                {!notif.isRead && (
                  <button onClick={(e) => { e.stopPropagation(); handleMarkAsRead(notif.id); }} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full shrink-0" title="Mark as read">
                    <Check size={14} className="text-slate-400" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
