import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { RouteNames } from '../../constants';
import KategorijaService from '../../services/kategorije/KategorijaService';


export default function KategorijaNovi() {

  const navigate = useNavigate();


  async function dodaj(kategorija) {

    await KategorijaService.dodaj(kategorija).then(() => {

      navigate(RouteNames.KATEGORIJE);

    });

  }


  function obradiSubmit(e) {

    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
      naziv: podaci.get('naziv'),
      opis: podaci.get('opis')
    });

  }


  return (
    <>
      <h1>Nova kategorija</h1>

      <Form onSubmit={obradiSubmit}>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Naziv</Form.Label>

          <Form.Control
            type="text"
            name="naziv"
            required
          />
        </Form.Group>


        <Form.Group className="mb-3 text-start">
          <Form.Label>Opis</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            name="opis"
            required
          />
        </Form.Group>


        <Row className="mt-4">

          <Col
            xs={12}
            md={6}
            className="mb-2 mb-md-0 text-start"
          >
            <Link
              to={RouteNames.KATEGORIJE}
              className="btn btn-danger"
            >
              Odustani
            </Link>
          </Col>

          <Col
            xs={12}
            md={6}
            className="text-start text-md-end"
          >
            <Button
              type="submit"
              variant="success"
            >
              Dodaj novu kategoriju
            </Button>
          </Col>

        </Row>

      </Form>
    </>
  );

}