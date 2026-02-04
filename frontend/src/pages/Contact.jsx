import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, Check, User } from 'lucide-react';

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
  const accentColor = '#c41e3a';

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
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{
        padding: '80px 0',
        background: '#0a0a0a',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Red accent glow */}
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
            Get in Touch
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300',
            color: '#fff',
            marginBottom: '20px'
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            We'd love to hear from you! Visit our showroom or give us a call.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '80px'
          }}>
            {/* Contact Info */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '400',
                marginBottom: '16px'
              }}>
                Visit Our <span style={{ color: accentColor }}>Showroom</span>
              </h2>
              <p style={{
                color: '#737373',
                marginBottom: '40px',
                lineHeight: 1.7
              }}>
                Come see our collection in person! We're always happy to show you around 
                and help you find the perfect car.
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '28px'
              }}>
                {/* Muneeb Noor */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '24px',
                  background: '#fafafa',
                  border: `1px solid #f0f0f0`,
                  transition: 'border-color 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = accentColor}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#f0f0f0'}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    borderRadius: '50%'
                  }}>
                    <User size={22} color="#fff" />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#0a0a0a',
                      marginBottom: '4px'
                    }}>
                      Muneeb Noor
                    </h4>
                    <a 
                      href="tel:03241344368"
                      style={{ 
                        color: accentColor, 
                        fontSize: '1.1rem', 
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Phone size={16} />
                      0324-1344368
                    </a>
                  </div>
                </div>

                {/* Moiz Noor */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '24px',
                  background: '#fafafa',
                  border: `1px solid #f0f0f0`,
                  transition: 'border-color 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = accentColor}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#f0f0f0'}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    borderRadius: '50%'
                  }}>
                    <User size={22} color="#fff" />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#0a0a0a',
                      marginBottom: '4px'
                    }}>
                      Moiz Noor
                    </h4>
                    <a 
                      href="tel:03201377167"
                      style={{ 
                        color: accentColor, 
                        fontSize: '1.1rem', 
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Phone size={16} />
                      0320-1377167
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{
                  display: 'flex',
                  gap: '20px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={20} color={accentColor} />
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
                      Email
                    </h4>
                    <a 
                      href="mailto:noorautomobiles90@gmail.com"
                      style={{ color: '#0a0a0a', fontSize: '1rem' }}
                    >
                      noorautomobiles90@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div style={{
                  display: 'flex',
                  gap: '20px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={20} color={accentColor} />
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
                      Address
                    </h4>
                    <p style={{ color: '#525252', lineHeight: 1.6 }}>
                      Honda Palace, Opp. Taj Pump<br />
                      Jamshoro Road, Hyderabad
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div style={{
                  display: 'flex',
                  gap: '20px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Clock size={20} color={accentColor} />
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
                    <p style={{ color: '#525252', lineHeight: 1.8 }}>
                      Monday - Saturday: 9:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div style={{
                marginTop: '40px',
                height: '250px',
                background: '#f5f5f5',
                border: `2px solid ${accentColor}`,
                overflow: 'hidden'
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
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '400',
                marginBottom: '16px'
              }}>
                Send a <span style={{ color: accentColor }}>Message</span>
              </h2>
              <p style={{
                color: '#737373',
                marginBottom: '40px'
              }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <div style={{
                  padding: '60px',
                  background: '#fafafa',
                  textAlign: 'center',
                  border: `2px solid ${accentColor}`
                }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto 24px',
                    background: '#f0fdf4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={35} color="#22c55e" />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    marginBottom: '16px'
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: '#737373', marginBottom: '24px' }}>
                    Thank you for reaching out. We'll contact you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn"
                    style={{
                      background: 'transparent',
                      color: accentColor,
                      border: `1px solid ${accentColor}`,
                      padding: '12px 28px'
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{
                      padding: '16px',
                      background: '#fef2f2',
                      color: '#dc2626',
                      marginBottom: '24px',
                      fontSize: '0.9rem',
                      borderLeft: `4px solid ${accentColor}`
                    }}>
                      {error}
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      style={{ borderColor: '#e5e5e5' }}
                      onFocus={e => e.target.style.borderColor = accentColor}
                      onBlur={e => e.target.style.borderColor = '#e5e5e5'}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      style={{ borderColor: '#e5e5e5' }}
                      onFocus={e => e.target.style.borderColor = accentColor}
                      onBlur={e => e.target.style.borderColor = '#e5e5e5'}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0300 0000000"
                      style={{ borderColor: '#e5e5e5' }}
                      onFocus={e => e.target.style.borderColor = accentColor}
                      onBlur={e => e.target.style.borderColor = '#e5e5e5'}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-input form-textarea"
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we help you? Tell us about the car you're looking for..."
                      rows={5}
                      style={{ borderColor: '#e5e5e5' }}
                      onFocus={e => e.target.style.borderColor = accentColor}
                      onBlur={e => e.target.style.borderColor = '#e5e5e5'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn"
                    style={{
                      width: '100%',
                      padding: '18px',
                      background: accentColor,
                      color: '#fff',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      opacity: submitting ? 0.7 : 1,
                      cursor: submitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
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
