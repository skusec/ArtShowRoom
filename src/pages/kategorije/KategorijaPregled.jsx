import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../constants';

import KategorijaService from '../../services/kategorije/KategorijaService';
import RadService from '../../services/radovi/RadService';
import PotvrdaModal from '../../components/PotvrdaModal';
import KategorijaRadoviModal from '../../components/KategorijaRadoviModal';
import TehnikaService from '../../services/tehnike/TehnikaService';
import RadDetaljiModal from '../../components/RadDetaljiModal';

export default function KategorijaPregled() {

  const [kategorije, setKategorije] = useState([]);
  const [kategorijaZaBrisanje, setKategorijaZaBrisanje] = useState(null);
  const [radovi, setRadovi] = useState([]);
  const [odabranaKategorija, setOdabranaKategorija] = useState(null);
  const [tehnike, setTehnike] = useState([]);
  const [odabraniRad, setOdabraniRad] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    ucitajKategorije();
    ucitajRadove();
    ucitajTehnike();
  }, []);

  async function ucitajKategorije() {
    const odgovor = await KategorijaService.get();

    setKategorije(odgovor.data);
  }

  async function ucitajRadove() {
    const odgovor = await RadService.get();

    setRadovi(odgovor.data);
  }

  async function ucitajTehnike() {
    const odgovor = await TehnikaService.get();

    setTehnike(odgovor.data);
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
        <caption className="visually-hidden">
          Popis kategorija umjetničkih radova
        </caption>
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
              <td>
                <button
                  type="button"
                  className="kategorija-naziv-link"
                  onClick={() => setOdabranaKategorija(kategorija)}
                  aria-label={`Prikaži radove kategorije ${kategorija.naziv}`}
                >
                  {kategorija.naziv}
                </button>
              </td>
              <td>{kategorija.opis}</td>

              <td>

                <Button
                  variant="warning"
                  onClick={() => navigate(`/kategorije/${kategorija.id}`)}
                  aria-label={`Uredi kategoriju ${kategorija.naziv}`}
                >
                  Uredi
                </Button>

                {' '}




                <Button
                  variant="danger"
                  onClick={() => setKategorijaZaBrisanje(kategorija.id)}
                  aria-label={`Obriši kategoriju ${kategorija.naziv}`}
                >
                  Obriši
                </Button>




              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <KategorijaRadoviModal
        prikazi={odabranaKategorija !== null}
        kategorija={odabranaKategorija}
        radovi={radovi}
        onZatvori={() => setOdabranaKategorija(null)}
        onOdaberiRad={(rad) => {
          setOdabranaKategorija(null);
          setOdabraniRad(rad);
        }}
      />

      <RadDetaljiModal
        prikazi={odabraniRad !== null}
        rad={odabraniRad}
        kategorije={kategorije}
        tehnike={tehnike}
        onZatvori={() => setOdabraniRad(null)}
        onUredi={(id) => {
          setOdabraniRad(null);
          navigate(`/radovi/${id}`);
        }}
      />


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