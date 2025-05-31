import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const LoadingScreen = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Navigate to home after animation
    const navigationTimer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[rgb(var(--color-primary-50))] to-[rgb(var(--color-accent-50))] flex flex-col items-center justify-center p-6">
      <div className={`transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        {/* Logo */}
        <div className="mb-8 relative">
          <Logo variant="colored" size="xl" />
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 border-4 border-[rgb(var(--color-primary-200))] rounded-full animate-spin-slow"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[rgb(var(--color-accent-200))] rounded-full animate-bounce"></div>
        </div>

        {/* Value Proposition */}
        <div className="max-w-xl text-center">
          <p className="text-lg md:text-xl text-[rgb(var(--color-secondary-800))] leading-relaxed">
            Rent direct, save big—property owners list for free and connect instantly with verified tenants, while renters find trusted homes without agent fees.
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-8 flex items-center justify-center">
          <div className="w-2 h-2 bg-[rgb(var(--color-primary-600))] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[rgb(var(--color-primary-600))] rounded-full animate-bounce [animation-delay:0.2s] mx-2"></div>
          <div className="w-2 h-2 bg-[rgb(var(--color-primary-600))] rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 