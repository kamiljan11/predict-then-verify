# Runbook - Predict Then Verify

Status as of 2026-10-05, derived from the repo and its git history. Items the repo cannot answer are marked `[DO UZUPEŁNIENIA przez Kamila: ...]`.

## What runs where

- The product is a single static file, `index.html` (styles, logic and bundled content inline). There is no server, backend, database or build step.
- Users run it by opening the file in a browser. Their data stays in the browser's `localStorage` (see README, "Data and storage").
- Public hosting (for example GitHub Pages) is **not configured in the repo** (no workflow, no `CNAME`, no hosting config). `[DO UZUPEŁNIENIA przez Kamila: czy i gdzie index.html jest hostowany publicznie, np. GitHub Pages, i pod jakim adresem]`.
- `_serve.js` is an optional local static server (Node, no dependencies): `node _serve.js`, then open `http://127.0.0.1:8777/`. For local use only.

## Release / deploy

1. Edit `index.html`, open it in a browser, run the manual check from the README ("Testing").
2. Commit and merge to `main`. There are no tags or release workflow; the repository state is the release.
3. If it is hosted: `[DO UZUPEŁNIENIA przez Kamila: sposób publikacji]`.

Build/verification helpers (`_build_*.js`, `_check.js`, `_scrub.js`) are listed in `.gitignore` and are not part of the repo. `[DO UZUPEŁNIENIA przez Kamila: gdzie leżą te narzędzia, jeśli mają być dostępne przy przekazaniu]`.

## Rollback

`git revert <commit>` on `main` (and republish, if hosted). Users' stored progress is independent of the file version; the progress export carries `_v: 1` and the app rejects files that are not from this app.

## Secrets

- The repo contains no secrets and needs none.
- Optional: a user's own Anthropic API key, entered in the app's Settings, kept only in that user's browser. The maintainer holds no key for this product.

## Common problems

| Symptom | Cause | Action |
|---|---|---|
| Progress disappeared | browser data cleared or a different browser/profile | restore with **Settings -> Import progress** from an earlier export |
| Import says "not a progress file of this app" | wrong JSON file | use a file produced by **Export progress** |
| Some features misbehave from `file://` | browser restrictions on local files | run `node _serve.js` and open the local address |
| Model grading, Mentor or Interview simulator fail | no or invalid API key, or API error (the app shows `API <status>`) | check the key in Settings; without a key the app falls back to keyword grading |
| English mode has fewer lessons | English ships with 8 verified encounters; the full bank is Polish | expected; add content as JSON (see README) |

## Monitoring

None (static file, no telemetry). `[DO UZUPEŁNIENIA przez Kamila: czy potrzebny jest monitoring dostępności, jeśli strona jest hostowana]`.
