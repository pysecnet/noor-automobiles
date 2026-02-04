import { Link } from 'react-router-dom';
import { Award, Shield, Users, Globe, Phone, Heart, Handshake } from 'lucide-react';

const About = () => {
  const accentColor = '#c41e3a';
  
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{
        padding: '80px 0',
        background: '#0a0a0a',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: accentColor,
          opacity: 0.1,
          borderRadius: '50%',
          filter: 'blur(100px)'
        }} />
        
        <div className="container" style={{ position: 'relative' }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: '20px'
          }}>
            Our Story
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300',
            color: '#fff',
            marginBottom: '20px'
          }}>
            About <span style={{ color: accentColor, fontStyle: 'italic' }}>Noor</span> Automobiles
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            By MM — Your trusted partner for Japanese car imports in Hyderabad
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '80px',
            alignItems: 'center'
          }}>
            <div>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: accentColor,
                marginBottom: '16px'
              }}>
                Family Business
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '400',
                marginBottom: '32px',
                lineHeight: 1.2
              }}>
                A Passion for<br />
                <span style={{ color: accentColor, fontStyle: 'italic' }}>Quality Cars</span>
              </h2>
              <p style={{
                fontSize: '1.05rem',
                color: '#525252',
                lineHeight: 1.9,
                marginBottom: '24px'
              }}>
                Welcome to Noor Automobiles! We're Muneeb and Moiz Noor — two brothers 
                who share a deep passion for Japanese automobiles. What started as a 
                hobby quickly grew into a business built on trust and quality.
              </p>
              <p style={{
                fontSize: '1.05rem',
                color: '#525252',
                lineHeight: 1.9,
                marginBottom: '24px'
              }}>
                Located at Honda Palace on Jamshoro Road, Hyderabad, we specialize in 
                importing the finest new and used cars directly from Japan. Every vehicle 
                we bring in is carefully selected and inspected to ensure it meets our 
                high standards.
              </p>
              <p style={{
                fontSize: '1.05rem',
                color: '#525252',
                lineHeight: 1.9
              }}>
                We believe in honest deals and building lasting relationships with our 
                customers. When you visit us, you're not just a buyer — you're family. 
                Come see us and let's find your perfect car together!
              </p>
              
              {/* Quick Contact */}
              <div style={{
                marginTop: '40px',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <a
                  href="tel:03241344368"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    background: accentColor,
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  <Phone size={18} />
                  Call Muneeb
                </a>
                <a
                  href="tel:03201377167"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    background: '#0a0a0a',
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  <Phone size={18} />
                  Call Moiz
                </a>
              </div>
            </div>
            
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
                alt="Noor Automobiles Showroom"
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  border: `4px solid ${accentColor}`
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                background: '#fff',
                padding: '32px',
                maxWidth: '280px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                border: `1px solid #f0f0f0`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Heart size={24} color={accentColor} />
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#737373'
                  }}>
                    Our Promise
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontStyle: 'italic',
                  color: '#0a0a0a',
                  lineHeight: 1.5
                }}>
                  "Honest deals, quality cars, and service you can trust."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        padding: '100px 0',
        background: '#fafafa'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <p style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: accentColor,
              marginBottom: '16px'
            }}>
              Why Choose Us
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400'
            }}>
              What Makes Us <span style={{ color: accentColor }}>Different</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {[
              {
                icon: Shield,
                title: 'Quality Assured',
                description: 'Every vehicle is thoroughly inspected. We only sell cars we\'d drive ourselves.'
              },
              {
                icon: Handshake,
                title: 'Honest Deals',
                description: 'No hidden fees, no surprises. What we say is what you get.'
              },
              {
                icon: Users,
                title: 'Personal Service',
                description: 'You deal directly with us — the owners. No middlemen, just personal attention.'
              },
              {
                icon: Globe,
                title: 'Direct Import',
                description: 'We source vehicles directly from Japan, ensuring authenticity and best prices.'
              }
            ].map((value, i) => (
              <div
                key={i}
                style={{
                  padding: '40px 32px',
                  background: '#fff',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.4s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '55px',
                  height: '55px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff5f5',
                  borderRadius: '50%'
                }}>
                  <value.icon size={24} color={accentColor} strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#737373',
                  lineHeight: 1.7
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <p style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: accentColor,
              marginBottom: '16px'
            }}>
              Our Services
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400'
            }}>
              We Deal in <span style={{ color: accentColor }}>New & Used</span> Cars
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                title: 'Japanese Imports',
                description: 'Premium vehicles imported directly from Japanese auctions. Toyota, Honda, Nissan, and more.',
                image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80'
              },
              {
                title: 'New Cars',
                description: 'Brand new vehicles with full warranty and documentation. Latest models available.',
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80'
              },
              {
                title: 'Used Cars',
                description: 'Quality pre-owned vehicles at fair prices. Each car inspected and certified by us.',
                image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80'
              }
            ].map((service, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <div style={{
                  height: '220px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '28px 0' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    fontWeight: '500',
                    marginBottom: '12px',
                    color: '#0a0a0a'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#737373',
                    lineHeight: 1.7
                  }}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: '#0a0a0a',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: accentColor,
          opacity: 0.1,
          borderRadius: '50%',
          filter: 'blur(100px)'
        }} />
        
        <div className="container" style={{ position: 'relative' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '300',
            color: '#fff',
            marginBottom: '24px',
            maxWidth: '600px',
            margin: '0 auto 24px'
          }}>
            Ready to Find Your <span style={{ color: accentColor, fontStyle: 'italic' }}>Perfect Car?</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '48px',
            maxWidth: '500px',
            margin: '0 auto 48px'
          }}>
            Visit us at Honda Palace, Jamshoro Road or give us a call. We're excited to meet you!
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/collection"
              className="btn"
              style={{
                background: accentColor,
                color: '#fff',
                padding: '18px 40px',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              View Collection
            </Link>
            <Link
              to="/contact"
              className="btn"
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '18px 40px',
                border: '1px solid rgba(255,255,255,0.3)',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
