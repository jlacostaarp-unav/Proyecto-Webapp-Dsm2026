import React, { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío (Firebase, etc.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-success py-5 shadow-sm">
          <h2 className="mb-3">✅ ¡Mensaje enviado!</h2>
          <p className="lead">Formulario enviado. Se pondran en contacto con usted lo antes posible.</p>
          <button className="btn btn-outline-success mt-3" onClick={() => setSubmitted(false)}>
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-primary">📩 Contacto</h2>
            <p className="text-muted mb-4">Si tienes alguna duda o sugerencia, no dudes en contactarnos.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre</label>
                <input type="text" className="form-control" placeholder="Tu nombre" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input type="email" className="form-control" placeholder="tu@email.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Mensaje</label>
                <textarea className="form-control" rows="4" placeholder="¿En qué podemos ayudarte?" required></textarea>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">Enviar Mensaje</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
