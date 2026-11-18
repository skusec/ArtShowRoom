import { z } from 'zod';

export const KategorijaSchema = z.object({
  naziv: z
    .string()
    .trim()
    .min(3, 'Naziv kategorije mora imati najmanje 3 znaka.')
    .max(50, 'Naziv kategorije može imati najviše 50 znakova.'),

  opis: z
    .string()
    .trim()
    .min(5, 'Opis kategorije mora imati najmanje 5 znakova.')
    .max(300, 'Opis kategorije može imati najviše 300 znakova.')
});