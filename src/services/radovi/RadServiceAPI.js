const API_URL = 'http://localhost:3000/radovi';

async function get() {

  const odgovor = await fetch(API_URL);

  const podaci = await odgovor.json();

  return {
    data: podaci
  };
}


async function getById(id) {

  const odgovor = await fetch(
    `${API_URL}/${id}`
  );

  const podaci = await odgovor.json();

  return {
    data: podaci
  };
}


async function dodaj(rad) {

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rad)
  });

}


async function promijeni(id, rad) {

  await fetch(
    `${API_URL}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rad)
    }
  );

}


async function obrisi(id) {

  await fetch(
    `${API_URL}/${id}`,
    {
      method: 'DELETE'
    }
  );

}


export default {
  get,
  getById,
  dodaj,
  promijeni,
  obrisi
};