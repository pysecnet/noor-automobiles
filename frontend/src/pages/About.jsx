import { Award, Shield, Users, Globe, Phone, Target, Eye, Heart, Handshake } from 'lucide-react';

const About = () => {
  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', background: '#fafafa' }}>
    {/* Hero Section */}
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          position: 'relative',
          overflow: 'hidden'
    }}>
    <div style={{
      position: 'absolute',
      top: '20%',
      right: '10%',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(196,30,58,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
    }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
    <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 24px',
      background: 'rgba(196,30,58,0.15)',
          borderRadius: '50px',
          marginBottom: '24px'
    }}>
    <Heart size={18} color="#c41e3a" />
    <span style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
    Our Story
    </span>
    </div>

    <h1 style={{
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: '#fff',
          marginBottom: '20px'
    }}>
    About <span style={{ color: '#c41e3a' }}>Noor Automobiles</span>
    </h1>

    <p style={{
      fontSize: '1.1rem',
      color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.8
    }}>
    Your trusted partner for Japanese car imports in Hyderabad
    </p>
    </div>
    </div>
    </section>

    {/* Story Section */}
    <section style={{ padding: '80px 0', background: '#fff' }}>
    <div className="container">
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '60px',
          alignItems: 'center'
    }}>
    <div>
    <div style={{
      display: 'inline-block',
      padding: '8px 16px',
      background: '#fff5f5',
      color: '#c41e3a',
      borderRadius: '50px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '20px'
    }}>
    Family Business
    </div>

    <h2 style={{
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '700',
          marginBottom: '24px',
          lineHeight: 1.2,
          color: '#0a0a0a'
    }}>
    A Passion for <span style={{ color: '#c41e3a' }}>Quality Cars</span>
    </h2>

    <p style={{
      fontSize: '1rem',
      color: '#737373',
      lineHeight: 1.8,
      marginBottom: '20px'
    }}>
    Welcome to Noor Automobiles! We're Muneeb and Moiz Noor — two brothers
    who share a deep passion for Japanese automobiles. What started as a
    hobby quickly grew into a business built on trust and quality.
    </p>

    <p style={{
      fontSize: '1rem',
      color: '#737373',
      lineHeight: 1.8,
      marginBottom: '20px'
    }}>
    Located at Honda Palace on Jamshoro Road, Hyderabad, we specialize in
    importing the finest new and used cars directly from Japan. Every vehicle
    we bring in is carefully selected and inspected to ensure it meets our
    high standards.
    </p>

    <p style={{
      fontSize: '1rem',
      color: '#737373',
      lineHeight: 1.8,
      marginBottom: '32px'
    }}>
    We believe in honest deals and building lasting relationships with our
    customers. When you visit us, you're not just a buyer — you're family.
    </p>

    {/* Contact Buttons */}
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <a href="tel:03241344368" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '14px 28px',
      background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
          color: '#fff',
          borderRadius: '12px',
          fontSize: '0.9rem',
          fontWeight: '600',
          transition: 'all 0.3s ease'
    }}>
    <Phone size={18} />
    Call Muneeb
    </a>
    <a href="tel:03201377167" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '14px 28px',
      background: '#0a0a0a',
      color: '#fff',
      borderRadius: '12px',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    }}>
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
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
    }}
    />

    {/* Floating Card */}
    <div style={{
      position: 'absolute',
      bottom: '-30px',
      left: '-30px',
      background: '#fff',
      padding: '32px',
      maxWidth: '280px',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          border: '1px solid #f0f0f0'
    }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
    <div style={{
      width: '40px',
      height: '40px',
      background: '#fff5f5',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
    <Heart size={20} color="#c41e3a" />
    </div>
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
      fontSize: '1.1rem',
      fontWeight: '600',
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

    {/* Mission & Vision Section */}
    <section style={{ padding: '80px 0', background: '#fafafa' }}>
    <div className="container">
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
    <div style={{
      display: 'inline-block',
      padding: '8px 16px',
      background: '#fff5f5',
      color: '#c41e3a',
      borderRadius: '50px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '20px'
    }}>
    Our Foundation
    </div>
    <h2 style={{
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '700',
          color: '#0a0a0a'
    }}>
    Mission & <span style={{ color: '#c41e3a' }}>Vision</span>
    </h2>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '40px'
    }}>
    {/* Mission */}
    <div style={{
      background: '#fff',
      padding: '50px 40px',
      borderRadius: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'all 0.4s ease',
          border: '2px solid transparent'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)';
      e.currentTarget.style.borderColor = '#c41e3a';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
      e.currentTarget.style.borderColor = 'transparent';
    }}>
    <div style={{
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px'
    }}>
    <Target size={32} color="#fff" strokeWidth={2} />
    </div>

    <h3 style={{
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#0a0a0a',
      marginBottom: '20px'
    }}>
    Our Mission
    </h3>

    <p style={{
      fontSize: '1.05rem',
      color: '#737373',
      lineHeight: 1.8
    }}>
    To provide our customers with premium Japanese vehicles at fair prices, backed by transparent
    business practices and exceptional service. We're committed to making car ownership dreams
    accessible while maintaining the highest standards of quality and integrity in every transaction.
    </p>
    </div>

    {/* Vision */}
    <div style={{
      background: '#fff',
      padding: '50px 40px',
      borderRadius: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'all 0.4s ease',
          border: '2px solid transparent'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)';
      e.currentTarget.style.borderColor = '#c41e3a';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
      e.currentTarget.style.borderColor = 'transparent';
    }}>
    <div style={{
      width: '70px',
      height: '70px',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px'
    }}>
    <Eye size={32} color="#fff" strokeWidth={2} />
    </div>

    <h3 style={{
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#0a0a0a',
      marginBottom: '20px'
    }}>
    Our Vision
    </h3>

    <p style={{
      fontSize: '1.05rem',
      color: '#737373',
      lineHeight: 1.8
    }}>
    To become Hyderabad's most trusted name in Japanese automobile imports, known for our
    unwavering commitment to quality, customer satisfaction, and ethical business practices.
    We envision a future where every customer drives away not just with a car, but with
    confidence and peace of mind.
    </p>
    </div>
    </div>
    </div>
    </section>

    {/* Values Section */}
    <section style={{ padding: '80px 0', background: '#fff' }}>
    <div className="container">
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
    <div style={{
      display: 'inline-block',
      padding: '8px 16px',
      background: '#fff5f5',
      color: '#c41e3a',
      borderRadius: '50px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '20px'
    }}>
    Why Choose Us
    </div>
    <h2 style={{
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '700',
          color: '#0a0a0a'
    }}>
    What Makes Us <span style={{ color: '#c41e3a' }}>Different</span>
    </h2>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
    }}>
    {[
      {
        icon: Award,
        title: 'Premium Quality',
        description: 'Every vehicle is handpicked and thoroughly inspected to meet our strict quality standards.'
      },
      {
        icon: Shield,
        title: 'Trust & Transparency',
        description: 'We believe in honest pricing with no hidden costs. What you see is what you get.'
      },
      {
        icon: Users,
        title: 'Family Values',
        description: 'We treat our customers like family, building relationships that last beyond the sale.'
      },
      {
        icon: Globe,
        title: 'Direct Import',
        description: 'We source vehicles directly from Japan, ensuring authenticity and competitive prices.'
      },
      {
        icon: Handshake,
        title: 'Expert Guidance',
        description: 'Our team provides personalized advice to help you find the perfect vehicle for your needs.'
      },
      {
        icon: Heart,
        title: 'After-Sale Support',
        description: 'Our commitment doesn\'t end at the sale. We\'re here to support you every step of the way.'
      }
    ].map((value, i) => {
      const Icon = value.icon;
      return (
        <div
        key={i}
        style={{
          background: '#fff',
          padding: '40px 32px',
          borderRadius: '24px',
          border: '2px solid #f0f0f0',
          transition: 'all 0.4s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#c41e3a';
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(196,30,58,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#f0f0f0';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
        <div style={{
          width: '60px',
          height: '60px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff5f5',
          borderRadius: '16px'
        }}>
        <Icon size={28} color="#c41e3a" strokeWidth={1.5} />
        </div>

        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#0a0a0a',
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
      );
    })}
    </div>
    </div>
    </section>

    {/* CTA Section */}
    <section style={{ padding: '80px 0', background: '#fff' }}>
    <div className="container" style={{ textAlign: 'center' }}>
    <h2 style={{
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#0a0a0a'
    }}>
    Ready to Find Your <span style={{ color: '#c41e3a' }}>Perfect Car?</span>
    </h2>
    <p style={{
      color: '#737373',
      marginBottom: '32px',
      fontSize: '1.1rem',
      maxWidth: '600px',
      margin: '0 auto 32px'
    }}>
    Visit us at Honda Palace, Jamshoro Road or give us a call. We're excited to meet you!
    </p>
    <a href="tel:03241344368" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '18px 40px',
      background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
          color: '#fff',
          borderRadius: '50px',
          fontSize: '1rem',
          fontWeight: '600',
          boxShadow: '0 10px 30px rgba(196,30,58,0.3)',
          transition: 'all 0.3s ease'
    }}>
    <Phone size={20} />
    0324-1344368
    </a>
    </div>
    </section>

    <style>{`
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
