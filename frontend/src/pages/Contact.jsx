import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Check, User, Send } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await axios.post('/api/inquiries', form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

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
    <Phone size={18} color="#c41e3a" />
    <span style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
    Get in Touch
    </span>
    </div>

    <h1 style={{
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: '#fff',
          marginBottom: '20px'
    }}>
    Contact <span style={{ color: '#c41e3a' }}>Us</span>
    </h1>

    <p style={{
      fontSize: '1.1rem',
      color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.8
    }}>
    We'd love to hear from you! Visit our showroom or give us a call.
    </p>
    </div>
    </div>
    </section>

    {/* Contact Content */}
    <section style={{ padding: '80px 0' }}>
    <div className="container">
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '60px'
    }}>
    {/* Contact Info */}
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
    Visit Us
    </div>

    <h2 style={{
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#0a0a0a'
    }}>
    Our <span style={{ color: '#c41e3a' }}>Showroom</span>
    </h2>

    <p style={{
      color: '#737373',
      marginBottom: '40px',
      lineHeight: 1.8,
      fontSize: '1rem'
    }}>
    Come see our collection in person! We're always happy to show you around
    and help you find the perfect car.
    </p>

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
    {/* Muneeb Noor */}
    <div style={{
      background: '#fff',
      padding: '28px',
      borderRadius: '20px',
      border: '2px solid #f0f0f0',
      transition: 'all 0.3s ease',
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = '#c41e3a';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(196,30,58,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = '#f0f0f0';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
    <div style={{
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          borderRadius: '16px'
    }}>
    <User size={26} color="#fff" />
    </div>
    <div>
    <h4 style={{
      fontSize: '1.15rem',
      fontWeight: '700',
      color: '#0a0a0a',
      marginBottom: '6px'
    }}>
    Muneeb Noor
    </h4>
    <a href="tel:03241344368" style={{
      color: '#c41e3a',
      fontSize: '1.05rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
    <Phone size={16} />
    0324-1344368
    </a>
    </div>
    </div>

    {/* Moiz Noor */}
    <div style={{
      background: '#fff',
      padding: '28px',
      borderRadius: '20px',
      border: '2px solid #f0f0f0',
      transition: 'all 0.3s ease',
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = '#c41e3a';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(196,30,58,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = '#f0f0f0';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
    <div style={{
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          borderRadius: '16px'
    }}>
    <User size={26} color="#fff" />
    </div>
    <div>
    <h4 style={{
      fontSize: '1.15rem',
      fontWeight: '700',
      color: '#0a0a0a',
      marginBottom: '6px'
    }}>
    Moiz Noor
    </h4>
    <a href="tel:03201377167" style={{
      color: '#c41e3a',
      fontSize: '1.05rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
    <Phone size={16} />
    0320-1377167
    </a>
    </div>
    </div>

    {/* Email */}
    <div style={{
      background: '#fff',
      padding: '28px',
      borderRadius: '20px',
      border: '2px solid #f0f0f0',
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    }}>
    <div style={{
      width: '60px',
      height: '60px',
      background: '#fff5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      borderRadius: '16px'
    }}>
    <Mail size={24} color="#c41e3a" />
    </div>
    <div>
    <h4 style={{
      fontSize: '0.75rem',
      fontWeight: '600',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#737373',
      marginBottom: '8px'
    }}>
    Email Us
    </h4>
    <a href="mailto:noorautomobiles90@gmail.com" style={{
      color: '#0a0a0a',
      fontSize: '1.05rem',
      fontWeight: '500'
    }}>
    noorautomobiles90@gmail.com
    </a>
    </div>
    </div>

    {/* Location */}
    <div style={{
      background: '#fff',
      padding: '28px',
      borderRadius: '20px',
      border: '2px solid #f0f0f0',
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    }}>
    <div style={{
      width: '60px',
      height: '60px',
      background: '#fff5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      borderRadius: '16px'
    }}>
    <MapPin size={24} color="#c41e3a" />
    </div>
    <div>
    <h4 style={{
      fontSize: '0.75rem',
      fontWeight: '600',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#737373',
      marginBottom: '8px'
    }}>
    Location
    </h4>
    <p style={{
      color: '#0a0a0a',
      fontSize: '1.05rem',
      lineHeight: 1.6,
      fontWeight: '500'
    }}>
    Honda Palace, Opp. Taj Pump, Jamshoro Road<br />
    Hyderabad, Sindh
    </p>
    </div>
    </div>

    {/* Hours */}
    <div style={{
      background: '#fff',
      padding: '28px',
      borderRadius: '20px',
      border: '2px solid #f0f0f0',
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    }}>
    <div style={{
      width: '60px',
      height: '60px',
      background: '#fff5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      borderRadius: '16px'
    }}>
    <Clock size={24} color="#c41e3a" />
    </div>
    <div>
    <h4 style={{
      fontSize: '0.75rem',
      fontWeight: '600',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#737373',
      marginBottom: '8px'
    }}>
    Business Hours
    </h4>
    <p style={{
      color: '#0a0a0a',
      fontSize: '1.05rem',
      lineHeight: 1.8,
      fontWeight: '500'
    }}>
    Mon - Sat: 9:00 AM - 8:00 PM<br />
    Sunday: 10:00 AM - 6:00 PM
    </p>
    </div>
    </div>
    </div>

    {/* Map */}
    <div style={{
      marginTop: '40px',
      height: '300px',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '2px solid #f0f0f0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
    }}>
    <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14426.074730044!2d68.3662!3d25.3960!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c79e0c8c40001%3A0x1234567890abcdef!2sJamshoro%20Road%2C%20Hyderabad!5e0!3m2!1sen!2spk!4v1707500000000!5m2!1sen!2spk"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    />
    </div>
    </div>

    {/* Contact Form */}
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
    Send a Message
    </div>

    <h2 style={{
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '700',
          marginBottom: '16px',
          color: '#0a0a0a'
    }}>
    We're Here to <span style={{ color: '#c41e3a' }}>Help</span>
    </h2>

    <p style={{
      color: '#737373',
      marginBottom: '40px',
      lineHeight: 1.8,
      fontSize: '1rem'
    }}>
    Fill out the form below and we'll get back to you as soon as possible.
    </p>

    {submitted ? (
      <div style={{
        padding: '60px 40px',
        background: '#fff',
        textAlign: 'center',
        borderRadius: '24px',
        border: '2px solid #c41e3a'
      }}>
      <div style={{
        width: '80px',
        height: '80px',
        margin: '0 auto 24px',
        background: '#f0fdf4',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Check size={40} color="#22c55e" strokeWidth={3} />
      </div>
      <h3 style={{
        fontSize: '1.8rem',
        fontWeight: '700',
        color: '#0a0a0a',
        marginBottom: '16px'
      }}>
      Message Sent!
      </h3>
      <p style={{
        color: '#737373',
        marginBottom: '32px',
        fontSize: '1rem',
        lineHeight: 1.7
      }}>
      Thank you for reaching out. We'll contact you soon.
      </p>
      <button
      onClick={() => setSubmitted(false)}
      style={{
        padding: '14px 32px',
        background: 'transparent',
        color: '#c41e3a',
        border: '2px solid #c41e3a',
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#c41e3a';
        e.currentTarget.style.color = '#fff';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = '#c41e3a';
      }}
      >
      Send Another Message
      </button>
      </div>
    ) : (
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
      }}>
      {error && (
        <div style={{
          padding: '16px 20px',
          background: '#fef2f2',
          color: '#dc2626',
          marginBottom: '24px',
          fontSize: '0.9rem',
          borderRadius: '12px',
          borderLeft: '4px solid #c41e3a'
        }}>
        {error}
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#0a0a0a',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
      Full Name *
      </label>
      <input
      type="text"
      required
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      placeholder="Your name"
      style={{
        width: '100%',
        padding: '14px 18px',
        border: '2px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '1rem',
        transition: 'border-color 0.3s'
      }}
      onFocus={e => e.target.style.borderColor = '#c41e3a'}
      onBlur={e => e.target.style.borderColor = '#e5e5e5'}
      />
      </div>

      <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#0a0a0a',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
      Email Address *
      </label>
      <input
      type="email"
      required
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      placeholder="your@email.com"
      style={{
        width: '100%',
        padding: '14px 18px',
        border: '2px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '1rem',
        transition: 'border-color 0.3s'
      }}
      onFocus={e => e.target.style.borderColor = '#c41e3a'}
      onBlur={e => e.target.style.borderColor = '#e5e5e5'}
      />
      </div>

      <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#0a0a0a',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
      Phone Number
      </label>
      <input
      type="tel"
      value={form.phone}
      onChange={(e) => setForm({ ...form, phone: e.target.value })}
      placeholder="0300 0000000"
      style={{
        width: '100%',
        padding: '14px 18px',
        border: '2px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '1rem',
        transition: 'border-color 0.3s'
      }}
      onFocus={e => e.target.style.borderColor = '#c41e3a'}
      onBlur={e => e.target.style.borderColor = '#e5e5e5'}
      />
      </div>

      <div style={{ marginBottom: '28px' }}>
      <label style={{
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#0a0a0a',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
      Message *
      </label>
      <textarea
      required
      value={form.message}
      onChange={(e) => setForm({ ...form, message: e.target.value })}
      placeholder="Tell us about the car you're looking for..."
      rows={5}
      style={{
        width: '100%',
        padding: '14px 18px',
        border: '2px solid #e5e5e5',
        borderRadius: '12px',
        fontSize: '1rem',
        resize: 'vertical',
        transition: 'border-color 0.3s',
        fontFamily: 'inherit'
      }}
      onFocus={e => e.target.style.borderColor = '#c41e3a'}
      onBlur={e => e.target.style.borderColor = '#e5e5e5'}
      />
      </div>

      <button
      type="submit"
      disabled={submitting}
      style={{
        width: '100%',
        padding: '18px',
        background: submitting
        ? '#e5e5e5'
        : 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
         color: submitting ? '#737373' : '#fff',
         border: 'none',
         borderRadius: '12px',
         fontSize: '0.95rem',
         fontWeight: '600',
         textTransform: 'uppercase',
         letterSpacing: '0.05em',
         cursor: submitting ? 'not-allowed' : 'pointer',
         transition: 'all 0.3s ease',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         gap: '10px'
      }}
      >
      {submitting ? (
        'Sending...'
      ) : (
        <>
        <Send size={18} />
        Send Message
        </>
      )}
      </button>
      </form>
    )}
    </div>
    </div>
    </div>
    </section>

    <style>{`
      @media (max-width: 768px) {
        .container > div {
          grid-template-columns: 1fr !important;
          gap: 60px !important;
        }
      }
      `}</style>
      </div>
  );
};

export default Contact;
