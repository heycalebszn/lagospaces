import { useState } from 'react';

interface Notification {
  id: string;
  type: 'visit_request' | 'visit_confirmed' | 'visit_reminder' | 'payment' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLink?: string;
  actionText?: string;
  senderImage?: string;
  senderName?: string;
}

// Mock notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'visit_request',
    title: 'Visit Request',
    message: 'John Doe wants to visit your property "Modern Apartment with Ocean View" on Friday, May 10, 2024 at 2:00 PM.',
    timestamp: '2024-05-08T10:30:00Z',
    isRead: false,
    actionLink: '/visits/1',
    actionText: 'Respond',
    senderImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    senderName: 'John Doe'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Refund',
    message: 'Your refund of ₦5,000 for property visit has been processed successfully.',
    timestamp: '2024-05-07T15:45:00Z',
    isRead: false,
    actionLink: '/transactions',
    actionText: 'View Details'
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from Sarah Johnson regarding her property listing.',
    timestamp: '2024-05-06T09:20:00Z',
    isRead: true,
    actionLink: '/messages/sarah-johnson',
    actionText: 'Read Message',
    senderImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    senderName: 'Sarah Johnson'
  },
  {
    id: '4',
    type: 'visit_confirmed',
    title: 'Visit Confirmed',
    message: 'Your visit to "Luxury Penthouse with Pool" has been confirmed for Sunday, May 12, 2024 at 10:00 AM.',
    timestamp: '2024-05-05T18:15:00Z',
    isRead: true,
    actionLink: '/visits/confirmed',
    actionText: 'View Details'
  },
  {
    id: '5',
    type: 'system',
    title: 'Verification Complete',
    message: 'Your identity has been successfully verified. You can now access all features of LAGOSPACES.',
    timestamp: '2024-05-04T12:00:00Z',
    isRead: true
  },
  {
    id: '6',
    type: 'visit_reminder',
    title: 'Visit Reminder',
    message: 'Reminder: You have a scheduled visit for "Cozy 2-Bedroom Flat" tomorrow at 4:00 PM.',
    timestamp: '2024-05-03T08:30:00Z',
    isRead: true,
    actionLink: '/visits/scheduled',
    actionText: 'View Details'
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  // Get filtered notifications
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notification => !notification.isRead);
  
  // Mark notification as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };
  
  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  // Format timestamp to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - notificationTime.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return notificationTime.toLocaleDateString();
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'visit_request':
        return (
          <div className="bg-[rgb(var(--color-primary-100))] p-3 rounded-full text-[rgb(var(--color-primary-700))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
        );
      case 'visit_confirmed':
        return (
          <div className="bg-[rgb(var(--color-success))]/10 p-3 rounded-full text-[rgb(var(--color-success))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        );
      case 'visit_reminder':
        return (
          <div className="bg-[rgb(var(--color-warning))]/10 p-3 rounded-full text-[rgb(var(--color-warning))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        );
      case 'payment':
        return (
          <div className="bg-[rgb(var(--color-accent-100))] p-3 rounded-full text-[rgb(var(--color-accent-700))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
          </div>
        );
      case 'message':
        return (
          <div className="bg-[rgb(var(--color-primary-100))] p-3 rounded-full text-[rgb(var(--color-primary-700))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
        );
      case 'system':
        return (
          <div className="bg-[rgb(var(--color-secondary-100))] p-3 rounded-full text-[rgb(var(--color-secondary-700))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-[rgb(var(--color-secondary-100))] p-3 rounded-full text-[rgb(var(--color-secondary-700))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
        );
    }
  };
  
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-[rgb(var(--color-secondary-900))]">
            Notifications
          </h1>
          <p className="text-[rgb(var(--color-secondary-600))]">
            Stay updated with your property activities
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllAsRead}
            className="text-[rgb(var(--color-primary-600))] hover:text-[rgb(var(--color-primary-800))] font-medium transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>
      
      {/* Filter tabs */}
      <div className="flex gap-4 mb-6 border-b border-[rgb(var(--color-secondary-200))]">
        <button
          onClick={() => setFilter('all')}
          className={`py-3 px-4 font-medium transition-colors relative ${
            filter === 'all' 
              ? 'text-[rgb(var(--color-primary-600))]' 
              : 'text-[rgb(var(--color-secondary-500))] hover:text-[rgb(var(--color-secondary-800))]'
          }`}
        >
          All
          {filter === 'all' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--color-primary-600))]"></div>
          )}
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`py-3 px-4 font-medium transition-colors relative flex items-center gap-2 ${
            filter === 'unread' 
              ? 'text-[rgb(var(--color-primary-600))]' 
              : 'text-[rgb(var(--color-secondary-500))] hover:text-[rgb(var(--color-secondary-800))]'
          }`}
        >
          Unread
          {unreadCount > 0 && (
            <span className="bg-[rgb(var(--color-primary-600))] text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
          {filter === 'unread' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--color-primary-600))]"></div>
          )}
        </button>
      </div>
      
      {/* Empty state */}
      {filteredNotifications.length === 0 && (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[rgb(var(--color-secondary-100))] rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[rgb(var(--color-secondary-500))]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
          <h2 className="text-xl font-display font-semibold text-[rgb(var(--color-secondary-900))] mb-2">
            No notifications yet
          </h2>
          <p className="text-[rgb(var(--color-secondary-600))] max-w-sm">
            {filter === 'all' 
              ? "You don't have any notifications yet. Check back later!"
              : "You have no unread notifications."}
          </p>
        </div>
      )}
      
      {/* Notifications list */}
      <div className="space-y-4">
        {filteredNotifications.map(notification => (
          <div 
            key={notification.id}
            className={`p-4 rounded-xl transition-all ${
              notification.isRead
                ? 'bg-white border border-[rgb(var(--color-secondary-200))]'
                : 'bg-[rgb(var(--color-primary-50))] border border-[rgb(var(--color-primary-200))]'
            }`}
          >
            <div className="flex items-start gap-4">
              {notification.senderImage ? (
                <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-[rgb(var(--color-secondary-200))]">
                  <img 
                    src={notification.senderImage} 
                    alt={notification.senderName || 'User'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
              )}
              
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-semibold ${!notification.isRead ? 'text-[rgb(var(--color-secondary-900))]' : 'text-[rgb(var(--color-secondary-700))]'}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-[rgb(var(--color-secondary-500))]">
                    {formatRelativeTime(notification.timestamp)}
                  </span>
                </div>
                <p className={`mt-1 ${!notification.isRead ? 'text-[rgb(var(--color-secondary-800))]' : 'text-[rgb(var(--color-secondary-600))]'}`}>
                  {notification.message}
                </p>
                
                {(notification.actionLink && notification.actionText) && (
                  <div className="mt-3 flex justify-between items-center">
                    <a 
                      href={notification.actionLink}
                      className="text-[rgb(var(--color-primary-600))] hover:text-[rgb(var(--color-primary-800))] font-medium text-sm"
                    >
                      {notification.actionText}
                    </a>
                    
                    {!notification.isRead && (
                      <button 
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-[rgb(var(--color-secondary-500))] hover:text-[rgb(var(--color-secondary-700))] text-sm"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage; 