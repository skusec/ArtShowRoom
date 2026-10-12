import { DATA_SOURCE } from '../../constants';

import RadServiceMemorija from './RadServiceMemorija';
import RadServiceLocalStorage from './RadServiceLocalStorage';

let Servis = null;

switch (DATA_SOURCE) {
  case 'memorija':
    Servis = RadServiceMemorija;
    break;

  case 'localStorage':
    Servis = RadServiceLocalStorage;
    break;

  default:
    Servis = null;
}

const PrazanServis = {
  get: async () => ({ data: [] }),

  dodaj: async () => {
    console.error('Servis nije implementiran');
  },

  getById: async () => ({ data: {} }),

  promijeni: async () => {
    console.error('Servis nije implementiran');
  },

  obrisi: async () => {
    console.error('Servis nije implementiran');
  }
};

const AktivniServis = Servis || PrazanServis;

export default {
  get: () => AktivniServis.get(),

  dodaj: (rad) =>
    AktivniServis.dodaj(rad),

  getById: (id) =>
    AktivniServis.getById(id),

  promijeni: (id, rad) =>
    AktivniServis.promijeni(id, rad),

  obrisi: (id) =>
    AktivniServis.obrisi(id)
};