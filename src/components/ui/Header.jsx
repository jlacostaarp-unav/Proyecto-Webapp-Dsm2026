import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router';
import AuthContext from '../../store/AuthContext';

function Header() {
  const authCtx = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🎬 CineApp DSM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/movies">Películas</Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">Favoritos</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contacto</Nav.Link>
          </Nav>
          <Nav>
            {authCtx.login ? (
              <Button variant="outline-light">Cerrar Sesión</Button>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Registro</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
