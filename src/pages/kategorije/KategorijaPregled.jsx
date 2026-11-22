import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../constants';

import KategorijaService from '../../services/kategorije/KategorijaService';
import RadService from '../../services/radovi/RadService';
import PotvrdaModal from '../../components/PotvrdaModal';

export default function KategorijaPregled() {

  const [kategorije, setKategorije] = useState([]);
  const [kategorijaZaBrisanje, setKategorijaZaBrisanje] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    ucitajKategorije();
  }, []);

  async function ucitajKategorije() {
    const odgovor = await KategorijaService.get();

    setKategorije(odgovor.data);
  }

  async function obrisi(id) {

    const odgovorRadovi = await RadService.get();

    const radoviKojiKoristeKategoriju = odgovorRadovi.data.filter(
      (rad) => Number(rad.kategorijaId) === Number(id)
    );

    if (radoviKojiKoristeKategoriju.length > 0) {
      alert(
        `Kategoriju nije moguće obrisati jer je koristi ${radoviKojiKoristeKategoriju.length} radova.`
      );

      setKategorijaZaBrisanje(null);
      return;
    }

    await KategorijaService.obrisi(id);

    setKategorijaZaBrisanje(null);

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
                  onClick={() => setKategorijaZaBrisanje(kategorija.id)}
                >
                  Obriši
                </Button>




              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PotvrdaModal
        prikazi={kategorijaZaBrisanje !== null}
        naslov="Brisanje kategorije"
        poruka="Želiš li stvarno obrisati ovu kategoriju?"
        onOdustani={() => setKategorijaZaBrisanje(null)}
        onPotvrdi={() => obrisi(kategorijaZaBrisanje)}
      />
    </>
  );
}