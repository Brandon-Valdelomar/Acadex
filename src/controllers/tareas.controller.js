import { tareas } from "../data/tareas.data.js";
import { tareasPage } from "../views/pages/tareas.page.js";
import { detalleTareaPage } from "../views/pages/detalleTarea.page.js";
import { nuevaTareaPage } from "../views/pages/nuevaTarea.page.js";
import { editarTareaPage } from "../views/pages/editarTarea.page.js";
import { error404Page } from "../views/pages/error404.page.js";

export function listarTareas(req, res) {
  const estado = req.query.estado;

  if (estado) {
    const tareasFiltradas = tareas.filter(tarea => tarea.estado === estado);
    return res.send(tareasPage(tareasFiltradas));
  }

  res.send(tareasPage(tareas));
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
  const nuevaTarea = {
    id: tareas.length + 1,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    prioridad: req.body.prioridad
  };

  tareas.push(nuevaTarea);
  res.redirect("/tareas");
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

  res.redirect("/tareas");
}

export function eliminarTarea(req, res) {
  const id = Number(req.params.id);
  const indice = tareas.findIndex(tarea => tarea.id === id);

  if (indice !== -1) {
    tareas.splice(indice, 1);
  }

  res.redirect("/tareas");
}