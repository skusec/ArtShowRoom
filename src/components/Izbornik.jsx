import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { DATA_SOURCE, IME_APLIKACIJE, RouteNames } from '../constants';

import { FaMemory } from 'react-icons/fa';
import { GrStatusUnknown, GrVirtualStorage } from 'react-icons/gr';

export default function Izbornik() {

  function izvor() {
    switch (DATA_SOURCE) {
      case 'memorija':
        return <FaMemory title="Memorija" />;

      case 'localStorage':
        return <GrVirtualStorage title="Local storage" />;

      default:
        return <GrStatusUnknown title="Nepoznato" />;
    }
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>

        <Navbar.Brand as={Link} to={RouteNames.HOME}>
          {izvor()} {IME_APLIKACIJE}
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

            <Nav.Link as={Link} to={RouteNames.KATEGORIJE}>
              Kategorije
            </Nav.Link>

            <Nav.Link as={Link} to={RouteNames.GENERIRANJE_PODATAKA}>
              Generiranje
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