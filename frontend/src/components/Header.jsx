import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const isHomePage = location.pathname === '/';
  const shouldHaveSolidBg = isScrolled || !isHomePage || isMobileMenuOpen;
  
  const headerBg = shouldHaveSolidBg 
    ? 'rgba(255, 255, 255, 0.98)' 
    : 'transparent';
  const textColor = shouldHaveSolidBg ? '#0a0a0a' : '#ffffff';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Parts', path: '/parts' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: headerBg,
        backdropFilter: shouldHaveSolidBg ? 'blur(20px)' : 'none',
        borderBottom: shouldHaveSolidBg ? '1px solid rgba(0,0,0,0.08)' : 'none',
        transition: 'all 0.4s ease',
        boxShadow: shouldHaveSolidBg ? '0 2px 20px rgba(0,0,0,0.08)' : 'none'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px',
          padding: '0 20px'
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '45px',
              height: '52px',
              background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
              borderRadius: '8px 8px 50% 50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(196, 30, 58, 0.3)',
              flexShrink: 0
            }}>
              <span style={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: '800',
                letterSpacing: '-0.02em'
              }}>NA</span>
            </div>
            <div className="logo-text">
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: textColor,
                lineHeight: 1.2
              }}>
                Noor <span style={{ color: '#c41e3a' }}>Automobiles</span>
              </div>
              <div style={{
                fontSize: '9px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: textColor,
                opacity: 0.7
              }}>
                Japanese Car Importer
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '35px'
          }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: location.pathname === link.path ? '#c41e3a' : textColor,
                  position: 'relative',
                  padding: '8px 0',
                  textDecoration: 'none'
                }}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: '#c41e3a',
                    borderRadius: '10px'
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* Call Button - Desktop */}
          <a
            href="tel:03241344368"
            className="desktop-nav"
            style={{
              background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(196, 30, 58, 0.3)',
              textDecoration: 'none'
            }}
          >
            <Phone size={16} />
            Call Now
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle"
            style={{
              display: 'none',
              padding: '10px',
              color: isMobileMenuOpen ? '#0a0a0a' : textColor,
              background: isMobileMenuOpen 
                ? 'rgba(196, 30, 58, 0.1)' 
                : (shouldHaveSolidBg ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.15)'),
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: '#ffffff',
          zIndex: 999,
          paddingTop: '80px',
          overflowY: 'auto'
        }}>
          <div style={{ padding: '24px 20px' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: location.pathname === link.path ? '#c41e3a' : '#0a0a0a',
                    padding: '16px 18px',
                    background: location.pathname === link.path ? 'rgba(196,30,58,0.08)' : 'transparent',
                    borderRadius: '14px',
                    textDecoration: 'none'
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              <a
                href="https://wa.me/923241344368?text=Hello! I am interested in your cars."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '16px',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                WhatsApp Us
              </a>
              
             <a
                href="tel:03241344368"
                style={{
                  marginTop: '8px',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                  color: '#fff',
                  borderRadius: '14px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                Call: 0324-1344368
              </a>
            </nav>
            
            <div style={{
              marginTop: '24px',
              padding: '18px',
              background: '#f8f8f8',
              borderRadius: '14px'
            }}>
              <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#737373', marginBottom: '10px', textTransform: 'uppercase' }}>
                Business Hours
              </p>
              <p style={{ fontSize: '0.9rem', color: '#0a0a0a', marginBottom: '4px' }}>
                Mon - Thu, Sat - Sun: 11 AM - 10 PM
              </p>
              <p style={{ fontSize: '0.9rem', color: '#c41e3a', fontWeight: '600' }}>
                Friday: Closed
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-toggle { display: flex !important; align-items: center; justify-content: center; }
          .logo-text { display: none !important; }
        }
        @media (min-width: 500px) and (max-width: 900px) {
          .logo-text { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Header;
