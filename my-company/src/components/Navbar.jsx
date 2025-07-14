import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff'
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>MyCompany</div>
      <div>
        <Link to="/" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/about" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
          About
        </Link>
        <Link to="/services" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
          Services
        </Link>
        <Link to="/contact" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
