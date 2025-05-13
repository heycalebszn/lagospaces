import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PropertyImage {
  id: string;
  url: string;
  alt: string;
}

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  currency?: string;
  images: PropertyImage[];
  note?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  owner: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  currency = '₦',
  images,
  note,
  isVerified = false,
  isFeatured = false,
  owner,
}: PropertyCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered)
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group/card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Gallery */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary-100">
        <div 
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image) => (
            <div key={image.id} className="relative flex-shrink-0 w-full h-full">
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover/card:scale-105" 
              />
            </div>
          ))}
        </div>
        
        {/* Gallery Navigation */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/card:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/card:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <span 
                  key={index} 
                  className={`block h-1.5 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/70 w-1.5'
                  }`} 
                />
              ))}
            </div>
          </>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isVerified && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-success/90 text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verified
            </span>
          )}
          
          {isFeatured && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-accent-500/90 text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              Featured
            </span>
          )}
        </div>
        
        {/* Price Tag */}
        <div className="absolute top-3 right-3">
          <div className="px-3 py-1.5 rounded-lg bg-primary-600/90 text-white font-semibold backdrop-blur-sm">
            {currency}{formatPrice(price)}
          </div>
        </div>
        
        {/* Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 translate-y-12 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-secondary-700 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label="Save property"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
          
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-secondary-700 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label="Share property"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-display font-semibold text-lg text-secondary-900 line-clamp-1 mb-1">{title}</h3>
          <p className="text-secondary-500 text-sm flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {location}
          </p>
        </div>
        
        {note && (
          <p className="text-sm text-secondary-600 line-clamp-2 mb-4">
            {note}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-secondary-100">
          <Link 
            to={`/profile/${owner.id}`}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-secondary-100 flex items-center justify-center text-xs font-semibold border border-secondary-200">
              {owner.avatar ? (
                <img 
                  src={owner.avatar} 
                  alt={owner.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span>{owner.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <span className="text-sm text-secondary-700 line-clamp-1 flex items-center">
                {owner.name}
                {owner.isVerified && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1 text-primary-600">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            </div>
          </Link>
          
          <Link 
            to={`/property/${id}`}
            className="px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm font-medium rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 