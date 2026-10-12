import { DATA_SOURCE } from '../../constants';

import KategorijaServiceMemorija from './KategorijaServiceMemorija';
import KategorijaServiceLocalStorage from './KategorijaServiceLocalStorage';

let Servis = null;

switch (DATA_SOURCE) {
  case 'memorija':
    Servis = KategorijaServiceMemorija;
    break;

  case 'localStorage':
    Servis = KategorijaServiceLocalStorage;
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

  dodaj: (kategorija) =>
    AktivniServis.dodaj(kategorija),

  getById: (id) =>
    AktivniServis.getById(id),

  promijeni: (id, kategorija) =>
    AktivniServis.promijeni(id, kategorija),

  obrisi: (id) =>
    AktivniServis.obrisi(id)
};