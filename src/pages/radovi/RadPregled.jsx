import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import RadService from '../../services/radovi/RadService';
import KategorijaService from '../../services/kategorije/KategorijaService';
import useBreakpoint from '../../hooks/useBreakpoint';
import RadPregledTablica from './RadPregledTablica';
import RadPregledGrid from './RadPregledGrid';
import TehnikaService from '../../services/tehnike/TehnikaService';


export default function RadPregled() {

  const [radovi, setRadovi] = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [tehnike, setTehnike] = useState([]);
  const [pojamPretrage, setPojamPretrage] = useState('');
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState('');
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

    const potvrda = window.confirm(
      'Želiš li stvarno obrisati ovaj rad?'
    );

    if (!potvrda) {
      return;
    }

    await RadService.obrisi(id);

    // Odmah ukloni obrisani rad iz prikaza, bez dodatnog klika na "Radovi"
    setRadovi((trenutniRadovi) =>
      trenutniRadovi.filter((rad) => rad.id !== id)
    );

  }


  if (ucitavanje) {
    return (
      <p className="mt-5">
        Učitavanje radova...
      </p>
    );
  }

  if (greska) {
    return (
      <p className="mt-5 text-danger">
        {greska}
      </p>
    );
  }




  return (
    <>
      <h1>Pregled radova</h1>

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
          onObrisi={obrisiRad}
        />







      ) : (
        <RadPregledTablica
          radovi={filtriraniRadovi}
          kategorije={kategorije}
          tehnike={tehnike}
          onUredi={(id) => navigate(`/radovi/${id}`)}
          onObrisi={obrisiRad}
        />
      )}

    </>
  );

}
