const API_URL = 'http://localhost:3000/tehnike';

async function get() {

  const odgovor = await fetch(API_URL);

  const podaci = await odgovor.json();

  return {
    data: podaci.map((tehnika) => ({
      ...tehnika,
      id: Number(tehnika.id)
    }))
  };
}


async function getById(id) {

  const odgovor = await fetch(
    `${API_URL}/${id}`
  );

  const podaci = await odgovor.json();

  return {
    data: {
      ...podaci,
      id: Number(podaci.id)
    }
  };
}


async function dodaj(tehnika) {

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tehnika)
  });

}


async function promijeni(id, tehnika) {

  await fetch(
    `${API_URL}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tehnika)
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