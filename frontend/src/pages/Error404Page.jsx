/**
 * Error404Page.jsx
 * 
 * Página de error 404 — ruta no encontrada.
 * Convertida desde error404.page.js del laboratorio anterior.
 */

import { Link } from 'react-router-dom'

const Error404Page = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-1 text-danger fw-bold">404</h1>
          <h2 className="mb-3">Página no encontrada</h2>
          <p className="text-muted mb-4">
            La ruta solicitada no existe o ha sido movida.
          </p>
          <Link to="/" className="btn btn-primary px-4">
            <i className="bi bi-house-fill me-1"></i> Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error404Page
