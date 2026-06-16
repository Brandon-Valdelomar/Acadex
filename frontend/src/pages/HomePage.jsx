/**
 * HomePage.jsx
 * 
 * Página principal de Acadex.
 * Convertida desde home.page.js / App.jsx del laboratorio anterior.
 */

import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'

const HomePage = () => {
  return (
    <div>
      {/* Hero */}
      <div className="p-5 mb-4 bg-white rounded-3 shadow-sm d-flex flex-column flex-md-row align-items-center gap-4">
        <div className="flex-grow-1">
          <h1 className="display-5 fw-bold text-primary mb-2">
            <i className="bi bi-mortarboard-fill me-2"></i>
            Acadex
          </h1>
          <p className="fs-5 text-muted mb-4">
            Plataforma académica para administrar tus tareas de forma sencilla,
            con soporte para prioridades, estados y reportes exportables.
          </p>
          <div className="d-flex gap-2 flex-wrap">
            <Link to="/tareas" className="btn btn-primary px-4">
              <i className="bi bi-list-stars me-1"></i> Ver tareas
            </Link>
            <Link to="/tareas/nueva" className="btn btn-outline-primary px-4">
              <i className="bi bi-plus-circle me-1"></i> Crear tarea
            </Link>
          </div>
        </div>
        {heroImg && (
          <img
            src={heroImg}
            alt="Gestión de tareas"
            className="rounded-3 shadow-sm"
            style={{ maxWidth: '200px', objectFit: 'cover' }}
          />
        )}
      </div>

      
    </div>
  )
}

export default HomePage
