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
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();


  useEffect(() => {
    ucitajRadove();
    ucitajKategorije();
  }, []);


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

      <hr />


      {['xs', 'sm', 'md'].includes(breakpoint) ? (
        <RadPregledGrid
          radovi={radovi}
          kategorije={kategorije}
          onUredi={(id) => navigate(`/radovi/${id}`)}
          onObrisi={obrisiRad}
        />
      ) : (
        <RadPregledTablica
          radovi={radovi}
          kategorije={kategorije}
          onUredi={(id) => navigate(`/radovi/${id}`)}
          onObrisi={obrisiRad}
        />
      )}

    </>
  );

}
