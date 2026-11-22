import { Button, Modal } from 'react-bootstrap';

export default function PotvrdaModal({
  prikazi,
  naslov = 'Potvrda',
  poruka,
  onPotvrdi,
  onOdustani
}) {
  return (
    <Modal
      show={prikazi}
      onHide={onOdustani}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{naslov}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {poruka}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onOdustani}
        >
          Odustani
        </Button>

        <Button
          variant="danger"
          onClick={onPotvrdi}
        >
          Potvrdi brisanje
        </Button>
      </Modal.Footer>
    </Modal>
  );
}