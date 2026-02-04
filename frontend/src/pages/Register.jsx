import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await register(form.name, form.email, form.password, form.phone);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex'
    }}>
      {/* Left Side - Image */}
      <div style={{
        flex: 1,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }} className="register-image-side">
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5
        }} />
        <div style={{
          position: 'relative',
          textAlign: 'center',
          padding: '40px',
          color: '#fff'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: '300',
            marginBottom: '16px'
          }}>
            Join Our<br />
            <span style={{ fontStyle: 'italic' }}>Exclusive</span><br />
            Community
          </h2>
          <p style={{
            fontSize: '1rem',
            opacity: 0.8,
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            Get notified about new arrivals and exclusive offers
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '48px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#fff'
            }}>
              N
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              color: '#0a0a0a'
            }}>
              NOOR Automobile
            </span>
          </Link>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: '400',
            marginBottom: '12px'
          }}>
            Create Account
          </h1>
          <p style={{
            color: '#737373',
            marginBottom: '40px'
          }}>
            Join us to stay updated on our collection
          </p>

          {error && (
            <div style={{
              padding: '16px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              marginBottom: '24px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+92 300 0000000"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingRight: '48px' }}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#a3a3a3'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                className="form-input"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                marginTop: '8px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '32px',
            color: '#737373',
            fontSize: '0.9rem'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#0a0a0a',
              fontWeight: '500'
            }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .register-image-side { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Register;
