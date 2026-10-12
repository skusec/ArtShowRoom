import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

import KategorijaService from '../../services/kategorije/KategorijaService';

export default function KategorijaPregled() {

  const [kategorije, setKategorije] = useState([]);

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