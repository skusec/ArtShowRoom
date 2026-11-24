export default async function apiFetch(url, options) {

  const odgovor = await fetch(url, options);

  if (!odgovor.ok) {
    throw new Error(
      `Greška pri komunikaciji s API-jem (${odgovor.status}).`
    );
  }

  return odgovor;

}