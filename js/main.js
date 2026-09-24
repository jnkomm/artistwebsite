/* ==========================================================================
   GENGHIS KOMM — site content & behaviour
   Everything you'll want to edit lives in the CONFIG block below.
   ========================================================================== */

// ---------------------------------------------------------------- CONFIG --

// Social / streaming profiles. Any link left empty is hidden automatically.
const LINKS = {
  spotify:    "https://open.spotify.com/artist/5tfyuSehtYBbtPq1VDS9JX",
  instagram:  "https://www.instagram.com/genghiskomm_",
  tiktok:     "https://www.tiktok.com/@genghiskomm",
  youtube:    "https://www.youtube.com/@genghiskomm",
  facebook:   "https://www.facebook.com/genghiskomm",
  soundcloud: "https://soundcloud.com/user-377366087-64355124",
  apple:      "https://music.apple.com/us/artist/genghis-komm/1808337180",            // Apple Music artist page
  beatport:   "Unavailable",           // Beatport artist page
  bandsintown:"Unavailable",        // Bandsintown artist page
  x:          "Unavailable",                                    // e.g. https://x.com/genghiskomm
  merch:      "Unavailable",                                    // store URL — button falls back to #bookings
};

// Order + styling of the social icon rows (hero, bookings, footer).
const SOCIAL_ORDER = [
  ["spotify",     "Spotify",     "#1db954"],
  ["instagram",   "Instagram",   "#e1306c"],
  ["tiktok",      "TikTok",      "#ff0050"],
  ["youtube",     "YouTube",     "#ff0000"],
  ["facebook",    "Facebook",    "#1877f2"],
  ["soundcloud",  "SoundCloud",  "#ff5500"],
  ["apple",       "Apple Music", "#fa2d48"],
  ["bandsintown", "Bandsintown", "#00cec8"],
  ["x",           "X",           "#444"],
];

// Contact addresses.
const EMAILS = {
  bookings:   "bookings@genghiskomm.com",
  newsletter: "josh@genghiskomm.com",
};

// Optional form backends (e.g. https://formspree.io/f/xxxxxx). When empty,
// the booking form opens a pre-filled email to EMAILS.bookings instead.
const BOOKING_ENDPOINT = "";
const NEWSLETTER_ENDPOINT = "";

// Spotify player on the "Latest Release" block, e.g. "artist/4Z8W4fKeB5YxbusRsdQVPb"
// or "track/…" / "album/…". Leave empty to hide the embed.
const SPOTIFY_EMBED = "<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/1muxEpkrSqaNYTV4eHQcV3?utm_source=generator&si=4b517ab412c4441a" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>";

// Discography. `cover` is optional — without it a styled tile is generated.
const RELEASES = [
  { title: "Pay It Forward",   type: "Single", year: 2026, url: LINKS.spotify, colors: ["#7a130c", "#d8321f"], cover: "assets/payitforwardart.jpg" },
  { title: "WHAT THA HELLY (Genghis Komm Edit)",       type: "Edit", year: 2026, url: LINKS.soundcloud, colors: ["#0d2e52", "#3fb4ff"], cover: "assets/whatthahellyart.jpg" },
  { title: "Alabama 10 (Hardstyle/Rawstyle Remix)",      type: "Edit",     year: 2025, url: LINKS.soundcloud, colors: ["#1b1f2a", "#8d97aa"], cover: "assets/alabama10art.jpg"},
  { title: "Gnarly (Rawstlye/Hard Techno Remix)",    type: "Edit", year: 2025, url: LINKS.soundcloud, colors: ["#08263f", "#e2683a"], cover: "assets/gnarlyart.jpg" },
  { title: "Pink Pony (Uptempo Flip)",   type: "Edit", year: 2025, url: LINKS.soundcloud, colors: ["#7a130c", "#d8321f"], cover: "assets/pinkponyart.jpg" },
  { title: "Von Dutch (Genghis Komm Edit)",       type: "Edit", year: 2026, url: LINKS.soundcloud, colors: ["#0d2e52", "#3fb4ff"], cover: "assets/vondutchartart.jpg" },
//  { title: "Scorched Earth (Raw Edit)", type: "Edit", year: 2025, url: LINKS.soundcloud, colors: ["#3a0906", "#1d5fa8"] },
];

// Upcoming shows — EXAMPLE DATA, replace with real dates (or empty the array
// to show the "no dates announced" message). Dates are YYYY-MM-DD.
const SHOWS = [];
//  { date: "2026-10-17", event: "Raw Assault",          venue: "Warehouse 9",        city: "Chicago, IL",     tickets: "#", note: "Headline" },
//  { date: "2026-11-07", event: "Hard Dance Nation",    venue: "The Foundry",        city: "Los Angeles, CA", tickets: "#" },
//  { date: "2026-11-28", event: "Kick Cathedral",       venue: "Terminal 5",         city: "New York, NY",    tickets: "#", soldOut: true },
//  { date: "2026-12-31", event: "NYE: The Horde Rises", venue: "TBA",                city: "Denver, CO",      tickets: "#", note: "Extended set" },


// Videos. `id` is the YouTube video ID (youtube.com/watch?v=ID). Leave id
// empty to show a placeholder tile that links to the channel.
const VIDEOS = [];
//  { id: "", title: "Live @ Raw Assault — Full Set", sub: "60 min · Rawstyle" },
//  { id: "", title: "Khan of the Kick (Official Visualizer)", sub: "Official video" },
//  { id: "", title: "Studio Session: Building the Kick", sub: "Production breakdown" },
// ------------------------------------------------------------ END CONFIG --

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---- links & emails ----
$$("[data-link]").forEach((a) => {
  const url = LINKS[a.dataset.link];
  if (url) a.href = url;
  else if (a.dataset.link === "merch") { a.href = "#bookings"; a.removeAttribute("target"); }
  else a.hidden = true;
});
$$("[data-email]").forEach((a) => {
  const addr = EMAILS[a.dataset.email];
  a.href = `mailto:${addr}`;
  a.textContent = addr;
});

$$(".socials").forEach((ul) => {
  ul.innerHTML = SOCIAL_ORDER.filter(([k]) => LINKS[k])
    .map(([k, label, color]) => `
      <li><a href="${esc(LINKS[k])}" target="_blank" rel="noopener" aria-label="${label}" title="${label}" style="--brand:${color}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${k}"/></svg>
      </a></li>`).join("");
});

// ---- spotify embed ----
if (SPOTIFY_EMBED) {
  const box = $(".embed--spotify");
  box.hidden = false;
  box.innerHTML = `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/artist/5tfyuSehtYBbtPq1VDS9JX?utm_source=generator&si=b95c1a9308284f4a" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
}

// ---- discography ----
$("#disco").innerHTML = RELEASES.map((r) => {
  const [c1, c2] = r.colors || ["#10131b", "#222836"];
  const cover = r.cover
    ? `<div class="disc__cover"><img src="${esc(r.cover)}" alt="${esc(r.title)} cover" loading="lazy"></div>`
    : `<div class="disc__cover disc__cover--gen" style="--gen:radial-gradient(circle at 30% 20%, ${c2}, transparent 60%), linear-gradient(160deg, ${c1}, #07080c)"><span>${esc(r.title)}</span></div>`;
  return `<a class="disc" href="${esc(r.url || "#")}" target="_blank" rel="noopener" data-reveal>
    ${cover}<b>${esc(r.title)}</b><small>${esc(r.type)} · ${esc(r.year)}</small></a>`;
}).join("");

// ---- shows ----
const today = new Date(); today.setHours(0, 0, 0, 0);
const upcoming = SHOWS
  .map((s) => ({ ...s, d: new Date(s.date + "T00:00:00") }))
  .filter((s) => s.d >= today)
  .sort((a, b) => a.d - b.d);

if (upcoming.length) {
  $("#shows-list").innerHTML = upcoming.map((s) => `
    <li class="show${s.soldOut ? " show--soldout" : ""}" data-reveal>
      <div class="show__date"><b>${s.d.getDate()}</b><span>${s.d.toLocaleString("en", { month: "short" })} ${s.d.getFullYear()}</span></div>
      <div class="show__info"><b>${esc(s.event)}${s.note ? `<em>${esc(s.note)}</em>` : ""}</b><span>${esc(s.venue)} — ${esc(s.city)}</span></div>
      <a class="btn ${s.soldOut ? "" : "btn--red"}" href="${esc(s.tickets || "#")}" target="_blank" rel="noopener">${s.soldOut ? "Sold out" : "Tickets"}</a>
    </li>`).join("");
} else {
  $("#shows-empty").hidden = false;
}

// ---- videos (click-to-load, no YouTube requests until played) ----
$("#videos-grid").innerHTML = VIDEOS.map((v, i) => {
  const thumb = v.id
    ? `<img class="thumb" src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy">`
    : `<img class="mark" src="assets/logo.webp" alt="">`;
  const tag = v.id ? "button" : "a";
  const attrs = v.id
    ? `type="button" data-yt="${esc(v.id)}" aria-label="Play ${esc(v.title)}"`
    : `href="${esc(LINKS.youtube || "#")}" target="_blank" rel="noopener" aria-label="${esc(v.title)} on YouTube"`;
  return `<figure class="video" data-reveal style="margin:0">
    <${tag} class="video__frame" ${attrs}>${thumb}<span class="video__play">▶</span></${tag}>
    <figcaption>${esc(v.title)}<small>${esc(v.sub || "")}</small></figcaption>
  </figure>`;
}).join("");

$$("[data-yt]").forEach((btn) => btn.addEventListener("click", () => {
  const frame = document.createElement("iframe");
  frame.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`;
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.allowFullscreen = true;
  frame.title = btn.getAttribute("aria-label");
  btn.replaceChildren(frame);
  btn.removeAttribute("data-yt");
}, { once: true }));

// ---- nav ----
const nav = $(".nav");
const toggle = $(".nav__toggle");
const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 30);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
$$(".nav__menu a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}));

// Highlight the current section in the nav.
const navLinks = $$(".nav__menu a[href^='#']");
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach((s) => spy.observe(s));

// ---- reveal on scroll ----
$$(".section__head, .release, .about__copy, .about__visual, .press__card, .quote, .merch, .bookings__info, .form, .newsletter")
  .forEach((el) => el.setAttribute("data-reveal", ""));
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); revealer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
$$("[data-reveal]").forEach((el) => revealer.observe(el));

// ---- stat counters ----
const counter = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    counter.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = end + suffix; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.6 });
$$("[data-count]").forEach((el) => counter.observe(el));

// ---- hero logo: tilt + occasional glitch ----
const logo = $(".hero__logo img");
if (!reduceMotion && logo) {
  const hero = $(".hero");
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    logo.style.setProperty("--ry", `${x * 10}deg`);
    logo.style.setProperty("--rx", `${-y * 8}deg`);
  });
  hero.addEventListener("pointerleave", () => {
    logo.style.setProperty("--ry", "0deg");
    logo.style.setProperty("--rx", "0deg");
  });
  const glitch = () => {
    logo.classList.add("glitch");
    setTimeout(() => logo.classList.remove("glitch"), 360);
    setTimeout(glitch, 3500 + Math.random() * 5000);
  };
  setTimeout(glitch, 2500);
}

// ---- booking form ----
const form = $("#booking-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const status = $(".form__status", form);
  status.className = "form__status";
  let ok = true;
  $$("[required]", form).forEach((f) => {
    const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle("is-invalid", bad);
    if (bad) ok = false;
  });
  if (!ok) { status.textContent = "Please fill in your name, a valid email and the event name."; status.classList.add("err"); return; }

  const data = Object.fromEntries(new FormData(form));
  if (BOOKING_ENDPOINT) {
    try {
      const res = await fetch(BOOKING_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = "Request received — we'll be in touch within 48 hours.";
      status.classList.add("ok");
    } catch {
      status.innerHTML = `Something went wrong. Email us directly at <a href="mailto:${EMAILS.bookings}">${EMAILS.bookings}</a>.`;
      status.classList.add("err");
    }
    return;
  }

  const subject = `Booking request: ${data.event}${data.date ? ` (${data.date})` : ""}`;
  const body = [
    `Name: ${data.name}`, `Email: ${data.email}`, `Event / promoter: ${data.event}`,
    `Date: ${data.date || "-"}`, `City & venue: ${data.venue || "-"}`, `Capacity: ${data.capacity || "-"}`,
    `Set type: ${data.settype}`, `Budget: ${data.budget || "-"}`, "", data.message || "",
  ].join("\n");
  location.href = `mailto:${EMAILS.bookings}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Opening your email app with the request filled in…";
  status.classList.add("ok");
});
$$("input, textarea", form).forEach((f) => f.addEventListener("input", () => f.classList.remove("is-invalid")));

// ---- newsletter ----
$("#newsletter-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.currentTarget, input = $("input", f), status = $(".form__status", f);
  status.className = "form__status";
  if (!/^\S+@\S+\.\S+$/.test(input.value)) { status.textContent = "Enter a valid email."; status.classList.add("err"); return; }
  if (NEWSLETTER_ENDPOINT) {
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new URLSearchParams({ email: input.value }) });
      if (!res.ok) throw new Error(res.status);
      status.textContent = "You're in. Welcome to the Horde.";
      status.classList.add("ok");
      f.reset();
    } catch { status.textContent = "Couldn't sign you up — try again later."; status.classList.add("err"); }
  } else {
    location.href = `mailto:${EMAILS.newsletter}?subject=${encodeURIComponent("Subscribe")}&body=${encodeURIComponent(`Please add ${input.value} to the mailing list.`)}`;
    status.textContent = "Opening your email app to confirm…";
    status.classList.add("ok");
  }
});

$("#year").textContent = new Date().getFullYear();
