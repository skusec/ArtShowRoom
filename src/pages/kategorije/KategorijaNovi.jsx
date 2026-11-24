import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { RouteNames } from '../../constants';
import KategorijaService from '../../services/kategorije/KategorijaService';
import { KategorijaSchema } from '../../schemas/KategorijaSchema';


export default function KategorijaNovi() {

  const navigate = useNavigate();

  const [greskaNaziv, setGreskaNaziv] = useState('');
  const [greskaOpis, setGreskaOpis] = useState('');
  const [greskaSpremanja, setGreskaSpremanja] = useState('');
  const [spremanje, setSpremanje] = useState(false);


  function provjeriNaziv(e) {

    const rezultat = KategorijaSchema.shape.naziv.safeParse(
      e.target.value
    );

    if (!rezultat.success) {
      setGreskaNaziv(rezultat.error.issues[0].message);
      return;
    }

    setGreskaNaziv('');

  }


  function provjeriOpis(e) {

    const rezultat = KategorijaSchema.shape.opis.safeParse(
      e.target.value
    );

    if (!rezultat.success) {
      setGreskaOpis(rezultat.error.issues[0].message);
      return;
    }

    setGreskaOpis('');

  }


  async function dodaj(kategorija) {

    try {

      setSpremanje(true);
      setGreskaSpremanja('');

      await KategorijaService.dodaj(kategorija);

      navigate(RouteNames.KATEGORIJE);

    } catch (error) {

      console.error(error);

      setGreskaSpremanja(
        'Došlo je do greške pri spremanju nove kategorije.'
      );

    } finally {

      setSpremanje(false);

    }

  }


  function obradiSubmit(e) {

    e.preventDefault();

    if (spremanje) return;

    const podaci = new FormData(e.target);

    const kategorijaZaDodavanje = {
      naziv: podaci.get('naziv'),
      opis: podaci.get('opis')
    };

    const rezultat =
      KategorijaSchema.safeParse(kategorijaZaDodavanje);

    setGreskaNaziv('');
    setGreskaOpis('');
    setGreskaSpremanja('');

    if (!rezultat.success) {

      rezultat.error.issues.forEach((issue) => {

        if (issue.path[0] === 'naziv') {
          setGreskaNaziv(issue.message);
        } else if (issue.path[0] === 'opis') {
          setGreskaOpis(issue.message);
        } else {
          setGreskaSpremanja(issue.message);
        }

      });

      return;

    }

    dodaj(rezultat.data);

  }


  return (
    <>
      <h1>Nova kategorija</h1>

      <Form onSubmit={obradiSubmit} noValidate>

        {greskaSpremanja && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {greskaSpremanja}
          </div>
        )}


        <Form.Group
          className="mb-3 text-start"
          controlId="naziv"
        >
          <Form.Label>Naziv</Form.Label>

          <Form.Control
            type="text"
            name="naziv"
            required
            onBlur={provjeriNaziv}
            isInvalid={!!greskaNaziv}
            aria-describedby="greskaNaziv"
          />

          <Form.Control.Feedback
            type="invalid"
            id="greskaNaziv"
          >
            {greskaNaziv}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group
          className="mb-3 text-start"
          controlId="opis"
        >
          <Form.Label>Opis</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            name="opis"
            required
            onBlur={provjeriOpis}
            isInvalid={!!greskaOpis}
            aria-describedby="greskaOpis"
          />

          <Form.Control.Feedback
            type="invalid"
            id="greskaOpis"
          >
            {greskaOpis}
          </Form.Control.Feedback>
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
              disabled={spremanje}
            >
              {spremanje
                ? 'Spremanje...'
                : 'Dodaj novu kategoriju'}
            </Button>
          </Col>

        </Row>

      </Form>
    </>
  );

}