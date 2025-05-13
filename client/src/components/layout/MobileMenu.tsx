import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation();
  
  // Close menu when location changes (navigating away)
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);
  
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const menuItems = [
    { path: '/', name: 'Explore' },
    { path: '/feed', name: 'Feed', badge: 'New' },
    { path: '/messages', name: 'Messages', counter: 5 },
    { path: '/saved', name: 'Saved' },
    { path: '/post', name: 'Post Space' },
    { path: '/profile', name: 'Profile' },
    { path: '/settings', name: 'Settings' },
  ];
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-secondary-100">
          <h2 className="text-lg font-display font-semibold text-primary-600">LagoSpaces</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary-100"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                      isActive ? 'bg-primary-100 text-primary-800 font-medium' : 'text-secondary-600'
                    }`}
                  >
                    <span>{item.name}</span>
                    
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-accent-100 text-accent-700">
                        {item.badge}
                      </span>
                    )}
                    
                    {item.counter && (
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-full bg-primary-100 text-primary-700">
                        {item.counter}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Footer */}
        <div className="px-4 py-4 border-t border-secondary-100">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-error-600 hover:bg-error-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 