import { tareas } from "../data/tareas.data.js";



export function listarTareas(req, res) {
  const estado = req.query.estado;
  const mensaje = req.query.mensaje; 

  if (estado) {
    const tareasFiltradas = tareas.filter(tarea => tarea.estado === estado);
    return res.json(tareasFiltradas);
  }

  res.json(tareas);
}


export function verDetalleTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find(tarea => tarea.id === id);

  if (!tarea) {
    return res.json({error: "Tarea no encontrada"});
  }

  res.status(200).send(tarea);
}


//export function mostrarFormularioNuevaTarea(req, res) {
 // res.send(nuevaTareaPage());
//}


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
    return res.send((errores, { titulo, descripcion, estado, prioridad }));
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado,
    prioridad
  };

  tareas.push(nuevaTarea);
  res.status(200).json({mensaje: "Tarea creada exitosamente"});
}


//export function mostrarFormularioEditarTarea(req, res) {
  //const id = Number(req.params.id);
 // const tarea = tareas.find(tarea => tarea.id === id);

  //if (!tarea) {
    //return res.status(404).send(error404Page());
  //}

  //res.send(editarTareaPage(tarea));
//}


export function actualizarTarea(req, res) {
  const id = Number(req.params.id);
  const tarea = tareas.find(tarea => tarea.id === id);

  if (!tarea) {
    return res.json({mensaje: "Tarea no encontrada"});
  }

  tarea.titulo = req.body.titulo;
  tarea.descripcion = req.body.descripcion;
  tarea.estado = req.body.estado;
  tarea.prioridad = req.body.prioridad;

  res.status(200).json({mensaje: "Tarea actualizada exitosamente"});
}


export function eliminarTarea(req, res) {
  const id = Number(req.params.id);
  const indice = tareas.findIndex(tarea => tarea.id === id);

  if (indice !== -1) {
    tareas.splice(indice, 1);
  }

  res.status(200).json({mensaje: "Tarea eliminada"});
}


export function mostrarResumen(req, res) {
  const resumen = {
    total: tareas.length,
    completadas: tareas.filter(tarea => tarea.estado === "completada").length,
    pendientes: tareas.filter(tarea => tarea.estado === "pendiente").length,
    en_progreso: tareas.filter(tarea => tarea.estado === "en progreso").length
  };
  res.status(200).json(resumen);
}