import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const authData = {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true
    };

    import('axios').then(({ default: axios }) => {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8kkAhoaw6KGCfiR-PxyBrIFOfTEAraxo', authData)
        .then((response) => {
          setLoading(false);
          setSuccess(true);
          // Pasamos el email y el idToken recibido de Firebase
          onLogin({ 
            email: response.data.email, 
            idToken: response.data.idToken,
            localId: response.data.localId 
          });
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.response?.data?.error?.message;
          if (errorCode === 'EMAIL_NOT_FOUND' || errorCode === 'INVALID_PASSWORD') {
            setError('Credenciales incorrectas. Revisa tu email y contraseña.');
          } else if (errorCode === 'USER_DISABLED') {
            setError('Esta cuenta ha sido deshabilitada.');
          } else {
            setError('Se ha producido un error al iniciar sesión.');
          }
          console.error('Error de login:', error);
        });
    });
  };

  if (success) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5 text-center">
            <div className="card shadow-lg p-5 login-card border-success">
              <h2 className="text-success mb-4">🔓 ¡Bienvenido!</h2>
              <p className="lead">Has iniciado sesión correctamente.</p>
              <Button variant="primary" className="mt-4 px-5 rounded-pill shadow" href="/">
                Ir al Inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg p-4 login-card border-0">
            <div className="text-center mb-4">
              <h2 className="text-primary fw-bold">🔑 Iniciar Sesión</h2>
              <p className="text-muted">Accede a tu cuenta de CineApp DSM</p>
            </div>
            
            {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fw-bold small">Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email"
                  placeholder="ejemplo@correo.com" 
                  className="rounded-pill px-3 py-2"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="fw-bold small">Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  placeholder="Tu contraseña" 
                  className="rounded-pill px-3 py-2"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="rounded-pill py-2 fw-bold shadow-sm"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </Form>

            <div className="text-center mt-4 border-top pt-3">
              <p className="small text-muted">¿No tienes cuenta? <a href="/register" className="text-primary text-decoration-none fw-bold">Regístrate gratis</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
