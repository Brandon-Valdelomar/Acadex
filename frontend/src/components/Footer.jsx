import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0 text-muted">
          &copy; {new Date().getFullYear()} Plataforma Académica - Gestión de Tareas
        </p>
      </div>
    </footer>
  );
};

export default Footer;