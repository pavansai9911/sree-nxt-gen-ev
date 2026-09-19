/* ==========================================================================
   Sree NXT GEN EV — content file
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR DAY-TO-DAY CONTENT CHANGES.
   Change the numbers, prices, bikes, reviews and FAQs here and every page
   updates. Keep the quotes and commas exactly where they are.
   ========================================================================== */

window.SITE = {
  /* --- Shop details -----------------------------------------------------
     phone      : number the "Call" button dials. Digits only, with 91.
     whatsapp   : number the "WhatsApp" button opens. Digits only, with 91.
     mapsLink   : the Google Maps short link for the "Directions" button.
     instagram  : full profile URL, e.g. "https://instagram.com/yourhandle".
                  Leave "" to keep the Instagram icon hidden in the footer.
     email      : contact address, e.g. "hello@example.com".
                  Leave "" to keep the email icon hidden in the footer.
     ------------------------------------------------------------------- */
  name: "Sree NXT GEN EV",
  phone: "917671931344",
  phoneDisplay: "+91 76719 31344",
  whatsapp: "917671931344",
  mapsLink: "https://maps.app.goo.gl/efDsurcxr8Ua7Mjt7",
  address: "Pappula Veedhi, near Sarada bridge, opposite Town Police Station, Anakapalle, Andhra Pradesh 531001",
  addressShort: "Anakapalle main road, near Sarada bridge",
  hours: "Monday to Saturday, 9:30 am – 8:30 pm · Sunday, 10 am – 2 pm",
  instagram: "",
  email: "",

  /* Message that gets pre-typed when someone taps WhatsApp */
  waDefault: "Hello Sree NXT GEN EV, I saw your website and I would like to know more about your electric vehicles.",

  /* --- Structured data ----------------------------------------------------
     Feeds the "AutoDealer" schema block on every page (search engine info,
     not visible on the page itself) so it always matches the details above
     instead of being typed out separately on each page.
     ------------------------------------------------------------------- */
  businessDescription: "Electric scooters, bikes and cargo vehicles assembled in-house, with service and spares, in Anakapalle, Andhra Pradesh.",
  ogImage: "assets/img/brand/og-cover.jpg",
  addressParts: {
    street: "Pappula Veedhi, near Sarada bridge, opposite Town Police Station",
    locality: "Anakapalle",
    region: "Andhra Pradesh",
    postalCode: "531001",
    country: "IN"
  },
  hoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:30", closes: "20:30" },
    { days: "Sunday", opens: "10:00", closes: "14:00" }
  ]
};

/* --------------------------------------------------------------------------
   BUILDS — the bikes and scooters on the floor.
   image  : file inside assets/img/builds/ (1200 x 900 works best)
   tag     : small label on the card. Use "" for none. "Sold out" style
             labels turn red automatically if you write tagStyle: "flare".
   category: "scooter" | "bike" | "cargo" — drives the filter buttons
   specs   : shown inside the pop-up. Add or remove rows freely.
   -------------------------------------------------------------------------- */
window.BUILDS = [
  {
    id: "volt-x1",
    name: "NXT Volt X1",
    image: "assets/img/builds/build-01.jpg",
    category: "scooter",
    tag: "In stock",
    price: "₹74,999",
    priceNote: "on-road, Anakapalle",
    summary: "Our everyday city scooter. Assembled in our workshop with a 60V lithium pack and a hub motor tuned for stop-start traffic.",
    specs: [
      ["Range per charge", "95–110 km"],
      ["Top speed", "65 km/h"],
      ["Battery", "60V 30Ah lithium"],
      ["Charging time", "4 hours"],
      ["Motor", "1500W BLDC hub"],
      ["Brakes", "Disc front, drum rear"],
      ["Warranty", "3 years on battery"]
    ]
  },
  {
    id: "volt-x1-pro",
    name: "NXT Volt X1 Pro",
    image: "assets/img/builds/build-02.jpg",
    category: "scooter",
    tag: "Most asked for",
    price: "₹89,999",
    priceNote: "on-road, Anakapalle",
    summary: "The X1 with a bigger pack and a faster controller, for riders who cover 50 km or more a day.",
    specs: [
      ["Range per charge", "130–150 km"],
      ["Top speed", "75 km/h"],
      ["Battery", "72V 40Ah lithium"],
      ["Charging time", "4.5 hours"],
      ["Motor", "2000W BLDC hub"],
      ["Brakes", "Disc front and rear"],
      ["Warranty", "3 years on battery"]
    ]
  },
  {
    id: "cargo-one",
    name: "NXT Cargo One",
    image: "assets/img/builds/build-03.jpg",
    category: "cargo",
    tag: "Built to order",
    price: "₹1,05,000",
    priceNote: "starting, before load box",
    summary: "A load carrier for shops and delivery runs. Rear frame, carrier plate and box size are made to your measurement.",
    specs: [
      ["Payload", "180 kg"],
      ["Range when loaded", "80–90 km"],
      ["Top speed", "50 km/h"],
      ["Battery", "72V 45Ah lithium"],
      ["Motor", "2500W mid-drive"],
      ["Build time", "10–14 days"],
      ["Warranty", "3 years on battery"]
    ]
  },
  {
    id: "street-125",
    name: "NXT Street 125",
    image: "assets/img/builds/build-04.jpg",
    category: "bike",
    tag: "In stock",
    price: "₹1,24,000",
    priceNote: "on-road, Anakapalle",
    summary: "A motorcycle-style build on a steel trellis frame, with a mid-drive motor and a removable battery you can carry upstairs.",
    specs: [
      ["Range per charge", "120–135 km"],
      ["Top speed", "85 km/h"],
      ["Battery", "72V 45Ah, removable"],
      ["Charging time", "5 hours"],
      ["Motor", "3000W mid-drive"],
      ["Brakes", "Disc front and rear"],
      ["Warranty", "3 years on battery"]
    ]
  },
  {
    id: "trail-r",
    name: "NXT Trail R",
    image: "assets/img/builds/build-05.jpg",
    category: "bike",
    tag: "",
    price: "₹1,38,000",
    priceNote: "on-road, Anakapalle",
    summary: "Raised suspension and knobbly tyres for village roads and field tracks around Anakapalle.",
    specs: [
      ["Range per charge", "110–125 km"],
      ["Top speed", "80 km/h"],
      ["Battery", "72V 45Ah lithium"],
      ["Ground clearance", "220 mm"],
      ["Motor", "3000W mid-drive"],
      ["Suspension", "Long travel front and rear"],
      ["Warranty", "3 years on battery"]
    ]
  },
  {
    id: "mini-ev",
    name: "NXT Mini",
    image: "assets/img/builds/build-06.jpg",
    category: "scooter",
    tag: "No licence needed",
    price: "₹54,999",
    priceNote: "on-road, Anakapalle",
    summary: "A low-speed scooter for school runs and short errands. Stays under 25 km/h, so no licence or registration is needed.",
    specs: [
      ["Range per charge", "70–80 km"],
      ["Top speed", "25 km/h"],
      ["Battery", "48V 24Ah lithium"],
      ["Charging time", "4 hours"],
      ["Motor", "250W BLDC hub"],
      ["Licence", "Not required"],
      ["Warranty", "2 years on battery"]
    ]
  },
  {
    id: "rider-lx",
    name: "NXT Rider LX",
    image: "assets/img/builds/build-07.jpg",
    category: "scooter",
    tag: "",
    price: "₹82,500",
    priceNote: "on-road, Anakapalle",
    summary: "A comfort-first build with a wider seat, taller windshield and a flat floor for carrying bags.",
    specs: [
      ["Range per charge", "105–120 km"],
      ["Top speed", "70 km/h"],
      ["Battery", "60V 35Ah lithium"],
      ["Charging time", "4 hours"],
      ["Motor", "1800W BLDC hub"],
      ["Seat", "Wide twin-rider"],
      ["Warranty", "3 years on battery"]
    ]
  },
  {
    id: "bolt-s",
    name: "NXT Bolt S",
    image: "assets/img/builds/build-08.jpg",
    category: "bike",
    tag: "Two left",
    tagStyle: "flare",
    price: "₹1,49,000",
    priceNote: "on-road, Anakapalle",
    summary: "Our quickest build. Higher voltage pack, upgraded controller and a sport riding position.",
    specs: [
      ["Range per charge", "125–140 km"],
      ["Top speed", "95 km/h"],
      ["Battery", "84V 45Ah lithium"],
      ["0–40 km/h", "3.2 seconds"],
      ["Motor", "4000W mid-drive"],
      ["Brakes", "Disc front and rear"],
      ["Warranty", "3 years on battery"]
    ]
  }
];

/* --------------------------------------------------------------------------
   REVIEWS — what customers say. Keep them short and real.
   -------------------------------------------------------------------------- */
window.REVIEWS = [
  {
    text: "Bought the Volt X1 for my daily trip to Visakhapatnam. Three months in, the range is exactly what they told me. They also handled the registration paperwork for me.",
    name: "Ravi Kumar",
    place: "Anakapalle",
    stars: 5
  },
  {
    text: "They built a cargo scooter for my kirana shop with the box size I asked for. Delivery runs cost me almost nothing now compared to petrol.",
    name: "Srinivas Rao",
    place: "Kasimkota",
    stars: 5
  },
  {
    text: "My battery had a fault in the second month. They picked up the vehicle from my house, replaced the cell pack under warranty and returned it in four days.",
    name: "Lakshmi Devi",
    place: "Yelamanchili",
    stars: 5
  },
  {
    text: "I compared four showrooms before buying here. The difference is they open the scooter up and show you what is inside before you pay.",
    name: "Prasad N",
    place: "Narsipatnam",
    stars: 5
  },
  {
    text: "Got the Mini for my daughter's college. No licence needed and the charging cost is about twenty rupees a week.",
    name: "Sudha Rani",
    place: "Anakapalle",
    stars: 4
  },
  {
    text: "Service is the reason I recommend them. Free check-up every three months and they actually call to remind you.",
    name: "Mohan Babu",
    place: "Elamanchili",
    stars: 5
  }
];

/* --------------------------------------------------------------------------
   FAQS — the questions customers ask at the counter.
   -------------------------------------------------------------------------- */
window.FAQS = [
  {
    q: "What does it cost to charge an electric scooter at home?",
    a: "A full charge uses roughly 2 to 3 units of electricity. At Andhra Pradesh domestic rates that is about ₹15 to ₹25 for 100 km of riding, against roughly ₹250 of petrol for the same distance."
  },
  {
    q: "Do I need a licence and registration?",
    a: "If the vehicle crosses 25 km/h you need a licence, registration and a helmet, and we complete that paperwork for you at the showroom. Low-speed models like the NXT Mini stay under 25 km/h and need none of it."
  },
  {
    q: "How long does the battery last before it needs replacing?",
    a: "A lithium pack used normally lasts 5 to 7 years, or about 1,000 full charge cycles. Ours carry a 3 year warranty and we replace individual cell groups rather than the whole pack wherever we can."
  },
  {
    q: "What makes an assembled vehicle different from a showroom brand?",
    a: "We choose the frame, motor, controller and battery separately and put them together here, so you can ask for more range, a taller seat, a load carrier or a different colour. We also stock every part we use, so repairs do not wait on a company depot."
  },
  {
    q: "Can I ride it in the rain?",
    a: "Yes. The battery pack and controller are sealed to IP67, so normal monsoon riding is fine. Avoid standing water deeper than the wheel hub, the same as you would with a petrol vehicle."
  },
  {
    q: "Do you offer EMI or exchange?",
    a: "Yes. We work with bank and NBFC finance from about ₹2,500 a month, and we take petrol two-wheelers in exchange. Bring your RC book and we will value it while you wait."
  },
  {
    q: "What is covered in the free service?",
    a: "Three free services in the first year: battery health check, controller diagnostics, brake and tyre check, and a software update where the model supports it. After that a full service costs about ₹500."
  },
  {
    q: "How far is the showroom from Visakhapatnam?",
    a: "About 35 km along NH16, roughly 50 minutes. We are on the Anakapalle main road near the Sarada bridge, opposite the town police station, with parking in front."
  }
];
