/**
 * DetalleTareaPage.jsx
 * 
 * Vista de detalle de una tarea.
 * Parte 7: usa tareas.service.js para obtenerTarea.
 */

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerTarea } from '../services/tareas.service'
import AlertMessage from '../components/AlertMessage'

const badgeEstado = (estado) => {
  if (estado === 'pendiente')   return 'bg-danger'
  if (estado === 'en progreso') return 'bg-warning text-dark'
  if (estado === 'completada')  return 'bg-success'
  return 'bg-secondary'
}

const badgePrioridad = (prioridad) => {
  if (prioridad === 'alta')  return 'bg-danger'
  if (prioridad === 'media') return 'bg-warning text-dark'
  if (prioridad === 'baja')  return 'bg-success'
  return 'bg-secondary'
}

const DetalleTareaPage = () => {
  const { id } = useParams()
  const [tarea, setTarea]       = useState(null)
  const [alerta, setAlerta]     = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerTarea(id)
      .then((data) => {
        setTarea(data)
        setCargando(false)
      })
      .catch(() => {
        setAlerta({ tipo: 'danger', mensaje: 'No se encontró la tarea solicitada.' })
        setCargando(false)
      })
  }, [id])

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="text-muted mt-3">Cargando tarea...</p>
      </div>
    )
  }

  if (alerta) {
    return (
      <>
        <AlertMessage tipo={alerta.tipo} mensaje={alerta.mensaje} />
        <Link to="/tareas" className="btn btn-outline-secondary mt-3">
          <i className="bi bi-arrow-left me-1"></i> Volver a la lista
        </Link>
      </>
    )
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white py-3">
            <h3 className="h5 mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-file-text-fill"></i> Detalle de Tarea
            </h3>
          </div>
          <div className="card-body p-4">
            <h4 className="fw-bold mb-3">{tarea.titulo}</h4>
            <p className="text-muted mb-4">{tarea.descripcion}</p>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <span className="text-muted small d-block mb-1">
                  <i className="bi bi-circle-fill me-1"></i> Estado
                </span>
                <span className={`badge fs-6 ${badgeEstado(tarea.estado)} text-uppercase`}>
                  {tarea.estado}
                </span>
              </div>
              <div className="col-sm-6">
                <span className="text-muted small d-block mb-1">
                  <i className="bi bi-flag-fill me-1"></i> Prioridad
                </span>
                <span className={`badge fs-6 ${badgePrioridad(tarea.prioridad)}`}>
                  {tarea.prioridad}
                </span>
              </div>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <Link to="/tareas" className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-1"></i> Volver
              </Link>
              <Link to={`/editar-tarea/${tarea.id}`} className="btn btn-warning">
                <i className="bi bi-pencil me-1"></i> Editar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleTareaPage
