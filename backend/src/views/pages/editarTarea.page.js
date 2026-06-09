import { layout } from "../layout.js";

export function editarTareaPage(tarea) {
  return layout(
    "Editar tarea",
    `
    <div class="container mt-4">
      <div class="card shadow-sm">
        <div class="card-header bg-warning text-dark">
          <h2 class="mb-0">Editar tarea</h2>
        </div>
        <div class="card-body">
          <form action="/tareas/${tarea.id}/editar" method="POST">
            <div class="mb-3">
              <label for="titulo" class="form-label">Título</label>
              <input type="text" id="titulo" name="titulo" class="form-control" value="${tarea.titulo}" required>
            </div>

            <div class="mb-3">
              <label for="descripcion" class="form-label">Descripción</label>
              <textarea id="descripcion" name="descripcion" class="form-control" rows="3">${tarea.descripcion}</textarea>
            </div>

            <div class="mb-3">
              <label for="estado" class="form-label">Estado</label>
              <select id="estado" name="estado" class="form-select">
                <option value="pendiente" ${tarea.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
                <option value="en progreso" ${tarea.estado === "en progreso" ? "selected" : ""}>En progreso</option>
                <option value="completada" ${tarea.estado === "completada" ? "selected" : ""}>Completada</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="prioridad" class="form-label">Prioridad</label>
              <select id="prioridad" name="prioridad" class="form-select">
                <option value="baja" ${tarea.prioridad === "baja" ? "selected" : ""}>Baja</option>
                <option value="media" ${tarea.prioridad === "media" ? "selected" : ""}>Media</option>
                <option value="alta" ${tarea.prioridad === "alta" ? "selected" : ""}>Alta</option>
              </select>
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary">Actualizar</button>
              <a href="/tareas" class="btn btn-secondary">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
    `
  );
}