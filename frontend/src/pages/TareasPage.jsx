/**
 * TareasPage.jsx
 *
 * Lista de tareas con búsqueda por título + filtro por estado.
 * Reto adicional: búsqueda por título integrada en TaskFilter.
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerTareas, eliminarTarea } from '../services/tareas.service'
import TaskTable from '../components/TaskTable'
import TaskFilter from '../components/TaskFilter'
import AlertMessage from '../components/AlertMessage'

const TareasPage = () => {
  const [tareas, setTareas]               = useState([])
  const [filtroEstado, setFiltroEstado]   = useState('')
  const [filtroBusqueda, setFiltroBusqueda] = useState('')
  const [alerta, setAlerta]               = useState(null)
  const [cargando, setCargando]           = useState(true)

  useEffect(() => {
    setCargando(true)
    obtenerTareas(filtroEstado, filtroBusqueda)
      .then((data) => {
        setTareas(data)
        setCargando(false)
      })
      .catch(() => {
        setAlerta({ tipo: 'danger', mensaje: 'Error al conectar con el servidor.' })
        setCargando(false)
      })
  }, [filtroEstado, filtroBusqueda])

  const handleDelete = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta tarea?')) return

    eliminarTarea(id)
      .then(() => {
        setTareas((prev) => prev.filter((t) => t.id !== id))
        setAlerta({ tipo: 'success', mensaje: 'Tarea eliminada correctamente.' })
      })
      .catch(() => {
        setAlerta({ tipo: 'danger', mensaje: 'Error al eliminar la tarea.' })
      })
  }

  const handleLimpiar = () => {
    setFiltroEstado('')
    setFiltroBusqueda('')
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h2 d-flex align-items-center gap-2 mb-0">
          <i className="bi bi-list-stars text-primary"></i> Lista de tareas
        </h1>
        <div className="d-flex gap-2 flex-wrap">
          <a
            href="http://localhost:3000/api/reportes/xml"
            className="btn btn-outline-success"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-filetype-xml me-1"></i> Exportar XML
          </a>
          <a
            href="http://localhost:3000/api/reportes/pdf"
            className="btn btn-outline-danger"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-filetype-pdf me-1"></i> Exportar PDF
          </a>
          <Link to="/tareas/nueva" className="btn btn-primary d-flex align-items-center gap-1">
            <i className="bi bi-plus-circle"></i> Nueva tarea
          </Link>
        </div>
      </div>

      <AlertMessage
        tipo={alerta?.tipo}
        mensaje={alerta?.mensaje}
        onClose={() => setAlerta(null)}
      />

      <TaskFilter
        filtroEstado={filtroEstado}
        filtroBusqueda={filtroBusqueda}
        onEstadoChange={setFiltroEstado}
        onBusquedaChange={setFiltroBusqueda}
        onLimpiar={handleLimpiar}
      />

      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="text-muted mt-3">Cargando tareas...</p>
        </div>
      ) : (
        <TaskTable tareas={tareas} onDelete={handleDelete} />
      )}
    </div>
  )
}

export default TareasPage
