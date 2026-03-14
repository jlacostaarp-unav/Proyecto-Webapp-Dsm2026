import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router';
import Peliculas from '../components/Peliculas/Peliculas';
import './Home.css';

function Home({ peliculas }) {
  // Seleccionamos las 3 primeras películas para el carrusel
  const featuredMovies = peliculas.slice(0, 3);

  return (
    <div className="container-fluid px-0">
      <Carousel className="home-carousel" fade>
        {featuredMovies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              className="d-block w-100"
              src={movie.imagen}
              alt={movie.titulo}
            />
            <Carousel.Caption>
              <h3>{movie.titulo}</h3>
              <p>{movie.descripcion.substring(0, 100)}...</p>
              <Link to={`/movie/${movie.id}`} className="btn btn-warning fw-bold px-4">
                Ver detalles
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container">
        <h2 className="mb-4 text-light border-bottom pb-2">Catálogo Completo</h2>
        <Peliculas peliculas={peliculas} />
      </div>
    </div>
  );
}

export default Home;
