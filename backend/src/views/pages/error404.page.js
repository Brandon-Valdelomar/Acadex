import { layout } from "../layout.js";

export function error404Page() {
  return layout(
    "Página no encontrada",
    `
    <div class="container text-center mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="display-1 text-danger fw-bold">404</h1>
          <h2 class="mb-3">Página no encontrada</h2>
          <p class="text-muted mb-4">
            La ruta solicitada no existe o ha sido movida.
          </p>
          <a href="/tareas" class="btn btn-primary px-4">
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
    `
  );
}