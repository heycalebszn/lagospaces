import { useState, useEffect, useRef } from 'react';

interface MediaViewerProps {
  src: string;
  type: 'image' | 'video';
  alt?: string;
  aspectRatio?: 'square' | '16:9' | '4:3' | 'auto';
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  blurHash?: string;
}

const MediaViewer = ({
  src,
  type,
  alt = 'Media content',
  aspectRatio = 'square',
  autoPlay = true,
  controls = true,
  loop = true,
  muted = true,
  className = '',
  blurHash,
}: MediaViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  
  const aspectRatioClass = {
    'square': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    'auto': 'aspect-auto',
  }[aspectRatio];
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };
  
  useEffect(() => {
    // Reset state when the source changes
    setIsLoading(true);
    setIsError(false);
    
    // Check if media is already loaded
    if (mediaRef.current) {
      if (type === 'image' && (mediaRef.current as HTMLImageElement).complete) {
        setIsLoading(false);
      } else if (type === 'video' && (mediaRef.current as HTMLVideoElement).readyState >= 3) {
        setIsLoading(false);
      }
    }
  }, [src, type]);
  
  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} bg-secondary-100 ${className}`}>
      {/* Blur hash placeholder or loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary-200 animate-pulse">
          {blurHash ? (
            <div 
              className="w-full h-full"
              style={{ 
                backgroundImage: `url(${blurHash})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)',
              }}
            />
          ) : (
            <svg 
              className="w-10 h-10 text-secondary-400 animate-spin" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
        </div>
      )}
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary-100 text-secondary-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-sm">Failed to load media</p>
        </div>
      )}
      
      {/* Actual media element */}
      {type === 'image' ? (
        <img
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={src}
          className={`w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          autoPlay={autoPlay}
          controls={controls}
          loop={loop}
          muted={muted}
          playsInline
          onLoadedData={handleLoad}
          onError={handleError}
        />
      )}
      
      {/* Video play button overlay (when controls are disabled) */}
      {type === 'video' && !controls && !isLoading && !isError && (
        <button
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
          onClick={() => {
            const videoEl = mediaRef.current as HTMLVideoElement;
            if (videoEl.paused) {
              videoEl.play();
            } else {
              videoEl.pause();
            }
          }}
          aria-label={mediaRef.current && (mediaRef.current as HTMLVideoElement).paused ? 'Play video' : 'Pause video'}
        >
          <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
            {mediaRef.current && (mediaRef.current as HTMLVideoElement).paused ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default MediaViewer;