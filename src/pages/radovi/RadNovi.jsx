import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { RouteNames } from '../../constants';
import RadService from '../../services/radovi/RadService';
import KategorijaService from '../../services/kategorije/KategorijaService';
import { RadSchema } from '../../schemas/RadSchema';
import TehnikaService from '../../services/tehnike/TehnikaService';
import SlikaCropper from '../../components/SlikeCropper';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function RadNovi() {

  const navigate = useNavigate();

  const [dostupan, setDostupan] = useState(false);
  const [kategorije, setKategorije] = useState([]);
  const [tehnike, setTehnike] = useState([]);
  const [odabraneTehnike, setOdabraneTehnike] = useState([]);
  const [slika, setSlika] = useState(null);
  const [slikaZaCrop, setSlikaZaCrop] = useState(null);
  const [greskaNaziv, setGreskaNaziv] = useState('');
  const [greskaCijena, setGreskaCijena] = useState('');
  const [greskaKategorija, setGreskaKategorija] = useState('');
  const [greskaTehnike, setGreskaTehnike] = useState('');
  const [greskaSpremanja, setGreskaSpremanja] = useState('');
  const [greska, setGreska] = useState('');
  const [ucitavanje, setUcitavanje] = useState(true);
  const [spremanje, setSpremanje] = useState(false);


  useEffect(() => {

    let aktivno = true;

    async function ucitajSve() {

      try {

        const [odgovorKategorije, odgovorTehnike] =
          await Promise.all([
            KategorijaService.get(),
            TehnikaService.get()
          ]);

        if (!aktivno) return;

        setKategorije(odgovorKategorije.data);
        setTehnike(odgovorTehnike.data);

      } catch (error) {

        if (!aktivno) return;

        console.error(error);

        setGreska(
          'Došlo je do greške pri učitavanju podataka.'
        );

      } finally {

        if (aktivno) {
          setUcitavanje(false);
        }

      }

    }

    ucitajSve();

    return () => {
      aktivno = false;
    };

  }, []);


  function promijeniOdabirTehnike(id) {

    setOdabraneTehnike((trenutneTehnike) => {

      if (trenutneTehnike.includes(id)) {
        return trenutneTehnike.filter(
          tehnikaId => tehnikaId !== id
        );
      }

      return [...trenutneTehnike, id];

    });

    setGreskaTehnike('');

  }


  function provjeriNaziv(e) {

    const rezultat = RadSchema.shape.naziv.safeParse(
      e.target.value
    );

    if (!rezultat.success) {
      setGreskaNaziv(rezultat.error.issues[0].message);
      return;
    }

    setGreskaNaziv('');

  }


  function provjeriCijenu(e) {

    if (e.target.value === '') {
      setGreskaCijena('Potrebno je unijeti cijenu rada.');
      return;
    }

    const rezultat = RadSchema.shape.cijena.safeParse(
      Number(e.target.value)
    );

    if (!rezultat.success) {
      setGreskaCijena(rezultat.error.issues[0].message);
      return;
    }

    setGreskaCijena('');

  }


  async function dodaj(rad) {

    try {

      setSpremanje(true);
      setGreskaSpremanja('');

      await RadService.dodaj(rad);

      navigate(RouteNames.RADOVI);

    } catch (error) {

      console.error(error);

      setGreskaSpremanja(
        'Došlo je do greške pri spremanju novog rada.'
      );

    } finally {

      setSpremanje(false);

    }

  }


  function obradiSubmit(e) {

    e.preventDefault();

    if (spremanje) return;

    const podaci = new FormData(e.target);
    const unesenaCijena = podaci.get('cijena');

    const radZaDodavanje = {
      naziv: podaci.get('naziv'),
      kategorijaId: Number(podaci.get('kategorijaId')),
      tehnikeIds: odabraneTehnike,
      slika: slika,
      cijena: Number(unesenaCijena),
      dostupan: dostupan
    };

    const rezultat = RadSchema.safeParse(radZaDodavanje);

    setGreskaNaziv('');
    setGreskaCijena('');
    setGreskaKategorija('');
    setGreskaTehnike('');
    setGreskaSpremanja('');

    if (!rezultat.success) {

      rezultat.error.issues.forEach((issue) => {

        if (issue.path[0] === 'naziv') {
          setGreskaNaziv(issue.message);
        } else if (issue.path[0] === 'cijena') {
          setGreskaCijena(issue.message);
        } else if (issue.path[0] === 'kategorijaId') {
          setGreskaKategorija(issue.message);
        } else if (issue.path[0] === 'tehnikeIds') {
          setGreskaTehnike(issue.message);
        } else {
          setGreskaSpremanja(issue.message);
        }

      });

    }

    if (unesenaCijena === '' || unesenaCijena === null) {
      setGreskaCijena('Potrebno je unijeti cijenu rada.');
      return;
    }

    if (!rezultat.success) return;

    dodaj(rezultat.data);

  }


  if (ucitavanje) {
    return (
      <LoadingSpinner poruka="Učitavanje podataka..." />
    );
  }


  if (greska) {
    return (
      <>
        <div
          className="alert alert-danger mt-4"
          role="alert"
        >
          {greska}
        </div>

        <Link
          to={RouteNames.RADOVI}
          className="btn btn-secondary"
        >
          Povratak na pregled radova
        </Link>
      </>
    );
  }


  return (
    <>
      <h1>Novi rad</h1>

      <Form onSubmit={obradiSubmit}>

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
          controlId="kategorija"
        >
          <Form.Label>Kategorija</Form.Label>

          <Form.Select
            name="kategorijaId"
            defaultValue=""
            isInvalid={!!greskaKategorija}
            onChange={() => setGreskaKategorija('')}
            aria-describedby="greskaKategorija"
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

          <Form.Control.Feedback
            type="invalid"
            id="greskaKategorija"
          >
            {greskaKategorija}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group
          as="fieldset"
          className="mb-3 text-start"
          aria-describedby="greskaTehnike"
        >
          <Form.Label as="legend">
            Tehnike
          </Form.Label>

          {tehnike.map((tehnika) => (
            <Form.Check
              key={tehnika.id}
              id={`tehnika-${tehnika.id}`}
              type="checkbox"
              label={tehnika.naziv}
              checked={odabraneTehnike.includes(tehnika.id)}
              onChange={() => promijeniOdabirTehnike(tehnika.id)}
              isInvalid={!!greskaTehnike}
            />
          ))}

          {greskaTehnike && (
            <div
              className="invalid-feedback d-block"
              id="greskaTehnike"
              role="alert"
            >
              {greskaTehnike}
            </div>
          )}
        </Form.Group>


        <Form.Group
          className="mb-3 text-start"
          controlId="cijena"
        >
          <Form.Label>Cijena</Form.Label>

          <Form.Control
            type="number"
            name="cijena"
            step="0.01"
            onBlur={provjeriCijenu}
            isInvalid={!!greskaCijena}
            aria-describedby="greskaCijena"
          />

          <Form.Control.Feedback
            type="invalid"
            id="greskaCijena"
          >
            {greskaCijena}
          </Form.Control.Feedback>
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


        <Form.Group
          className="mb-3 text-start"
          controlId="slika"
        >
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
              <strong>Izrezana slika:</strong>
            </p>

            <img
              src={slika}
              alt="Izrezani prikaz rada"
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
              disabled={spremanje}
            >
              {spremanje
                ? 'Spremanje...'
                : 'Dodaj novi rad'}
            </Button>
          </Col>

        </Row>

      </Form>
    </>
  );

}