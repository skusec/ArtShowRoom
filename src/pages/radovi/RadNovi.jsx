import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { RouteNames } from '../../constants';
import RadService from '../../services/radovi/RadService';
import KategorijaService from '../../services/kategorije/KategorijaService';


export default function RadNovi() {

  const navigate = useNavigate();

  const [dostupan, setDostupan] = useState(false);
  const [kategorije, setKategorije] = useState([]);

  useEffect(() => {

    async function ucitajKategorije() {

      const odgovor = await KategorijaService.get();

      setKategorije(odgovor.data);

    }

    ucitajKategorije();

  }, []);


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
      kategorijaId: Number(podaci.get('kategorijaId')),
      tehnika: podaci.get('tehnika'),
      cijena: parseFloat(podaci.get('cijena')),
      dostupan: dostupan
    });

  }


  return (
    <>
      <h1>Novi rad</h1>

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
          <Form.Label>Kategorija</Form.Label>

          <Form.Select
            name="kategorijaId"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Odaberi kategoriju
            </option>

            {kategorije.map((kategorija) => (
              <option
                key={kategorija.id}
                value={kategorija.id}
              >
                {kategorija.naziv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3 text-start">
          <Form.Label>Tehnika</Form.Label>

          <Form.Control
            type="text"
            name="tehnika"
            required
          />
        </Form.Group>


        <Form.Group className="mb-3 text-start">
          <Form.Label>Cijena</Form.Label>

          <Form.Control
            type="number"
            name="cijena"
            step="0.01"
            required
          />
        </Form.Group>


        <Form.Group
          className="mb-3 text-start d-flex align-items-center gap-2"
          controlId="dostupan"
        >
          <Form.Label className="mb-0">
            Dostupan
          </Form.Label>

          <Form.Check.Input
            type="checkbox"
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