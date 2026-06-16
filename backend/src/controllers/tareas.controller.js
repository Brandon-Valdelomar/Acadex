import { tareas } from "../data/tareas.data.js";

export function listarTareas(req, res) {
  const { estado, titulo } = req.query;

  let resultado = tareas;

  // Filtrar por estado
  if (estado) {
    resultado = resultado.filter(t => t.estado === estado);
  }

  // Búsqueda por título (reto adicional)
  if (titulo) {
    const busqueda = titulo.toLowerCase();
    resultado = resultado.filter(t => t.titulo.toLowerCase().includes(busqueda));
  }

  res.json(resultado);
}

export function verDetalleTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find(tarea => tarea.id === id);

  if (!tarea) {
    return res.json({ error: "Tarea no encontrada" });
  }

  res.status(200).json(tarea);
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
    return res.status(400).json({ errores });
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado,
    prioridad
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
}

export function actualizarTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find(tarea => tarea.id === id);

  if (!tarea) {
    return res.json({ mensaje: "Tarea no encontrada" });
  }

  tarea.titulo      = req.body.titulo;
  tarea.descripcion = req.body.descripcion;
  tarea.estado      = req.body.estado;
  tarea.prioridad   = req.body.prioridad;

  res.status(200).json(tarea);
}

export function eliminarTarea(req, res) {
  const id = Number(req.params.id);
  const indice = tareas.findIndex(tarea => tarea.id === id);

  if (indice !== -1) {
    tareas.splice(indice, 1);
  }

  res.status(200).json({ mensaje: "Tarea eliminada" });
}

export function mostrarResumen(req, res) {
  const resumen = {
    total:       tareas.length,
    completadas: tareas.filter(t => t.estado === "completada").length,
    pendientes:  tareas.filter(t => t.estado === "pendiente").length,
    en_progreso: tareas.filter(t => t.estado === "en progreso").length,
    alta:        tareas.filter(t => t.prioridad === "alta").length,
    media:       tareas.filter(t => t.prioridad === "media").length,
    baja:        tareas.filter(t => t.prioridad === "baja").length,
  };
  res.status(200).json(resumen);
}
