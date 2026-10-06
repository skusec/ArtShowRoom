import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import RadPregled from './pages/radovi/RadPregled';
import RadNovi from './pages/radovi/RadNovi';
import RadPromjena from './pages/radovi/RadPromjena';
import Izbornik from './components/Izbornik';

import { RouteNames } from './constants';

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

      </Routes>
    </>
  );
}

export default App;