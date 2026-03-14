import React from 'react';

const homeStyles = {
  padding: '2rem',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  marginTop: '2rem'
};

function Home() {
  return (
    <div className="container" style={homeStyles}>
      <h1>🍿 Bienvenidos a CineApp DSM</h1>
      <p className="lead">Tu catálogo de películas favorito.</p>
      <hr />
      <p>Explora las últimas novedades y clásicos del cine.</p>
    </div>
  );
}

export default Home;
