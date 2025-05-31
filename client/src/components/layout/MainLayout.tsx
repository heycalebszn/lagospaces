import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import NotificationBanner from './NotificationBanner';
import { useAuth } from '../../context/AuthContext';

interface NotificationState {
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  isVisible: boolean;
}

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  // Close mobile menu on window resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close sidebar and mobile menu when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Example of how to show a notification (this can be exposed via context in a real app)
  const showNotification = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true
    });
  };

  console.log(showNotification)
  
  // Hide the notification
  const hideNotification = () => {
    setNotification(null);
  };
  
  // Determine if we should show the footer
  // We might want to hide it on certain pages like the feed
  const shouldShowFooter = !location.pathname.includes('/feed');
  
  // Mobile navigation items
  const mobileNavItems = [
    { path: '/', name: 'Home', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    )},
    { path: '/saved', name: 'Saved', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
      </svg>
    )},
    { path: '/post', name: 'Post', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    )},
    { path: '/messages', name: 'Messages', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    )},
    { path: '/profile', name: 'Profile', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    )},
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[rgb(var(--color-secondary-50))] to-[rgb(var(--color-secondary-100))]">
      <Navbar 
        toggleSidebar={isAuthenticated ? toggleSidebar : undefined} 
        toggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} />}
        
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          !isAuthenticated && location.pathname === '/home' ? 'p-0' : 'p-4 md:p-6 lg:p-8 pb-20 md:pb-8'
        }`}>
          <div className={`${
            !isAuthenticated && location.pathname === '/home' ? '' : 'max-w-7xl mx-auto'
          }`}>
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation - Only show when authenticated */}
      {isAuthenticated && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[rgb(var(--color-secondary-200))] shadow-lg z-40">
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center py-3 px-2 ${
                    isActive 
                      ? 'text-[rgb(var(--color-primary-600))]' 
                      : 'text-[rgb(var(--color-secondary-500))]'
                  }`}
                >
                  <div className={`${isActive ? 'text-[rgb(var(--color-primary-600))]' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="text-xs mt-1">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      
      {isAuthenticated && <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />}
      
      {shouldShowFooter && <Footer />}
      
      {notification && notification.isVisible && (
        <NotificationBanner 
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
        />
      )}
    </div>
  );
};

export default MainLayout; 