import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import { IME_APLIKACIJE, RouteNames } from '../constants';

import { FaPalette } from 'react-icons/fa';


export default function Izbornik() {



  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" aria-label="Glavna navigacija" className="showroom-navbar">
      <Container>

        <Navbar.Brand as={Link} to={RouteNames.HOME} className="showroom-brand">
          <FaPalette className="showroom-brand-icon" aria-hidden="true" />
          <span>{IME_APLIKACIJE}</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="art-show-room-navbar"
          aria-label="Otvori navigaciju"
        />

        <Navbar.Collapse id="art-show-room-navbar">

          <Nav className="me-auto showroom-nav">

            <Nav.Link as={NavLink} to={RouteNames.HOME}>
              Početna
            </Nav.Link>

            <Nav.Link as={NavLink} to={RouteNames.RADOVI}>
              Radovi
            </Nav.Link>

            <Nav.Link as={NavLink} to={RouteNames.KATEGORIJE}>
              Kategorije
            </Nav.Link>

            <Nav.Link as={NavLink} to={RouteNames.GENERIRANJE_PODATAKA}>
              Generiranje
            </Nav.Link>



            <Nav.Link
              as={NavLink}
              to={RouteNames.RADOVI_NOVI}
              className="showroom-nav-cta"
            >
              Novi rad
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}