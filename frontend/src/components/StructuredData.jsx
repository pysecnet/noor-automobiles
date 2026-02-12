import { useEffect } from 'react';

// Organization Schema
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Noor Automobiles",
    "description": "Premium Japanese car imports in Hyderabad, Pakistan",
    "url": "https://noorautomobiles.pk",
    "logo": "https://noorautomobiles.pk/icons/icon-512x512.png",
    "image": "https://noorautomobiles.pk/icons/og-image.jpg",
    "telephone": "+92-324-1344368",
    "email": "info@noorautomobiles.pk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Auto Market",
      "addressLocality": "Hyderabad",
      "addressRegion": "Sindh",
      "postalCode": "71000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.3960",
      "longitude": "68.3578"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "PKR",
    "paymentAccepted": "Cash, Bank Transfer",
    "sameAs": [
      "https://www.instagram.com/noor_.automobiles",
      "https://www.facebook.com/NoorAutomobiles",
      "https://www.tiktok.com/@noorautomobiles"
    ]
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'org-schema';
    
    const existing = document.getElementById('org-schema');
    if (existing) existing.remove();
    
    document.head.appendChild(script);
    
    return () => {
      const el = document.getElementById('org-schema');
      if (el) el.remove();
    };
  }, []);

  return null;
};

// Car/Vehicle Schema
export const CarSchema = ({ car }) => {
  if (!car) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": car.title,
    "brand": {
      "@type": "Brand",
      "name": car.brand
    },
    "model": car.model,
    "vehicleModelDate": car.year?.toString(),
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": car.mileage?.replace(/[^0-9]/g, '') || "0",
      "unitCode": "KMT"
    },
    "vehicleTransmission": car.transmission || "Automatic",
    "fuelType": car.fuel_type || "Petrol",
    "color": car.color,
    "bodyType": car.body_type,
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "name": car.engine
    },
    "description": car.description,
    "image": car.images?.[0],
    "url": `https://noorautomobiles.pk/car/${car.id}`,
    "offers": {
      "@type": "Offer",
      "availability": car.status === 'available' 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "priceCurrency": "PKR",
      "seller": {
        "@type": "AutoDealer",
        "name": "Noor Automobiles"
      }
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = `car-schema-${car.id}`;
    
    const existing = document.getElementById(`car-schema-${car.id}`);
    if (existing) existing.remove();
    
    document.head.appendChild(script);
    
    return () => {
      const el = document.getElementById(`car-schema-${car.id}`);
      if (el) el.remove();
    };
  }, [car]);

  return null;
};

// Breadcrumb Schema
export const BreadcrumbSchema = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'breadcrumb-schema';
    
    const existing = document.getElementById('breadcrumb-schema');
    if (existing) existing.remove();
    
    document.head.appendChild(script);
    
    return () => {
      const el = document.getElementById('breadcrumb-schema');
      if (el) el.remove();
    };
  }, [items]);

  return null;
};

// FAQ Schema (for About/Contact pages)
export const FAQSchema = ({ faqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'faq-schema';
    
    const existing = document.getElementById('faq-schema');
    if (existing) existing.remove();
    
    document.head.appendChild(script);
    
    return () => {
      const el = document.getElementById('faq-schema');
      if (el) el.remove();
    };
  }, [faqs]);

  return null;
};

export default OrganizationSchema;
