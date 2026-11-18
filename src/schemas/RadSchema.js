import { z } from 'zod';

export const RadSchema = z.object({
  naziv: z
    .string()
    .trim()
    .min(3, 'Naziv rada mora imati najmanje 3 znaka.')
    .max(50, 'Naziv rada može imati najviše 50 znakova.'),

  kategorijaId: z
    .number()
    .int()
    .positive('Potrebno je odabrati kategoriju.'),

  tehnika: z
    .string()
    .trim()
    .min(2, 'Tehnika rada mora imati najmanje 2 znaka.'),

  cijena: z
    .number()
    .min(0, 'Cijena rada ne može biti negativna.')
    .max(100000, 'Cijena rada ne može biti veća od 100000 €.'),

  dostupan: z.boolean()
});