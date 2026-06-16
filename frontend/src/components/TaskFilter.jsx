/**
 * TaskFilter.jsx
 *
 * Barra de filtros reutilizable — filtro por estado + búsqueda por título.
 * Reto adicional: búsqueda por título.
 *
 * Props:
 *  - filtroEstado   : string
 *  - filtroBusqueda : string
 *  - onEstadoChange : función(valor)
 *  - onBusquedaChange : función(valor)
 *  - onLimpiar      : función()
 *
 * Usado en: TareasPage
 */

const TaskFilter = ({ filtroEstado, filtroBusqueda, onEstadoChange, onBusquedaChange, onLimpiar }) => {
  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="card-body">
        <div className="row g-3 align-items-end">

          {/* Búsqueda por título — reto adicional */}
          <div className="col-md-5">
            <label className="form-label fw-bold">
              <i className="bi bi-search me-1"></i> Buscar por título
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej. Estudiar cálculo..."
              value={filtroBusqueda}
              onChange={(e) => onBusquedaChange(e.target.value)}
            />
          </div>

          {/* Filtro por estado */}
          <div className="col-md-4">
            <label className="form-label fw-bold">
              <i className="bi bi-funnel me-1"></i> Filtrar por estado
            </label>
            <select
              className="form-select"
              value={filtroEstado}
              onChange={(e) => onEstadoChange(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          {/* Limpiar */}
          <div className="col-md-3">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={onLimpiar}
            >
              <i className="bi bi-x-circle me-1"></i> Limpiar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TaskFilter
