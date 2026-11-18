import { Button, Card, Col, Row } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';


export default function RadPregledGrid({
    radovi,
    kategorije,
    onUredi,
    onObrisi
}) {

    return (
        <Row>

            {radovi.map((rad) => (

                <Col
                    key={rad.id}
                    xs={12}
                    md={6}
                    className="mb-3"
                >

                    <Card>

                        <Card.Body>

                            <Card.Title>
                                {rad.naziv}
                            </Card.Title>

                            <Card.Text>
                                <strong>Kategorija:</strong>{' '}
                                {
                                    kategorije.find(
                                        kategorija =>
                                            kategorija.id === Number(rad.kategorijaId)
                                    )?.naziv
                                }
                            </Card.Text>

                            <Card.Text>
                                <strong>Tehnika:</strong> {rad.tehnika}
                            </Card.Text>

                            <Card.Text>
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
                            </Card.Text>

                            <Card.Text>
                                <strong>Dostupan:</strong>{' '}
                                {rad.dostupan ? 'Da' : 'Ne'}
                            </Card.Text>

                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => onUredi(rad.id)}
                            >
                                Uredi
                            </Button>

                            <Button
                                variant="danger"
                                onClick={() => onObrisi(rad.id)}
                            >
                                Obriši
                            </Button>

                        </Card.Body>

                    </Card>

                </Col>

            ))}

        </Row>
    );

}