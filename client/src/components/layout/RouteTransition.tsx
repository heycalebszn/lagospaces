import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';

const RouteTransition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // Hide after 1 second

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Logo variant="colored" size="lg" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-4 border-[rgb(var(--color-primary-200))] rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default RouteTransition; 