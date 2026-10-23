# Gym asistent

Mobilní webová appka (PWA) pro začátečníky v posilovně: co cvičit, jak a kolikrát. Bez serveru, bez účtů, data zůstávají v telefonu.

## Vývoj

```bash
npm install
npm run dev
```

Ikony se generují skriptem `node scripts/make-icons.mjs` (bez dalších balíčků).

## Nasazení

Každý push na `main` spustí GitHub Action [`deploy.yml`](.github/workflows/deploy.yml), která appku sestaví a nasadí na GitHub Pages. Appka běží pod cestou `/gym-asistent/` (nastaveno v `vite.config.ts` jako `base`).

## Instalace na iPhone

1. Otevři adresu appky v Safari.
2. Sdílet → Přidat na plochu.
3. Spusť appku z ikony na ploše, otevře se bez lišty Safari.
