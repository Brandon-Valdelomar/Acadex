import { layout } from "../layout.js";

export function nuevaTareaPage(errores = {}, valoresAnteriores = {}) {
  return layout(
    "Nueva Tarea",
    `
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-primary text-white py-3">
            <h3 class="h5 mb-0 d-flex align-items-center gap-2">
              <i class="bi bi-plus-square"></i> Crear Nueva Tarea
            </h3>
          </div>
          <div class="card-body p-4 bg-white">
            <form action="/tareas/nueva" method="POST" class="row g-3">
              
              <div class="col-12">
                <label for="titulo" class="form-label fw-bold">Título de la Tarea</label>
                <input type="text" id="titulo" name="titulo" 
                       class="form-control ${errores.titulo ? "is-invalid" : ""}" 
                       value="${valoresAnteriores.titulo || ""}">
                ${errores.titulo ? `<div class="invalid-feedback">${errores.titulo}</div>` : ""}
              </div>

              <div class="col-12">
                <label for="descripcion" class="form-label fw-bold">Descripción</label>
                <textarea id="descripcion" name="descripcion" rows="3" 
                          class="form-control ${errores.descripcion ? "is-invalid" : ""}">${valoresAnteriores.descripcion || ""}</textarea>
                ${errores.descripcion ? `<div class="invalid-feedback">${errores.descripcion}</div>` : ""}
              </div>

              <div class="col-md-6">
                <label for="estado" class="form-label fw-bold">Estado</label>
                <select id="estado" name="estado" class="form-select">
                  <option value="pendiente" ${valoresAnteriores.estado === "pendiente" ? "selected" : ""}>Pendiente</option>
                  <option value="en progreso" ${valoresAnteriores.estado === "en progreso" ? "selected" : ""}>En progreso</option>
                  <option value="completada" ${valoresAnteriores.estado === "completada" ? "selected" : ""}>Completada</option>
                </select>
              </div>

              <div class="col-md-6">
                <label for="prioridad" class="form-label fw-bold">Prioridad</label>
                <select id="prioridad" name="prioridad" class="form-select">
                  <option value="baja" ${valoresAnteriores.prioridad === "baja" ? "selected" : ""}>Baja</option>
                  <option value="media" ${valoresAnteriores.prioridad === "media" ? "selected" : (valoresAnteriores.prioridad ? "" : "selected")}>Media</option>
                  <option value="alta" ${valoresAnteriores.prioridad === "alta" ? "selected" : ""}>Alta</option>
                </select>
              </div>

              <div class="col-12 d-flex gap-2 mt-4">
                <button type="submit" class="btn btn-primary px-4">
                  <i class="bi bi-save"></i> Guardar Tarea
                </button>
                <a href="/tareas" class="btn btn-secondary px-4">
                  Cancelar
                </a>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    `
  );
}