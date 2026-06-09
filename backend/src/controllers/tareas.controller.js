import { tareas } from "../data/tareas.data.js";
import { tareasPage } from "../views/pages/tareas.page.js";
import { detalleTareaPage } from "../views/pages/detalleTarea.page.js";
import { nuevaTareaPage } from "../views/pages/nuevaTarea.page.js";
import { editarTareaPage } from "../views/pages/editarTarea.page.js";
import { error404Page } from "../views/pages/error404.page.js";
import { resumenPage } from "../views/pages/resumen.page.js";


export function listarTareas(req, res) {
  const estado = req.query.estado;
  const mensaje = req.query.mensaje; 

  if (estado) {
    const tareasFiltradas = tareas.filter(tarea => tarea.estado === estado);
    return res.send(tareasPage(tareasFiltradas, mensaje));
  }

  res.send(tareasPage(tareas, mensaje));
}


export function verDetalleTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find(tarea => tarea.id === id);

  if (!tarea) {
    return res.status(404).send(error404Page());
  }

  res.send(detalleTareaPage(tarea));
}


export function mostrarFormularioNuevaTarea(req, res) {
  res.send(nuevaTareaPage());
}


export function crearTarea(req, res) {
  const { titulo, descripcion, estado, prioridad } = req.body;
  const errores = {};

  
  if (!titulo || titulo.trim() === "") {
    errores.titulo = "El título es obligatorio y no puede estar vacío.";
  }
  if (!descripcion || descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }


  if (Object.keys(errores).length > 0) {
    return res.send(nuevaTareaPage(errores, { titulo, descripcion, estado, prioridad }));
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado,
    prioridad
  };

  tareas.push(nuevaTarea);
  res.redirect("/tareas?mensaje=creada");
}


export function mostrarFormularioEditarTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find(tarea => tarea.id === id);

  if (!tarea) {
    return res.status(404).send(error404Page());
  }

  res.send(editarTareaPage(tarea));
}


export function actualizarTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find(tarea => tarea.id === id);

  if (!tarea) {
    return res.status(404).send(error404Page());
  }

  tarea.titulo = req.body.titulo;
  tarea.descripcion = req.body.descripcion;
  tarea.estado = req.body.estado;
  tarea.prioridad = req.body.prioridad;

  res.redirect("/tareas?mensaje=actualizada");
}


export function eliminarTarea(req, res) {
  const id = Number(req.params.id);
  const indice = tareas.findIndex(tarea => tarea.id === id);

  if (indice !== -1) {
    tareas.splice(indice, 1);
  }

  res.redirect("/tareas?mensaje=eliminada");
}


export function mostrarResumen(req, res) {
  const stats = {
    total: tareas.length,
    pendientes: tareas.filter(t => t.estado === "pendiente").length,
    enProgreso: tareas.filter(t => t.estado === "en progreso").length,
    completadas: tareas.filter(t => t.estado === "completada").length,
  };

  res.send(resumenPage(stats));
}