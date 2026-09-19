# Sree NXT GEN EV — website

A static website for Sree NXT GEN EV, Anakapalle. Plain HTML, CSS and JavaScript.
No npm, no build step, no server. Upload the folder and it runs.

---

## 1. Putting it online with GitHub Pages

1. Create a new repository on GitHub (public).
2. Upload **everything inside this folder** to the root of the repository —
   `index.html` must sit at the top level, not inside another folder.
3. Go to **Settings → Pages**.
4. Under *Source* choose **Deploy from a branch**, pick `main` and folder `/ (root)`.
5. Save. The site appears at `https://USERNAME.github.io/REPO-NAME/` in about a minute.

The `.nojekyll` file is already included, which stops GitHub from processing the
files and is what keeps folders beginning with an underscore working. Do not delete it.

**After it is live**, open `robots.txt` and `sitemap.xml` and replace `USERNAME` and
`REPO-NAME` with the real address, and update the `<link rel="canonical">` line near
the top of `index.html`.

---

## 2. The one file you will edit most

**`assets/js/data.js`** holds all the content that changes: the phone number, the
WhatsApp number, the address, the bikes, the reviews and the FAQs. Edit it in any text
editor. Keep the quote marks and commas exactly where they are.

### Changing the phone or WhatsApp number

At the top of `data.js`:

```js
phone: "917671931344",              // what the Call button dials
phoneDisplay: "+91 76719 31344",    // how it is written on the page
whatsapp: "917671931344",           // what the WhatsApp button opens
```

Digits only, country code first, no spaces, no `+`. Change it here and every Call and
WhatsApp button on every page updates. There is nothing to change in the HTML.

> **Please check this before going live.** The signboard shows
> `+91 93936 2446` and `+91 93953 2444`, but both are only nine digits, so a digit is
> missing from each and neither can be dialled. Until the correct showroom number is
> confirmed, both Call and WhatsApp use **7671 9313 44**, the number supplied for
> WhatsApp.

### Adding the Instagram or email icons

```js
instagram: "",   // full profile URL, e.g. "https://instagram.com/yourhandle"
email: "",       // e.g. "hello@example.com"
```

Both are blank by default, so the icons stay hidden in the footer. Fill in either one
and its icon appears at the bottom of every page automatically — nothing else to edit.

### Changing the Google Maps location

```js
mapsLink: "https://maps.app.goo.gl/efDsurcxr8Ua7Mjt7",
```

That is what the Directions buttons open. The small embedded map is separate — it is an
`<iframe>` in `index.html` and `contact.html`. To change it, search those files for
`output=embed` and replace the address inside the `q=` part of the link.

### Adding, removing or editing a vehicle

Each vehicle is one block inside `window.BUILDS`. Copy an existing block, paste it,
and change the values:

```js
{
  id: "volt-x1",                        // must be unique, no spaces
  name: "NXT Volt X1",
  image: "assets/img/builds/build-01.jpg",
  category: "scooter",                  // scooter | bike | cargo
  tag: "In stock",                      // small label on the card, "" for none
  price: "₹74,999",
  priceNote: "on-road, Anakapalle",
  summary: "Our everyday city scooter...",
  specs: [
    ["Range per charge", "95–110 km"],
    ["Top speed", "65 km/h"]
  ]
}
```

- `category` drives the filter buttons on the builds page.
- Add `tagStyle: "flare"` to make the label red instead of green — useful for
  "Two left" or "Sold out".
- The first two rows of `specs` are what show on the card, so keep range and top speed
  in those positions.
- The home page shows the **first four** vehicles in the list. Reorder the list to
  change what is featured.

Reviews and FAQs work the same way, in `window.REVIEWS` and `window.FAQS` further down
the same file.

### Changing the savings calculator prices

The petrol and power prices behind the "What you would stop spending on petrol"
section are **not** in `data.js`. They sit at the top of the calculator block in
`assets/js/main.js`, marked `// ADD THIS`:

```js
var PETROL_PRICE = 100;             // rupees per litre
var PETROL_MILEAGE = 60;            // km per litre
var POWER_UNIT_PRICE = 5;           // rupees per unit
var EV_UNITS_PER_FULL_CHARGE = 3;   // units for a full charge
var EV_RANGE_PER_FULL_CHARGE = 100; // km on a full charge
```

Change the numbers when prices move. If you change them, also update the grey line of
text under the calculator in `index.html`, which spells the same figures out for
visitors.

The chart uses Chart.js, loaded from a CDN. If that ever fails to load, the section
falls back to two plain bars drawn in CSS and every number still works.

---

## 3. Replacing the images

Every image in `assets/img/` is a placeholder. Each one has its filename and the
required pixel size printed on it. **Keep the same filename and the same shape** and
nothing in the layout needs to change.

| Folder | File | Size | Used for |
|---|---|---|---|
| `img/hero/` | `hero-1-mobile.jpg` … `hero-3-mobile.jpg` | **1080 × 1620** (tall) | Hero on phones |
| `img/hero/` | `hero-1-desktop.jpg` … `hero-3-desktop.jpg` | **2000 × 1000** (wide) | Hero on laptops |
| `img/builds/` | `build-01.jpg` … `build-08.jpg` | **1200 × 900** | Vehicle cards and pop-ups |
| `img/showroom/` | `showroom-01.jpg` … `showroom-06.jpg` | **1200 × 900** | Showroom gallery |
| `img/brand/` | `workshop.jpg` | **1200 × 1500** (tall) | Assembly section |
| `img/brand/` | `service.jpg` | **1200 × 900** | Service section |
| `img/brand/` | `signboard.jpg` | **1340 × 284** | Gallery page banner |
| `img/brand/` | `og-cover.jpg` | **1200 × 630** | Preview when shared on WhatsApp |

### About the hero images

This is the behaviour from the Ola site you asked for. Each hero slide loads **two
different photos** — a tall one on phones and a wide one on laptops — and the browser
picks the right one automatically at 768 pixels. The headline on top is sized with
`clamp()`, so it scales smoothly instead of jumping between sizes.

Two things to keep in mind when shooting or cropping:

- On phones the text sits at the **top** and the photo is anchored to the **bottom**,
  so put the vehicle in the lower half of the tall image, the way Ola do.
- On laptops the text sits on the **left**, so leave the left third of the wide image
  reasonably clear. A dark gradient is painted over that area automatically, so the
  headline stays readable, but an empty background still looks better.

Save photos as JPG at around 75% quality and keep each one under about 300 KB. Large
photos are the one thing that will make this site feel slow on mobile data.

---

## 4. What is on each page

| File | Page |
|---|---|
| `index.html` | Home — hero slider, featured builds, assembly story, buying steps, service, map, reviews, FAQs, enquiry form |
| `builds.html` | All vehicles, with filters by type |
| `gallery.html` | Showroom and workshop photos |
| `contact.html` | Address, hours, map, enquiry form, FAQs |
| `404.html` | Shown when a link is wrong |

---

## 5. How the contact features work

**The three buttons fixed to the bottom of the screen on mobile** — Call, WhatsApp and
Directions — are always visible while scrolling and disappear above 768 pixels, where a
floating WhatsApp button takes over instead.

**The enquiry form does not email anyone.** A site hosted on GitHub Pages has no server,
so the form collects the name, phone, interest and question, and opens WhatsApp with
that message already typed. The visitor presses send. Nothing is stored on the website.

**The vehicle pop-ups** prefill a WhatsApp message naming that specific model and price,
so you know which vehicle the enquiry is about before you reply.

---

## 6. Things worth checking before launch

- [ ] Confirm the correct showroom phone number and update `data.js`
- [ ] Replace all placeholder photos
- [ ] Replace the vehicle names, specifications and prices — the ones in place now are
      examples and must not go live as they are
- [ ] Replace the customer reviews with real ones
- [ ] Check the opening hours in `data.js`
- [ ] Update `robots.txt`, `sitemap.xml` and the canonical link with the live address
- [ ] Open the site on a real phone and tap all three bottom buttons

---

## 7. Notes for whoever maintains this

- Colours, spacing and type sizes are all CSS variables at the top of
  `assets/css/style.css`. Change `--volt` there to change the green everywhere.
- The typeface is Archivo, loaded from Google Fonts. If it fails to load the site falls
  back to Helvetica and Arial and still looks correct.
- The site works without JavaScript for reading, but the vehicle list, reviews, FAQs and
  the pop-ups need it, since those are rendered from `data.js`.
- Tested at 390 px and 1440 px. No horizontal scrolling, no console errors, keyboard
  focus is visible, and animation is switched off for visitors who ask their device to
  reduce motion.
