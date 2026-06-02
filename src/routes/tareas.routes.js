import { Router } from "express";
import {
listarTareas,
verDetalleTarea,
mostrarFormularioNuevaTarea,
crearTarea,
mostrarFormularioEditarTarea,
actualizarTarea,
eliminarTarea
} from "../controllers/tareas.controller.js";
const router = Router();
router.get("/", listarTareas);
router.get("/nueva", mostrarFormularioNuevaTarea);
router.post("/", crearTarea);
router.get("/:id", verDetalleTarea);
router.get("/:id/editar", mostrarFormularioEditarTarea);
router.post("/:id/editar", actualizarTarea);
router.post("/:id/eliminar", eliminarTarea);
export default router;
