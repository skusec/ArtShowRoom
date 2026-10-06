import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { RouteNames } from '../../constants';
import RadService from '../../services/RadService';


export default function RadPromjena() {

  const navigate = useNavigate();
  const params = useParams();

  const [rad, setRad] = useState(null);
  const [dostupan, setDostupan] = useState(false);


  useEffect(() => {

    async function ucitajRad() {

      await RadService.getById(params.id).then((odgovor) => {

        setRad(odgovor.data);
        setDostupan(odgovor.data.dostupan);

      });

    }

    ucitajRad();

  }, [params.id]);


  async function promijeni(radZaPromjenu) {

    await RadService.promijeni(
      params.id,
      radZaPromjenu
    ).then(() => {

      navigate(RouteNames.RADOVI);

    });

  }


  function obradiSubmit(e) {

    e.preventDefault();

    const podaci = new FormData(e.target);

    promijeni({
      naziv: podaci.get('naziv'),
      kategorija: podaci.get('kategorija'),
      tehnika: podaci.get('tehnika'),
      cijena: parseFloat(podaci.get('cijena')),
      dostupan: dostupan
    });

  }

  


  if (!rad) {
    return <p>Učitavanje rada...</p>;
  }


  return (
    <>
      <h1>Promjena rada</h1>

      <Form onSubmit={obradiSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Naziv</Form.Label>

          <Form.Control
            type="text"
            name="naziv"
            defaultValue={rad.naziv}
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Kategorija</Form.Label>

          <Form.Control
            type="text"
            name="kategorija"
            defaultValue={rad.kategorija}
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Tehnika</Form.Label>

          <Form.Control
            type="text"
            name="tehnika"
            defaultValue={rad.tehnika}
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Cijena</Form.Label>

          <Form.Control
            type="number"
            name="cijena"
            step="0.01"
            defaultValue={rad.cijena}
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
              Spremi promjene
            </Button>
          </Col>

        </Row>

      </Form>
    </>
  );

}