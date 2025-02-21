import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isConnected }) => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" > <img src="/vite.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>Portfolios</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                isConnected ? <>
                  <li className="nav-item">
                    <Link className={(pathname === "/portfolio" ? "active " : "") + "nav-link"} to="/portfolio">Portfolio</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={(pathname === "/dashboard" ? "active " : "") + "nav-link"} to="/dashboard">Dashboard</Link>
                  </li>
                </>:<>
                  <li className="nav-item">
                    <Link className={(pathname === "/login" ? "active " : "") + "nav-link"} to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={(pathname === "/register" ? "active " : "") + "nav-link"} to="/register">Register</Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>

      </nav>
    </>
  )
}

export default Navbar