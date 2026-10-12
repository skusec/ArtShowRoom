import { radovi } from './RadPodaci';

// 1/4 Read od CRUD
async function get() {
  return { data: [...radovi] };
}

async function getById(id) {
  return {
    data: radovi.find(rad => rad.id === Number(id))
  };
}

// 2/4 Create od CRUD
async function dodaj(rad) {
  if (radovi.length === 0) {
    rad.id = 1;
  } else {
    const maxId = Math.max(...radovi.map(rad => rad.id));
    rad.id = maxId + 1;
  }

  radovi.push(rad);
}

// 3/4 Update od CRUD
async function promijeni(id, rad) {
  const index = nadiIndex(id);

  radovi[index] = {
    ...radovi[index],
    ...rad
  };
}

function nadiIndex(id) {
  return radovi.findIndex(
    rad => rad.id === Number(id)
  );
}

// 4/4 Delete od CRUD
async function obrisi(id) {
  const index = nadiIndex(id);
  radovi.splice(index, 1);
}

export default {
  get,
  dodaj,
  getById,
  promijeni,
  obrisi
};