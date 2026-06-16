const Footer = () => {
  return (
    <footer className="bg-dark text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0 text-secondary small">
          <i className="bi bi-mortarboard-fill me-1 text-primary"></i>
          &copy; {new Date().getFullYear()} Acadex — Plataforma Académica de Gestión de Tareas
        </p>
      </div>
    </footer>
  )
}

export default Footer
