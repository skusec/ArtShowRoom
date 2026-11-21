import { useEffect, useState } from 'react';

import RadService from '../services/radovi/RadService';
import KategorijaService from '../services/kategorije/KategorijaService';
import { Link } from 'react-router-dom';
import { RouteNames } from '../constants';


export default function Home() {

  const [radovi, setRadovi] = useState([]);
  const [kategorije, setKategorije] = useState([]);


  useEffect(() => {

    async function ucitajPodatke() {

      const odgovorRadovi = await RadService.get();
      const odgovorKategorije = await KategorijaService.get();

      setRadovi(odgovorRadovi.data);
      setKategorije(odgovorKategorije.data);

    }

    ucitajPodatke();

  }, []);


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

        <div className="home-gallery-grid">

          {radovi.map((rad) => (

            <article
              key={rad.id}
              className="home-art-card"
            >

              <div className="home-art-card-image">

                {rad.id === 1 && (
                  <img
                    src="/images/korijen-pamcenja.webp"
                    alt="Korijen pamćenja"
                  />
                )}

                {rad.id === 2 && (
                  <img
                    src="/images/bijeli-konj.webp"
                    alt="Bijeli konj"
                  />
                )}

                {rad.id === 3 && (
                  <img
                    src="/images/sapat-magle.webp"
                    alt="Šapat magle"
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