import { Button, Table } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';


export default function RadPregledTablica({
  radovi,
  kategorije,
  onUredi,
  onObrisi
}) {

  return (
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

            <td>
              {
                kategorije.find(
                  kategorija =>
                    kategorija.id === Number(rad.kategorijaId)
                )?.naziv
              }
            </td>

            <td>{rad.tehnika}</td>

            <td>
              <NumericFormat
                value={rad.cijena}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                suffix=" €"
              />
            </td>

            <td>{rad.dostupan ? 'Da' : 'Ne'}</td>

            <td>

              <Button
                variant="warning"
                onClick={() => onUredi(rad.id)}
              >
                Uredi
              </Button>

              {' '}

              <Button
                variant="danger"
                onClick={() => onObrisi(rad.id)}
              >
                Obriši
              </Button>

            </td>

          </tr>

        ))}

      </tbody>

    </Table>
  );

}