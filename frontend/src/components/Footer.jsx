import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowRight, User } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/noor_.automobiles/',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/people/Noor-Automobiles/61584172907834/',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@noor_.automobiles',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
    }
  ];

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
          <div>
            <div style={{ marginBottom: '28px' }}>
              <Logo size={50} textColor="#ffffff" />
            </div>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '24px' }}>
              Your trusted source for premium Japanese imports. We deal in new and used cars with quality you can trust.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              {socialLinks.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name}
                  style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  {social.icon}
                </a>
              ))}
            </div>
            <div style={{ display: 'inline-block', padding: '14px 24px', background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600' }}>
              New and Used Cars Available
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '28px', color: '#c41e3a' }}>Quick Links</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[{ name: 'Home', path: '/' }, { name: 'Our Collection', path: '/collection' }, { name: 'Car Parts', path: '/parts' }, { name: 'About Us', path: '/about' }, { name: 'Contact', path: '/contact' }].map((link) => (
                <Link key={link.path} to={link.path} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)' }}>
                  <ArrowRight size={14} color="#c41e3a" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '28px', color: '#c41e3a' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <a href="tel:03241344368" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px' }}>
                <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>Muneeb Noor</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>0324-1344368</div>
                </div>
              </a>
              <a href="tel:03201377167" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>Moiz Noor</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>0320-1377167</div>
                </div>
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                <MapPin size={20} color="#c41e3a" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Honda Palace, Opp. Taj Pump, Jamshoro Road, Hyderabad</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '28px', color: '#c41e3a' }}>Business Hours</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Mon - Thu</span>
                <span style={{ fontWeight: '600' }}>11:00 AM - 10:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Friday</span>
                <span style={{ fontWeight: '600', color: '#c41e3a' }}>Closed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Sat - Sun</span>
                <span style={{ fontWeight: '600' }}>11:00 AM - 10:00 PM</span>
              </div>
            </div>
            <a href="mailto:noorautomobiles90@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '28px', padding: '16px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
              <Mail size={18} color="#c41e3a" />
              <span>noorautomobiles90@gmail.com</span>
            </a>
            <div style={{ marginTop: '28px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {socialLinks.map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name}
                    style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 0', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} Noor Automobiles. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialLinks.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {social.icon}
                </a>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>Japanese Car Importer - Hyderabad</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
