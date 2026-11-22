import { useEffect, useState } from 'react';

import RadService from '../services/radovi/RadService';
import KategorijaService from '../services/kategorije/KategorijaService';
import { Link } from 'react-router-dom';
import { RouteNames } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';


export default function Home() {

  const [radovi, setRadovi] = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [odabranaKategorija, setOdabranaKategorija] = useState('sve');
  const [ucitavanje, setUcitavanje] = useState(true);
  const [greska, setGreska] = useState('');


  useEffect(() => {

    async function ucitajPodatke() {

      try {
        setUcitavanje(true);
        setGreska('');

        const odgovorRadovi = await RadService.get();
        const odgovorKategorije = await KategorijaService.get();

        setRadovi(odgovorRadovi.data);
        setKategorije(odgovorKategorije.data);

      } catch (error) {

        console.error(error);

        setGreska(
          'Došlo je do greške pri učitavanju galerije.'
        );

      } finally {

        setUcitavanje(false);

      }

    }

    ucitajPodatke();

  }, []);

  const filtriraniRadovi = odabranaKategorija === 'sve'
    ? radovi
    : radovi.filter(
      (rad) => rad.kategorijaId === Number(odabranaKategorija)
    );


  if (ucitavanje) {
    return (
      <LoadingSpinner poruka="Učitavanje galerije..." />
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
      <section className="home-hero">

        <p className="home-hero-kicker">
          ART SHOW ROOM
        </p>

        <h1>
          Umjetnost koja ostavlja trag.
        </h1>

        <p className="home-hero-opis">
          Digitalni prostor za istraživanje umjetničkih djela,
          različitih tehnika, tekstura i vizualnih motiva.
        </p>

        <Link
          to={RouteNames.RADOVI}
          className="btn btn-dark mt-3"
        >
          Pogledaj galeriju
        </Link>

      </section>

      <section className="home-gallery">

        <div className="home-gallery-header">
          <p className="home-hero-kicker">
            ODABRANI RADOVI
          </p>

          <h2>
            Istraži kolekciju
          </h2>
        </div>


        <div className="home-gallery-filters">

          <button
            type="button"
            className={
              odabranaKategorija === 'sve'
                ? 'active'
                : ''
            }
            aria-pressed={odabranaKategorija === 'sve'}
            onClick={() => setOdabranaKategorija('sve')}
          >
            Sve
          </button>

          {kategorije.map((kategorija) => (
            <button
              key={kategorija.id}
              type="button"
              className={
                odabranaKategorija === String(kategorija.id)
                  ? 'active'
                  : ''
              }
              aria-pressed={
                odabranaKategorija === String(kategorija.id)
              }
              onClick={() =>
                setOdabranaKategorija(String(kategorija.id))
              }
            >
              {kategorija.naziv}
            </button>
          ))}

        </div>





        <div className="home-gallery-grid">

          {filtriraniRadovi.length === 0 && (
            <p className="home-gallery-empty">
              Trenutno nema radova u odabranoj kategoriji.
            </p>
          )}



          {filtriraniRadovi.map((rad) => (

            <article
              key={rad.id}
              className="home-art-card"
            >

              <div className="home-art-card-image">

                {rad.slika && (
                  <img
                    src={rad.slika}
                    alt={rad.naziv}
                  />
                )}

              </div>

              <div className="home-art-card-content">

                <h3>
                  {rad.naziv}
                </h3>

                <p>
                  {
                    kategorije.find(
                      (kategorija) =>
                        kategorija.id === Number(rad.kategorijaId)
                    )?.naziv
                  }
                </p>

              </div>

            </article>

          ))}

        </div>

      </section>
    </>
  );

}