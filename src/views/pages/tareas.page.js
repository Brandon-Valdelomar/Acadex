import { layout } from "../layout.js";


function obtenerBadgeEstado(estado) {
  if (estado === "pendiente") return "bg-danger";
  if (estado === "en progreso") return "bg-warning text-dark";
  if (estado === "completada") return "bg-success";
  return "bg-secondary";
}

function obtenerBadgePrioridad(prioridad) {
  if (prioridad === "alta") return "bg-danger";
  if (prioridad === "media") return "bg-warning text-dark";
  if (prioridad === "baja") return "bg-success";
  return "bg-secondary";
}


export function tareasPage(tareas) {
  let contenido = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Lista de tareas</h1>
      <a href="/tareas/nueva" class="btn btn-primary">Nueva tarea</a>
    </div>

    <div class="card mb-4 shadow-sm">
      <div class="card-body">
        <form method="GET" action="/tareas" class="row g-3 align-items-end">
          <div class="col-md-8">
            <label class="form-label">Filtrar por estado</label>
            <select name="estado" class="form-select">
              <option value="">Todas</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div class="col-md-4">
            <button type="submit" class="btn btn-outline-primary w-100">
              Filtrar
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  if (tareas.length === 0) {
    contenido += `
      <div class="alert alert-info">
        No hay tareas registradas.
      </div>
    `;
  }

  tareas.forEach((tarea) => {
    contenido += `
      <div class="card mb-3 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">${tarea.titulo}</h5>
          <p class="card-text">${tarea.descripcion}</p>
          <span class="badge ${obtenerBadgeEstado(tarea.estado)}">
            ${tarea.estado}
          </span>
          <span class="badge ${obtenerBadgePrioridad(tarea.prioridad)}">
            Prioridad ${tarea.prioridad}
          </span>
          <div class="mt-3">
            <a href="/tareas/${tarea.id}" class="btn btn-sm btn-outline-primary">
              Ver detalle
            </a>
            <a href="/tareas/${tarea.id}/editar" class="btn btn-sm btn-outline-warning">
              Editar
            </a>
            <form action="/tareas/${tarea.id}/eliminar" method="POST" class="d-inline">
              <button type="submit" class="btn btn-sm btn-outline-danger">
                Eliminar
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  });

  return layout("Tareas", contenido);
}