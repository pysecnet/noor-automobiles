import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { getImage } from '../config/images';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
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

  const isHomePage = location.pathname === '/';
  const headerBg = isScrolled || !isHomePage 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'transparent';
  const textColor = isScrolled || !isHomePage ? '#0a0a0a' : '#ffffff';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    {name: 'Parts', path: '/parts'},
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const logoSrc = getImage('logo');

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: headerBg,
      backdropFilter: isScrolled || !isHomePage ? 'blur(20px)' : 'none',
      borderBottom: isScrolled || !isHomePage ? '1px solid rgba(0,0,0,0.05)' : 'none',
      transition: 'all 0.4s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '90px'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          {logoSrc && !logoError ? (
            <img 
              src={logoSrc} 
              alt="Noor Automobiles"
              onError={() => setLogoError(true)}
              style={{
                height: '55px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          ) : (
            <>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(196, 30, 58, 0.3)'
              }}>
                <span style={{
                  color: '#fff',
                  fontSize: '1.6rem',
                  fontWeight: '700'
                }}>N</span>
              </div>
              <div>
                <div style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: textColor,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}>
                  Noor <span style={{ color: '#c41e3a' }}>Automobiles</span>
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: textColor,
                  opacity: 0.7
                }}>
                  Japanese Car Importer
                </div>
              </div>
            </>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px'
        }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontSize: '0.9rem',
                fontWeight: '500',
                color: location.pathname === link.path ? '#c41e3a' : textColor,
                position: 'relative',
                padding: '8px 0'
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
                  background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                  borderRadius: '10px'
                }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Call Button */}
        <a
          href="tel:03241344368"
          className="btn desktop-nav"
          style={{
            background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 25px rgba(196, 30, 58, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          <Phone size={18} />
          Call Now
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-toggle"
          style={{
            display: 'none',
            padding: '10px',
            color: textColor,
            background: isScrolled || !isHomePage ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
            borderRadius: '12px'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '90px',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          padding: '40px 24px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: location.pathname === link.path ? '#c41e3a' : '#0a0a0a',
                  padding: '16px 20px',
                  background: location.pathname === link.path ? 'rgba(196,30,58,0.08)' : 'transparent',
                  borderRadius: '16px'
                }}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:03241344368"
              style={{
                marginTop: '20px',
                padding: '18px',
                background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                color: '#fff',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: '600',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <Phone size={20} />
              Call: 0324-1344368
            </a>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
