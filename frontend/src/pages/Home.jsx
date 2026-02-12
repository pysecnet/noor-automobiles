import SEO from '../components/SEO';
import { OrganizationSchema } from '../components/StructuredData';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Shield, Award, Phone, Star, Car, Clock } from 'lucide-react';
import CarCard from '../components/CarCard';

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

  return (
    <div>
      {/* Hero Section - BIGGER & MORE IMPACTFUL */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        overflow: 'hidden',
        padding: '120px 0 80px'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(196,30,58,0.25) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(196,30,58,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 24px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ maxWidth: '800px' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 24px',
              background: 'rgba(196,30,58,0.15)',
              borderRadius: '50px',
              marginBottom: '32px',
              border: '1px solid rgba(196,30,58,0.3)'
            }}>
              <Star size={18} color="#c41e3a" fill="#c41e3a" />
              <span style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff'
              }}>
                Premium Japanese Imports
              </span>
            </div>
            
            {/* Main Heading - MUCH BIGGER */}
            <h1 style={{
              fontSize: 'clamp(3.5rem, 12vw, 6rem)',
              fontWeight: '800',
              color: '#fff',
              lineHeight: 1.05,
              marginBottom: '28px',
              letterSpacing: '-0.02em'
            }}>
              Import Your<br />
              <span style={{
                background: 'linear-gradient(135deg, #c41e3a 0%, #ff6b6b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Dream Car</span>
            </h1>

            {/* Subheading - BIGGER */}
            <p style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              maxWidth: '600px',
              marginBottom: '48px'
            }}>
              We deal in new & used cars imported directly from Japan. 
              Quality you can trust, service you'll love!
            </p>

            {/* CTA Buttons - BIGGER */}
            <div style={{
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap',
              marginBottom: '80px'
            }}>
              <Link to="/collection" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px 40px',
                background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                color: '#fff',
                borderRadius: '60px',
                fontSize: '1.1rem',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 20px 40px rgba(196,30,58,0.4)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                Explore Collection
                <ArrowRight size={22} />
              </Link>
              <a href="tel:03241344368" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px 40px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: '60px',
                fontSize: '1.1rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}>
                <Phone size={22} />
                0324-1344368
              </a>
            </div>

            {/* Stats - MUCH BIGGER */}
            <div style={{
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap'
            }}>
              {[
                { number: '500+', label: 'Cars Sold' },
                { number: '10+', label: 'Years Experience' },
                { number: '100%', label: 'Satisfaction' }
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ 
                    fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
                    fontWeight: '800', 
                    color: '#fff', 
                    lineHeight: 1,
                    letterSpacing: '-0.02em'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ 
                    fontSize: '1rem', 
                    color: 'rgba(255,255,255,0.5)', 
                    marginTop: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.05em'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - BIGGER */}
      <section style={{ padding: '120px 0', background: '#fafafa' }}>
        <div className="container" style={{ padding: '0 24px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <span style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'rgba(196,30,58,0.1)',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#c41e3a',
              marginBottom: '24px'
            }}>
              Why Choose Us
            </span>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', 
              fontWeight: '800', 
              color: '#0a0a0a',
              letterSpacing: '-0.02em'
            }}>
              We Make Car Buying <span style={{ color: '#c41e3a' }}>Simple</span>
            </h2>
          </div>

          <div className="features-grid">
            {[
              { icon: Shield, title: 'Verified Quality', description: 'Every car inspected and certified for your peace of mind.', gradient: 'linear-gradient(135deg, #fff5f5 0%, #ffe0e6 100%)' },
              { icon: Award, title: 'Best Prices', description: 'Direct import means better prices for premium vehicles.', gradient: 'linear-gradient(135deg, #f5f5ff 0%, #e0e0ff 100%)' },
              { icon: Phone, title: '24/7 Support', description: 'Our team is always ready to help you find your dream car.', gradient: 'linear-gradient(135deg, #f5fff5 0%, #e0ffe0 100%)' }
            ].map((feature, i) => (
              <div key={i} style={{
                background: '#fff',
                padding: '50px 40px',
                borderRadius: '28px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  background: feature.gradient,
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '28px'
                }}>
                  <feature.icon size={40} color="#c41e3a" strokeWidth={1.5} />
                </div>
                <h3 style={{ 
                  fontSize: '1.6rem', 
                  fontWeight: '700', 
                  marginBottom: '16px', 
                  color: '#0a0a0a' 
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: '#737373', 
                  lineHeight: 1.8 
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section - BIGGER */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ padding: '0 24px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '60px', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}>
            <div>
              <span style={{
                display: 'inline-block',
                padding: '12px 28px',
                background: 'rgba(196,30,58,0.1)',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#c41e3a',
                marginBottom: '20px'
              }}>
                Our Collection
              </span>
              <h2 style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', 
                fontWeight: '800', 
                color: '#0a0a0a',
                letterSpacing: '-0.02em'
              }}>
                Featured <span style={{ color: '#c41e3a' }}>Vehicles</span>
              </h2>
            </div>
            <Link to="/collection" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              border: '2px solid #e5e5e5',
              borderRadius: '50px',
              color: '#0a0a0a',
              fontWeight: '600',
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>
              View All <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
              <div className="spinner" />
            </div>
          ) : featuredCars.length > 0 ? (
            <div className="cars-grid">
              {featuredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px', background: '#fafafa', borderRadius: '28px' }}>
              <Car size={70} color="#d4d4d4" strokeWidth={1} />
              <p style={{ color: '#737373', marginTop: '24px', fontSize: '1.2rem' }}>New inventory coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Cars - BIGGER */}
      {upcomingCars.length > 0 && (
        <section style={{ padding: '120px 0', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
          <div className="container" style={{ padding: '0 24px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: 'rgba(196,30,58,0.2)',
                borderRadius: '50px',
                marginBottom: '24px'
              }}>
                <Clock size={20} color="#c41e3a" />
                <span style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: '600', 
                  letterSpacing: '0.12em', 
                  textTransform: 'uppercase', 
                  color: '#fff' 
                }}>
                  Coming Soon
                </span>
              </div>
              <h2 style={{ 
                fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', 
                fontWeight: '800', 
                color: '#fff',
                letterSpacing: '-0.02em'
              }}>
                Upcoming <span style={{ color: '#c41e3a' }}>Arrivals</span>
              </h2>
            </div>

            <div className="upcoming-grid">
              {upcomingCars.map((car) => (
                <div key={car.id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ position: 'relative', height: '240px' }}>
                    <img
                      src={car.images?.[0] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80'}
                      alt={car.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '10px 20px',
                      background: '#c41e3a',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Coming Soon
                    </div>
                  </div>
                  <div style={{ padding: '28px' }}>
                    <p style={{ 
                      fontSize: '0.85rem', 
                      color: '#c41e3a', 
                      fontWeight: '600', 
                      marginBottom: '8px',
                      letterSpacing: '0.05em'
                    }}>
                      {car.brand} • {car.year}
                    </p>
                    <h3 style={{ 
                      fontSize: '1.4rem', 
                      fontWeight: '700', 
                      color: '#fff', 
                      marginBottom: '16px' 
                    }}>
                      {car.title}
                    </h3>
                    <a href="tel:03241344368" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '8px',
                      padding: '14px 24px',
                      background: 'rgba(196,30,58,0.2)',
                      borderRadius: '50px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      transition: 'background 0.3s ease'
                    }}>
                      <Phone size={18} />
                      Reserve Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - BIGGER */}
      <section style={{ padding: '120px 0', background: '#fff' }}>
        <div className="container" style={{ textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', 
            fontWeight: '800', 
            color: '#0a0a0a', 
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            Ready to Find Your <span style={{ color: '#c41e3a' }}>Dream Car?</span>
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#737373', 
            marginBottom: '48px',
            lineHeight: 1.7
          }}>
            Visit our showroom or give us a call. We're here to help!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              padding: '20px 48px',
              background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
              color: '#fff',
              borderRadius: '60px',
              fontWeight: '600',
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 20px 40px rgba(196,30,58,0.3)'
            }}>
              Visit Us
            </Link>
            <a href="tel:03241344368" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '20px 48px',
              border: '2px solid #e5e5e5',
              borderRadius: '60px',
              color: '#0a0a0a',
              fontWeight: '600',
              fontSize: '1.1rem',
              textDecoration: 'none'
            }}>
              <Phone size={22} />
              0324-1344368
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
        }
        .upcoming-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 28px;
        }
        @media (max-width: 1000px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 700px) {
          .cars-grid {
            grid-template-columns: 1fr;
          }
          .upcoming-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
