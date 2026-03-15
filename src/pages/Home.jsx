import React, { useState } from 'react';
import { Carousel, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router';
import Peliculas from '../components/Peliculas/Peliculas';
import './Home.css';

function Home({ peliculas }) {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');

  // Seleccionamos las 3 primeras películas para el carrusel (independiente del filtro)
  const featuredMovies = peliculas.slice(0, 3);

  // Obtener categorías únicas
  const categorias = ['Todas', ...new Set(peliculas.map(p => p.categoria))];

  // Filtrar películas según categoría activa
  const peliculasFiltradas = categoriaActiva === 'Todas' 
    ? peliculas 
    : peliculas.filter(p => p.categoria === categoriaActiva);

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
              <Link to={`/movie/${movie.id}`} className="btn btn-warning fw-bold px-4 shadow">
                Ver detalles
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container mt-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 border-bottom pb-3">
          <h2 className="text-dark fw-bold mb-3 mb-md-0">Catálogo Completo</h2>
          
          <ButtonGroup className="category-filters flex-wrap shadow-sm">
            {categorias.map(cat => (
              <Button 
                key={cat}
                variant={categoriaActiva === cat ? "primary" : "outline-primary"}
                onClick={() => setCategoriaActiva(cat)}
                className="px-4 py-2"
              >
                {cat}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        {peliculasFiltradas.length > 0 ? (
          <Peliculas peliculas={peliculasFiltradas} />
        ) : (
          <div className="text-center py-5">
            <p className="text-muted lead">No hay películas en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
