import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, X } from 'lucide-react';
import CarCard from '../components/CarCard';

const Collection = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    status: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCars();
    fetchBrands();
  }, [filters]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`/api/cars?${params.toString()}`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/api/cars/meta/brands');
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const clearFilters = () => {
    setFilters({ brand: '', status: '', search: '' });
  };

  const hasActiveFilters = filters.brand || filters.status || filters.search;

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{
        padding: '80px 0',
        background: '#0a0a0a',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{
            fontSize: '0.75rem',
            fontWeight: '500',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '20px'
          }}>
            Our Inventory
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '300',
            color: '#fff',
            marginBottom: '20px'
          }}>
            The Collection
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Browse our curated selection of premium Japanese imports
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{
        padding: '40px 0',
        borderBottom: '1px solid #f5f5f5',
        background: '#fff',
        position: 'sticky',
        top: '80px',
        zIndex: 100
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {/* Search */}
            <div style={{
              position: 'relative',
              flex: '1',
              maxWidth: '400px'
            }}>
              <Search 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#a3a3a3'
                }} 
              />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  border: '1px solid #e5e5e5',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            {/* Desktop Filters */}
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }} className="desktop-filters">
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                style={{
                  padding: '14px 40px 14px 16px',
                  border: '1px solid #e5e5e5',
                  fontSize: '0.85rem',
                  background: '#fff',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px'
                }}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                style={{
                  padding: '14px 40px 14px 16px',
                  border: '1px solid #e5e5e5',
                  fontSize: '0.85rem',
                  background: '#fff',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px'
                }}
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '14px 20px',
                    background: '#0a0a0a',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  <X size={14} />
                  Clear
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mobile-filter-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 20px',
                border: '1px solid #e5e5e5',
                background: '#fff',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <Filter size={16} />
              Filters
              {hasActiveFilters && (
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#0a0a0a'
                }} />
              )}
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              background: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }} className="mobile-filters">
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="form-input form-select"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="form-input form-select"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn btn-secondary">
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {/* Results Count */}
          <p style={{
            fontSize: '0.85rem',
            color: '#737373',
            marginBottom: '40px'
          }}>
            Showing {cars.length} vehicle{cars.length !== 1 ? 's' : ''}
          </p>

          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '80px 0'
            }}>
              <div className="spinner" />
            </div>
          ) : cars.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 0'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                color: '#0a0a0a',
                marginBottom: '16px'
              }}>
                No vehicles found
              </h3>
              <p style={{ color: '#737373', marginBottom: '24px' }}>
                Try adjusting your filters or search terms
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '30px'
            }}>
              {cars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .desktop-filters { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default Collection;
