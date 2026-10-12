import { kategorije } from './KategorijaPodaci';

// 1/4 Read od CRUD
async function get() {
  return {
    data: [...kategorije]
  };
}

async function getById(id) {
  return {
    data: kategorije.find(
      kategorija => kategorija.id === Number(id)
    )
  };
}

// 2/4 Create od CRUD
async function dodaj(kategorija) {
  if (kategorije.length === 0) {
    kategorija.id = 1;
  } else {
    const maxId = Math.max(
      ...kategorije.map(kategorija => kategorija.id)
    );

    kategorija.id = maxId + 1;
  }

  kategorije.push(kategorija);
}

// 3/4 Update od CRUD
async function promijeni(id, kategorija) {
  const index = nadiIndex(id);

  kategorije[index] = {
    ...kategorije[index],
    ...kategorija
  };
}

function nadiIndex(id) {
  return kategorije.findIndex(
    kategorija => kategorija.id === Number(id)
  );
}

// 4/4 Delete od CRUD
async function obrisi(id) {
  const index = nadiIndex(id);

  kategorije.splice(index, 1);
}

export default {
  get,
  dodaj,
  getById,
  promijeni,
  obrisi
};