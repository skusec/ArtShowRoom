const STORAGE_KEY = 'kategorije';

function dohvatiSveIzStorage() {
  const podaci = localStorage.getItem(STORAGE_KEY);

  return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(podaci)
  );
}

// 1/4 Read od CRUD
async function get() {
  const kategorije = dohvatiSveIzStorage();

  return {
    data: [...kategorije]
  };
}

async function getById(id) {
  const kategorije = dohvatiSveIzStorage();

  const kategorija = kategorije.find(
    kategorija => kategorija.id === Number(id)
  );

  return {
    data: kategorija
  };
}

// 2/4 Create od CRUD
async function dodaj(kategorija) {
  const kategorije = dohvatiSveIzStorage();

  if (kategorije.length === 0) {
    kategorija.id = 1;
  } else {
    const maxId = Math.max(
      ...kategorije.map(kategorija => kategorija.id)
    );

    kategorija.id = maxId + 1;
  }

  kategorije.push(kategorija);

  spremiUStorage(kategorije);
}

// 3/4 Update od CRUD
async function promijeni(id, kategorija) {
  const kategorije = dohvatiSveIzStorage();

  const index = kategorije.findIndex(
    kategorija => kategorija.id === Number(id)
  );

  kategorije[index] = {
    ...kategorije[index],
    ...kategorija
  };

  spremiUStorage(kategorije);
}

// 4/4 Delete od CRUD
async function obrisi(id) {
  let kategorije = dohvatiSveIzStorage();

  kategorije = kategorije.filter(
    kategorija => kategorija.id !== Number(id)
  );

  spremiUStorage(kategorije);
}

export default {
  get,
  dodaj,
  getById,
  promijeni,
  obrisi
};