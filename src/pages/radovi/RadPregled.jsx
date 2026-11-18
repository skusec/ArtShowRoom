import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import RadService from '../../services/radovi/RadService';
import KategorijaService from '../../services/kategorije/KategorijaService';
import useBreakpoint from '../../hooks/useBreakpoint';
import RadPregledTablica from './RadPregledTablica';
import RadPregledGrid from './RadPregledGrid';


export default function RadPregled() {

  const [radovi, setRadovi] = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [pojamPretrage, setPojamPretrage] = useState('');
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();


  useEffect(() => {
    ucitajRadove();
    ucitajKategorije();
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


  return (
    <>
      <h1>Pregled radova</h1>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Pretraži radove po nazivu ili kategoriji..."
        value={pojamPretrage}
        onChange={(e) => setPojamPretrage(e.target.value)}
      />

      <p>
        Pronađeno radova: {filtriraniRadovi.length}
      </p>

      <hr />


      {['xs', 'sm', 'md'].includes(breakpoint) ? (


        <RadPregledGrid
          radovi={filtriraniRadovi}
          kategorije={kategorije}
          onUredi={(id) => navigate(`/radovi/${id}`)}
          onObrisi={obrisiRad}
        />







      ) : (
        <RadPregledTablica
          radovi={filtriraniRadovi}
          kategorije={kategorije}
          onUredi={(id) => navigate(`/radovi/${id}`)}
          onObrisi={obrisiRad}
        />
      )}

    </>
  );

}
