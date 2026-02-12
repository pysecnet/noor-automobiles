// ============================================
// EASY IMAGE CONFIGURATION
// Change these paths to update images across the site
// ============================================

const IMAGES = {
  // LOGO - Replace with your custom logo
  // Put your logo in: frontend/public/images/logo.png
  logo: '/images/logo.png',
  
  // HERO SECTION BACKGROUND
  // Put image in: frontend/public/images/hero-bg.jpg
  heroBg: '/images/hero-bg.jpg',
  
  // ABOUT PAGE IMAGE
  aboutImage: '/images/about-showroom.jpg',
  
  // DEFAULT CAR IMAGE (when no image uploaded)
  defaultCar: '/images/default-car.jpg',
  
  // PLACEHOLDER FOR UPCOMING CARS
  upcomingPlaceholder: '/images/upcoming-placeholder.jpg',
  
  // You can also use external URLs:
  // heroBg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80',
};

// Fallback to external images if local not found
export const getImage = (key) => {
  const fallbacks = {
    logo: null, // Will use text logo if not found
    heroBg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80',
    aboutImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    defaultCar: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    upcomingPlaceholder: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80',
  };
  
  return IMAGES[key] || fallbacks[key];
};

export default IMAGES;
