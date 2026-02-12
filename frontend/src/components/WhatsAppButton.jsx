import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '923241344368'; // Pakistan format without + 
  const message = 'Hello! I am interested in your cars at Noor Automobiles.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
       href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
        zIndex: 9999,
        transition: 'all 0.3s ease',
        animation: 'pulse 2s infinite'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 30px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
      }}
    >
      <MessageCircle size={30} color="#fff" fill="#fff" />
      
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 4px 30px rgba(37, 211, 102, 0.7); }
          100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
        }
      `}</style>
    </a>
  );
};

export default WhatsAppButton;
