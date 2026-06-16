/**
 * tareas.service.js
 *
 * Servicio centralizado para comunicarse con la API del backend.
 * Parte 7 del laboratorio.
 * Reto adicional: búsqueda por título agregada a obtenerTareas.
 */

const BASE_URL = 'http://localhost:3000/api/tareas'

// GET /api/tareas  (con filtros opcionales por estado y título)
export async function obtenerTareas(estado = '', titulo = '') {
  const params = new URLSearchParams()
  if (estado) params.append('estado', estado)
  if (titulo) params.append('titulo', titulo)

  const url = params.toString() ? `${BASE_URL}?${params}` : BASE_URL
  const res = await fetch(url)
  if (!res.ok) throw new Error('Error al obtener tareas')
  return res.json()
}

// GET /api/tareas/:id
export async function obtenerTarea(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) throw new Error('Tarea no encontrada')
  return res.json()
}

// POST /api/tareas
export async function crearTarea(datos) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('Error al crear la tarea')
  return res.json()
}

// PUT /api/tareas/:id
export async function actualizarTarea(id, datos) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('Error al actualizar la tarea')
  return res.json()
}

// DELETE /api/tareas/:id
export async function eliminarTarea(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar la tarea')
  return res.json()
}

// GET /api/tareas/resumen — usado por DashboardPage
export async function obtenerResumen() {
  const res = await fetch('http://localhost:3000/api/tareas/resumen')
  if (!res.ok) throw new Error('Error al obtener resumen')
  return res.json()
}
