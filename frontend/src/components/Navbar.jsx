import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BoxArrowRight, BoxArrowInLeft, PersonLinesFill, VectorPen } from 'react-bootstrap-icons';

const Navbar = () => {
  const { pathname } = useLocation();
  const [isConnected, setConnected] = useState(false);
  useEffect(() => {
    setConnected(document.cookie.includes("token"));
  }, [pathname]);

  return (
    <>
      <nav className="navbar navbar-expand-lg text-light bg-body-tertiary fs-2">
        <div className="container-fluid">
          <Link to="/" aria-label="Logo John Doe" className="navbar-brand d-flex align-item-center" ><img src="/logolarge.webp" alt="Logo" height="60" className="d-inline-block align-text-top"/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse flex-grow-0" id="navbarNav">
            <ul className="navbar-nav">
              {
                isConnected ? <>
                  <li className="nav-item">
                    <Link aria-label="Compétences" title="Compétences" className={(pathname === "/dashboard" ? "active " : "") + "nav-link"} to="/dashboard"><PersonLinesFill /></Link>
                  </li>
                  <li className="nav-item">
                    <Link aria-label="Se déconnecter" title="Se déconnecter" className={(pathname === "/logout" ? "active " : "") + "nav-link"} to="/logout"><BoxArrowRight /></Link>
                  </li>
                </>:<>
                  <li className="nav-item">
                    <Link aria-label="S'inscrire" title="S'inscrire" className={(pathname === "/register" ? "active " : "") + "nav-link"} to="/register"><VectorPen /></Link>
                  </li>
                  <li className="nav-item">
                    <Link aria-label="Se connecter" title="Se connecter" className={(pathname === "/login" ? "active " : "") + "nav-link"} to="/login"><BoxArrowInLeft /></Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
        
      </nav>
      <hr className='m-0'/>
    </>
  )
}

export default Navbar