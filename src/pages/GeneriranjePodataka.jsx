import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { faker } from '@faker-js/faker';

import RadService from '../services/radovi/RadService';
import KategorijaService from '../services/kategorije/KategorijaService';
import TehnikaService from '../services/tehnike/TehnikaService';


export default function GeneriranjePodataka() {

  const [poruka, setPoruka] = useState('');


  async function generirajRadove() {

    const odgovor = await KategorijaService.get();
    const kategorije = odgovor.data;
    const odgovorTehnike = await TehnikaService.get();
    const tehnike = odgovorTehnike.data;

    if (kategorije.length === 0) {
      setPoruka('Nema kategorija za povezivanje radova.');
      return;
    }

    if (tehnike.length === 0) {
      setPoruka('Nema tehnika za povezivanje radova.');
      return;
    }

    for (let i = 0; i < 20; i++) {

      const kategorija = faker.helpers.arrayElement(kategorije);

      const brojTehnika = faker.number.int({
        min: 1,
        max: Math.min(3, tehnike.length)
      });

      const odabraneTehnike = faker.helpers
        .shuffle([...tehnike])
        .slice(0, brojTehnika);

      await RadService.dodaj({
        naziv: faker.lorem.words({ min: 2, max: 4 }),
        kategorijaId: kategorija.id,
        tehnikeIds: odabraneTehnike.map(
          (tehnika) => tehnika.id
        ),
        cijena: faker.number.int({
          min: 100,
          max: 600
        }),
        dostupan: faker.datatype.boolean()
      });

    }

    setPoruka('Generirano je 20 testnih radova.');

  }


  return (
    <>
      <h1>Generiranje podataka</h1>

      <Button
        variant="primary"
        onClick={generirajRadove}
      >
        Generiraj 20 radova
      </Button>

      {poruka && (
        <p className="mt-3">
          {poruka}
        </p>
      )}
    </>
  );

}