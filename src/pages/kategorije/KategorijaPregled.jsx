import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../constants';

import KategorijaService from '../../services/kategorije/KategorijaService';

export default function KategorijaPregled() {

  const [kategorije, setKategorije] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    ucitajKategorije();
  }, []);

  async function ucitajKategorije() {
    const odgovor = await KategorijaService.get();

    setKategorije(odgovor.data);
  }

  async function obrisi(id) {
    const potvrda = window.confirm(
      'Želiš li stvarno obrisati ovu kategoriju?'
    );

    if (!potvrda) {
      return;
    }

    await KategorijaService.obrisi(id);

    ucitajKategorije();
  }

  return (
    <>
      <h1>Pregled kategorija</h1>

      <Link
        to={RouteNames.KATEGORIJE_NOVI}
        className="btn btn-success w-100 my-3"
      >
        Dodaj novu kategoriju
      </Link>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {kategorije.map((kategorija) => (
            <tr key={kategorija.id}>
              <td>{kategorija.id}</td>
              <td>{kategorija.naziv}</td>
              <td>{kategorija.opis}</td>

              <td>

                <Button
                  variant="warning"
                  onClick={() => navigate(`/kategorije/${kategorija.id}`)}
                >
                  Uredi
                </Button>

                {' '}




                <Button
                  variant="danger"
                  onClick={() => obrisi(kategorija.id)}
                >
                  Obriši
                </Button>




              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}