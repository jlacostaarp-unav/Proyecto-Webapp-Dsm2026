import React from 'react';
import { Link } from 'react-router';

function ErrorPage() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-1">404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
    </div>
  );
}

export default ErrorPage;
