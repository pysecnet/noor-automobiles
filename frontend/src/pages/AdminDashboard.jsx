import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Car, MessageSquare, Plus, Edit2, Trash2, 
  X, Check, LayoutDashboard, LogOut, Lock,
  Upload, Clock, Package, ChevronUp, ChevronDown, Menu
} from 'lucide-react';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [cars, setCars] = useState([]);
  const [parts, setParts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [showCarForm, setShowCarForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [carForm, setCarForm] = useState({
    title: '', brand: '', model: '', year: new Date().getFullYear(),
    mileage: '', engine: '', transmission: '', fuel_type: 'Petrol',
    color: '', body_type: '', description: '', features: '',
    images: [], videos: [], status: 'available', featured: false
  });

  const [showPartForm, setShowPartForm] = useState(false);
  const [editingPart, setEditingPart] = useState(null);
  const [partForm, setPartForm] = useState({
    name: '', category: '', description: '', images: [],
    availability: 'in_stock', featured: false
  });
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const partFileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    
    try {
      const response = await axios.post('/api/auth/login', loginForm);
      if (response.data.user.role !== 'admin') {
        setLoginError('Access denied. Admin only.');
        setLoginLoading(false);
        return;
      }
      
      localStorage.setItem('adminToken', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setIsLoggedIn(true);
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setIsLoggedIn(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, carsRes, partsRes, inquiriesRes] = await Promise.all([
        axios.get('/api/inquiries/stats/dashboard'),
        axios.get('/api/cars'),
        axios.get('/api/parts'),
        axios.get('/api/inquiries')
      ]);
      setStats(statsRes.data);
      setCars(carsRes.data);
      setParts(partsRes.data);
      setInquiries(inquiriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  // REORDER FUNCTIONS
  const moveCarUp = async (index) => {
    if (index === 0) return;
    const newCars = [...cars];
    [newCars[index - 1], newCars[index]] = [newCars[index], newCars[index - 1]];
    setCars(newCars);
    
    try {
      await axios.put('/api/cars/reorder', { carIds: newCars.map(c => c.id) });
    } catch (error) {
      console.error('Error reordering:', error);
      fetchData();
    }
  };

  const moveCarDown = async (index) => {
    if (index === cars.length - 1) return;
    const newCars = [...cars];
    [newCars[index], newCars[index + 1]] = [newCars[index + 1], newCars[index]];
    setCars(newCars);
    
    try {
      await axios.put('/api/cars/reorder', { carIds: newCars.map(c => c.id) });
    } catch (error) {
      console.error('Error reordering:', error);
      fetchData();
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.post('/api/cars/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });

      const uploadedFiles = response.data.files;
      const newImages = [...carForm.images];
      const newVideos = [...carForm.videos];

      uploadedFiles.forEach(file => {
        if (file.type === 'video') {
          newVideos.push(file.url);
        } else {
          newImages.push(file.url);
        }
      });

      setCarForm({ ...carForm, images: newImages, videos: newVideos });
      alert('Files uploaded!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePartFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await axios.post('/api/parts/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const newImages = [...partForm.images, ...response.data.files.map(f => f.url)];
      setPartForm({ ...partForm, images: newImages });
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (partFileInputRef.current) partFileInputRef.current.value = '';
    }
  };

  const removeMedia = (type, index) => {
    if (type === 'image') {
      const newImages = [...carForm.images];
      newImages.splice(index, 1);
      setCarForm({ ...carForm, images: newImages });
    } else {
      const newVideos = [...carForm.videos];
      newVideos.splice(index, 1);
      setCarForm({ ...carForm, videos: newVideos });
    }
  };

  const removePartImage = (index) => {
    const newImages = [...partForm.images];
    newImages.splice(index, 1);
    setPartForm({ ...partForm, images: newImages });
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...carForm,
        year: parseInt(carForm.year),
        features: typeof carForm.features === 'string' 
          ? carForm.features.split(',').map(f => f.trim()).filter(f => f)
          : carForm.features
      };

      if (editingCar) {
        await axios.put(`/api/cars/${editingCar.id}`, payload);
      } else {
        await axios.post('/api/cars', payload);
      }
      
      setShowCarForm(false);
      setEditingCar(null);
      resetCarForm();
      fetchData();
    } catch (error) {
      alert('Failed to save car');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!confirm('Delete this car?')) return;
    try {
      await axios.delete(`/api/cars/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditCar = (car) => {
    setEditingCar(car);
    setCarForm({
      title: car.title,
      brand: car.brand,
      model: car.model,
      year: car.year,
      mileage: car.mileage || '',
      engine: car.engine || '',
      transmission: car.transmission || '',
      fuel_type: car.fuel_type || 'Petrol',
      color: car.color || '',
      body_type: car.body_type || '',
      description: car.description || '',
      features: car.features?.join(', ') || '',
      images: car.images || [],
      videos: car.videos || [],
      status: car.status,
      featured: car.featured === 1
    });
    setShowCarForm(true);
  };

  const resetCarForm = () => {
    setCarForm({
      title: '', brand: '', model: '', year: new Date().getFullYear(),
      mileage: '', engine: '', transmission: '', fuel_type: 'Petrol',
      color: '', body_type: '', description: '', features: '',
      images: [], videos: [], status: 'available', featured: false
    });
  };

  const handlePartSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPart) {
        await axios.put(`/api/parts/${editingPart.id}`, partForm);
      } else {
        await axios.post('/api/parts', partForm);
      }
      setShowPartForm(false);
      setEditingPart(null);
      resetPartForm();
      fetchData();
    } catch (error) {
      alert('Failed to save part');
    }
  };

  const handleDeletePart = async (id) => {
    if (!confirm('Delete this part?')) return;
    try {
      await axios.delete(`/api/parts/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditPart = (part) => {
    setEditingPart(part);
    setPartForm({
      name: part.name,
      category: part.category,
      description: part.description || '',
      images: part.images || [],
      availability: part.availability,
      featured: part.featured === 1
    });
    setShowPartForm(true);
  };

  const resetPartForm = () => {
    setPartForm({
      name: '', category: '', description: '', images: [],
      availability: 'in_stock', featured: false
    });
  };

  const handleInquiryStatus = async (id, status) => {
    try {
      await axios.put(`/api/inquiries/${id}`, { status });
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
        padding: '20px'
      }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <Lock size={28} color="#fff" />
          </div>
          
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
            Admin Panel
          </h1>
          <p style={{ textAlign: 'center', color: '#737373', marginBottom: '28px', fontSize: '0.9rem' }}>
            Sign in to manage inventory
          </p>

          {loginError && (
            <div style={{
              padding: '12px',
              background: '#fef2f2',
              color: '#dc2626',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '0.85rem',
              textAlign: 'center'
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#737373', marginBottom: '6px' }}>Email</label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="admin@noor.com"
                style={{ width: '100%', padding: '14px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }}
              />
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#737373', marginBottom: '6px' }}>Password</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                style={{ width: '100%', padding: '14px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }}
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loginLoading ? 'not-allowed' : 'pointer',
                opacity: loginLoading ? 0.7 : 1
              }}
            >
              {loginLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading && !stats) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <div className="spinner" />
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cars', label: 'Cars', icon: Car },
    { id: 'parts', label: 'Parts', icon: Package },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Mobile Header */}
      <div className="mobile-admin-header">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          padding: '10px',
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: '10px',
          cursor: 'pointer'
        }}>
          <Menu size={24} />
        </button>
        <h1 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Admin Panel</h1>
        <button onClick={handleLogout} style={{
          padding: '10px',
          background: '#fef2f2',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          color: '#dc2626'
        }}>
          <LogOut size={20} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '28px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>
            Noor <span style={{ color: '#c41e3a' }}>Admin</span>
          </h2>
        </div>

        <nav style={{ padding: '20px', flex: 1 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                background: activeTab === tab.id ? 'rgba(196,30,58,0.2)' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.6)',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '8px',
                textAlign: 'left'
              }}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 18px',
              background: 'rgba(220,38,38,0.1)',
              border: 'none',
              borderRadius: '12px',
              color: '#f87171',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '30px' }}>Dashboard</h1>
            <div className="stats-grid">
              {[
                { label: 'Total Cars', value: stats?.totalCars || 0, color: '#c41e3a' },
                { label: 'Available', value: stats?.availableCars || 0, color: '#22c55e' },
                { label: 'Reserved', value: stats?.reservedCars || 0, color: '#f59e0b' },
                { label: 'Inquiries', value: stats?.totalInquiries || 0, color: '#3b82f6' }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: '#fff',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#737373', marginBottom: '8px', textTransform: 'uppercase' }}>{stat.label}</p>
                  <p style={{ fontSize: '2rem', fontWeight: '700', color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Manage Cars</h1>
              <button
                onClick={() => { setEditingCar(null); resetCarForm(); setShowCarForm(true); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Plus size={18} />
                Add Car
              </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden' }}>
              {/* Mobile Card View */}
              <div className="cars-list-mobile">
                {cars.map((car, index) => (
                  <div key={car.id} style={{
                    padding: '16px',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button
                        onClick={() => moveCarUp(index)}
                        disabled={index === 0}
                        style={{
                          padding: '6px',
                          background: index === 0 ? '#f5f5f5' : '#e5e5e5',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: index === 0 ? 'not-allowed' : 'pointer',
                          opacity: index === 0 ? 0.4 : 1
                        }}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => moveCarDown(index)}
                        disabled={index === cars.length - 1}
                        style={{
                          padding: '6px',
                          background: index === cars.length - 1 ? '#f5f5f5' : '#e5e5e5',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: index === cars.length - 1 ? 'not-allowed' : 'pointer',
                          opacity: index === cars.length - 1 ? 0.4 : 1
                        }}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                    <img
                      src={car.images?.[0] || 'https://via.placeholder.com/80x60'}
                      alt={car.title}
                      style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{car.title}</p>
                      <p style={{ fontSize: '0.8rem', color: '#737373' }}>{car.brand} • {car.year}</p>
                      <span style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        background: car.status === 'available' ? '#dcfce7' : car.status === 'reserved' ? '#fef3c7' : '#f3f4f6',
                        color: car.status === 'available' ? '#166534' : car.status === 'reserved' ? '#92400e' : '#374151'
                      }}>
                        {car.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleEditCar(car)} style={{
                        padding: '8px', background: '#f5f5f5', border: 'none', borderRadius: '8px', cursor: 'pointer'
                      }}><Edit2 size={16} /></button>
                      <button onClick={() => handleDeleteCar(car.id)} style={{
                        padding: '8px', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#dc2626'
                      }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <table className="cars-table-desktop">
                <thead>
                  <tr style={{ background: '#fafafa' }}>
                    <th style={{ padding: '14px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#737373', width: '80px' }}>Order</th>
                    <th style={{ padding: '14px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#737373' }}>Vehicle</th>
                    <th style={{ padding: '14px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#737373' }}>Brand</th>
                    <th style={{ padding: '14px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#737373' }}>Year</th>
                    <th style={{ padding: '14px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#737373' }}>Status</th>
                    <th style={{ padding: '14px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#737373' }}>Featured</th>
                    <th style={{ padding: '14px', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#737373' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car, index) => (
                    <tr key={car.id} style={{ borderTop: '1px solid #f5f5f5' }}>
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <button
                            onClick={() => moveCarUp(index)}
                            disabled={index === 0}
                            style={{
                              padding: '6px',
                              background: index === 0 ? '#f5f5f5' : '#e5e5e5',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: index === 0 ? 'not-allowed' : 'pointer',
                              opacity: index === 0 ? 0.4 : 1
                            }}
                          >
                            <ChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => moveCarDown(index)}
                            disabled={index === cars.length - 1}
                            style={{
                              padding: '6px',
                              background: index === cars.length - 1 ? '#f5f5f5' : '#e5e5e5',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: index === cars.length - 1 ? 'not-allowed' : 'pointer',
                              opacity: index === cars.length - 1 ? 0.4 : 1
                            }}
                          >
                            <ChevronDown size={16} />
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img src={car.images?.[0] || 'https://via.placeholder.com/60x40'} alt={car.title}
                            style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
                          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{car.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px', color: '#525252' }}>{car.brand}</td>
                      <td style={{ padding: '14px', color: '#525252' }}>{car.year}</td>
                      <td style={{ padding: '14px' }}>
                        <span style={{
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          background: car.status === 'available' ? '#dcfce7' : car.status === 'reserved' ? '#fef3c7' : car.status === 'upcoming' ? '#ede9fe' : '#f3f4f6',
                          color: car.status === 'available' ? '#166534' : car.status === 'reserved' ? '#92400e' : car.status === 'upcoming' ? '#7c3aed' : '#374151'
                        }}>
                          {car.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px' }}>
                        {car.featured === 1 ? <Check size={18} color="#22c55e" /> : <X size={18} color="#d4d4d4" />}
                      </td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleEditCar(car)} style={{
                            padding: '8px', background: '#f5f5f5', border: 'none', borderRadius: '8px', cursor: 'pointer'
                          }}><Edit2 size={16} /></button>
                          <button onClick={() => handleDeleteCar(car.id)} style={{
                            padding: '8px', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#dc2626'
                          }}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Parts Tab */}
        {activeTab === 'parts' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Manage Parts</h1>
              <button
                onClick={() => { setEditingPart(null); resetPartForm(); setShowPartForm(true); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Plus size={18} />
                Add Part
              </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '20px' }}>
              {parts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#737373', padding: '40px' }}>No parts yet</p>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  {parts.map(part => (
                    <div key={part.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px',
                      background: '#fafafa',
                      borderRadius: '12px'
                    }}>
                      <img src={part.images?.[0] || 'https://via.placeholder.com/60x45'} alt={part.name}
                        style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600' }}>{part.name}</p>
                        <p style={{ fontSize: '0.85rem', color: '#737373' }}>{part.category}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEditPart(part)} style={{
                          padding: '8px', background: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer'
                        }}><Edit2 size={16} /></button>
                        <button onClick={() => handleDeletePart(part.id)} style={{
                          padding: '8px', background: '#fef2f2', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#dc2626'
                        }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>Inquiries</h1>
            <div style={{ background: '#fff', borderRadius: '16px' }}>
              {inquiries.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#737373', padding: '60px' }}>No inquiries yet</p>
              ) : (
                <div>
                  {inquiries.map(inquiry => (
                    <div key={inquiry.id} style={{
                      padding: '20px',
                      borderBottom: '1px solid #f5f5f5'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <p style={{ fontWeight: '600', marginBottom: '4px' }}>{inquiry.name}</p>
                          <p style={{ fontSize: '0.85rem', color: '#737373' }}>{inquiry.email}</p>
                          {inquiry.phone && <p style={{ fontSize: '0.85rem', color: '#737373' }}>{inquiry.phone}</p>}
                        </div>
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleInquiryStatus(inquiry.id, e.target.value)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #e5e5e5',
                            fontSize: '0.85rem'
                          }}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <p style={{ marginTop: '12px', color: '#525252', fontSize: '0.9rem', lineHeight: 1.6 }}>{inquiry.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Car Form Modal */}
      {showCarForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: '20px'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'sticky',
              top: 0,
              background: '#fff',
              zIndex: 10
            }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </h2>
              <button onClick={() => setShowCarForm(false)} style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e5e5e5',
                borderRadius: '10px',
                background: '#fff',
                cursor: 'pointer'
              }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCarSubmit} style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Title *</label>
                  <input type="text" required value={carForm.title}
                    onChange={(e) => setCarForm({ ...carForm, title: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Brand *</label>
                    <input type="text" required value={carForm.brand}
                      onChange={(e) => setCarForm({ ...carForm, brand: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Model *</label>
                    <input type="text" required value={carForm.model}
                      onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Year *</label>
                    <input type="number" required value={carForm.year}
                      onChange={(e) => setCarForm({ ...carForm, year: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Mileage</label>
                    <input type="text" value={carForm.mileage}
                      onChange={(e) => setCarForm({ ...carForm, mileage: e.target.value })}
                      placeholder="e.g., 50,000 km"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Engine</label>
                  <input type="text" value={carForm.engine}
                    onChange={(e) => setCarForm({ ...carForm, engine: e.target.value })}
                    placeholder="e.g., 1.5L Turbo"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Transmission</label>
                    <select value={carForm.transmission}
                      onChange={(e) => setCarForm({ ...carForm, transmission: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }}>
                      <option value="">Select</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="CVT">CVT</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Fuel Type</label>
                    <select value={carForm.fuel_type}
                      onChange={(e) => setCarForm({ ...carForm, fuel_type: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }}>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Color</label>
                    <input type="text" value={carForm.color}
                      onChange={(e) => setCarForm({ ...carForm, color: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Body Type</label>
                    <select value={carForm.body_type}
                      onChange={(e) => setCarForm({ ...carForm, body_type: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }}>
                      <option value="">Select</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Wagon">Wagon</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Description</label>
                  <textarea value={carForm.description}
                    onChange={(e) => setCarForm({ ...carForm, description: e.target.value })}
                    rows={3}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem', resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Features (comma-separated)</label>
                  <input type="text" value={carForm.features}
                    onChange={(e) => setCarForm({ ...carForm, features: e.target.value })}
                    placeholder="AC, Sunroof, Navigation"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                </div>

                {/* Image Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Images & Videos</label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed #e5e5e5',
                      borderRadius: '12px',
                      padding: '24px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: '#fafafa'
                    }}
                  >
                    <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    {uploading ? (
                      <p>Uploading... {uploadProgress}%</p>
                    ) : (
                      <>
                        <Upload size={32} color="#c41e3a" style={{ marginBottom: '8px' }} />
                        <p style={{ fontWeight: '600' }}>Click to upload</p>
                        <p style={{ fontSize: '0.8rem', color: '#737373' }}>Images & Videos</p>
                      </>
                    )}
                  </div>

                  {carForm.images.length > 0 && (
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {carForm.images.map((img, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                          <img src={img} alt="" style={{ width: '70px', height: '55px', objectFit: 'cover', borderRadius: '8px' }} />
                          <button type="button" onClick={() => removeMedia('image', i)} style={{
                            position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px',
                            background: '#dc2626', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '12px'
                          }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Status</label>
                    <select value={carForm.status}
                      onChange={(e) => setCarForm({ ...carForm, status: e.target.value })}
                      style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }}>
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="sold">Sold</option>
                      <option value="upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Featured</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={carForm.featured}
                        onChange={(e) => setCarForm({ ...carForm, featured: e.target.checked })}
                        style={{ width: '18px', height: '18px' }} />
                      <span>Show on homepage</span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="button" onClick={() => setShowCarForm(false)} style={{
                  flex: 1, padding: '14px', background: '#f5f5f5', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
                }}>Cancel</button>
                <button type="submit" style={{
                  flex: 1, padding: '14px', background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
                }}>{editingCar ? 'Update' : 'Add Car'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Part Form Modal */}
      {showPartForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: '20px'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                {editingPart ? 'Edit Part' : 'Add New Part'}
              </h2>
              <button onClick={() => setShowPartForm(false)} style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e5e5e5',
                borderRadius: '10px',
                background: '#fff',
                cursor: 'pointer'
              }}><X size={20} /></button>
            </div>

            <form onSubmit={handlePartSubmit} style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Name *</label>
                  <input type="text" required value={partForm.name}
                    onChange={(e) => setPartForm({ ...partForm, name: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Category *</label>
                  <select required value={partForm.category}
                    onChange={(e) => setPartForm({ ...partForm, category: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }}>
                    <option value="">Select</option>
                    <option value="Engine Parts">Engine Parts</option>
                    <option value="Body Parts">Body Parts</option>
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Description</label>
                  <textarea value={partForm.description}
                    onChange={(e) => setPartForm({ ...partForm, description: e.target.value })}
                    rows={3}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem', resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Images</label>
                  <div
                    onClick={() => partFileInputRef.current?.click()}
                    style={{
                      border: '2px dashed #e5e5e5',
                      borderRadius: '12px',
                      padding: '24px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: '#fafafa'
                    }}
                  >
                    <input ref={partFileInputRef} type="file" multiple accept="image/*" onChange={handlePartFileUpload} style={{ display: 'none' }} />
                    <Upload size={28} color="#c41e3a" style={{ marginBottom: '8px' }} />
                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Upload images</p>
                  </div>

                  {partForm.images.length > 0 && (
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {partForm.images.map((img, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                          <img src={img} alt="" style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                          <button type="button" onClick={() => removePartImage(i)} style={{
                            position: 'absolute', top: '-6px', right: '-6px', width: '18px', height: '18px',
                            background: '#dc2626', color: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer', fontSize: '11px'
                          }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Availability</label>
                  <select value={partForm.availability}
                    onChange={(e) => setPartForm({ ...partForm, availability: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '10px', fontSize: '1rem' }}>
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="button" onClick={() => setShowPartForm(false)} style={{
                  flex: 1, padding: '14px', background: '#f5f5f5', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
                }}>Cancel</button>
                <button type="submit" style={{
                  flex: 1, padding: '14px', background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
                }}>{editingPart ? 'Update' : 'Add Part'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .mobile-admin-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #fff;
          border-bottom: 1px solid #e5e5e5;
          padding: 0 16px;
          align-items: center;
          justify-content: space-between;
          z-index: 100;
        }
        .admin-sidebar {
          width: 260px;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          z-index: 999;
        }
        .admin-main {
          flex: 1;
          margin-left: 260px;
          padding: 30px;
          min-height: 100vh;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .cars-list-mobile {
          display: none;
        }
        .cars-table-desktop {
          width: 100%;
          border-collapse: collapse;
        }
        
        @media (max-width: 1100px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 900px) {
          .mobile-admin-header {
            display: flex;
          }
          .admin-sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-main {
            margin-left: 0;
            padding: 80px 16px 30px;
          }
          .cars-list-mobile {
            display: block;
          }
          .cars-table-desktop {
            display: none;
          }
        }
        
        @media (max-width: 500px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
