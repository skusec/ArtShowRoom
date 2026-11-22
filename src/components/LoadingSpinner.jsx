import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner({
  poruka = 'Učitavanje...'
}) {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-3 mt-5"
      role="status"
      aria-live="polite"
    >
      <Spinner
        animation="border"
        variant="dark"
        aria-hidden="true"
      />

      <span>
        {poruka}
      </span>
    </div>
  );
}