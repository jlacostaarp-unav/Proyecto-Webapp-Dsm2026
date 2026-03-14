import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import LegalNotice from './pages/LegalNotice';
import ErrorPage from './pages/ErrorPage';
import AuthContext from './store/AuthContext';

function App() {
  const [login, setLogin] = useState(false);
  const [idToken, setIdToken] = useState('');

  return (
    <AuthContext.Provider value={{ login, idToken, language: 'es-ES' }}>
      <Header />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<LegalNotice />} />
          
          {/* Placeholders para futuras implementaciones */}
          <Route path="/movies" element={<div className="container mt-4"><h2>Lista de Películas</h2><p>Próximamente...</p></div>} />
          <Route path="/favorites" element={<div className="container mt-4"><h2>Mis Favoritos</h2><p>Próximamente...</p></div>} />
          <Route path="/login" element={<div className="container mt-4"><h2>Login</h2><p>Próximamente...</p></div>} />
          <Route path="/register" element={<div className="container mt-4"><h2>Registro</h2><p>Próximamente...</p></div>} />
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
