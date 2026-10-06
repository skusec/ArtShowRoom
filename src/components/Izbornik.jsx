import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { RouteNames } from '../constants';

export default function Izbornik() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>

        <Navbar.Brand as={Link} to={RouteNames.HOME}>
          Art Show Room
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="art-show-room-navbar" />

        <Navbar.Collapse id="art-show-room-navbar">

          <Nav className="me-auto">

            <Nav.Link as={Link} to={RouteNames.HOME}>
              Početna
            </Nav.Link>

            <Nav.Link as={Link} to={RouteNames.RADOVI}>
              Radovi
            </Nav.Link>

            <Nav.Link as={Link} to={RouteNames.RADOVI_NOVI}>
              Novi rad
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}