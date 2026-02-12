import { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  width = 800,
  style = {},
  className = '',
  onClick,
  priority = false 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const getOptimizedSrc = (url, w) => {
    if (!url) return '';
    
    // Cloudinary optimization
    if (url.includes('cloudinary.com')) {
      // Get tiny placeholder for blur
      const placeholder = url.replace('/upload/', `/upload/w_20,q_10,e_blur:1000/`);
      const optimized = url.replace('/upload/', `/upload/w_${w},q_auto,f_auto/`);
      return { placeholder, optimized };
    }
    
    // Unsplash optimization
    if (url.includes('unsplash.com')) {
      const base = url.split('?')[0];
      return {
        placeholder: `${base}?w=20&q=10&blur=10`,
        optimized: `${base}?w=${w}&q=80&auto=format`
      };
    }
    
    return { placeholder: url, optimized: url };
  };

  const { placeholder, optimized } = getOptimizedSrc(src, width);

  return (
    <div 
      ref={imgRef}
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        ...style 
      }}
      className={className}
      onClick={onClick}
    >
      {/* Blur Placeholder */}
      {!loaded && !error && isInView && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            opacity: 1
          }}
        />
      )}

      {/* Loading Spinner */}
      {!loaded && !error && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            border: '3px solid rgba(196,30,58,0.2)',
            borderTopColor: '#c41e3a',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '0.8rem'
        }}>
          No Image
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <img
          src={optimized}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
        />
      )}

      <style>{`
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
