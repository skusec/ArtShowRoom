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

  tehnikeIds: z
    .array(z.number().int().positive())
    .min(1, 'Potrebno je odabrati najmanje jednu tehniku.'),

  cijena: z
    .number()
    .min(0, 'Cijena rada ne može biti negativna.')
    .max(100000, 'Cijena rada ne može biti veća od 100000 €.'),

  dostupan: z.boolean()
});