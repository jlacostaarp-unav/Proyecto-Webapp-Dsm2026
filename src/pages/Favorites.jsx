import React, { useContext, useEffect, useState } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthContext from '../store/AuthContext';
import Peliculas from '../components/Peliculas/Peliculas';

function Favorites({ peliculas }) {
  const { login, username, idToken, userId } = useContext(AuthContext);
  const [favoritePeliculas, setFavoritePeliculas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate('/login');
      return;
    }

    import('axios').then(({ default: axios }) => {
      axios.get(`https://webapp-react-dsm2026-default-rtdb.europe-west1.firebasedatabase.app/favorites/${userId}.json?auth=${idToken}`)
        .then(response => {
          const data = response.data || {};
          // Extraemos IDs solo de entradas que sean explícitamente true
          const favoriteIds = Object.entries(data)
            .filter(([key, val]) => val === true)
            .map(([key, val]) => key.toString());
          
          const filtered = peliculas.filter(p => favoriteIds.includes(p.id.toString()));
          setFavoritePeliculas(filtered);
        })
        .catch(error => console.error('Error al cargar favoritos de Firebase:', error));
    });
  }, [login, userId, idToken, peliculas, navigate]);

  if (!login) return null;

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-primary">⭐ Mis Favoritos</h2>
          <p className="text-muted">Aquí tienes la lista de las películas que más te han gustado, {username}.</p>
        </div>
        <Button variant="outline-primary" onClick={() => navigate('/')} className="rounded-pill px-4">
          Explorar más
        </Button>
      </div>

      {favoritePeliculas.length > 0 ? (
        <Peliculas peliculas={favoritePeliculas} />
      ) : (
        <Alert variant="info" className="text-center py-5 shadow-sm border-0 rounded-4">
          <div className="fs-1 mb-3">🎬</div>
          <h4>Aún no tienes favoritos</h4>
          <p>Explora nuestro catálogo y pulsa en la estrella de las pelis que quieras guardar.</p>
          <Button variant="primary" onClick={() => navigate('/')} className="mt-3 rounded-pill px-4">
            Ir al catálogo
          </Button>
        </Alert>
      )}
    </Container>
  );
}

export default Favorites;
