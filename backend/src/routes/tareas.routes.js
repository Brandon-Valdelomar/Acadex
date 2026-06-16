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

router.get("/",          listarTareas);
router.get("/resumen",   mostrarResumen);
router.get("/:id",       verDetalleTarea);
router.post("/",         crearTarea);
router.put("/:id",       actualizarTarea);
router.delete("/:id",    eliminarTarea);

export default router;
