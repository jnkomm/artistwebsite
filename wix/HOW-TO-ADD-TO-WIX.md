# Adding the Genghis Komm site to Wix

Wix can't import an HTML website, but it can show one inside an **Embed HTML** element. `genghis-komm-wix-embed.html` is a one-file version of the site built for that. The styles, scripts and logo are all inside it.

## Steps

1. Open `genghis-komm-wix-embed.html` in a text editor and copy everything (Ctrl/Cmd + A, then C).
2. In the Wix Editor, create a blank page, or delete everything on an existing page.
3. Click **Add Elements (+) → Embed Code → Embed HTML**.
4. Click **Enter Code**, choose **Code**, paste, and click **Update**.
5. Make the element full width: **Stretch** in the Wix Editor, or set the width to 100% in Wix Studio.
6. Set the height so the site doesn't scroll inside a box:
   - **Desktop:** about **8,900 px**
   - **Mobile** (switch to the mobile view in the editor): about **13,300 px**
7. Hide the Wix header and footer on this page if you don't want them above and below the site.
8. Click **Preview**, then **Publish**.

## Before pasting

The settings block near the top of the `<script>` section is the same one in `js/main.js`. Put your real social links, emails, Spotify ID, shows and videos there first.

- **Booking form:** Wix runs embeds in a sandbox that can block the "open your email app" fallback. Create a free [Formspree](https://formspree.io) form and paste its URL into `BOOKING_ENDPOINT` (and `NEWSLETTER_ENDPOINT`) so requests reach your inbox directly.
- **Wix says the code is too long:** upload `assets/logo.webp` to Wix Media, copy its URL, and replace the long `LOGO_SRC = "data:image/webp;base64,…"` value with that URL in quotes. That removes about 215,000 characters.
- **Press kit downloads:** upload the PDFs and ZIP to Wix Media and put their URLs into the three `press__card` links.

## Regenerating this file

If you edit `index.html`, `css/style.css` or `js/main.js`, ask Claude to rebuild the Wix embed file.
