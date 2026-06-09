import React from 'react';
import { Link } from 'react-router-dom';

const TaskTable = ({ tareas, onDelete }) => {
  
  if (!tareas || tareas.length === 0) {
    return <div className="alert alert-info text-center mt-3">No hay tareas registradas por el momento.</div>;
  }

  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Estado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {}
          {tareas.map((tarea) => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.titulo}</td>
              <td>
                {}
                <span className={`badge ${tarea.estado === 'Completada' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {tarea.estado}
                </span>
              </td>
              <td className="text-center">
                {}
                <Link to={`/tareas/${tarea.id}`} className="btn btn-sm btn-info me-2" title="Ver detalle">
                  <i className="bi bi-eye"></i> Detalle
                </Link>
                
                <Link to={`/editar-tarea/${tarea.id}`} className="btn btn-sm btn-primary me-2" title="Editar">
                  <i className="bi bi-pencil"></i> Editar
                </Link>
                
                {}
                <button 
                  onClick={() => onDelete(tarea.id)} 
                  className="btn btn-sm btn-danger" 
                  title="Eliminar"
                >
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;