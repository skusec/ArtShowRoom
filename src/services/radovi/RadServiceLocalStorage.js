import { radovi as pocetniRadovi } from './RadPodaci';
const STORAGE_KEY = 'radovi';

function dohvatiSveIzStorage() {
  const podaci = localStorage.getItem(STORAGE_KEY);

  if (podaci === null) {
    const pocetniPodaci = [...pocetniRadovi];

    spremiUStorage(pocetniPodaci);

    return pocetniPodaci;
  }

  return JSON.parse(podaci);
}

function spremiUStorage(podaci) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(podaci)
  );
}

// 1/4 Read od CRUD
async function get() {
  const radovi = dohvatiSveIzStorage();

  return {
    data: [...radovi]
  };
}

async function getById(id) {
  const radovi = dohvatiSveIzStorage();

  const rad = radovi.find(
    rad => rad.id === Number(id)
  );

  return {
    data: rad
  };
}

// 2/4 Create od CRUD
async function dodaj(rad) {
  const radovi = dohvatiSveIzStorage();

  if (radovi.length === 0) {
    rad.id = 1;
  } else {
    const maxId = Math.max(
      ...radovi.map(rad => rad.id)
    );

    rad.id = maxId + 1;
  }

  radovi.push(rad);

  spremiUStorage(radovi);
}

// 3/4 Update od CRUD
async function promijeni(id, rad) {
  const radovi = dohvatiSveIzStorage();

  const index = radovi.findIndex(
    rad => rad.id === Number(id)
  );

  radovi[index] = {
    ...radovi[index],
    ...rad
  };

  spremiUStorage(radovi);
}

// 4/4 Delete od CRUD
async function obrisi(id) {
  let radovi = dohvatiSveIzStorage();

  radovi = radovi.filter(
    rad => rad.id !== Number(id)
  );

  spremiUStorage(radovi);
}

export default {
  get,
  dodaj,
  getById,
  promijeni,
  obrisi
};