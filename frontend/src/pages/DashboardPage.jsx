/**
 * DashboardPage.jsx
 *
 * Página de Dashboard con indicadores y métricas de las tareas.
 * Reto adicional del laboratorio.
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerResumen } from '../services/tareas.service'
import AlertMessage from '../components/AlertMessage'

const DashboardPage = () => {
  const [resumen, setResumen]   = useState(null)
  const [alerta, setAlerta]     = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerResumen()
      .then((data) => {
        setResumen(data)
        setCargando(false)
      })
      .catch(() => {
        setAlerta({ tipo: 'danger', mensaje: 'Error al cargar el resumen.' })
        setCargando(false)
      })
  }, [])

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="text-muted mt-3">Cargando métricas...</p>
      </div>
    )
  }

  if (alerta) {
    return <AlertMessage tipo={alerta.tipo} mensaje={alerta.mensaje} />
  }

  // Porcentaje de completadas
  const pct = resumen.total > 0
    ? Math.round((resumen.completadas / resumen.total) * 100)
    : 0

  return (
    <div>
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 d-flex align-items-center gap-2 mb-0">
          <i className="bi bi-bar-chart-fill text-primary"></i> Dashboard
        </h1>
        <Link to="/tareas" className="btn btn-outline-primary">
          <i className="bi bi-list-stars me-1"></i> Ver tareas
        </Link>
      </div>

      {/* Tarjetas de métricas por estado */}
      <div className="row g-4 mb-4">

        <div className="col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center">
            <div className="card-body py-4">
              <i className="bi bi-clipboard-fill text-primary fs-1 mb-2 d-block"></i>
              <h2 className="fw-bold display-6">{resumen.total}</h2>
              <p className="text-muted mb-0">Total de tareas</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center">
            <div className="card-body py-4">
              <i className="bi bi-hourglass-split text-danger fs-1 mb-2 d-block"></i>
              <h2 className="fw-bold display-6 text-danger">{resumen.pendientes}</h2>
              <p className="text-muted mb-0">Pendientes</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center">
            <div className="card-body py-4">
              <i className="bi bi-arrow-repeat text-warning fs-1 mb-2 d-block"></i>
              <h2 className="fw-bold display-6 text-warning">{resumen.en_progreso}</h2>
              <p className="text-muted mb-0">En progreso</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100 text-center">
            <div className="card-body py-4">
              <i className="bi bi-check-circle-fill text-success fs-1 mb-2 d-block"></i>
              <h2 className="fw-bold display-6 text-success">{resumen.completadas}</h2>
              <p className="text-muted mb-0">Completadas</p>
            </div>
          </div>
        </div>

      </div>

      <div className="row g-4">

        {/* Barra de progreso general */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-graph-up me-2 text-primary"></i>
                Progreso general
              </h5>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted small">Tareas completadas</span>
                <span className="fw-bold">{pct}%</span>
              </div>
              <div className="progress" style={{ height: '18px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${pct}%` }}
                  aria-valuenow={pct}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {pct}%
                </div>
              </div>
              <p className="text-muted small mt-3 mb-0">
                {resumen.completadas} de {resumen.total} tareas finalizadas.
              </p>
            </div>
          </div>
        </div>

        {/* Distribución por prioridad */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-flag-fill me-2 text-primary"></i>
                Distribución por prioridad
              </h5>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Alta</span>
                  <span className="fw-bold text-danger">{resumen.alta}</span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: resumen.total > 0 ? `${(resumen.alta / resumen.total) * 100}%` : '0%' }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Media</span>
                  <span className="fw-bold text-warning">{resumen.media}</span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: resumen.total > 0 ? `${(resumen.media / resumen.total) * 100}%` : '0%' }}
                  />
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Baja</span>
                  <span className="fw-bold text-success">{resumen.baja}</span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: resumen.total > 0 ? `${(resumen.baja / resumen.total) * 100}%` : '0%' }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardPage
