import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Container, Button, Badge, Row, Col, Alert } from 'react-bootstrap';
import AuthContext from '../store/AuthContext';
import './MovieDetail.css';

function MovieDetail({ peliculas }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { login, username, idToken, userId } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [hasCommented, setHasCommented] = useState(false);

  const loadData = () => {
    import('axios').then(({ default: axios }) => {
      // Cargar Ratings
      axios.get(`https://webapp-react-dsm2026-default-rtdb.europe-west1.firebasedatabase.app/ratings/${id}.json`)
        .then(response => {
          const movieRatings = response.data || {};
          const values = Object.values(movieRatings);
          
          if (login && userId && movieRatings[userId]) {
            setHasVoted(true);
          } else {
            setHasVoted(false);
          }
          
          if (values.length > 0) {
            const sum = values.reduce((a, b) => a + b, 0);
            setAverageRating(sum / values.length);
            setTotalRatings(values.length);
          } else {
            setAverageRating(0);
            setTotalRatings(0);
          }
        })
        .catch(error => console.error('Error al cargar ratings:', error));

      // Cargar Comentarios
      axios.get(`https://webapp-react-dsm2026-default-rtdb.europe-west1.firebasedatabase.app/comments/${id}.json`)
        .then(response => {
          const movieComments = response.data ? Object.values(response.data) : [];
          setComments(movieComments);

          // Verificar si el usuario ya ha comentado
          if (login && username) {
            const userCommented = movieComments.some(c => c.username === username);
            setHasCommented(userCommented);
          } else {
            setHasCommented(false);
          }
        })
        .catch(error => console.error('Error al cargar comentarios:', error));
    });
  };

  useEffect(() => {
    const foundMovie = peliculas.find((p) => p.id === id);
    if (foundMovie) {
      setMovie(foundMovie);
      
      // Comprobar si ya es favorita si hay sesión (vía Firebase)
      if (login && userId) {
        import('axios').then(({ default: axios }) => {
          axios.get(`https://webapp-react-dsm2026-default-rtdb.europe-west1.firebasedatabase.app/favorites/${userId}/${id}.json?auth=${idToken}`)
            .then(response => {
              setIsFavorite(!!response.data);
            })
            .catch(error => console.error('Error al cargar favoritos:', error));
        });
      }

      loadData();
      // Hacer scroll hacia arriba al cambiar de película
      window.scrollTo(0, 0);
    }
  }, [id, peliculas, login, userId, idToken]);

  // Películas recomendadas (misma categoría, excluyendo la actual)
  const recomendaciones = peliculas
    .filter(p => p.categoria === movie?.categoria && p.id !== movie?.id)
    .slice(0, 4);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!login) {
      navigate('/login');
      return;
    }
    if (!newComment.trim() || hasCommented) return;

    const allComments = JSON.parse(localStorage.getItem('comments') || '{}');
    if (!allComments[id]) allComments[id] = [];

    const commentObj = {
      username,
      text: newComment,
      date: new Date().toLocaleDateString()
    };

    allComments[id].push(commentObj);
    localStorage.setItem('comments', JSON.stringify(allComments));
    
    setComments(allComments[id]);
    setNewComment("");
  };

  const handleVote = (rating) => {
    if (!login) {
      navigate('/login');
      return;
    }

    if (hasVoted) return;

    import('axios').then(({ default: axios }) => {
      axios.put(`https://webapp-react-dsm2026-default-rtdb.europe-west1.firebasedatabase.app/ratings/${id}/${userId}.json?auth=${idToken}`, rating)
        .then(() => {
          loadData();
        })
        .catch(error => console.error('Error al votar:', error));
    });
  };

  const toggleFavorite = () => {
    if (!login) {
      navigate('/login');
      return;
    }

    const url = `https://webapp-react-dsm2026-default-rtdb.europe-west1.firebasedatabase.app/favorites/${userId}/${id}.json?auth=${idToken}`;

    import('axios').then(({ default: axios }) => {
      if (isFavorite) {
        // Quitar de favoritos
        axios.delete(url)
          .then(() => setIsFavorite(false))
          .catch(error => console.error('Error al quitar favorito:', error));
      } else {
        // Añadir a favoritos (usamos true para indicar que existe)
        axios.put(url, true)
          .then(() => setIsFavorite(true))
          .catch(error => console.error('Error al añadir favorito:', error));
      }
    });
  };

  if (!movie) {
    return (
      <Container className="mt-5 text-center">
        <h3>Cargando película...</h3>
        <Button variant="primary" onClick={() => navigate('/')}>Volver al inicio</Button>
      </Container>
    );
  }

  return (
    <div className="movie-detail-wrapper">
      {/* Hero Section */}
      <div 
        className="movie-hero" 
        style={{ backgroundImage: `url(${movie.imagen})` }}
      >
        <div className="hero-overlay">
          <Container className="hero-content">
            <h1 className="movie-hero-title">{movie.titulo}</h1>
            <div className="movie-hero-meta mb-3 d-flex align-items-center flex-wrap">
              <div className="stars-container me-2" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = (hoverRating || averageRating) >= star;
                  return (
                    <span 
                      key={star} 
                      className={`star-ui fs-4 ${isActive ? 'active' : 'text-muted'} ${hasVoted ? 'voted' : ''}`}
                      onMouseEnter={() => !hasVoted && setHoverRating(star)}
                      onClick={() => handleVote(star)}
                      style={{ cursor: hasVoted ? 'default' : 'pointer' }}
                      title={hasVoted ? 'Ya has valorado esta película' : `Puntuar con ${star} estrellas`}
                    >
                      {isActive ? '★' : '☆'}
                    </span>
                  );
                })}
              </div>
              <span className="text-warning fw-bold me-3 fs-5">
                {averageRating > 0 ? averageRating.toFixed(1) : '-'}
              </span>
              <span className="text-light me-3 small">({totalRatings} valoraciones)</span>
              {hasVoted && <Badge bg="success" className="me-2 bg-opacity-75">¡Gracias por tu voto!</Badge>}
              <Badge bg="info" className="me-2">{movie.categoria}</Badge>
              <span className="text-light small">2024</span>
            </div>
            <div className="hero-buttons mb-4">
              <Button variant="light" className="me-2 px-4 py-2 fw-bold">
                ▶ Reproducir
              </Button>
              <Button 
                variant={isFavorite ? "warning" : "secondary"} 
                className={`px-4 py-2 fw-bold ${!isFavorite ? 'bg-opacity-50' : ''} border-0`}
                onClick={toggleFavorite}
              >
                {isFavorite ? '❤️ En favoritos' : '⭐ Añadir a favoritos'}
              </Button>
            </div>
            <p className="movie-hero-description">
              {movie.descripcion}
            </p>
          </Container>
        </div>
      </div>

      {/* Additional Info Section */}
      <Container className="py-5">
        <Row>
          <Col md={8}>
            <h3>Sinopsis completa</h3>
            <p className="lead text-light">{movie.descripcion}</p>
            <hr className="bg-secondary" />
            <div className="mt-4">
              <h5 className="mb-3 text-warning">Comentarios ({comments.length})</h5>
              
              {login ? (
                !hasCommented ? (
                  <form onSubmit={handleCommentSubmit} className="mb-4">
                    <div className="form-group mb-2">
                      <textarea 
                        className="form-control bg-dark text-white border-secondary" 
                        rows="3" 
                        placeholder="Escribe tu opinión..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      ></textarea>
                    </div>
                    <Button type="submit" variant="primary" size="sm" className="px-4">Enviar comentario</Button>
                  </form>
                ) : (
                  <Alert variant="info" className="bg-opacity-25 border-info text-info mb-4">
                    <span className="me-2">ℹ️</span> Ya has dejado un comentario en esta película. ¡Gracias por compartir tu opinión!
                  </Alert>
                )
              ) : (
                <Alert variant="secondary" className="bg-opacity-25 border-secondary text-light">
                  Debes <Link to="/login" className="text-warning">iniciar sesión</Link> para dejar un comentario.
                </Alert>
              )}

              <div className="comments-list">
                {comments.length > 0 ? (
                  comments.slice().reverse().map((c, index) => (
                    <div key={index} className="comment-item p-3 mb-2 rounded-3" style={{ background: '#1c1c1c' }}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold text-info">@{c.username}</span>
                        <span className="text-muted small">{c.date}</span>
                      </div>
                      <p className="mb-0 text-light">{c.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted italic">Aún no hay comentarios. ¡Sé el primero en opinar!</p>
                )}
              </div>
            </div>
          </Col>
          <Col md={4} className="ps-md-5">
            <div className="movie-detail-sidebar">
              <h5>Detalles</h5>
              <ul className="list-unstyled text-secondary">
                <li className="mb-2"><strong>Género:</strong> {movie.categoria}</li>
                <li className="mb-2"><strong>Calificación:</strong> ⭐ {averageRating > 0 ? averageRating.toFixed(1) : '-'}</li>
                <li className="mb-2"><strong>Año:</strong> 2024</li>
                <li className="mb-2"><strong>Duración:</strong> 2h 15m (Aprox)</li>
              </ul>
              <Button 
                variant="outline-secondary" 
                className="w-100 mt-3"
                onClick={() => navigate(-1)}
              >
                ← Volver atrás
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Sección de Recomendaciones */}
      {recomendaciones.length > 0 && (
        <div className="recommendations-section bg-light border-top py-5">
          <Container>
            <h3 className="mb-4 fw-bold text-dark">También te puede interesar...</h3>
            <Row xs={1} md={2} lg={4} className="g-4">
              {recomendaciones.map((p) => (
                <Col key={p.id}>
                  <Link to={`/movie/${p.id}`} className="text-decoration-none">
                    <div className="recommendation-card h-100 shadow-sm rounded-3 overflow-hidden">
                      <div className="recommendation-img-wrapper">
                        <img src={p.imagen} alt={p.titulo} className="w-100 h-100 object-fit-cover" />
                      </div>
                      <div className="p-3 bg-white">
                        <h6 className="mb-1 text-dark text-truncate">{p.titulo}</h6>
                        <Badge bg="info" className="small">{p.categoria}</Badge>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
