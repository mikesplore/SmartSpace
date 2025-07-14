import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        color: '#fff',
        padding: '1rem',
        fontSize: '0.9rem',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      {/* Left Section - Brand and Copyright */}
      <div style={{ flex: '1', minWidth: '200px' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
          EventManager
        </h3>
        <p style={{ margin: '0', opacity: '0.8' }}>
          © {currentYear} All rights reserved.
        </p>
      </div>

      {/* Center Section - Navigation Links */}
      <div style={{ flex: '1', minWidth: '300px', textAlign: 'center' }}>
        <nav>
          <ul style={{ 
            display: 'flex', 
            listStyle: 'none', 
            margin: '0', 
            padding: '0',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <li>
              <a 
                href="/home" 
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/events" 
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Events
              </a>
            </li>
            <li>
              <a 
                href="/spaces" 
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Spaces
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                style={{ 
                  color: '#fff', 
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Right Section - Contact Info */}
      <div style={{ flex: '1', minWidth: '200px', textAlign: 'right' }}>
        <p style={{ margin: '0', opacity: '0.8' }}>
          Contact: 
          <a 
            href="mailto:support@eventmanager.com" 
            style={{ 
              color: '#fff', 
              textDecoration: 'none',
              marginLeft: '0.5rem',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            support@eventmanager.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
