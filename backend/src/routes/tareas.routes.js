import { Router } from "express";
import {
  listarTareas,
  verDetalleTarea,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  mostrarResumen
} from "../controllers/tareas.controller.js";

const router = Router();

router.get("/", listarTareas);
//router.get("/resumen", mostrarResumen); 
router.get("/resumen",mostrarResumen)
router.post("/nueva", crearTarea);
router.get("/:id", verDetalleTarea);
//router.get("/:id/editar", mostrarFormularioEditarTarea);
router.post("/:id/editar", actualizarTarea);
router.post("/:id/eliminar", eliminarTarea);

export default router;