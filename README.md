# Dealer Website Show Window

An interactive "show window" that lets a yacht dealer preview three website
design directions, choose one, configure their site, and download a brief — in
six languages. Built for YachtWay.

## What it does

1. **Pick a design** — three home-page directions (A · Clean & luxe, B · Bold &
   editorial, C · Classic brokerage).
2. **Review** — scroll the full home page, the Boats-for-Sale page and a Listing
   page; switch A/B/C from the toolbar.
3. **Tell us a few things** — a simple configurator (company, contact, go-live
   date, brands, listings feed, team, services, media, extra pages, WhatsApp,
   language) that ends in a downloadable PDF brief.

The dealer-facing site previews are static images (`designs/*.png`). Only the
show-window interface is translated.

## Run it

It is a static site — no build step. Open `index.html` in a browser, or serve
the folder:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

On GitHub Pages, set the source to this folder and `index.html` is served
automatically.

## Structure

All files sit at the repository root so GitHub's drag-and-drop upload (which
flattens folders) works without breaking image paths:

```
index.html        The show window (single file: markup + styles + logic)
translations.js   UI copy for en · es · fr · de · it · nl
home-a.png        Design A — Clean & luxe (home preview)
home-b.png        Design B — Bold & editorial (home preview)
home-c.png        Design C — Classic brokerage (home preview)
catalog.png       Boats-for-Sale preview
listing.png       Listing-page preview
yachtway-logo.png Logo used in the header + PDF brief
```

## Languages

English, Español, Français, Deutsch, Italiano, Nederlands — switch from the
globe selector, top-right. The choice persists in `localStorage`.

## Notes

- Prices toggle between EUR and USD; the go-live date display follows the
  currency (EUR → dd/mm/yyyy, USD → mm/dd/yyyy).
- The downloadable brief (Download brief → print to PDF) is intentionally in
  English — it is the internal handoff to the YachtWay account-manager team.
- Built on the YachtWay design language (Poppins + Figtree, deep-purple accent).
