import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router';

function Pelicula({ id, titulo, imagen, descripcion, categoria, nota }) {
  const [averageRating, setAverageRating] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    import('axios').then(({ default: axios }) => {
      // Nota media desde Firebase
      axios.get(`https://webapp-react-dsm2026-default-rtdb.europe-west1.firebasedatabase.app/ratings/${id}.json`)
        .then(response => {
          const movieRatings = response.data || {};
          const values = Object.values(movieRatings).filter(v => typeof v === 'number');
          if (values.length > 0) {
            const sum = values.reduce((a, b) => a + b, 0);
            setAverageRating(sum / values.length);
          } else {
            setAverageRating(0);
          }
        })
        .catch(err => console.error(err));

      // Contador comentarios desde Firebase
      axios.get(`https://webapp-react-dsm2026-default-rtdb.europe-west1.firebasedatabase.app/comments/${id}.json`)
        .then(response => {
          const movieComments = response.data ? Object.values(response.data) : [];
          setCommentCount(movieComments.length);
        })
        .catch(err => console.error(err));
    });
  }, [id]);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imagen} alt={titulo} style={{ height: '450px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{titulo}</Card.Title>
          <div className="d-flex flex-column align-items-end gap-1">
            <Badge bg="warning" text="dark">⭐ {averageRating > 0 ? averageRating.toFixed(1) : '-'}</Badge>
            <Badge bg="secondary" className="bg-opacity-75">💬 {commentCount}</Badge>
          </div>
        </div>
        <Badge bg="info" className="mb-3 w-fit-content" style={{ alignSelf: 'start' }}>{categoria}</Badge>
        <Card.Text className="text-muted small">
          {descripcion.length > 150 ? descripcion.substring(0, 150) + "..." : descripcion}
        </Card.Text>
        <Link to={`/movie/${id}`} className="btn btn-primary mt-auto">
          Ver detalles
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Pelicula;
