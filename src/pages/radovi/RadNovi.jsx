import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { RouteNames } from '../../constants';
import RadService from '../../services/RadService';


export default function RadNovi() {

  const navigate = useNavigate();

  const [dostupan, setDostupan] = useState(false);


  async function dodaj(rad) {

    await RadService.dodaj(rad).then(() => {

      navigate(RouteNames.RADOVI);

    });

  }


  function obradiSubmit(e) {

    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
      naziv: podaci.get('naziv'),
      kategorija: podaci.get('kategorija'),
      tehnika: podaci.get('tehnika'),
      cijena: parseFloat(podaci.get('cijena')),
      dostupan: dostupan
    });

  }


  return (
    <>
      <h1>Novi rad</h1>

      <Form onSubmit={obradiSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Naziv</Form.Label>

          <Form.Control
            type="text"
            name="naziv"
            required
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Kategorija</Form.Label>

          <Form.Control
            type="text"
            name="kategorija"
            required
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Tehnika</Form.Label>

          <Form.Control
            type="text"
            name="tehnika"
            required
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Cijena</Form.Label>

          <Form.Control
            type="number"
            name="cijena"
            step="0.01"
            required
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Dostupan"
            checked={dostupan}
            onChange={(e) => setDostupan(e.target.checked)}
          />
        </Form.Group>


        <Row className="mt-4">

          <Col>
            <Link
              to={RouteNames.RADOVI}
              className="btn btn-danger"
            >
              Odustani
            </Link>
          </Col>

          <Col>
            <Button
              type="submit"
              variant="success"
            >
              Dodaj novi rad
            </Button>
          </Col>

        </Row>

      </Form>
    </>
  );

}