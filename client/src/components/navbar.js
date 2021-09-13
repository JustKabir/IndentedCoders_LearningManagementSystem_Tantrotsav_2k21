import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <nav>
            <div className="container nav-wrapper">
            <Link to="#!" className="brand-logo">Learn IT</Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
                <li><Link to="/login">Login</Link></li>
            </ul>
            </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
            <li><Link to="/login">login</Link></li>
        </ul>
          
    </div>
  );
}

export default Navbar;