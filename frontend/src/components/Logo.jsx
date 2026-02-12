const Logo = ({ size = 50, textColor = '#0a0a0a' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      {/* NA Shield Logo */}
      <div style={{
        width: `${size}px`,
        height: `${size * 1.15}px`,
        background: 'linear-gradient(135deg, #c41e3a 0%, #e63950 100%)',
        borderRadius: '8px 8px 50% 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 20px rgba(196, 30, 58, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Inner shield border */}
        <div style={{
          position: 'absolute',
          top: '3px',
          left: '3px',
          right: '3px',
          bottom: '3px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '6px 6px 50% 50%'
        }} />
        
        {/* NA Text */}
        <span style={{
          color: '#fff',
          fontSize: `${size * 0.4}px`,
          fontWeight: '800',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>NA</span>
      </div>
      
      {/* Brand Name */}
      <div>
        <div style={{
          fontSize: `${size * 0.26}px`,
          fontWeight: '700',
          color: textColor,
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          Noor <span style={{ color: '#c41e3a' }}>Automobiles</span>
        </div>
        <div style={{
          fontSize: `${size * 0.13}px`,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: textColor,
          opacity: 0.7
        }}>
          Japanese Car Importer
        </div>
      </div>
    </div>
  );
};

export default Logo;
