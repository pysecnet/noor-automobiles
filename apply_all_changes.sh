#!/bin/bash

echo "🚀 Starting Noor Automobiles Update Script..."

# ============================================
# 1. CREATE OPTIMIZED IMAGE COMPONENT
# ============================================
echo "📸 Creating OptimizedImage component..."

cat > frontend/src/components/OptimizedImage.jsx << 'EOF'
import { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  width = 800, 
  style = {}, 
  className = '',
  onClick,
  priority = false 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getOptimizedSrc = (url, w) => {
    if (!url) return '';
    
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', `/upload/w_${w},q_auto,f_auto/`);
    }
    
    if (url.includes('unsplash.com')) {
      return `${url.split('?')[0]}?w=${w}&q=80&auto=format`;
    }
    
    return url;
  };

  const optimizedSrc = getOptimizedSrc(src, width);

  return (
    <div 
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        ...style 
      }}
      className={className}
      onClick={onClick}
    >
      {!loaded && !error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            border: '3px solid #e5e5e5',
            borderTopColor: '#c41e3a',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
        </div>
      )}

      {error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#f8f8f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '0.8rem'
        }}>
          No Image
        </div>
      )}

      <img
        src={optimizedSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
EOF

# ============================================
# 2. UPDATE CARCARD COMPONENT
# ============================================
echo "🚗 Updating CarCard component..."

cat > frontend/src/components/CarCard.jsx << 'EOF'
import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Settings, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const CarCard = ({ car, index = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const statusColors = {
    available: { bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', text: '#166534' },
    reserved: { bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', text: '#92400e' },
    sold: { bg: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', text: '#374151' },
    upcoming: { bg: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)', text: '#7c3aed' }
  };

  const status = statusColors[car.status] || statusColors.available;

  const getOptimizedImage = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80';
    
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/w_600,h_400,c_fill,q_auto,f_auto/');
    }
    
    if (url.includes('unsplash.com')) {
      const base = url.split('?')[0];
      return base + '?w=600&h=400&fit=crop&q=80&auto=format';
    }
    
    return url;
  };

  const optimizedImageUrl = getOptimizedImage(car.images?.[0]);

  return (
    <Link
      to={'/car/' + car.id}
      style={{
        display: 'block',
        background: '#fff',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: 'fadeInUp 0.7s ease ' + (index * 0.1) + 's both'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
      }}
    >
      <div style={{
        position: 'relative',
        height: '280px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)'
      }}>
        {!imageLoaded && !imageError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
            zIndex: 1
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e5e5',
              borderTopColor: '#c41e3a',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
          </div>
        )}

        {imageError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5',
            color: '#999',
            fontSize: '0.9rem'
          }}>
            No Image Available
          </div>
        )}

        <img
          src={optimizedImageUrl}
          alt={car.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s ease, opacity 0.3s ease',
            opacity: imageLoaded ? 1 : 0
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          padding: '8px 16px',
          background: status.bg,
          color: status.text,
          fontSize: '0.7rem',
          fontWeight: '700',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderRadius: '50px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          zIndex: 2
        }}>
          {car.status}
        </div>

        {car.featured === 1 && (
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '50px',
            boxShadow: '0 4px 15px rgba(196,30,58,0.4)',
            zIndex: 2
          }}>
            Featured
          </div>
        )}

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          color: '#fff',
          zIndex: 2
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            opacity: 0.95,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {car.brand} - {car.year}
          </span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: '700',
          color: '#0a0a0a',
          marginBottom: '16px',
          lineHeight: 1.3
        }}>
          {car.title}
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0'
        }}>
          {[
            { icon: Gauge, label: car.mileage || 'N/A' },
            { icon: Settings, label: car.transmission || 'Auto' },
            { icon: Fuel, label: car.fuel_type || 'Petrol' },
            { icon: Calendar, label: car.year }
          ].map((spec, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5e8 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <spec.icon size={15} color="#c41e3a" />
              </div>
              <span style={{
                fontSize: '0.8rem',
                color: '#525252',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {spec.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#c41e3a'
          }}>
            View Details
          </span>
          <div style={{
            width: '38px',
            height: '38px',
            background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease'
          }}>
            <ArrowRight size={16} color="#fff" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Link>
  );
};

export default CarCard;
EOF

# ============================================
# 3. CREATE SCROLL TO TOP COMPONENT
# ============================================
echo "⬆️ Creating ScrollToTop component..."

cat > frontend/src/components/ScrollToTop.jsx << 'EOF'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
EOF

# ============================================
# 4. UPDATE APP.JSX WITH SCROLL TO TOP
# ============================================
echo "📱 Updating App.jsx..."

cat > frontend/src/App.jsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Collection from './pages/Collection';
import CarDetail from './pages/CarDetail';
import Parts from './pages/Parts';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            
            <Route path="*" element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/car/:id" element={<CarDetail />} />
                    <Route path="/parts" element={<Parts />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
EOF

# ============================================
# 5. UPDATE BACKEND - ADD REORDER ROUTE
# ============================================
echo "🔧 Updating backend cars route..."

cat > backend/routes/cars.js << 'EOF'
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

// Upload files endpoint
router.post('/upload', authenticateToken, isAdmin, upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const fileUrls = req.files.map(file => {
      const isVideo = file.mimetype.startsWith('video/');
      return {
        url: file.path,
        type: isVideo ? 'video' : 'image',
        publicId: file.filename,
        originalName: file.originalname
      };
    });

    res.json({ message: 'Files uploaded successfully', files: fileUrls });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading files' });
  }
});

// Reorder cars (admin only) - MUST BE BEFORE /:id route
router.put('/reorder', authenticateToken, isAdmin, async (req, res) => {
  const { carIds } = req.body;
  
  if (!carIds || !Array.isArray(carIds)) {
    return res.status(400).json({ message: 'carIds array is required' });
  }

  try {
    for (let i = 0; i < carIds.length; i++) {
      await query.run('UPDATE cars SET display_order = ? WHERE id = ?', [i, carIds[i]]);
    }
    
    res.json({ message: 'Cars reordered successfully' });
  } catch (error) {
    console.error('Error reordering cars:', error);
    res.status(500).json({ message: 'Server error reordering cars' });
  }
});

// Get all cars (public)
router.get('/', async (req, res) => {
  try {
    const { brand, status, featured, search, upcoming } = req.query;
    
    let sql = 'SELECT * FROM cars WHERE 1=1';
    const params = [];

    if (brand) {
      sql += ' AND brand = ?';
      params.push(brand);
    }

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (featured === 'true') {
      sql += ' AND featured = 1';
    }

    if (upcoming === 'true') {
      sql += ' AND status = ?';
      params.push('upcoming');
    }

    if (search) {
      sql += ' AND (title LIKE ? OR brand LIKE ? OR model LIKE ? OR description LIKE ?)';
      const searchTerm = '%' + search + '%';
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    sql += ' ORDER BY featured DESC, display_order ASC, created_at DESC';

    const cars = await query.all(sql, params);
    
    const parsedCars = cars.map(car => ({
      ...car,
      features: JSON.parse(car.features || '[]'),
      images: JSON.parse(car.images || '[]'),
      videos: JSON.parse(car.videos || '[]')
    }));

    res.json(parsedCars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Server error fetching cars' });
  }
});

// Get single car (public)
router.get('/:id', async (req, res) => {
  try {
    const car = await query.get('SELECT * FROM cars WHERE id = ?', [req.params.id]);
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.features = JSON.parse(car.features || '[]');
    car.images = JSON.parse(car.images || '[]');
    car.videos = JSON.parse(car.videos || '[]');

    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Server error fetching car' });
  }
});

// Get all brands (public)
router.get('/meta/brands', async (req, res) => {
  try {
    const brands = await query.all('SELECT DISTINCT brand FROM cars ORDER BY brand');
    res.json(brands.map(b => b.brand));
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ message: 'Server error fetching brands' });
  }
});

// Add new car (admin only)
router.post('/', authenticateToken, isAdmin, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('model').trim().notEmpty().withMessage('Model is required'),
  body('year').isInt({ min: 1900, max: 2030 }).withMessage('Valid year is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title, brand, model, year, mileage, engine, transmission,
    fuel_type, color, body_type, description, features, images, videos, status, featured
  } = req.body;

  try {
    const result = await query.run(
      'INSERT INTO cars (title, brand, model, year, mileage, engine, transmission, fuel_type, color, body_type, description, features, images, videos, status, featured, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title, brand, model, year, mileage || null, engine || null, transmission || null,
        fuel_type || null, color || null, body_type || null, description || null,
        JSON.stringify(features || []), JSON.stringify(images || []), JSON.stringify(videos || []),
        status || 'available', featured ? 1 : 0, Date.now()
      ]
    );

    const newCar = await query.get('SELECT * FROM cars WHERE id = ?', [result.lastInsertRowid]);
    newCar.features = JSON.parse(newCar.features || '[]');
    newCar.images = JSON.parse(newCar.images || '[]');
    newCar.videos = JSON.parse(newCar.videos || '[]');

    res.status(201).json({ message: 'Car added successfully', car: newCar });
  } catch (error) {
    console.error('Error adding car:', error);
    res.status(500).json({ message: 'Server error adding car' });
  }
});

// Update car (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  const carId = req.params.id;
  
  const existingCar = await query.get('SELECT id FROM cars WHERE id = ?', [carId]);
  if (!existingCar) {
    return res.status(404).json({ message: 'Car not found' });
  }

  const {
    title, brand, model, year, mileage, engine, transmission,
    fuel_type, color, body_type, description, features, images, videos, status, featured
  } = req.body;

  try {
    const updates = [];
    const params = [];
    
    if (title !== undefined) { updates.push('title = ?'); params.push(title); }
    if (brand !== undefined) { updates.push('brand = ?'); params.push(brand); }
    if (model !== undefined) { updates.push('model = ?'); params.push(model); }
    if (year !== undefined) { updates.push('year = ?'); params.push(year); }
    if (mileage !== undefined) { updates.push('mileage = ?'); params.push(mileage); }
    if (engine !== undefined) { updates.push('engine = ?'); params.push(engine); }
    if (transmission !== undefined) { updates.push('transmission = ?'); params.push(transmission); }
    if (fuel_type !== undefined) { updates.push('fuel_type = ?'); params.push(fuel_type); }
    if (color !== undefined) { updates.push('color = ?'); params.push(color); }
    if (body_type !== undefined) { updates.push('body_type = ?'); params.push(body_type); }
    if (description !== undefined) { updates.push('description = ?'); params.push(description); }
    if (features !== undefined) { updates.push('features = ?'); params.push(JSON.stringify(features)); }
    if (images !== undefined) { updates.push('images = ?'); params.push(JSON.stringify(images)); }
    if (videos !== undefined) { updates.push('videos = ?'); params.push(JSON.stringify(videos)); }
    if (status !== undefined) { updates.push('status = ?'); params.push(status); }
    if (featured !== undefined) { updates.push('featured = ?'); params.push(featured ? 1 : 0); }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(carId);
    
    await query.run('UPDATE cars SET ' + updates.join(', ') + ' WHERE id = ?', params);

    const updatedCar = await query.get('SELECT * FROM cars WHERE id = ?', [carId]);
    updatedCar.features = JSON.parse(updatedCar.features || '[]');
    updatedCar.images = JSON.parse(updatedCar.images || '[]');
    updatedCar.videos = JSON.parse(updatedCar.videos || '[]');

    res.json({ message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Server error updating car' });
  }
});

// Delete car (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await query.get('SELECT images, videos FROM cars WHERE id = ?', [carId]);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await query.run('DELETE FROM cars WHERE id = ?', [carId]);
    
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Server error deleting car' });
  }
});

module.exports = router;
EOF

# ============================================
# 6. UPDATE CLOUDINARY CONFIG
# ============================================
echo "☁️ Updating Cloudinary config..."

cat > backend/config/cloudinary.js << 'EOF'
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'noor-automobiles/cars';
    let resourceType = 'image';
    
    if (file.fieldname === 'parts') {
      folder = 'noor-automobiles/parts';
    }
    
    if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
      return {
        folder: folder,
        resource_type: resourceType,
        allowed_formats: ['mp4', 'webm', 'mov']
      };
    }
    
    return {
      folder: folder,
      resource_type: resourceType,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    };
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }
});

module.exports = { cloudinary, upload };
EOF

# ============================================
# 7. GIT PUSH FRONTEND
# ============================================
echo "📤 Pushing frontend changes..."
cd frontend
git add .
git commit -m "Add image optimization, scroll to top, improve performance"
git push origin main

# ============================================
# 8. GIT PUSH BACKEND
# ============================================
echo "📤 Pushing backend changes..."
cd ../backend
git add .
git commit -m "Add car reorder endpoint, optimize cloudinary"
git push origin main

cd ..

echo ""
echo "✅ All code changes applied and pushed!"
echo ""
echo "⚠️  IMPORTANT: You still need to run the Turso database command manually:"
echo ""
echo "   turso db shell noor-automobiles"
echo ""
echo "   Then paste these SQL commands:"
echo "   ALTER TABLE cars ADD COLUMN display_order INTEGER DEFAULT 0;"
echo "   UPDATE cars SET display_order = id;"
echo "   .quit"
echo ""
echo "🎉 Done! Wait for Vercel and Render to redeploy."

