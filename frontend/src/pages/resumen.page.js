import { layout } from "../../../backend/src/views/layout.js";

export function resumenPage(stats) {
  return layout(
    "Resumen de Tareas",
    `
    <div class="d-flex align-items-center gap-2 mb-4">
      <i class="bi bi-pie-chart-fill text-primary fs-2"></i>
      <h1 class="h2 mb-0">Estadísticas Generales</h1>
    </div>

    <div class="row g-4">
      <div class="col-md-3">
        <div class="card bg-primary text-white shadow-sm border-0 h-100">
          <div class="card-body d-flex align-items-center justify-content-between">
            <div>
              <h6 class="text-uppercase mb-1">Total Tareas</h6>
              <h2 class="display-5 fw-bold mb-0">${stats.total}</h2>
            </div>
            <i class="bi bi-folder fs-1 opacity-50"></i>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-danger text-white shadow-sm border-0 h-100">
          <div class="card-body d-flex align-items-center justify-content-between">
            <div>
              <h6 class="text-uppercase mb-1">Pendientes</h6>
              <h2 class="display-5 fw-bold mb-0">${stats.pendientes}</h2>
            </div>
            <i class="bi bi-clock-history fs-1 opacity-50"></i>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-warning text-dark shadow-sm border-0 h-100">
          <div class="card-body d-flex align-items-center justify-content-between">
            <div>
              <h6 class="text-uppercase mb-1">En Progreso</h6>
              <h2 class="display-5 fw-bold mb-0">${stats.enProgreso}</h2>
            </div>
            <i class="bi bi-gear-fill fs-1 opacity-50"></i>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-success text-white shadow-sm border-0 h-100">
          <div class="card-body d-flex align-items-center justify-content-between">
            <div>
              <h6 class="text-uppercase mb-1">Completadas</h6>
              <h2 class="display-5 fw-bold mb-0">${stats.completadas}</h2>
            </div>
            <i class="bi bi-check-circle-fill fs-1 opacity-50"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <a href="/tareas" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left"></i> Volver a la lista
      </a>
    </div>
    `
  );
}