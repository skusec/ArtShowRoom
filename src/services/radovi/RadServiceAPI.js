const API_URL = 'http://localhost:3000/radovi';
import apiFetch from '../apiFetch';

async function get() {

  const odgovor = await apiFetch(API_URL);

  const podaci = await odgovor.json();

  return {
    data: podaci.map((rad) => ({
      ...rad,
      id: Number(rad.id),
      kategorijaId: Number(rad.kategorijaId),
      tehnikeIds: (rad.tehnikeIds || []).map(Number)
    }))
  };
}


async function getById(id) {

  const odgovor = await apiFetch(
    `${API_URL}/${id}`
  );

  const podaci = await odgovor.json();

  return {
    data: {
      ...podaci,
      id: Number(podaci.id),
      kategorijaId: Number(podaci.kategorijaId),
      tehnikeIds: (podaci.tehnikeIds || []).map(Number)
    }
  };
}


async function dodaj(rad) {

  const odgovorRadovi = await apiFetch(API_URL);
  const postojeciRadovi = await odgovorRadovi.json();

  const najveciId = postojeciRadovi.length > 0
    ? Math.max(
      ...postojeciRadovi.map((postojeciRad) =>
        Number(postojeciRad.id) || 0
      )
    )
    : 0;

  const noviRad = {
    ...rad,
    id: najveciId + 1
  };

  await apiFetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(noviRad)
  });

}


async function promijeni(id, rad) {

  await apiFetch(
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

  await apiFetch(
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