import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Social Network</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link active">Publicaciones</span>
            </li>
            <li className="nav-item d-lg-none">
              <button
                className="btn btn-outline-light btn-sm w-100 mt-2"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
          <button
            className="btn btn-outline-light btn-sm ms-lg-auto d-none d-lg-inline-block"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
