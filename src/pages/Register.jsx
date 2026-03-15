import React from 'react';
import './Register.css';

function Register() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 register-card">
            <h2 className="text-center mb-4 text-primary">📝 Crear Cuenta</h2>
            <p className="text-center text-muted mb-4">Únete a CineApp DSM para disfrutar de contenido exclusivo.</p>
            
            {/* El formulario se implementará en la Fase 2 */}
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Cargando formulario de registro...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
