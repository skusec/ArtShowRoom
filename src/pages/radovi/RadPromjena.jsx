import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { RouteNames } from '../../constants';
import RadService from '../../services/radovi/RadService';
import KategorijaService from '../../services/kategorije/KategorijaService';
import { RadSchema } from '../../schemas/RadSchema';
import TehnikaService from '../../services/tehnike/TehnikaService';
import SlikaCropper from '../../components/SlikeCropper';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function RadPromjena() {

  const navigate = useNavigate();
  const params = useParams();

  const [rad, setRad] = useState(null);
  const [dostupan, setDostupan] = useState(false);
  const [kategorije, setKategorije] = useState([]);
  const [tehnike, setTehnike] = useState([]);
  const [odabraneTehnike, setOdabraneTehnike] = useState([]);
  const [slika, setSlika] = useState(null);
  const [slikaZaCrop, setSlikaZaCrop] = useState(null);


  useEffect(() => {

    async function ucitajRad() {

      await RadService.getById(params.id).then((odgovor) => {

        setRad(odgovor.data);
        setDostupan(odgovor.data.dostupan);
        setOdabraneTehnike(
          (odgovor.data.tehnikeIds || []).map(Number)
        );
        setSlika(odgovor.data.slika || null);
      });



    }

    ucitajRad();

    async function ucitajKategorije() {

      const odgovor = await KategorijaService.get();

      setKategorije(odgovor.data);

    }

    ucitajKategorije();

    async function ucitajTehnike() {

      const odgovor = await TehnikaService.get();

      setTehnike(odgovor.data);

    }

    ucitajTehnike();

  }, [params.id]);


  function promijeniOdabirTehnike(id) {
    setOdabraneTehnike((trenutneTehnike) => {

      if (trenutneTehnike.includes(id)) {
        return trenutneTehnike.filter(
          tehnikaId => tehnikaId !== id
        );
      }

      return [...trenutneTehnike, id];
    });
  }


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

    const radZaPromjenu = {
      naziv: podaci.get('naziv'),
      kategorijaId: Number(podaci.get('kategorijaId')),
      tehnikeIds: odabraneTehnike,
      slika: slika,
      cijena: Number(podaci.get('cijena')),
      dostupan: dostupan
    };

    const rezultat = RadSchema.safeParse(radZaPromjenu);

    if (!rezultat.success) {
      alert(rezultat.error.issues[0].message);
      return;
    }

    promijeni(rezultat.data);
  }


  if (!rad) {
    return (
      <LoadingSpinner poruka="Učitavanje rada..." />
    );
  }


  return (
    <>
      <h1>Promjena rada</h1>

      <Form onSubmit={obradiSubmit}>

        <Form.Group className="mb-3 text-start">
          <Form.Label>Naziv</Form.Label>

          <Form.Control
            type="text"
            name="naziv"
            defaultValue={rad.naziv}
          />
        </Form.Group>


        <Form.Group className="mb-3 text-start">
          <Form.Label>Kategorija</Form.Label>

          <Form.Select
            name="kategorijaId"
            defaultValue={rad.kategorijaId}
            required
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
          <Form.Label>Tehnike</Form.Label>

          {tehnike.map((tehnika) => (
            <Form.Check
              key={tehnika.id}
              type="checkbox"
              label={tehnika.naziv}
              checked={odabraneTehnike.includes(tehnika.id)}
              onChange={() => promijeniOdabirTehnike(tehnika.id)}
            />
          ))}
        </Form.Group>


        <Form.Group className="mb-3 text-start">
          <Form.Label>Cijena</Form.Label>

          <Form.Control
            type="number"
            name="cijena"
            step="0.01"
            defaultValue={rad.cijena}
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


        <Form.Group className="mb-3 text-start">
          <Form.Label>Slika rada</Form.Label>

          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => {
              const datoteka = e.target.files?.[0];

              if (!datoteka) {
                return;
              }

              const reader = new FileReader();

              reader.onload = () => {
                setSlikaZaCrop(reader.result);
              };

              reader.readAsDataURL(datoteka);
            }}
          />
        </Form.Group>

        <SlikaCropper
          slika={slikaZaCrop}
          onSpremi={(izrezanaSlika) => {
            setSlika(izrezanaSlika);
            setSlikaZaCrop(null);
          }}
        />

        {slika && !slikaZaCrop && (
          <div className="mb-3 text-start">
            <p className="mb-2">
              <strong>Trenutna slika:</strong>
            </p>

            <img
              src={slika}
              alt="Trenutna slika rada"
              style={{
                maxWidth: '300px',
                width: '100%',
                height: 'auto'
              }}
            />
          </div>
        )}



        <Row className="mt-4">

          <Col
            xs={12}
            md={6}
            className="mb-2 mb-md-0 text-start"
          >
            <Link
              to={RouteNames.RADOVI}
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
