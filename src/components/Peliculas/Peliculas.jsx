import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Pelicula from './Pelicula';

function Peliculas({ peliculas }) {
  return (
    <Container className="my-4">
      <Row xs={1} md={2} lg={4} className="g-4">
        {peliculas.map((p) => (
          <Col key={p.id}>
            <Pelicula 
              id={p.id}
              titulo={p.titulo}
              imagen={p.imagen}
              descripcion={p.descripcion}
              categoria={p.categoria}
              nota={p.nota}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Peliculas;
