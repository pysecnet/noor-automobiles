import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
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
      {/* Left Side - Form */}
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
            Welcome Back
          </h1>
          <p style={{
            color: '#737373',
            marginBottom: '40px'
          }}>
            Sign in to your account to continue
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
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  style={{ paddingRight: '48px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '32px',
            color: '#737373',
            fontSize: '0.9rem'
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#0a0a0a',
              fontWeight: '500'
            }}>
              Create one
            </Link>
          </p>

          {/* Admin hint */}
          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: '#fafafa',
            fontSize: '0.8rem',
            color: '#737373'
          }}>
            <strong style={{ color: '#0a0a0a' }}>Demo Admin Access:</strong><br />
            Email: admin@noorautomobile.pk<br />
            Password: admin123
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div style={{
        flex: 1,
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }} className="login-image-side">
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80)',
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
            Exceptional<br />
            <span style={{ fontStyle: 'italic' }}>Japanese</span><br />
            Automobiles
          </h2>
          <p style={{
            fontSize: '1rem',
            opacity: 0.8,
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            Curating the finest JDM legends for discerning collectors
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-image-side { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;
