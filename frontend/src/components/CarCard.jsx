import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Settings, ArrowRight } from 'lucide-react';

const CarCard = ({ car, index = 0 }) => {
  const statusColors = {
    available: { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', text: '#166534' },
    reserved: { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', text: '#92400e' },
    sold: { bg: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', text: '#374151' }
  };

  const status = statusColors[car.status] || statusColors.available;

  return (
    <Link
      to={`/car/${car.id}`}
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
      {/* Image Container - LARGER */}
      <div style={{
        position: 'relative',
        height: '320px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)'
      }}>
        <img
          src={car.images?.[0] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80'}
          alt={car.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s ease'
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        
        {/* Status Badge */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '8px 18px',
          background: status.bg,
          color: status.text,
          fontSize: '0.7rem',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderRadius: '50px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          {car.status}
        </div>

        {/* Featured Badge */}
        {car.featured === 1 && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px 18px',
            background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(196,30,58,0.4)'
          }}>
            ★ Featured
          </div>
        )}

        {/* Bottom Gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          pointerEvents: 'none'
        }} />

        {/* Price Tag */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          color: '#fff'
        }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: '500',
            opacity: 0.9,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {car.brand} • {car.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px' }}>
        {/* Title */}
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: '700',
          color: '#0a0a0a',
          marginBottom: '16px',
          lineHeight: 1.3
        }}>
          {car.title}
        </h3>

        {/* Specs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
          paddingTop: '20px',
          borderTop: '1px solid #f0f0f0'
        }}>
          {[
            { icon: Gauge, label: car.mileage || 'N/A' },
            { icon: Settings, label: car.transmission || 'N/A' },
            { icon: Fuel, label: car.fuel_type || 'Petrol' },
            { icon: Calendar, label: car.year }
          ].map((spec, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5e8 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <spec.icon size={16} color="#c41e3a" />
              </div>
              <span style={{
                fontSize: '0.85rem',
                color: '#525252',
                fontWeight: '500'
              }}>
                {spec.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
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
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <ArrowRight size={18} color="#fff" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
