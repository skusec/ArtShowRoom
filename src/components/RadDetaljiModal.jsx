import {
  Badge,
  Button,
  Col,
  Modal,
  Row
} from 'react-bootstrap';

import { NumericFormat } from 'react-number-format';


export default function RadDetaljiModal({
  prikazi,
  rad,
  kategorije,
  tehnike,
  onZatvori,
  onUredi
}) {

  if (!rad) {
    return null;
  }

  const kategorija = kategorije.find(
    (kategorija) =>
      kategorija.id === Number(rad.kategorijaId)
  );

  const naziviTehnika = rad.tehnikeIds
    ?.map((id) =>
      tehnike.find(
        (tehnika) => tehnika.id === Number(id)
      )?.naziv
    )
    .filter(Boolean);


  return (
    <Modal
      show={prikazi}
      onHide={onZatvori}
      size="lg"
      centered
      className="rad-detalji-modal"
      aria-labelledby="rad-detalji-naslov"
    >

      <Modal.Header closeButton>
        <Modal.Title id="rad-detalji-naslov">
          {rad.naziv}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Row className="align-items-center g-4">

          <Col lg={7}>

            {rad.slika && (
              <img
                src={rad.slika}
                alt={rad.naziv}
                className="rad-detalji-slika"
              />
            )}

          </Col>

          <Col lg={5}>

            <p className="rad-detalji-kategorija">
              {kategorija?.naziv}
            </p>

            <div className="mb-4">

              {naziviTehnika?.map((naziv) => (
                <Badge
                  key={naziv}
                  bg="secondary"
                  className="me-2 mb-2"
                >
                  {naziv}
                </Badge>
              ))}

            </div>

            <div className="rad-detalji-info">

              <p>
                <strong>Cijena:</strong>{' '}
                <NumericFormat
                  value={rad.cijena}
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  suffix=" €"
                />
              </p>

              <p>
                <strong>Dostupnost:</strong>{' '}

                <span
                  className={
                    rad.dostupan
                      ? 'text-success'
                      : 'text-danger'
                  }
                >
                  {rad.dostupan
                    ? 'Dostupan'
                    : 'Nije dostupan'}
                </span>
              </p>

            </div>

          </Col>

        </Row>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="outline-secondary"
          onClick={onZatvori}
        >
          Zatvori
        </Button>

        {onUredi && (
          <Button
            variant="warning"
            onClick={() => onUredi(rad.id)}
          >
            Uredi rad
          </Button>
        )}

      </Modal.Footer>

    </Modal>
  );
}