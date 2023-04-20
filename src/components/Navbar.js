import { Link } from 'react-router-dom';
import '../styles/navbar.scss';

function Navbar() {
  return (
    <nav>
      <div className="nav-container">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}

export default Navbar;
