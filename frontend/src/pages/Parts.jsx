import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Package, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';

const Parts = () => {
  const [parts, setParts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchParts();
    fetchCategories();
  }, [selectedCategory]);

  const fetchParts = async () => {
    try {
      let url = '/api/parts';
      const params = new URLSearchParams();
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      
      if (params.toString()) url += `?${params.toString()}`;
      
      const response = await axios.get(url);
      setParts(response.data);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/parts/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchParts();
  };

  const getAvailabilityBadge = (availability) => {
    const badges = {
      in_stock: { bg: '#dcfce7', color: '#166534', icon: CheckCircle, text: 'In Stock' },
      out_of_stock: { bg: '#fef2f2', color: '#dc2626', icon: XCircle, text: 'Out of Stock' },
      coming_soon: { bg: '#fef3c7', color: '#92400e', icon: Clock, text: 'Coming Soon' }
    };
    return badges[availability] || badges.in_stock;
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
              <Package size={18} color="#c41e3a" />
              <span style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
                Car Parts Catalog
              </span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '20px'
            }}>
              Quality <span style={{ color: '#c41e3a' }}>Car Parts</span>
            </h1>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8
            }}>
              Browse our collection of genuine and aftermarket parts for Japanese cars.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section style={{ padding: '40px 0', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Search */}
            <form onSubmit={handleSearch} style={{
              display: 'flex',
              gap: '12px',
              flex: '1',
              minWidth: '280px',
              maxWidth: '500px'
            }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={20} color="#a3a3a3" style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <input
                  type="text"
                  placeholder="Search parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 14px 14px 50px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    transition: 'border-color 0.3s'
                  }}
                />
              </div>
              <button type="submit" style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Search
              </button>
            </form>

            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Filter size={20} color="#737373" />
              <select
                value={selectedCategory}
                onChange={(e) => { setSelectedCategory(e.target.value); setLoading(true); }}
                style={{
                  padding: '14px 40px 14px 16px',
                  border: '2px solid #e5e5e5',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  background: '#fff',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center'
                }}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Parts Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
              <div className="spinner" />
            </div>
          ) : parts.length > 0 ? (
            <>
              <p style={{ marginBottom: '32px', color: '#737373' }}>
                Showing {parts.length} part{parts.length !== 1 ? 's' : ''}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '32px'
              }}>
                {parts.map((part, index) => {
                  const badge = getAvailabilityBadge(part.availability);
                  const BadgeIcon = badge.icon;
                  
                  return (
                    <div
                      key={part.id}
                      style={{
                        background: '#fff',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        transition: 'all 0.4s ease',
                        animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        position: 'relative',
                        height: '240px',
                        background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)'
                      }}>
                        <img
                          src={part.images?.[0] || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80'}
                          alt={part.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        
                        {/* Availability Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          background: badge.bg,
                          color: badge.color,
                          borderRadius: '50px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          <BadgeIcon size={14} />
                          {badge.text}
                        </div>

                        {/* Category Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          padding: '8px 16px',
                          background: 'rgba(0,0,0,0.7)',
                          color: '#fff',
                          borderRadius: '50px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {part.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '28px' }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          color: '#0a0a0a',
                          marginBottom: '12px',
                          lineHeight: 1.3
                        }}>
                          {part.name}
                        </h3>
                        
                        <p style={{
                          fontSize: '0.9rem',
                          color: '#737373',
                          lineHeight: 1.7,
                          marginBottom: '24px',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {part.description}
                        </p>

                        {/* Contact Button */}
                        
                        <a href="tel:03241344368"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '14px',
                            background: part.availability === 'in_stock' 
                              ? 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)'
                              : '#e5e5e5',
                            color: part.availability === 'in_stock' ? '#fff' : '#737373',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Phone size={18} />
                          {part.availability === 'in_stock' ? 'Inquire Now' : 'Contact for Updates'}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '100px 40px',
              background: '#fff',
              borderRadius: '24px'
            }}>
              <Package size={60} color="#d4d4d4" strokeWidth={1} />
              <h3 style={{ marginTop: '24px', marginBottom: '12px', color: '#0a0a0a' }}>
                No parts found
              </h3>
              <p style={{ color: '#737373', marginBottom: '24px' }}>
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => { setSelectedCategory(''); setSearchQuery(''); setLoading(true); fetchParts(); }}
                style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>
            Can't find what you're looking for?
          </h2>
          <p style={{ color: '#737373', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Contact us and we'll help you source the parts you need!
          </p>
          <a href="tel:03241344368"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 40px',
              background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
              color: '#fff',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 10px 30px rgba(196,30,58,0.3)'
            }}
          >
            <Phone size={20} />
            0324-1344368
          </a>
        </div>
      </section>
    </div>
  );
};

export default Parts;
