import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import RadService from '../../services/RadService';


export default function RadPregled() {

  const [radovi, setRadovi] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    ucitajRadove();
  }, []);


  async function ucitajRadove() {

    const odgovor = await RadService.get();

    // Nova kopija arraya da React uvijek registrira promjenu
    setRadovi([...odgovor.data]);

  }


  async function obrisiRad(id) {

    const potvrda = window.confirm(
      'Želiš li stvarno obrisati ovaj rad?'
    );

    if (!potvrda) {
      return;
    }

    await RadService.obrisi(id);

    // Odmah ukloni obrisani rad iz prikaza, bez dodatnog klika na "Radovi"
    setRadovi((trenutniRadovi) =>
      trenutniRadovi.filter((rad) => rad.id !== id)
    );

  }


  return (
    <>
      <h1>Pregled radova</h1>

      <hr />

      <Table striped bordered hover responsive>

        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Kategorija</th>
            <th>Tehnika</th>
            <th>Cijena</th>
            <th>Dostupan</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>

          {radovi.map((rad) => (

            <tr key={rad.id}>

              <td>{rad.id}</td>
              <td>{rad.naziv}</td>
              <td>{rad.kategorija}</td>
              <td>{rad.tehnika}</td>
              <td>{rad.cijena} €</td>
              <td>{rad.dostupan ? 'Da' : 'Ne'}</td>

              <td>

                <Button
                  variant="warning"
                  onClick={() => navigate(`/radovi/${rad.id}`)}
                >
                  Uredi
                </Button>

                {' '}

                <Button
                  variant="danger"
                  onClick={() => obrisiRad(rad.id)}
                >
                  Obriši
                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </Table>
    </>
  );

}
