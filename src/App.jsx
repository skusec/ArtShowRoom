import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import RadPregled from './pages/radovi/RadPregled';
import RadNovi from './pages/radovi/RadNovi';
import RadPromjena from './pages/radovi/RadPromjena';
import Izbornik from './components/Izbornik';
import KategorijaPregled from './pages/kategorije/KategorijaPregled';

import { IME_APLIKACIJE, RouteNames } from './constants';

function App() {
  return (
    <>
      <Izbornik />

      <Routes>

        <Route
          path={RouteNames.HOME}
          element={<Home />}
        />

        <Route
          path={RouteNames.RADOVI}
          element={<RadPregled />}
        />

        <Route
          path={RouteNames.RADOVI_NOVI}
          element={<RadNovi />}
        />

        <Route
          path={RouteNames.RADOVI_PROMJENA}
          element={<RadPromjena />}
        />

        <Route
          path={RouteNames.KATEGORIJE}
          element={<KategorijaPregled />}
        />

      </Routes>

      <div className="mt-auto">
        <hr />

        <footer className="pb-3">
          &copy; {IME_APLIKACIJE}
        </footer>
      </div>

    </>
  );
}

export default App;