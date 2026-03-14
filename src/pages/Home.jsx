import React from 'react';
import Peliculas from '../components/Peliculas/Peliculas';

const homeStyles = {
  padding: '2rem 0',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  marginBottom: '2rem'
};

function Home({ peliculas }) {
  return (
    <div className="container">
      <div style={homeStyles}>
        <h1>🍿 Bienvenidos a CineApp DSM</h1>
        <p className="lead">Tu catálogo de películas favorito en un solo lugar.</p>
      </div>
      <Peliculas peliculas={peliculas} />
    </div>
  );
}

export default Home;
