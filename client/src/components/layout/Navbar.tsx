import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo';

interface NavbarProps {
  toggleSidebar?: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen?: boolean;
}

const Navbar = ({ toggleSidebar, toggleMobileMenu, isMobileMenuOpen }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[rgb(var(--color-secondary-200))] py-3 px-4 md:px-6 flex items-center justify-between gap-4 shadow-sm">
      {/* Logo & Mobile Menu Toggle */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden w-10 h-10 rounded-full hover:bg-[rgb(var(--color-secondary-100))] transition-colors flex items-center justify-center"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
        
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="hidden md:flex w-10 h-10 rounded-full hover:bg-[rgb(var(--color-secondary-100))] transition-colors items-center justify-center"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        )}
        
        <Link to="/" className="flex items-center">
          <Logo variant="default" size="md" />
        </Link>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative hidden md:block">
        <div className="relative" onClick={() => navigate('/search')}>
          <input
            type="text"
            placeholder="Search properties, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-xl border border-[rgb(var(--color-secondary-200))] bg-white/90 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))] focus:border-transparent transition-all"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-secondary-400))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Navigation & User */}
      <div className="flex items-center gap-1 md:gap-3">
        <Link to="/messages" className="relative p-2 rounded-full hover:bg-[rgb(var(--color-secondary-100))] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          <span className="absolute top-0 right-0 bg-[rgb(var(--color-accent-500))] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
        </Link>
        
        <Link to="/notifications" className="relative p-2 rounded-full hover:bg-[rgb(var(--color-secondary-100))] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          <span className="absolute top-0 right-0 bg-[rgb(var(--color-accent-500))] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
        </Link>
        
        <Link to="/profile" className="flex items-center gap-2 ml-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[rgb(var(--color-primary-300))] bg-gradient-to-br from-[rgb(var(--color-primary-100))] to-[rgb(var(--color-primary-200))] flex items-center justify-center shadow-sm">
            <span className="text-[rgb(var(--color-primary-700))] font-bold text-sm">JD</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar; 