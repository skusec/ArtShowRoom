import { Modal } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';


export default function KategorijaRadoviModal({
    prikazi,
    kategorija,
    radovi,
    onZatvori,
    onOdaberiRad
}) {

    if (!kategorija) {
        return null;
    }

    const radoviKategorije = radovi.filter(
        (rad) =>
            Number(rad.kategorijaId) === Number(kategorija.id)
    );


    return (
        <Modal
            show={prikazi}
            onHide={onZatvori}
            centered
            size="lg"
            className="kategorija-radovi-modal"
            aria-labelledby="kategorija-radovi-naslov"
        >

            <Modal.Header closeButton>
                <Modal.Title id="kategorija-radovi-naslov">
                    {kategorija.naziv}
                </Modal.Title>
            </Modal.Header>


            <Modal.Body>

                <p className="kategorija-radovi-opis">
                    {kategorija.opis}
                </p>


                {radoviKategorije.length === 0 ? (

                    <div
                        className="kategorija-radovi-empty"
                        role="status"
                    >
                        Trenutno nema zabilježenih radova u ovoj kategoriji.
                    </div>

                ) : (

                    <div className="kategorija-radovi-lista">

                        {radoviKategorije.map((rad) => (

                            <article
                                key={rad.id}
                                className="kategorija-rad-item"
                            >

                                {rad.slika && (
                                    <button
                                        type="button"
                                        className="kategorija-rad-slika-button"
                                        onClick={() => onOdaberiRad(rad)}
                                        aria-label={`Otvori detalje rada ${rad.naziv}`}
                                    >
                                        <img
                                            src={rad.slika}
                                            alt={rad.naziv}
                                            className="kategorija-rad-slika"
                                        />
                                    </button>
                                )}

                                <div className="kategorija-rad-podaci">

                                    <h3>
                                        <button
                                            type="button"
                                            className="kategorija-rad-naziv-button"
                                            onClick={() => onOdaberiRad(rad)}
                                            aria-label={`Otvori detalje rada ${rad.naziv}`}
                                        >
                                            {rad.naziv}
                                        </button>
                                    </h3>

                                    <p>
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

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </Modal.Body>

        </Modal>
    );
}