# Gym asistent

Mobilní webová appka (PWA) pro začátečníky v posilovně: co cvičit, jak a kolikrát. Bez serveru, bez účtů, data zůstávají v telefonu.

## Vývoj

```bash
npm install
npm run dev
```

Ikony se generují skriptem `node scripts/make-icons.mjs` (bez dalších balíčků).

## Katalog cviků

Katalog je v [`src/data/exercises.json`](src/data/exercises.json) (31 cviků), typy a pomocné funkce v [`src/data/catalog.ts`](src/data/catalog.ts). Pořadí cviků v rámci partie je priorita výběru při sestavování plánu.

Obrázky jsou v `public/exercises/<id>/start.webp` a `end.webp` (šířka 600 px, WebP).

## Licence dat

Obrázky cviků pocházejí z [free-exercise-db](https://github.com/yuhonas/free-exercise-db), licence **The Unlicense** (volné dílo), zkontrolováno 23. 10. 2026. Podrobnosti a přehled, který obrázek patří ke kterému cviku, jsou v [LICENSES.md](LICENSES.md).

## Nasazení

Každý push na `main` spustí GitHub Action [`deploy.yml`](.github/workflows/deploy.yml), která appku sestaví a nasadí na GitHub Pages. Appka běží pod cestou `/gym-asistent/` (nastaveno v `vite.config.ts` jako `base`).

## Instalace na iPhone

1. Otevři adresu appky v Safari.
2. Sdílet → Přidat na plochu.
3. Spusť appku z ikony na ploše, otevře se bez lišty Safari.
