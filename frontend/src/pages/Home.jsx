import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Shield, Award, Phone, MessageCircle, Star, Car, Clock } from 'lucide-react';
import CarCard from '../components/CarCard';
import { getImage } from '../config/images';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [upcomingCars, setUpcomingCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const [featuredRes, upcomingRes] = await Promise.all([
          axios.get('/api/cars?featured=true&status=available'),
          axios.get('/api/cars?upcoming=true')
        ]);
        setFeaturedCars(featuredRes.data.slice(0, 6));
        setUpcomingCars(upcomingRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const heroBg = getImage('heroBg');

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25
        }} />

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(196,30,58,0.15) 0%, transparent 60%)'
        }} />

        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, rgba(196,30,58,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 6s ease-in-out infinite'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'rgba(196,30,58,0.15)',
              borderRadius: '50px',
              marginBottom: '32px',
              animation: 'fadeInDown 0.8s ease'
            }}>
              <Star size={16} color="#c41e3a" fill="#c41e3a" />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#fff'
              }}>
                Premium Japanese Imports
              </span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: '700',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '28px',
              animation: 'fadeInUp 0.8s ease 0.1s both'
            }}>
              Your Dream Car<br />
              <span style={{
                background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Awaits You</span>
            </h1>

            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8,
              maxWidth: '550px',
              marginBottom: '48px',
              animation: 'fadeInUp 0.8s ease 0.2s both'
            }}>
              We deal in new & used cars imported directly from Japan. 
              Quality you can trust, service you'll love!
            </p>

            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              animation: 'fadeInUp 0.8s ease 0.3s both'
            }}>
              <Link to="/collection" className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '0.95rem', borderRadius: '50px' }}>
                Explore Collection
                <ArrowRight size={18} />
              </Link>
              <a href="tel:03241344368" className="btn" style={{
                padding: '18px 40px',
                fontSize: '0.95rem',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <Phone size={18} />
                0324-1344368
              </a>
            </div>

            <div style={{
              marginTop: '80px',
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap',
              animation: 'fadeInUp 0.8s ease 0.4s both'
            }}>
              {[
                { number: '500+', label: 'Cars Sold' },
                { number: '10+', label: 'Years Experience' },
                { number: '100%', label: 'Satisfaction' }
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#fff', lineHeight: 1 }}>{stat.number}</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '120px 0', background: 'linear-gradient(180deg, #fafafa 0%, #fff 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: 'linear-gradient(135deg, rgba(196,30,58,0.1) 0%, rgba(196,30,58,0.05) 100%)',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#c41e3a',
              marginBottom: '20px'
            }}>
              Why Choose Us
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#0a0a0a', maxWidth: '600px', margin: '0 auto' }}>
              We Make Car Buying <span style={{ color: '#c41e3a' }}>Simple</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {[
              { icon: Shield, title: 'Quality Guaranteed', description: 'Every vehicle is thoroughly inspected.', gradient: 'linear-gradient(135deg, #fff5f5 0%, #ffe5e8 100%)' },
              { icon: Award, title: 'Best Selection', description: 'New & used cars imported directly from Japan.', gradient: 'linear-gradient(135deg, #f5f5ff 0%, #e5e5ff 100%)' },
              { icon: MessageCircle, title: 'Friendly Service', description: 'No pressure, just honest advice.', gradient: 'linear-gradient(135deg, #f5fff5 0%, #e5ffe5 100%)' }
            ].map((feature, i) => (
              <div key={i} style={{
                padding: '48px 40px',
                background: '#fff',
                borderRadius: '28px',
                boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
                transition: 'all 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.05)'; }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: feature.gradient,
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px'
                }}>
                  <feature.icon size={32} color="#c41e3a" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '16px', color: '#0a0a0a' }}>{feature.title}</h3>
                <p style={{ fontSize: '1rem', color: '#737373', lineHeight: 1.8 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <span style={{
                display: 'inline-block',
                padding: '10px 24px',
                background: 'linear-gradient(135deg, rgba(196,30,58,0.1) 0%, rgba(196,30,58,0.05) 100%)',
                borderRadius: '50px',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#c41e3a',
                marginBottom: '20px'
              }}>Our Collection</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#0a0a0a' }}>
                Featured <span style={{ color: '#c41e3a' }}>Vehicles</span>
              </h2>
            </div>
            <Link to="/collection" className="btn btn-secondary" style={{ padding: '14px 32px', borderRadius: '50px' }}>
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
              <div className="spinner" />
            </div>
          ) : featuredCars.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '36px' }}>
              {featuredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px', background: '#fafafa', borderRadius: '28px' }}>
              <Car size={60} color="#d4d4d4" strokeWidth={1} />
              <p style={{ color: '#737373', marginTop: '20px' }}>New inventory coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* UPCOMING CARS SECTION */}
      {upcomingCars.length > 0 && (
        <section style={{ padding: '120px 0', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                background: 'rgba(196,30,58,0.2)',
                borderRadius: '50px',
                marginBottom: '20px'
              }}>
                <Clock size={18} color="#c41e3a" />
                <span style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
                  Coming Soon
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#fff' }}>
                Upcoming <span style={{ color: '#c41e3a' }}>Arrivals</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0' }}>
                Reserve your dream car before it arrives!
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
              {upcomingCars.map((car, index) => (
                <div key={car.id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.4s ease',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = '#c41e3a'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <div style={{ position: 'relative', height: '240px' }}>
                    <img
                      src={car.images?.[0] || getImage('upcomingPlaceholder')}
                      alt={car.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                      borderRadius: '50px',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      color: '#fff',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}>
                      Coming Soon
                    </div>
                  </div>
                  <div style={{ padding: '28px' }}>
                    <p style={{ fontSize: '0.75rem', color: '#c41e3a', fontWeight: '600', marginBottom: '8px' }}>
                      {car.brand} • {car.year}
                    </p>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>
                      {car.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                      {car.description}
                    </p>
                    <a href="tel:03241344368" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '20px',
                      padding: '12px 24px',
                      background: 'rgba(196,30,58,0.2)',
                      borderRadius: '50px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      <Phone size={16} />
                      Reserve Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section style={{ padding: '120px 0', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(196,30,58,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '700', color: '#0a0a0a', marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px' }}>
            Ready to Find Your <span style={{ color: '#c41e3a' }}>Dream Car?</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#737373', marginBottom: '48px', maxWidth: '500px', margin: '0 auto 48px' }}>
            Visit our showroom or give us a call!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '18px 48px', borderRadius: '50px' }}>
              Visit Us
            </Link>
            <a href="tel:03241344368" className="btn btn-secondary" style={{ padding: '18px 48px', borderRadius: '50px' }}>
              <Phone size={18} />
              0324-1344368
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
