const radovi = [
  {
    id: 1,
    naziv: 'Korijen pamćenja',
    kategorija: 'Reljef i tekstura',
    cijena: 250,
    tehnika: 'Akril i reljefni akril na platnu',
    dostupan: true
  },
  {
    id: 2,
    naziv: 'Bijeli konj',
    kategorija: 'Životinje',
    cijena: 220,
    tehnika: 'Reljefni akril na platnu',
    dostupan: true
  },
  {
    id: 3,
    naziv: 'Šapat magle',
    kategorija: 'Pejzaži i atmosfera',
    cijena: 180,
    tehnika: 'Akril na platnu',
    dostupan: false
  }
];

function get() {
  return Promise.resolve({
    data: radovi
  });
}

function getById(id) {

  const rad = radovi.find(
    rad => rad.id === Number(id)
  );

  return Promise.resolve({
    data: rad
  });
}

function promijeni(id, noviRad) {

    const index = radovi.findIndex(
        rad => rad.id === Number(id)
    );

    if (index === -1) {
        return Promise.reject('Rad nije pronađen');
    }

    radovi[index] = {
        ...radovi[index],
        ...noviRad,
        id: Number(id)
    };

    return Promise.resolve({
        data: radovi[index]
    });
}

function dodaj(noviRad) {

    const noviId = Math.max(
        ...radovi.map(rad => rad.id),
        0
    ) + 1;

    const rad = {
        id: noviId,
        ...noviRad
    };

    radovi.push(rad);

    return Promise.resolve({
        data: rad
    });
}

function obrisi(id) {

  const index = radovi.findIndex(
    rad => rad.id === Number(id)
  );

  if (index === -1) {
    return Promise.reject('Rad nije pronađen');
  }

  radovi.splice(index, 1);

  return Promise.resolve();
}




export default {
  get,
  getById,
  promijeni,
  dodaj,
  obrisi
};

