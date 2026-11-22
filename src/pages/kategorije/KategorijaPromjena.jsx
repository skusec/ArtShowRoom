import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { RouteNames } from '../../constants';
import KategorijaService from '../../services/kategorije/KategorijaService';
import { KategorijaSchema } from '../../schemas/KategorijaSchema';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function KategorijaPromjena() {

  const navigate = useNavigate();
  const params = useParams();

  const [kategorija, setKategorija] = useState(null);


  useEffect(() => {

    async function ucitajKategoriju() {

      await KategorijaService.getById(params.id).then((odgovor) => {

        setKategorija(odgovor.data);

      });

    }

    ucitajKategoriju();

  }, [params.id]);


  async function promijeni(kategorijaZaPromjenu) {

    await KategorijaService.promijeni(
      params.id,
      kategorijaZaPromjenu
    ).then(() => {

      navigate(RouteNames.KATEGORIJE);

    });

  }


  function obradiSubmit(e) {

    e.preventDefault();

    const podaci = new FormData(e.target);

    const kategorijaZaPromjenu = {
      naziv: podaci.get('naziv'),
      opis: podaci.get('opis')
    };

    const rezultat = KategorijaSchema.safeParse(kategorijaZaPromjenu);

    if (!rezultat.success) {
      alert(rezultat.error.issues[0].message);
      return;
    }

    promijeni(rezultat.data);

  }


  if (!kategorija) {
    return (
      <LoadingSpinner poruka="Učitavanje kategorije..." />
    );
  }


  return (
    <>
      <h1>Promjena kategorije</h1>

      <Form onSubmit={obradiSubmit}>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Naziv</Form.Label>

          <Form.Control
            type="text"
            name="naziv"
            defaultValue={kategorija.naziv}
            required
          />
        </Form.Group>


        <Form.Group className="mb-3 text-start">
          <Form.Label>Opis</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            name="opis"
            defaultValue={kategorija.opis}
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
              Spremi promjene
            </Button>
          </Col>

        </Row>

      </Form>
    </>
  );

}