# Chandan Cycle Store — Website

A complete, original, responsive website for Chandan Cycle Store (Kursela,
Katihar, Bihar). Built with plain HTML, CSS and vanilla JavaScript only —
no frameworks, no build step, no backend.

## Files

```
index.html      All page markup and content (12 sections)
style.css       Full design system + responsive styles
script.js       Navigation, animations, scroll effects, contact form
README.md       This file
assets/images/  Empty folder — drop your real photos in here (see below)
```

## Going live on cPanel

1. Download/zip this whole folder.
2. In cPanel, open **File Manager** → `public_html` (or a subfolder if you
   want the site at a sub-path).
3. Upload the zip and extract it, or upload the four files and the
   `assets/images` folder directly so `index.html` sits at the root of
   `public_html`.
4. Visit your domain — that's it. No database, no PHP, no Node.js, no
   npm install required.

You can also just double-click `index.html` locally to preview the site
in a browser before uploading.

## About the visuals — no stock photos are hot-linked

Per the brief, this build does **not** hot-link images from the old site
or from a random Google search, and it does not link to unverified remote
stock-photo URLs (a broken/expired link would leave you with missing
images on a live store front). Instead, every "photo" slot — the hero
bike, the four bike-category tiles, the "Why us" panel — is an original
line-art illustration built from CSS gradients and inline SVG, using the
bicycle wheel/spoke as a recurring brand motif. This is guaranteed to
render correctly with zero broken images and zero copyright risk.

**To swap in your own store photography** (recommended before going
live):

1. Add your images to `assets/images/`, e.g.:
   ```
   assets/images/hero-bike.jpg
   assets/images/mtb.jpg
   assets/images/road-bike.jpg
   assets/images/hybrid-bike.jpg
   assets/images/kids-bike.jpg
   assets/images/storefront.jpg
   ```
2. In `index.html`, find the relevant `<div class="...__media">` or
   `<div class="hero__visual">` block and replace the inner `<svg>...</svg>`
   with an `<img>` tag, for example:
   ```html
   <div class="cat-card__media cat-card__media--a">
     <img src="assets/images/mtb.jpg" alt="Mountain bike at Chandan Cycle Store" loading="lazy">
   </div>
   ```
3. If you'd rather use free stock photography, only use images you've
   personally verified are licensed for commercial use (e.g. downloaded
   directly from unsplash.com or pexels.com — not hot-linked from another
   business's website).
4. Also update `assets/images/storefront.jpg` referenced in the
   LocalBusiness structured data (`<script type="application/ld+json">`
   near the top of `index.html`) once you have a real photo, and update
   the `og:image` tag if you add one.

## Editing content

- **Text**: all copy lives directly in `index.html` — search for the
  section comment (e.g. `<!-- ============ HERO ============ -->`) and
  edit the text between the tags.
- **Phone / email / address**: the phone number and email currently
  appear in several places (navbar CTA, hero, repair CTA, contact
  section, footer, WhatsApp links, `mailto:` links, and the JSON-LD
  block). Use find-and-replace across `index.html` if these ever change.
  The WhatsApp number is also set once in `script.js` as `STORE_PHONE`.
- **Colors / fonts**: all design tokens (colors, radii, fonts) are
  defined as CSS custom properties at the top of `style.css` under
  `:root`. Changing a value there updates it sitewide.

## The contact form

There is no backend or database, so the form works as a **frontend
hand-off**:

- It validates name, phone and message (email is optional) in the
  browser.
- On submit, it builds a pre-filled **WhatsApp message** (default) or a
  **mailto: email draft** (if the visitor selects "Email"), opens it, and
  shows the confirmation "Thanks! Your enquiry is ready to send."
- Nothing is stored or claimed to be stored on a server — the visitor
  still has to hit send in WhatsApp or their email client.

If you later want the form to submit silently without opening WhatsApp/
email, you'll need a backend or a form service (e.g. Formspree) — that's
outside the scope of this static build.

## Performance & accessibility notes

- No external JS libraries, no jQuery, no Bootstrap.
- Only Google Fonts are loaded remotely (Bricolage Grotesque + Inter),
  with `preconnect` hints.
- All icons are inline SVG (no icon-font request).
- Scroll-reveal and counter animations use `IntersectionObserver` and are
  skipped for users with `prefers-reduced-motion` set.
- Semantic HTML5 landmarks, visible focus states, a "skip to content"
  link, labelled form fields, and `aria-live` status messages are all in
  place.

## SEO

- Single `<h1>` in the hero, proper `<h2>`/`<h3>` hierarchy throughout.
- Meta title/description matching the brief, Open Graph tags, and a
  `BicycleStore` (LocalBusiness) JSON-LD block with the real address,
  phone and founding year.
- Update the `<link rel="canonical">` tag and `og:url` once the final
  live domain is confirmed.
