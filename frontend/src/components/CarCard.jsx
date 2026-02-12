import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Settings, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const CarCard = ({ car, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  const statusColors = {
    available: { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', text: '#166534' },
    reserved: { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', text: '#92400e' },
    sold: { bg: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', text: '#374151' },
    upcoming: { bg: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', text: '#7c3aed' }
  };

  const status = statusColors[car.status] || statusColors.available;

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getOptimizedImage = (url, width = 600) => {
    if (!url) return {
      placeholder: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=20&q=10',
      full: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80'
    };
    
    if (url.includes('cloudinary.com')) {
      return {
        placeholder: url.replace('/upload/', '/upload/w_20,q_10,e_blur:1000/'),
        full: url.replace('/upload/', `/upload/w_${width},h_400,c_fill,q_auto,f_auto/`)
      };
    }
    
    if (url.includes('unsplash.com')) {
      const base = url.split('?')[0];
      return {
        placeholder: `${base}?w=20&q=10`,
        full: `${base}?w=${width}&h=400&fit=crop&q=80&auto=format`
      };
    }
    
    return { placeholder: url, full: url };
  };

  const { placeholder, full } = getOptimizedImage(car.images?.[0]);

  return (
    <Link
      ref={cardRef}
      to={'/car/' + car.id}
      style={{
        display: 'block',
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `fadeInUp 0.7s ease ${index * 0.1}s both`
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
      }}
    >
      <div style={{
        position: 'relative',
        height: '280px',
        overflow: 'hidden',
        background: '#f0f0f0'
      }}>
        {/* Blur Placeholder */}
        {!imageLoaded && !imageError && isInView && (
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
              transform: 'scale(1.1)'
            }}
          />
        )}

        {/* Loading Spinner */}
        {!imageLoaded && !imageError && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e5e5',
              borderTopColor: '#c41e3a',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
          </div>
        )}

        {imageError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5',
            color: '#999',
            fontSize: '0.9rem'
          }}>
            No Image Available
          </div>
        )}

        {isInView && (
          <img
            src={full}
            alt={car.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.7s ease, opacity 0.5s ease',
              opacity: imageLoaded ? 1 : 0
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
        )}
        
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          padding: '8px 16px',
          background: status.bg,
          color: status.text,
          fontSize: '0.7rem',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderRadius: '50px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          zIndex: 2
        }}>
          {car.status}
        </div>

        {car.featured === 1 && (
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(196,30,58,0.4)',
            zIndex: 2
          }}>
            ★ Featured
          </div>
        )}

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          color: '#fff',
          zIndex: 2
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            opacity: 0.95,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {car.brand} • {car.year}
          </span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: '#0a0a0a',
          marginBottom: '16px',
          lineHeight: 1.3
        }}>
          {car.title}
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0'
        }}>
          {[
            { icon: Gauge, label: car.mileage || 'N/A' },
            { icon: Settings, label: car.transmission || 'Auto' },
            { icon: Fuel, label: car.fuel_type || 'Petrol' },
            { icon: Calendar, label: car.year }
          ].map((spec, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5e8 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <spec.icon size={15} color="#c41e3a" />
              </div>
              <span style={{
                fontSize: '0.8rem',
                color: '#525252',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {spec.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#c41e3a'
          }}>
            View Details
          </span>
          <div style={{
            width: '38px',
            height: '38px',
            background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <ArrowRight size={16} color="#fff" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Link>
  );
};

export default CarCard;
