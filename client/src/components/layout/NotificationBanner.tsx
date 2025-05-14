import { useState, useEffect } from 'react';

type NotificationType = 'success' | 'warning' | 'error' | 'info';

interface NotificationBannerProps {
  message: string;
  type?: NotificationType;
  duration?: number; // in milliseconds, 0 for permanent
  onClose?: () => void;
}

const NotificationBanner = ({ 
  message, 
  type = 'info', 
  duration = 5000, // default 5 seconds
  onClose
}: NotificationBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // If duration is not 0, set a timer to hide the notification
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  // Define color schemes based on type
  const colorScheme = {
    success: {
      bg: 'bg-[rgb(var(--color-success))]/10',
      text: 'text-[rgb(var(--color-success))]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-[rgb(var(--color-warning))]/10',
      text: 'text-[rgb(var(--color-warning))]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
      )
    },
    error: {
      bg: 'bg-[rgb(var(--color-error))]/10',
      text: 'text-[rgb(var(--color-error))]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
        </svg>
      )
    },
    info: {
      bg: 'bg-[rgb(var(--color-primary))]/10',
      text: 'text-[rgb(var(--color-primary))]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
        </svg>
      )
    }
  };
  
  const { bg, text, icon } = colorScheme[type];
  
  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 ${bg} ${text} px-4 py-3 rounded-lg shadow-lg flex items-center max-w-md w-full animate-fade-in`}>
      <div className="mr-3 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 mr-2 text-sm">
        {message}
      </div>
      <button 
        onClick={handleClose}
        className="flex-shrink-0 hover:text-opacity-75"
        aria-label="Close notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default NotificationBanner; 