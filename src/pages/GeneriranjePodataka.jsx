import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { faker } from '@faker-js/faker';

import RadService from '../services/radovi/RadService';
import KategorijaService from '../services/kategorije/KategorijaService';


export default function GeneriranjePodataka() {

  const [poruka, setPoruka] = useState('');


  async function generirajRadove() {

    const odgovor = await KategorijaService.get();
    const kategorije = odgovor.data;

    if (kategorije.length === 0) {
      setPoruka('Nema kategorija za povezivanje radova.');
      return;
    }

    for (let i = 0; i < 20; i++) {

      const kategorija = faker.helpers.arrayElement(kategorije);

      await RadService.dodaj({
        naziv: faker.lorem.words({ min: 2, max: 4 }),
        kategorijaId: kategorija.id,
        tehnika: faker.helpers.arrayElement([
          'Akril na platnu',
          'Reljefni akril na platnu',
          'Mješovita tehnika',
          'Akril i tekstura na platnu'
        ]),
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