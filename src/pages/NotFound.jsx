import { Link } from 'react-router-dom';
import { RouteNames } from '../constants';

export default function NotFound() {

  return (
    <main className="showroom-not-found">

      <p className="showroom-not-found-kicker">
        ART SHOW ROOM
      </p>

      <div
        className="showroom-not-found-code"
        aria-hidden="true"
      >
        404
      </div>

      <h1>Stranica nije pronađena.</h1>

      <p className="showroom-not-found-opis">
        Čini se da ovo umjetničko djelo nije dio naše
        kolekcije. Tražena stranica ne postoji ili je
        premještena.
      </p>

      <Link
        to={RouteNames.HOME}
        className="showroom-not-found-button"
      >
        Povratak u galeriju
      </Link>

    </main>
  );

}