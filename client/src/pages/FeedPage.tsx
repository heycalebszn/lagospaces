import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

interface FeedItem {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  imageUrl: string;
  videoUrl?: string;
  note?: string;
  likes: number;
  comments: number;
  owner: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  isLiked?: boolean;
  isSaved?: boolean;
}

// Fixed image URLs with proper Unsplash query parameters
const MOCK_FEED: FeedItem[] = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    location: 'Victoria Island, Lagos',
    price: 450000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://example.com/video1.mp4',
    note: 'Stunning ocean view apartment with modern amenities, perfect for young professionals.',
    likes: 245,
    comments: 32,
    owner: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isVerified: true,
    },
  },
  {
    id: '2',
    title: 'Cozy 2-Bedroom Flat',
    location: 'Lekki Phase 1, Lagos',
    price: 320000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80',
    note: 'Comfortable flat in a secure compound with 24/7 power and water supply.',
    likes: 129,
    comments: 18,
    owner: {
      id: 'user2',
      name: 'David Okafor',
      isVerified: false,
    },
    isLiked: true,
  },
  {
    id: '3',
    title: 'Luxury Penthouse with Pool',
    location: 'Ikoyi, Lagos',
    price: 950000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-a6ed68e3f2ce?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://example.com/video3.mp4',
    note: 'Exquisite penthouse with private pool and breathtaking city views.',
    likes: 524,
    comments: 64,
    owner: {
      id: 'user3',
      name: 'Jennifer Balogun',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      isVerified: true,
    },
    isSaved: true,
  },
  {
    id: '4',
    title: 'Spacious 3-Bedroom Apartment',
    location: 'Ikeja GRA, Lagos',
    price: 550000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1617104678098-de229db51b21?auto=format&fit=crop&w=1000&q=80',
    note: 'Family-friendly apartment in a quiet neighborhood with excellent amenities.',
    likes: 92,
    comments: 7,
    owner: {
      id: 'user4',
      name: 'Michael Adeyemi',
      isVerified: true,
    },
  },
  {
    id: '5',
    title: 'Stylish Studio Apartment',
    location: 'Yaba, Lagos',
    price: 250000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://example.com/video5.mp4',
    note: 'Perfect for students or young professionals, located close to tech hubs.',
    likes: 78,
    comments: 12,
    owner: {
      id: 'user5',
      name: 'Tolu Akande',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      isVerified: false,
    },
  },
];

const formatPrice = (amount: number, currency: string): string => {
  return currency + new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Backup image in case the main one fails to load
const fallbackImageUrl = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80';

// Function to ensure image URLs have the correct format
const formatImageUrl = (url: string): string => {
  // Check if it's an Unsplash URL that needs parameters
  if (url.includes('images.unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&w=1000&q=80`;
  }
  return url;
};

const FeedItem = ({ item }: { item: FeedItem }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked || false);
  const [isSaved, setIsSaved] = useState(item.isSaved || false);
  const [likesCount, setLikesCount] = useState(item.likes);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Animation for like button
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  
  const handleLikeWithAnimation = () => {
    setIsLikeAnimating(true);
    handleLike();
    setTimeout(() => setIsLikeAnimating(false), 500);
  };
  
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 bg-[rgb(var(--color-secondary-900))]">
        {item.videoUrl ? (
          <video
            src={item.videoUrl}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <>
            {/* Loading indicator */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
              </div>
            )}
            
            <img
              src={imageError ? fallbackImageUrl : formatImageUrl(item.imageUrl)}
              alt={item.title}
              className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={() => {
                console.log('Image error loading:', item.imageUrl);
                setImageError(true);
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', item.imageUrl);
                setImageLoaded(true);
              }}
              loading="eager"
            />
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-secondary-900))]/90 via-[rgb(var(--color-secondary-900))]/40 to-transparent" />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h2 className="text-2xl font-display font-semibold text-white mb-2 drop-shadow-md">{item.title}</h2>
        
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-[rgb(var(--color-primary-700))]/90 backdrop-blur-sm text-white font-semibold shadow-lg transform hover:scale-105 transition-transform">
            {formatPrice(item.price, item.currency)}
          </div>
          
          <div className="px-3 py-1.5 rounded-xl bg-white/30 backdrop-blur-md text-white flex items-center gap-1 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {item.location}
          </div>
        </div>
        
        {item.note && (
          <p className="text-white/90 mb-4 max-w-lg backdrop-blur-sm bg-[rgb(var(--color-secondary-900))]/30 p-3 rounded-lg">
            {item.note}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link to={`/profile/${item.owner.id}`} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 bg-[rgb(var(--color-secondary-100))] flex items-center justify-center shadow-lg group-hover:border-[rgb(var(--color-primary-400))] transition-all">
              {item.owner.avatar ? (
                <img 
                  src={formatImageUrl(item.owner.avatar)} 
                  alt={item.owner.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    // Fallback to initials if avatar fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-[rgb(var(--color-secondary-700))] font-semibold text-sm">${item.owner.name.slice(0, 2).toUpperCase()}</span>`;
                  }}
                  loading="eager"
                />
              ) : (
                <span className="text-[rgb(var(--color-secondary-700))] font-semibold text-sm">
                  {item.owner.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="text-white font-medium flex items-center gap-1">
                {item.owner.name}
                {item.owner.isVerified && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[rgb(var(--color-primary-400))]">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="text-white/60 text-sm">Property Owner</div>
            </div>
          </Link>
          
          <Link to={`/property/${item.id}`} className="bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-500))] py-2.5 md:py-3 px-5 md:px-6 rounded-xl text-white font-semibold shadow-lg transform hover:scale-105 transition-all">
            View Details
          </Link>
        </div>
      </div>
      
      {/* Side Actions */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button 
          onClick={handleLikeWithAnimation}
          className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg ${
            isLiked ? 'bg-red-500/90' : 'bg-black/40 hover:bg-black/60'
          } transition-all ${isLikeAnimating ? 'animate-pulse scale-110' : ''}`}
          aria-label="Like"
        >
          {isLiked ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
          <span className="sr-only">Like</span>
        </button>
        <div className="text-center text-white text-sm font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">{likesCount}</div>
        
        <button 
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all shadow-lg"
          aria-label="Comment"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <span className="sr-only">Comment</span>
        </button>
        <div className="text-center text-white text-sm font-medium bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">{item.comments}</div>
        
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg ${
            isSaved ? 'bg-[rgb(var(--color-accent-400))]/90' : 'bg-black/40 hover:bg-black/60'
          } transition-all`}
          aria-label="Save"
        >
          {isSaved ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          )}
          <span className="sr-only">Save</span>
        </button>
        
        <button 
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-all shadow-lg"
          aria-label="Share"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          <span className="sr-only">Share</span>
        </button>
      </div>
      
      {/* Top status bar - new feature */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <Logo variant="white" size="md" />
        
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const itemHeight = container.clientHeight;
    
    // Calculate which item is most visible
    const newIndex = Math.round(scrollPosition / itemHeight);
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < MOCK_FEED.length) {
      setCurrentIndex(newIndex);
    }
    
    // Set scrolling state
    setIsScrolling(true);
    
    // Clear previous timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Set new timeout
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [currentIndex]);
  
  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const itemHeight = container.clientHeight;
    
    container.scrollTo({
      top: index * itemHeight,
      behavior: 'smooth'
    });
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        if (currentIndex < MOCK_FEED.length - 1) {
          scrollToIndex(currentIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        if (currentIndex > 0) {
          scrollToIndex(currentIndex - 1);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);
  
  return (
    <div className="h-[calc(100vh-74px)] relative">
      {/* Feed Container */}
      <div 
        ref={containerRef} 
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {MOCK_FEED.map((item, index) => (
          <div 
            key={index}
            className="h-full w-full snap-start snap-always"
          >
            <FeedItem item={item} />
          </div>
        ))}
      </div>
      
      {/* Progress Indicator with click navigation */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {MOCK_FEED.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-1.5 h-12 rounded-full transition-all transform hover:scale-150 ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation buttons */}
      <div className={`absolute left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-4 transition-opacity duration-500 ${isScrolling ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => currentIndex > 0 && scrollToIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shadow-lg ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/60'}`}
          aria-label="Previous property"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white font-medium">
          {currentIndex + 1} / {MOCK_FEED.length}
        </div>
        
        <button
          onClick={() => currentIndex < MOCK_FEED.length - 1 && scrollToIndex(currentIndex + 1)}
          disabled={currentIndex === MOCK_FEED.length - 1}
          className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white shadow-lg ${currentIndex === MOCK_FEED.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/60'}`}
          aria-label="Next property"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      
      {/* Swipe indicator on first load */}
      {currentIndex === 0 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-20 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full text-white flex items-center gap-2 animate-pulse opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">Swipe up to explore</span>
        </div>
      )}
      
      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary-900 to-transparent h-16 flex items-center justify-around px-4">
        <button className="text-white flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button className="text-white flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-xs mt-1">Search</span>
        </button>
        
        <div className="relative -top-4">
          <button className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/30 hover:bg-primary-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        
        <button className="text-white flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
          <span className="text-xs mt-1">Saved</span>
        </button>
        
        <button className="text-white flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default FeedPage;