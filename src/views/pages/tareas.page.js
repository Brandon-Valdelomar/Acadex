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

function obtenerClaseFilaEstado(estado) {
  if (estado === "pendiente") return "table-danger";     
  if (estado === "en progreso") return "table-warning";  
  if (estado === "completada") return "table-success";   
  return "";
}

export function tareasPage(tareas, mensaje = null) {
  let alertaHtml = "";

  
  if (mensaje) {
    let textoAlerta = "";
    let colorAlerta = "success";
    let iconoAlerta = "bi-check-circle-fill";

    if (mensaje === "creada") textoAlerta = "¡Tarea creada exitosamente!";
    if (mensaje === "actualizada") textoAlerta = "¡Tarea modificada correctamente!";
    if (mensaje === "eliminada") {
      textoAlerta = "La tarea ha sido eliminada.";
      colorAlerta = "danger";
      iconoAlerta = "bi-trash3-fill";
    }

    alertaHtml = `
      <div class="alert alert-${colorAlerta} alert-dismissible fade show d-flex align-items-center gap-2 shadow-sm" role="alert">
        <i class="bi ${iconoAlerta}"></i>
        <div>${textoAlerta}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  let contenido = `
    ${alertaHtml}

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h2 d-flex align-items-center gap-2">
        <i class="bi bi-list-stars text-primary"></i> Lista de tareas
      </h1>
      <a href="/tareas/nueva" class="btn btn-primary d-flex align-items-center gap-1">
        <i class="bi bi-plus-circle"></i> Nueva tarea
      </a>
    </div>

    <div class="card mb-4 shadow-sm border-0">
      <div class="card-body bg-white rounded">
        <form method="GET" action="/tareas" class="row g-3 align-items-end">
          <div class="col-md-8">
            <label class="form-label fw-bold">Filtrar por estado</label>
            <select name="estado" class="form-select">
              <option value="">Todas</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div class="col-md-4">
            <button type="submit" class="btn btn-outline-primary w-100">
              <i class="bi bi-filter"></i> Filtrar
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="card shadow-sm border-0">
      <div class="card-body p-0">
  `;

  if (tareas.length === 0) {
    contenido += `
        <div class="alert alert-info m-3 mb-3 d-flex align-items-center gap-2">
          <i class="bi bi-info-circle-fill"></i> No hay tareas registradas.
        </div>
      </div>
    </div>`;
  } else {
    contenido += `
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-dark">
              <tr>
                <th scope="col" class="ps-3">Título</th>
                <th scope="col">Descripción</th>
                <th scope="col">Estado</th>
                <th scope="col">Prioridad</th>
                <th scope="col" class="text-end pe-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
    `;

    tareas.forEach((tarea) => {
      contenido += `
        <tr>
          <td class="fw-bold ps-3">${tarea.titulo}</td>
          <td class="text-muted text-truncate" style="max-width: 250px;">${tarea.descripcion}</td>
          <td>
            <span class="badge ${obtenerBadgeEstado(tarea.estado)} text-uppercase px-2.5 py-1.5">
              ${tarea.estado}
            </span>
          </td>
          <td>
            <span class="badge ${obtenerBadgePrioridad(tarea.prioridad)}">
              ${tarea.prioridad}
            </span>
          </td>
          <td class="text-end pe-3">
            <div class="d-flex justify-content-end gap-1">
              <a href="/tareas/${tarea.id}" class="btn btn-sm btn-outline-primary" title="Ver Detalle">
                <i class="bi bi-eye"></i>
              </a>
              <a href="/tareas/${tarea.id}/editar" class="btn btn-sm btn-outline-warning" title="Editar">
                <i class="bi bi-pencil"></i>
              </a>
              <form action="/tareas/${tarea.id}/eliminar" method="POST" class="d-inline m-0">
                <button type="submit" class="btn btn-sm btn-outline-danger" title="Eliminar" onclick="return confirm('¿Seguro que deseas eliminar esta tarea?')">
                  <i class="bi bi-trash"></i>
                </button>
              </form>
            </div>
          </td>
        </tr>
      `;
    });

    contenido += `
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `;
  }

  return layout("Tareas", contenido);
}