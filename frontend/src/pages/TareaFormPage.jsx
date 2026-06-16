/**
 * TareaFormPage.jsx
 * 
 * Página unificada para crear y editar tareas.
 * Parte 7: usa tareas.service.js para crearTarea y actualizarTarea.
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { obtenerTarea, crearTarea, actualizarTarea } from '../services/tareas.service'
import TaskForm from '../components/TaskForm'
import AlertMessage from '../components/AlertMessage'

const valoresIniciales = {
  titulo:      '',
  descripcion: '',
  estado:      'pendiente',
  prioridad:   'media',
}

const TareaFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const modoEdicion = Boolean(id)

  const [valores, setValores]   = useState(valoresIniciales)
  const [errores, setErrores]   = useState({})
  const [alerta, setAlerta]     = useState(null)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (!modoEdicion) return

    obtenerTarea(id)
      .then((data) => setValores(data))
      .catch(() => setAlerta({ tipo: 'danger', mensaje: 'No se pudo cargar la tarea.' }))
  }, [id, modoEdicion])

  const handleChange = (campo, valor) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
    setErrores((prev) => ({ ...prev, [campo]: null }))
  }

  const validar = () => {
    const nuevosErrores = {}
    if (!valores.titulo?.trim())       nuevosErrores.titulo = 'El título es obligatorio.'
    if (!valores.descripcion?.trim())  nuevosErrores.descripcion = 'La descripción es obligatoria.'
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = () => {
    if (!validar()) return
    setCargando(true)

    const operacion = modoEdicion
      ? actualizarTarea(id, valores)
      : crearTarea(valores)

    operacion
      .then(() => navigate('/tareas'))
      .catch(() => {
        setAlerta({ tipo: 'danger', mensaje: 'Error al guardar la tarea. Intenta de nuevo.' })
        setCargando(false)
      })
  }

  return (
    <div>
      {alerta && (
        <div className="row justify-content-center mb-3">
          <div className="col-md-8 col-lg-6">
            <AlertMessage
              tipo={alerta.tipo}
              mensaje={alerta.mensaje}
              onClose={() => setAlerta(null)}
            />
          </div>
        </div>
      )}

      <TaskForm
        valores={valores}
        errores={errores}
        onChange={handleChange}
        onSubmit={handleSubmit}
        modoEdicion={modoEdicion}
        cargando={cargando}
      />
    </div>
  )
}

export default TareaFormPage
