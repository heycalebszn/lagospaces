import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

const MOCK_FEED: FeedItem[] = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    location: 'Victoria Island, Lagos',
    price: 450000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
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
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
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
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-a6ed68e3f2ce',
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
    imageUrl: 'https://images.unsplash.com/photo-1617104678098-de229db51b21',
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
    imageUrl: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30',
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

const FeedItem = ({ item }: { item: FeedItem }) => {
  const [isLiked, setIsLiked] = useState(item.isLiked || false);
  const [isSaved, setIsSaved] = useState(item.isSaved || false);
  const [likesCount, setLikesCount] = useState(item.likes);
  
  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  
  return (
    <div className="relative h-full w-full">
      {/* Background Image/Video */}
      <div className="absolute inset-0 bg-secondary-900">
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
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent" />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h2 className="text-2xl font-display font-semibold text-white mb-2">{item.title}</h2>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="px-3 py-1.5 rounded-xl bg-primary-700/80 backdrop-blur-xs text-white font-semibold">
            {formatPrice(item.price, item.currency)}
          </div>
          
          <div className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-xs text-white flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {item.location}
          </div>
        </div>
        
        {item.note && (
          <p className="text-white/90 mb-4 max-w-lg">
            {item.note}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Link to={`/profile/${item.owner.id}`} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 bg-secondary-100 flex items-center justify-center">
              {item.owner.avatar ? (
                <img 
                  src={item.owner.avatar} 
                  alt={item.owner.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-secondary-700 font-semibold text-sm">
                  {item.owner.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="text-white font-medium flex items-center gap-1">
                {item.owner.name}
                {item.owner.isVerified && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary-400">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="text-white/60 text-sm">Property Owner</div>
            </div>
          </Link>
          
          <Link to={`/property/${item.id}`} className="btn-primary py-2.5 md:py-3 px-5 md:px-6">
            View Details
          </Link>
        </div>
      </div>
      
      {/* Side Actions */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <button 
          onClick={handleLike}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
          aria-label="Like"
        >
          {isLiked ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
          <span className="sr-only">Like</span>
        </button>
        <div className="text-center text-white text-sm">{likesCount}</div>
        
        <button 
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
          aria-label="Comment"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <span className="sr-only">Comment</span>
        </button>
        <div className="text-center text-white text-sm">{item.comments}</div>
        
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
          aria-label="Save"
        >
          {isSaved ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent-400">
              <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          )}
          <span className="sr-only">Save</span>
        </button>
        
        <button 
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
          aria-label="Share"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          <span className="sr-only">Share</span>
        </button>
      </div>
    </div>
  );
};

const FeedPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex]);
  
  return (
    <div className="h-[calc(100vh-74px)] relative">
      {/* Feed Container */}
      <div 
        ref={containerRef} 
        className="h-full overflow-y-scroll snap-y snap-mandatory"
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
      
      {/* Progress Indicator */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {MOCK_FEED.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-12 rounded-full ${
              index === currentIndex 
                ? 'bg-white' 
                : 'bg-white/30'
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedPage; 