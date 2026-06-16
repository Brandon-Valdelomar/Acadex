import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import TareasPage from './pages/TareasPage'
import TareaFormPage from './pages/TareaFormPage'
import DetalleTareaPage from './pages/DetalleTareaPage'
import DashboardPage from './pages/DashboardPage'
import Error404Page from './pages/Error404Page'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"                  element={<HomePage />} />
        <Route path="/tareas"            element={<TareasPage />} />
        <Route path="/tareas/nueva"      element={<TareaFormPage />} />
        <Route path="/tareas/:id"        element={<DetalleTareaPage />} />
        <Route path="/editar-tarea/:id"  element={<TareaFormPage />} />
        <Route path="/dashboard"         element={<DashboardPage />} />
        <Route path="*"                  element={<Error404Page />} />
      </Route>
    </Routes>
  )
}

export default App
