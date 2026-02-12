import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

const LazyVideo = ({ 
  src, 
  poster,
  style = {},
  className = ''
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  // Generate poster from Cloudinary video
  const getPoster = () => {
    if (poster) return poster;
    if (src && src.includes('cloudinary.com')) {
      // Convert video URL to thumbnail
      return src
        .replace('/video/upload/', '/video/upload/so_0,w_600,h_400,c_fill/')
        .replace(/\.[^.]+$/, '.jpg');
    }
    return '';
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
        borderRadius: '12px',
        ...style 
      }}
      className={className}
    >
      {!isInView ? (
        // Placeholder before in view
        <div style={{
          width: '100%',
          height: '100%',
          minHeight: '200px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'rgba(196,30,58,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Play size={24} color="#c41e3a" />
          </div>
        </div>
      ) : !isPlaying ? (
        // Poster with play button
        <div 
          onClick={handlePlay}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '200px',
            cursor: 'pointer'
          }}
        >
          {getPoster() && (
            <img
              src={getPoster()}
              alt="Video thumbnail"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onLoad={() => setLoaded(true)}
            />
          )}
          
          {/* Play Button Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(196,30,58,0.5)',
              transition: 'transform 0.3s ease'
            }}>
              <Play size={30} color="#fff" fill="#fff" style={{ marginLeft: '4px' }} />
            </div>
          </div>
        </div>
      ) : (
        // Actual Video
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            minHeight: '200px'
          }}
        />
      )}
    </div>
  );
};

export default LazyVideo;
