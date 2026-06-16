/**
 * TaskForm.jsx
 * 
 * Formulario reutilizable para crear y editar tareas.
 * El mismo componente sirve para ambos casos — TareaFormPage decide el modo.
 * 
 * Props:
 *  - valores        : objeto con los campos actuales { titulo, descripcion, estado, prioridad }
 *  - errores        : objeto con mensajes de error por campo
 *  - onChange       : función(campo, valor) para actualizar el estado del padre
 *  - onSubmit       : función que se llama al enviar el formulario
 *  - modoEdicion    : boolean — true = estamos editando, false = creando
 *  - cargando       : boolean — deshabilita el botón mientras se guarda
 * 
 * Usado en: TareaFormPage
 */

import { Link } from 'react-router-dom'

const TaskForm = ({ valores, errores = {}, onChange, onSubmit, modoEdicion = false, cargando = false }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm border-0">

          {/* Encabezado del formulario */}
          <div className={`card-header ${modoEdicion ? 'bg-warning text-dark' : 'bg-primary text-white'} py-3`}>
            <h3 className="h5 mb-0 d-flex align-items-center gap-2">
              <i className={`bi ${modoEdicion ? 'bi-pencil-square' : 'bi-plus-square'}`}></i>
              {modoEdicion ? 'Editar Tarea' : 'Crear Nueva Tarea'}
            </h3>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">

              {/* Título */}
              <div className="col-12">
                <label htmlFor="titulo" className="form-label fw-bold">
                  Título de la Tarea <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="titulo"
                  className={`form-control ${errores.titulo ? 'is-invalid' : ''}`}
                  value={valores.titulo || ''}
                  onChange={(e) => onChange('titulo', e.target.value)}
                  placeholder="Ej. Estudiar para el examen de cálculo"
                />
                {errores.titulo && (
                  <div className="invalid-feedback">{errores.titulo}</div>
                )}
              </div>

              {/* Descripción */}
              <div className="col-12">
                <label htmlFor="descripcion" className="form-label fw-bold">Descripción</label>
                <textarea
                  id="descripcion"
                  className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                  rows={3}
                  value={valores.descripcion || ''}
                  onChange={(e) => onChange('descripcion', e.target.value)}
                  placeholder="Describe los detalles de la tarea..."
                />
                {errores.descripcion && (
                  <div className="invalid-feedback">{errores.descripcion}</div>
                )}
              </div>

              {/* Estado */}
              <div className="col-md-6">
                <label htmlFor="estado" className="form-label fw-bold">Estado</label>
                <select
                  id="estado"
                  className="form-select"
                  value={valores.estado || 'pendiente'}
                  onChange={(e) => onChange('estado', e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en progreso">En progreso</option>
                  <option value="completada">Completada</option>
                </select>
              </div>

              {/* Prioridad */}
              <div className="col-md-6">
                <label htmlFor="prioridad" className="form-label fw-bold">Prioridad</label>
                <select
                  id="prioridad"
                  className="form-select"
                  value={valores.prioridad || 'media'}
                  onChange={(e) => onChange('prioridad', e.target.value)}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              {/* Botones */}
              <div className="col-12 d-flex gap-2 mt-2">
                <button
                  type="button"
                  className={`btn ${modoEdicion ? 'btn-warning' : 'btn-primary'} px-4`}
                  onClick={onSubmit}
                  disabled={cargando}
                >
                  {cargando
                    ? <><span className="spinner-border spinner-border-sm me-2" />Guardando...</>
                    : <><i className={`bi ${modoEdicion ? 'bi-save' : 'bi-plus-lg'} me-1`}></i>
                        {modoEdicion ? 'Actualizar Tarea' : 'Guardar Tarea'}</>
                  }
                </button>
                <Link to="/tareas" className="btn btn-outline-secondary px-4">
                  <i className="bi bi-x-lg me-1"></i> Cancelar
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskForm
