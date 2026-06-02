import { layout } from "../layout.js";

export function detalleTareaPage(tarea) {
  return layout(
    "Detalle de tarea",
    `
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        Detalle de tarea
      </div>
      <div class="card-body">
        <h1 class="card-title">${tarea.titulo}</h1>
        <p><strong>Descripción:</strong> ${tarea.descripcion}</p>
        <p><strong>Estado:</strong> ${tarea.estado}</p>
        <p><strong>Prioridad:</strong> ${tarea.prioridad}</p>
        <a href="/tareas" class="btn btn-secondary">Volver</a>
        <a href="/tareas/${tarea.id}/editar" class="btn btn-warning">Editar</a>
      </div>
    </div>
    `
  );
}