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
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0 animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[rgb(var(--color-secondary-100))]">
          <h2 className="text-lg font-display font-semibold text-[rgb(var(--color-primary-600))]">LagoSpaces</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[rgb(var(--color-secondary-100))]"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Search Bar for Mobile */}
        <div className="px-4 py-3 border-b border-[rgb(var(--color-secondary-100))]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties, locations..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl border border-[rgb(var(--color-secondary-200))] bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))] focus:border-transparent transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-secondary-400))]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
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
                      isActive ? 'bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-800))] font-medium' : 'text-[rgb(var(--color-secondary-600))]'
                    }`}
                  >
                    <span>{item.name}</span>
                    
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[rgb(var(--color-accent-100))] text-[rgb(var(--color-accent-700))]">
                        {item.badge}
                      </span>
                    )}
                    
                    {item.counter && (
                      <span className="w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-full bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-700))]">
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
        <div className="px-4 py-4 border-t border-[rgb(var(--color-secondary-100))]">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[rgb(var(--color-error))] hover:bg-[rgba(239,68,68,0.05)]"
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