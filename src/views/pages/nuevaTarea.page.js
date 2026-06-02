import { layout } from "../layout.js";

export function nuevaTareaPage() {
    return layout(
        "Nueva tarea",
        `
        <div class="card shadow-sm">
            <div class="card-header bg-primary text-white">
                Registrar nueva tarea
            </div>

            <div class="card-body">
                <form action="/tareas" method="POST">

                    <div class="mb-3">
                        <label class="form-label">Título</label>
                        <input type="text" name="titulo" class="form-control">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Descripción</label>
                        <textarea name="descripcion" class="form-control" rows="4"></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Estado</label>
                        <select name="estado" class="form-select">
                            <option value="pendiente">Pendiente</option>
                            <option value="en progreso">En progreso</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Prioridad</label>
                        <select name="prioridad" class="form-select">
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        Guardar
                    </button>

                    <a href="/tareas" class="btn btn-secondary">
                        Cancelar
                    </a>

                </form>
            </div>
        </div>
        `
    );
}