import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, X, Car } from 'lucide-react';
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

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchCars();
  };

  const hasActiveFilters = filters.brand || filters.status || filters.search;

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
    <Car size={18} color="#c41e3a" />
    <span style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
    Our Inventory
    </span>
    </div>

    <h1 style={{
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          color: '#fff',
          marginBottom: '20px'
    }}>
    The <span style={{ color: '#c41e3a' }}>Collection</span>
    </h1>

    <p style={{
      fontSize: '1.1rem',
      color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.8
    }}>
    Browse our curated selection of premium Japanese imports
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
    placeholder="Search vehicles..."
    value={filters.search}
    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
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

    {/* Filters */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
    <Filter size={20} color="#737373" />

    <select
    value={filters.brand}
    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
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
        gap: '8px',
        padding: '14px 20px',
        background: '#0a0a0a',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
      onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
      >
      <X size={16} />
      Clear
      </button>
    )}
    </div>
    </div>
    </div>
    </section>

    {/* Results */}
    <section style={{ padding: '60px 0' }}>
    <div className="container">
    {loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
      <div className="spinner" />
      </div>
    ) : cars.length > 0 ? (
      <>
      <p style={{ marginBottom: '32px', color: '#737373' }}>
      Showing {cars.length} vehicle{cars.length !== 1 ? 's' : ''}
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                           gap: '32px'
      }}>
      {cars.map((car, index) => (
        <CarCard key={car.id} car={car} index={index} />
      ))}
      </div>
      </>
    ) : (
      <div style={{
        textAlign: 'center',
        padding: '100px 40px',
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
      }}>
      <Car size={60} color="#d4d4d4" strokeWidth={1} />
      <h3 style={{ marginTop: '24px', marginBottom: '12px', color: '#0a0a0a', fontSize: '1.5rem', fontWeight: '700' }}>
      No vehicles found
      </h3>
      <p style={{ color: '#737373', marginBottom: '24px' }}>
      Try adjusting your filters or search terms
      </p>
      {hasActiveFilters && (
        <button
        onClick={clearFilters}
        style={{
          padding: '14px 32px',
          background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(196,30,58,0.3)',
                            transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(196,30,58,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(196,30,58,0.3)';
        }}
        >
        Clear All Filters
        </button>
      )}
      </div>
    )}
    </div>
    </section>

    {/* Animation Keyframes */}
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
        form {
          flex-direction: column;
          width: 100%;
          max-width: 100% !important;
        }

        form > div {
          width: 100%;
        }

        form button {
          width: 100%;
        }
      }
      `}</style>
      </div>
  );
};

export default Collection;
