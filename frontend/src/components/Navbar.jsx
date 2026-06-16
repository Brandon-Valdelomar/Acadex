import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-mortarboard-fill fs-5"></i>
          Acadex
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1">

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  'nav-link d-flex align-items-center gap-1' + (isActive ? ' active fw-semibold' : '')
                }
                to="/"
                end
              >
                <i className="bi bi-house-fill"></i> Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  'nav-link d-flex align-items-center gap-1' + (isActive ? ' active fw-semibold' : '')
                }
                to="/tareas"
              >
                <i className="bi bi-list-stars"></i> Tareas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  'nav-link d-flex align-items-center gap-1' + (isActive ? ' active fw-semibold' : '')
                }
                to="/tareas/nueva"
              >
                <i className="bi bi-plus-circle-fill"></i> Nueva Tarea
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  'nav-link d-flex align-items-center gap-1' + (isActive ? ' active fw-semibold' : '')
                }
                to="/dashboard"
              >
                <i className="bi bi-bar-chart-fill"></i> Dashboard
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
