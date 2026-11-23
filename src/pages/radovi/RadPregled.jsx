import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import RadService from '../../services/radovi/RadService';
import KategorijaService from '../../services/kategorije/KategorijaService';
import useBreakpoint from '../../hooks/useBreakpoint';
import RadPregledTablica from './RadPregledTablica';
import RadPregledGrid from './RadPregledGrid';
import TehnikaService from '../../services/tehnike/TehnikaService';
import LoadingSpinner from '../../components/LoadingSpinner';
import PotvrdaModal from '../../components/PotvrdaModal';
import RadDetaljiModal from '../../components/RadDetaljiModal';


export default function RadPregled() {

  const [radovi, setRadovi] = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [tehnike, setTehnike] = useState([]);
  const [pojamPretrage, setPojamPretrage] = useState('');
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState('');
  const [poruka, setPoruka] = useState('');
  const [radZaBrisanje, setRadZaBrisanje] = useState(null);
  const [odabraniRad, setOdabraniRad] = useState(null);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();


  useEffect(() => {

    async function ucitajSve() {

      try {
        setUcitavanje(true);
        setGreska('');

        await Promise.all([
          ucitajRadove(),
          ucitajKategorije(),
          ucitajTehnike()
        ]);

      } catch (error) {

        console.error(error);

        setGreska(
          'Došlo je do greške pri učitavanju radova.'
        );

      } finally {

        setUcitavanje(false);

      }

    }

    ucitajSve();

  }, []);

  const filtriraniRadovi = radovi.filter((rad) => {

    const nazivKategorije = kategorije.find(
      (kategorija) =>
        kategorija.id === Number(rad.kategorijaId)
    )?.naziv || '';

    const pojam = pojamPretrage.toLowerCase();

    return (
      rad.naziv.toLowerCase().includes(pojam) ||
      nazivKategorije.toLowerCase().includes(pojam)
    );

  });


  async function ucitajRadove() {

    const odgovor = await RadService.get();

    // Nova kopija arraya da React uvijek registrira promjenu
    setRadovi([...odgovor.data]);

  }

  async function ucitajKategorije() {

    const odgovor = await KategorijaService.get();

    setKategorije(odgovor.data);

  }

  async function ucitajTehnike() {

    const odgovor = await TehnikaService.get();

    setTehnike(odgovor.data);

  }


  async function obrisiRad(id) {

    await RadService.obrisi(id);

    setPoruka('Rad je uspješno obrisan.');

    setRadovi((trenutniRadovi) =>
      trenutniRadovi.filter((rad) => rad.id !== id)
    );

    setRadZaBrisanje(null);

  }


  if (ucitavanje) {
    return (
      <LoadingSpinner poruka="Učitavanje radova..." />
    );
  }

  if (greska) {
    return (
      <p
        className="mt-5 text-danger"
        role="alert"
      >
        {greska}
      </p>
    );
  }




  return (
    <>
      <h1>Pregled radova</h1>

      {poruka && (
        <div
          className="alert alert-success"
          role="status"
          aria-live="polite"
        >
          {poruka}
        </div>
      )}

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Pretraži radove po nazivu ili kategoriji..."
        aria-label="Pretraži radove"
        value={pojamPretrage}
        onChange={(e) => setPojamPretrage(e.target.value)}
      />

      <p
        aria-live="polite"
        role="status"
      >
        Pronađeno radova: {filtriraniRadovi.length}
      </p>

      <hr />

      {filtriraniRadovi.length === 0 && (
        <p className="mt-4">
          Nema radova koji odgovaraju pretrazi.
        </p>
      )}

      {['xs', 'sm', 'md'].includes(breakpoint) ? (


        <RadPregledGrid
          radovi={filtriraniRadovi}
          kategorije={kategorije}
          tehnike={tehnike}
          onUredi={(id) => navigate(`/radovi/${id}`)}
          onObrisi={(id) => setRadZaBrisanje(id)}
          onDetalji={(rad) => setOdabraniRad(rad)}
        />







      ) : (
        <RadPregledTablica
          radovi={filtriraniRadovi}
          kategorije={kategorije}
          tehnike={tehnike}
          onUredi={(id) => navigate(`/radovi/${id}`)}
          onObrisi={(id) => setRadZaBrisanje(id)}
          onDetalji={(rad) => setOdabraniRad(rad)}
        />
      )}

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
        prikazi={radZaBrisanje !== null}
        naslov="Brisanje rada"
        poruka="Želiš li stvarno obrisati ovaj rad?"
        onOdustani={() => setRadZaBrisanje(null)}
        onPotvrdi={() => obrisiRad(radZaBrisanje)}
      />

    </>
  );

}
