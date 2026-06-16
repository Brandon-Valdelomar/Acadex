/**
 * TaskTable.jsx
 * 
 * Tabla reutilizable para mostrar la lista de tareas.
 * 
 * Props:
 *  - tareas   : array de objetos tarea
 *  - onDelete : función(id) que se llama al eliminar una tarea
 * 
 * Usado en: TareasPage
 */

import { Link } from 'react-router-dom'

// Helpers para los badges de Bootstrap
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

const TaskTable = ({ tareas, onDelete }) => {

  if (!tareas || tareas.length === 0) {
    return (
      <div className="alert alert-info d-flex align-items-center gap-2 mt-3">
        <i className="bi bi-info-circle-fill"></i>
        No hay tareas registradas por el momento.
      </div>
    )
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="ps-3">Título</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th className="text-end pe-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea) => (
                <tr key={tarea.id}>
                  <td className="fw-semibold ps-3">{tarea.titulo}</td>
                  <td className="text-muted text-truncate" style={{ maxWidth: '220px' }}>
                    {tarea.descripcion}
                  </td>
                  <td>
                    <span className={`badge ${badgeEstado(tarea.estado)} text-uppercase`}>
                      {tarea.estado}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${badgePrioridad(tarea.prioridad)}`}>
                      {tarea.prioridad}
                    </span>
                  </td>
                  <td className="text-end pe-3">
                    <div className="d-flex justify-content-end gap-1">

                      <Link
                        to={`/tareas/${tarea.id}`}
                        className="btn btn-sm btn-outline-primary"
                        title="Ver detalle"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>

                      <Link
                        to={`/editar-tarea/${tarea.id}`}
                        className="btn btn-sm btn-outline-warning"
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Eliminar"
                        onClick={() => onDelete(tarea.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TaskTable
