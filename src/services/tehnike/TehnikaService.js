import { DATA_SOURCE } from '../../constants';

import TehnikaServiceMemorija from './TehnikaServiceMemorija';
import TehnikaServiceLocalStorage from './TehnikaServiceLocalStorage';


let Servis = null;


switch (DATA_SOURCE) {

  case 'memorija':
    Servis = TehnikaServiceMemorija;
    break;

  case 'localStorage':
    Servis = TehnikaServiceLocalStorage;
    break;

  default:
    Servis = null;

}


const PrazanServis = {

  get: async () => ({
    data: []
  }),

  getById: async () => ({
    data: {}
  }),

  dodaj: async () => {
    console.error('Servis nije implementiran');
  },

  promijeni: async () => {
    console.error('Servis nije implementiran');
  },

  obrisi: async () => {
    console.error('Servis nije implementiran');
  }

};


const AktivniServis = Servis || PrazanServis;


export default {

  get: () =>
    AktivniServis.get(),

  getById: (id) =>
    AktivniServis.getById(id),

  dodaj: (tehnika) =>
    AktivniServis.dodaj(tehnika),

  promijeni: (id, tehnika) =>
    AktivniServis.promijeni(id, tehnika),

  obrisi: (id) =>
    AktivniServis.obrisi(id)

};