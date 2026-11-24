# 🎨 Art Show Room

Art Show Room je responzivna Single Page Application (SPA)
namijenjena predstavljanju, organizaciji i upravljanju
umjetničkim radovima.

Aplikacija povezuje digitalnu umjetničku galeriju s
upravljačkim sučeljem za radove i kategorije, uz podršku
za različite izvore podataka.

Projekt je izrađen kao završni rad u sklopu programa
obrazovanja Front-End developer u ustanovi Edunova.

## 🌐 Objavljena aplikacija

- Produkcija: https://edunova8.origo.hr/
- GitHub: https://github.com/skusec/ArtShowRoom

## ✨ Funkcionalnosti

- Digitalna galerija umjetničkih radova
- Filtriranje radova prema kategorijama
- Pretraživanje radova
- Detaljni prikaz umjetničkih radova
- CRUD operacije nad radovima i kategorijama
- Povezivanje radova s kategorijama i tehnikama
- Dodavanje i izrezivanje slika
- Unos i formatiranje decimalnih cijena
- Upravljanje dostupnošću umjetničkih radova
- Zod validacija i onBlur validacija formi
- Potvrda prije brisanja zapisa
- Zaštita integriteta podataka
- Generiranje testnih podataka
- Obrada grešaka i prikaz stanja učitavanja
- Prilagođena 404 stranica
- Responzivno korisničko sučelje

## 🛠️ Korištene tehnologije

| Tehnologija | Namjena |
|---|---|
| React 19 | Izrada korisničkog sučelja |
| JavaScript ES6+ | Programska logika |
| Vite | Razvojno okruženje i produkcijski build |
| React Router | Navigacija i upravljanje rutama |
| Bootstrap 5 | Responzivno korisničko sučelje |
| React Bootstrap | UI komponente |
| SCSS / Sass | Prilagođeno stiliziranje |
| Zod | Validacija podataka |
| JSON Server | Simulacija REST API-ja |
| Faker.js | Generiranje testnih podataka |
| React Cropper | Izrezivanje slika |
| React Icons | Ikone korisničkog sučelja |
| React Number Format | Formatiranje numeričkih vrijednosti |
| ESLint | Statička analiza kvalitete koda |
| Git / GitHub | Verzioniranje izvornog koda |

## 📁 Struktura projekta

```text
ArtShowRoom/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   │   ├── kategorije/
│   │   ├── radovi/
│   │   ├── GeneriranjePodataka.jsx
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── schemas/
│   ├── services/
│   │   ├── kategorije/
│   │   ├── radovi/
│   │   ├── tehnike/
│   │   └── apiFetch.js
│   ├── App.jsx
│   ├── App.scss
│   ├── constants.js
│   ├── index.css
│   └── main.jsx
├── .env.production
├── db.json
├── eslint.config.js
├── index.html
├── package.json
└── README.md
```

## 🏗️ Arhitektura aplikacije

Aplikacija koristi modularnu arhitekturu s jasno
odvojenim odgovornostima.

- Pages – stranice aplikacije
- Components – ponovno iskoristive komponente
- Services – pristup i upravljanje podacima
- Schemas – validacijske sheme
- Hooks – prilagođeni React hookovi
- SCSS – vizualni identitet i responzivnost

Servisni sloj omogućuje korištenje različitih izvora
podataka bez potrebe za izmjenom korisničkog sučelja.

Podržana su tri izvora podataka:

- Memorija
- LocalStorage
- REST API

API servisi koriste zajedničku pomoćnu funkciju apiFetch
za centraliziranu provjeru HTTP odgovora.

## 🗃️ Entiteti i relacije

Aplikacija koristi tri osnovna entiteta:

- Rad
- Kategorija
- Tehnika

### Relacija 1:N

Jedna kategorija može sadržavati više umjetničkih radova,
dok svaki rad pripada jednoj kategoriji.

### Relacija N:N

Jedan umjetnički rad može koristiti više tehnika,
dok se ista tehnika može koristiti na više radova.

## 🧭 Rute aplikacije

| Ruta | Namjena |
|---|---|
| `/` | Početna stranica i galerija |
| `/radovi` | Pregled radova |
| `/radovi/novi` | Dodavanje novog rada |
| `/radovi/:id` | Uređivanje rada |
| `/kategorije` | Pregled kategorija |
| `/kategorije/novi` | Dodavanje kategorije |
| `/kategorije/:id` | Uređivanje kategorije |
| `/generiranje-podataka` | Generiranje testnih podataka |
| `*` | Prilagođena 404 stranica |

## ⚙️ Instalacija i pokretanje

Preduvjeti:

- Node.js (verzija kompatibilna s Vite 8)
- npm
- Git

### 1. Kloniranje repozitorija

```bash
git clone https://github.com/skusec/ArtShowRoom.git
```

### 2. Ulazak u direktorij projekta

```bash
cd ArtShowRoom
```

### 3. Instalacija zavisnosti

```bash
npm install
```

### 4. Pokretanje JSON Servera

U prvom terminalu:

```bash
npx json-server --watch db.json --port 3000
```

REST API dostupan je na adresi:

http://localhost:3000

### 5. Pokretanje aplikacije

U drugom terminalu:

```bash
npm run dev
```

Aplikacija je u pravilu dostupna na adresi:

http://localhost:5173

## 🔧 Konfiguracija izvora podataka

Izvor podataka određuje se varijablom okruženja:

```env
VITE_DATA_SOURCE=api
```

Podržane vrijednosti:

| Vrijednost | Izvor podataka |
|---|---|
| `memorija` | Podaci u memoriji aplikacije |
| `localStorage` | Lokalna pohrana preglednika |
| `api` | REST API putem JSON Servera |

Za lokalnu konfiguraciju može se koristiti datoteka
`.env.local`.

Produkcijska konfiguracija definirana je u datoteci
`.env.production` i koristi LocalStorage.

Podaci u produkcijskoj verziji pohranjuju se lokalno
u pregledniku korisnika i nisu zajednički svim korisnicima.

## ✅ Validacija i integritet podataka

Validacija se provodi pomoću Zod validacijskih shema.

Implementirani su:

- OnBlur validacija pojedinih polja
- Validacija prilikom slanja forme
- Prilagođene poruke grešaka
- Obrada grešaka pri spremanju
- Provjera postojanja zapisa
- Zaštita od brisanja kategorija koje sadrže radove
- Obrada nepostojećih ID-eva
- Provjera HTTP odgovora u API servisima

## ♿ Pristupačnost i responzivnost

Pri izradi aplikacije primijenjene su odabrane
smjernice WCAG pristupačnosti:

- Semantički HTML elementi
- ARIA atributi
- Alternativni tekstovi slika
- Vidljiva focus stanja
- Prilagođene validacijske poruke
- Pristupačne dinamičke obavijesti
- Responzivni prikaz za različite veličine zaslona

## 📦 Produkcijski build

```bash
npm run build
```

Produkcijske datoteke generiraju se u direktoriju `dist/`.

Za lokalni pregled produkcijske verzije:

```bash
npm run preview
```

## 🔍 Provjera kvalitete koda

```bash
npm run lint
```

ESLint se koristi za statičku analizu JavaScript
i React izvornog koda.

## 🚀 Deployment

Aplikacija je objavljena na web-poslužitelju kao
statička Single Page Application.

Produkcijska verzija koristi LocalStorage, dok je
za podršku izravnom otvaranju SPA ruta konfiguriran
Apache rewrite mehanizam putem .htaccess datoteke.

## 🔮 Moguća buduća poboljšanja

- Implementacija produkcijskog backenda i baze podataka
- Autentifikacija i autorizacija korisnika
- Pohrana slika na udaljenom poslužitelju
- Automatizirano testiranje
- Dodatna optimizacija performansi

## 👨‍💻 Autor

**Sean Kušec**

Edunova – Front-End developer

Grupa FD3

Osijek, 2026.

---

© 2026 Art Show Room