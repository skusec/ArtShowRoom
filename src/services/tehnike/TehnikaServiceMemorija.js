import { tehnike as pocetneTehnike } from './TehnikaPodaci';

let tehnike = [...pocetneTehnike];

async function get() {
  return {
    data: [...tehnike]
  };
}

async function getById(id) {
  const tehnika = tehnike.find(
    tehnika => tehnika.id === Number(id)
  );

  return {
    data: tehnika
  };
}

async function dodaj(tehnika) {
  if (tehnike.length === 0) {
    tehnika.id = 1;
  } else {
    const maxId = Math.max(
      ...tehnike.map(tehnika => tehnika.id)
    );

    tehnika.id = maxId + 1;
  }

  tehnike.push(tehnika);
}

async function promijeni(id, tehnika) {
  const index = tehnike.findIndex(
    tehnika => tehnika.id === Number(id)
  );

  if (index === -1) {
    throw new Error('Tehnika nije pronađena.');
  }

  tehnike[index] = {
    ...tehnike[index],
    ...tehnika
  };
}




async function obrisi(id) {
  tehnike = tehnike.filter(
    tehnika => tehnika.id !== Number(id)
  );
}

export default {
  get,
  getById,
  dodaj,
  promijeni,
  obrisi
};