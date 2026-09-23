# Genghis Komm — Artist Website

A static, no-build hard dance artist site: hero, latest release, discography, bio, tour dates, videos, press kit, merch, bookings form, newsletter, and social links (Spotify, Instagram, TikTok, YouTube, Facebook, SoundCloud, Apple Music, Beatport, Bandsintown).

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Upload the folder as-is to any static host: GitHub Pages (Settings → Pages → deploy from branch), Netlify, Vercel, or Cloudflare Pages.

## Editing content

Almost everything lives in the **CONFIG** block at the top of `js/main.js`:

| What | Where |
| --- | --- |
| Social and streaming URLs (leave empty to hide) | `LINKS` |
| Booking, management, and press email addresses | `EMAILS` |
| Spotify player (`"artist/ID"`, `"track/ID"`, …) | `SPOTIFY_EMBED` |
| Discography | `RELEASES` (add `cover: "assets/covers/x.jpg"` for real artwork) |
| Tour dates (past dates hide automatically) | `SHOWS`. **These are example dates; replace them or empty the array.** |
| YouTube videos | `VIDEOS` (set `id` to the YouTube video ID) |
| Form backends (optional, e.g. Formspree) | `BOOKING_ENDPOINT`, `NEWSLETTER_ENDPOINT` |

Without a form endpoint, the booking form opens the visitor's email app with the request already filled in.

In `index.html`, edit the **bio**, **stats**, **latest-release copy**, **press quote**, and the `sameAs` links in the JSON-LD block in `<head>`.

### Assets to add

- `assets/press/genghis-komm-epk.pdf`, `genghis-komm-photos.zip`, `genghis-komm-rider.pdf` (press kit downloads)
- Press photo: swap the placeholder in the About section for an `<img>`
- Cover art: add it under `assets/covers/` and reference it from `RELEASES`
