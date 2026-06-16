/**
 * AlertMessage.jsx
 * 
 * Componente reutilizable para mostrar mensajes de alerta.
 * 
 * Props:
 *  - tipo   : 'success' | 'danger' | 'warning' | 'info'  (default: 'info')
 *  - mensaje: string con el texto a mostrar
 *  - onClose: función opcional que se llama al cerrar la alerta
 * 
 * Usado en: TareasPage, TareaFormPage, DetalleTareaPage
 */

const iconos = {
  success: 'bi-check-circle-fill',
  danger:  'bi-exclamation-triangle-fill',
  warning: 'bi-exclamation-circle-fill',
  info:    'bi-info-circle-fill',
}

const AlertMessage = ({ tipo = 'info', mensaje, onClose }) => {
  if (!mensaje) return null

  return (
    <div
      className={`alert alert-${tipo} alert-dismissible fade show d-flex align-items-center gap-2 shadow-sm`}
      role="alert"
    >
      <i className={`bi ${iconos[tipo] ?? iconos.info}`}></i>
      <div>{mensaje}</div>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Cerrar"
          onClick={onClose}
        />
      )}
    </div>
  )
}

export default AlertMessage
