import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowRight, User } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      color: '#fff',
      paddingTop: '100px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '60px',
          paddingBottom: '60px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '28px' }}>
              <Logo size={50} textColor="#ffffff" />
            </div>
            <p style={{
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.8,
              marginBottom: '24px'
            }}>
              Your trusted source for premium Japanese imports. 
              We deal in new & used cars with quality you can trust.
            </p>
            
            <div style={{
              display: 'inline-block',
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
              borderRadius: '50px',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              New & Used Cars Available
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '28px',
              color: '#c41e3a'
            }}>
              Quick Links
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Our Collection', path: '/collection' },
                { name: 'Car Parts', path: '/parts' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.95rem',
                    color: 'rgba(255,255,255,0.6)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ArrowRight size={14} color="#c41e3a" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '28px',
              color: '#c41e3a'
            }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <a href="tel:03241344368" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '14px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>Muneeb Noor</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>0324-1344368</div>
                </div>
              </a>

              <a href="tel:03201377167" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '14px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>Moiz Noor</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>0320-1377167</div>
                </div>
              </a>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.9rem'
              }}>
                <MapPin size={20} color="#c41e3a" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Honda Palace, Opp. Taj Pump, Jamshoro Road, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '28px',
              color: '#c41e3a'
            }}>
              Business Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Mon - Thu</span>
                <span style={{ fontWeight: '600' }}>11:00 AM - 10:00 PM</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Friday</span>
                <span style={{ fontWeight: '600', color: '#c41e3a' }}>Closed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Sat - Sun</span>
                <span style={{ fontWeight: '600' }}>11:00 AM - 10:00 PM</span>
              </div>
            </div>

            
              <a href="mailto:noorautomobiles90@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '28px',
                padding: '16px 24px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '14px',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              <Mail size={18} color="#c41e3a" />
              <span>noorautomobiles90@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '28px 0',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} Noor Automobiles. All rights reserved.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
            Japanese Car Importer • Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
