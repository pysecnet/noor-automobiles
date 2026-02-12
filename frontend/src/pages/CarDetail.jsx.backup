import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, Gauge, Fuel, Settings, Palette, Car, Check, Phone, Mail, MessageSquare } from 'lucide-react';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/api/cars/${id}`);
        setCar(response.data);
        setInquiryForm(prev => ({
          ...prev,
          message: `I am interested in the ${response.data.title}. Please provide more details.`
        }));
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/api/inquiries', {
        ...inquiryForm,
        car_id: car.id
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!car) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px'
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '16px' }}>
          Vehicle Not Found
        </h2>
        <p style={{ color: '#737373', marginBottom: '24px' }}>
          The vehicle you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/collection" className="btn btn-primary">
          Browse Collection
        </Link>
      </div>
    );
  }

  const statusColors = {
    available: { bg: '#f5f5f5', text: '#404040' },
    reserved: { bg: '#262626', text: '#fff' },
    sold: { bg: '#0a0a0a', text: '#fff' }
  };
  const status = statusColors[car.status] || statusColors.available;

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Gauge, label: 'Mileage', value: car.mileage || 'N/A' },
    { icon: Settings, label: 'Transmission', value: car.transmission || 'N/A' },
    { icon: Fuel, label: 'Fuel Type', value: car.fuel_type || 'Petrol' },
    { icon: Palette, label: 'Color', value: car.color || 'N/A' },
    { icon: Car, label: 'Body Type', value: car.body_type || 'N/A' }
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Breadcrumb */}
      <div style={{
        padding: '24px 0',
        borderBottom: '1px solid #f5f5f5'
      }}>
        <div className="container">
          <Link 
            to="/collection"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              color: '#737373',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={e => e.target.style.color = '#0a0a0a'}
            onMouseLeave={e => e.target.style.color = '#737373'}
          >
            <ArrowLeft size={16} />
            Back to Collection
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '80px',
            alignItems: 'start'
          }}>
            {/* Image Gallery */}
            <div>
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                background: '#f5f5f5',
                overflow: 'hidden'
              }}>
                <img
                  src={car.images?.[0] || 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80'}
                  alt={car.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  padding: '8px 16px',
                  background: status.bg,
                  color: status.text,
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  {car.status}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {car.images?.length > 1 && (
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '12px'
                }}>
                  {car.images.map((img, i) => (
                    <div
                      key={i}
                      style={{
                        width: '80px',
                        height: '60px',
                        background: '#f5f5f5',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: i === 0 ? '2px solid #0a0a0a' : '2px solid transparent'
                      }}
                    >
                      <img
                        src={img}
                        alt={`${car.title} ${i + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#737373'
                }}>
                  {car.brand}
                </span>
                <span style={{ color: '#d4d4d4' }}>•</span>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#737373'
                }}>
                  {car.model}
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '400',
                color: '#0a0a0a',
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                {car.title}
              </h1>

              {/* Engine */}
              {car.engine && (
                <p style={{
                  fontSize: '1.1rem',
                  color: '#525252',
                  marginBottom: '32px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid #f5f5f5'
                }}>
                  {car.engine}
                </p>
              )}

              {/* Specs Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                marginBottom: '40px'
              }}>
                {specs.map((spec, i) => (
                  <div key={i}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <spec.icon size={16} color="#a3a3a3" />
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: '500',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#a3a3a3'
                      }}>
                        {spec.label}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: '#0a0a0a'
                    }}>
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              {car.description && (
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#737373',
                    marginBottom: '16px'
                  }}>
                    Description
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#525252',
                    lineHeight: 1.8
                  }}>
                    {car.description}
                  </p>
                </div>
              )}

              {/* Features */}
              {car.features?.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#737373',
                    marginBottom: '16px'
                  }}>
                    Features
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    {car.features.map((feature, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 16px',
                          background: '#fafafa'
                        }}
                      >
                        <Check size={16} color="#22c55e" />
                        <span style={{ fontSize: '0.9rem', color: '#525252' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div style={{
                padding: '32px',
                background: '#0a0a0a',
                color: '#fff'
              }}>
                <p style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '8px'
                }}>
                  Interested in this vehicle?
                </p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  marginBottom: '24px'
                }}>
                  Contact Us for Details
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => setShowInquiry(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 28px',
                      background: '#fff',
                      color: '#0a0a0a',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <MessageSquare size={16} />
                    Send Inquiry
                  </button>
                  <a
                    href="tel:+923001234567"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 28px',
                      background: 'transparent',
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: '#fff',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            animation: 'fadeInUp 0.4s ease'
          }}>
            <div style={{
              padding: '32px',
              borderBottom: '1px solid #f5f5f5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#737373',
                  marginBottom: '4px'
                }}>
                  Inquiry For
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  color: '#0a0a0a'
                }}>
                  {car.title}
                </h3>
              </div>
              <button
                onClick={() => setShowInquiry(false)}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e5e5e5',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: '#737373'
                }}
              >
                ×
              </button>
            </div>

            {submitted ? (
              <div style={{
                padding: '60px 32px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 24px',
                  background: '#f0fdf4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={30} color="#22c55e" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  marginBottom: '12px'
                }}>
                  Inquiry Sent!
                </h3>
                <p style={{ color: '#737373', marginBottom: '24px' }}>
                  We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setShowInquiry(false);
                    setSubmitted(false);
                  }}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} style={{ padding: '32px' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-input form-textarea"
                    required
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '16px',
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CarDetail;
