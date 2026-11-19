import { tehnike as pocetneTehnike } from './TehnikaPodaci';

const STORAGE_KEY = 'tehnike';


function spremiUStorage(podaci) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(podaci)
  );
}


function dohvatiSveIzStorage() {
  const podaci = localStorage.getItem(STORAGE_KEY);

  if (podaci === null) {
    const pocetniPodaci = [...pocetneTehnike];

    spremiUStorage(pocetniPodaci);

    return pocetniPodaci;
  }

  return JSON.parse(podaci);
}


async function get() {
  const tehnike = dohvatiSveIzStorage();

  return {
    data: [...tehnike]
  };
}


async function getById(id) {
  const tehnike = dohvatiSveIzStorage();

  const tehnika = tehnike.find(
    tehnika => tehnika.id === Number(id)
  );

  return {
    data: tehnika
  };
}


async function dodaj(tehnika) {
  const tehnike = dohvatiSveIzStorage();

  if (tehnike.length === 0) {
    tehnika.id = 1;
  } else {
    const maxId = Math.max(
      ...tehnike.map(tehnika => tehnika.id)
    );

    tehnika.id = maxId + 1;
  }

  tehnike.push(tehnika);

  spremiUStorage(tehnike);
}


async function promijeni(id, tehnika) {
  const tehnike = dohvatiSveIzStorage();

  const index = tehnike.findIndex(
    tehnika => tehnika.id === Number(id)
  );

  tehnike[index] = {
    ...tehnike[index],
    ...tehnika
  };

  spremiUStorage(tehnike);
}


async function obrisi(id) {
  let tehnike = dohvatiSveIzStorage();

  tehnike = tehnike.filter(
    tehnika => tehnika.id !== Number(id)
  );

  spremiUStorage(tehnike);
}


export default {
  get,
  getById,
  dodaj,
  promijeni,
  obrisi
};