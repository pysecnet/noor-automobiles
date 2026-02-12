import { useEffect } from 'react';

const SEO = ({ 
  title = 'Noor Automobiles - Japanese Car Importer',
  description = 'Premium Japanese car imports in Hyderabad, Pakistan. Quality new & used cars directly from Japan. Toyota, Honda, Suzuki & more.',
  keywords = 'Japanese cars, car import, Hyderabad, Pakistan, Toyota, Honda, Suzuki, used cars, JDM',
  image = '/icons/og-image.jpg',
  url = 'https://noorautomobiles.pk',
  type = 'website'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords,
      'author': 'Noor Automobiles',
      'robots': 'index, follow',
      
      // Open Graph
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': type,
      'og:site_name': 'Noor Automobiles',
      'og:locale': 'en_PK',
      
      // Twitter
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEO;
