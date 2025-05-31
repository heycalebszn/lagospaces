interface LogoProps {
  variant?: 'default' | 'white' | 'colored';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo = ({ variant = 'default', size = 'md', showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const variantClasses = {
    default: {
      icon: 'text-[rgb(var(--color-primary-600))]',
      text: 'text-[rgb(var(--color-secondary-900))]',
      bg: 'bg-[rgb(var(--color-primary-600))]'
    },
    white: {
      icon: 'text-white',
      text: 'text-white',
      bg: 'bg-white'
    },
    colored: {
      icon: 'text-white',
      text: 'bg-clip-text text-transparent bg-gradient-to-r from-[rgb(var(--color-primary-600))] to-[rgb(var(--color-accent-600))]',
      bg: 'bg-gradient-to-r from-[rgb(var(--color-primary-600))] to-[rgb(var(--color-accent-600))]'
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} ${variantClasses[variant].bg} rounded-full flex items-center justify-center shadow-lg`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${variant === 'default' ? 'text-white' : variantClasses[variant].icon} ${
            size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : size === 'lg' ? 'w-6 h-6' : 'w-7 h-7'
          }`}
        >
          <path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M16.5 21h.375a1.125 1.125 0 001.125-1.125V9.75M8.25 21h.375a1.125 1.125 0 001.125-1.125V9.75M12 13.5h.008v.008H12v-.008z" />
        </svg>
      </div>
      {showText && (
        <span className={`font-display font-bold ${textSizeClasses[size]} ${variantClasses[variant].text}`}>
          Rentas
        </span>
      )}
    </div>
  );
};

export default Logo; 