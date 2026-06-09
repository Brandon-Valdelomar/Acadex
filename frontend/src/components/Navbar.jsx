import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        {/* El logo o título de la app */}
        <Link className="navbar-brand" to="/">Acadex Tareas</Link>
        
        {/* Botón para pantallas pequeñas */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Enlaces de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tareas">Tareas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nueva-tarea">Nueva Tarea</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;