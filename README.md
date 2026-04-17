# Mahesh & Company Aspur — Agriculture E-Commerce Website

## Live URL

**Production:** [https://nikitasomani14.github.io/mahesh-company-website/](https://nikitasomani14.github.io/mahesh-company-website/)

**Repository:** [https://github.com/nikitasomani14/mahesh-company-website](https://github.com/nikitasomani14/mahesh-company-website)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Business Context](#business-context)
3. [Tech Stack & Architecture](#tech-stack--architecture)
4. [File Structure & Responsibilities](#file-structure--responsibilities)
5. [HTML Structure (index.html)](#html-structure-indexhtml)
6. [CSS Architecture (style.css)](#css-architecture-stylecss)
7. [JavaScript Logic (script.js)](#javascript-logic-scriptjs)
8. [Translation System (translations.js)](#translation-system-translationsjs)
9. [Product Data Model](#product-data-model)
10. [State Management](#state-management)
11. [SEO & Discoverability](#seo--discoverability)
12. [Mobile Responsiveness Strategy](#mobile-responsiveness-strategy)
13. [Performance Optimizations](#performance-optimizations)
14. [Legal & Compliance](#legal--compliance)
15. [Image Strategy & Sources](#image-strategy--sources)
16. [Deployment & Hosting](#deployment--hosting)
17. [Git History & Evolution](#git-history--evolution)
18. [Known Issues & Limitations](#known-issues--limitations)
19. [Future Improvements](#future-improvements)
20. [Key Decisions & Trade-offs](#key-decisions--trade-offs)
21. [How to Modify](#how-to-modify)
22. [Contact Information (Real)](#contact-information-real)

---

## Project Overview

A **single-page, static e-commerce website** for Mahesh & Company, an agricultural equipment dealership in Aspur, Dungarpur District, Rajasthan, India. The website serves as a digital storefront and advertising platform for the business, showcasing products, services, and contact information. It is **not a transactional e-commerce site** — orders are routed to WhatsApp for human confirmation.

### What This Website Is

- A **promotional and advertising website** for a physical retail shop
- A **product catalog** with indicative pricing (not a live inventory system)
- A **lead generation tool** routing inquiries to WhatsApp and phone calls
- A **local SEO presence** for the business in Aspur, Rajasthan

### What This Website Is NOT

- Not a full e-commerce platform with payment processing
- Not connected to any backend, database, or inventory management system
- Not a real-time pricing system — all prices are indicative with asterisks
- Not an official manufacturer website — it is a dealer's promotional site

### Core Design Philosophy

- **Zero dependencies**: No build tools, no npm, no frameworks. Pure HTML/CSS/JS that runs by opening `index.html`
- **Mobile-first audience**: Primary users are farmers in rural Rajasthan using Android phones on slow data connections
- **Bilingual**: English + Hindi toggle (custom translation system, not Google Translate)
- **WhatsApp-centric**: All calls-to-action ultimately route to WhatsApp or phone calls — the actual business communication channels used in rural India

---

## Business Context

### About the Business

| Field | Details |
|-------|---------|
| **Business Name** | Mahesh & Company |
| **Location** | Dabrawat Complex, Near Roadways Bus Stand, Aspur, Dungarpur District, Rajasthan - 314021 |
| **Founded** | 2001 |
| **Founder** | Mukesh Mantri |
| **Co-Founder / Manager** | Atul Mantri |
| **Phone Numbers** | +91-94147 24472, +91-91660 3621 |
| **WhatsApp** | +91-7297047681 (Atul Mantri) |
| **Business Hours** | Mon-Sat: 8:00 AM - 8:00 PM, Sunday: 9:00 AM - 2:00 PM |
| **GPS Coordinates** | 23.9583635, 74.0804451 |

### Authorized Dealerships

- Shri Ram Fertilizers & Chemicals
- Sonalika Thresher
- Ganeshraj Thresher
- Honda Engines (GX Series)
- Hand Pumps
- Flour Mills (Atta Chakki)
- Diesel Engines & Motor Parts
- Oil & Grease

### Target Audience

- Farmers in Aspur and surrounding villages in Dungarpur district
- Agricultural equipment buyers in southern Rajasthan
- People searching for JCB rental services in the area
- Hindi-speaking, mobile-first users on Android devices with 4G/3G connections

---

## Tech Stack & Architecture

### Technology Choices

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Markup** | HTML5 | Semantic elements, accessibility, no templating needed |
| **Styling** | CSS3 | Custom properties (variables), Flexbox, Grid, animations, media queries |
| **Logic** | Vanilla JavaScript (ES6+) | No framework overhead; site is small enough; zero build step |
| **Fonts** | Google Fonts (Poppins + Playfair Display) | Professional typography, good Hindi/Devanagari support via Poppins |
| **Icons** | Font Awesome 6.5.1 (CDN) | Comprehensive icon set, no custom SVGs needed |
| **Images** | Mix of local PNGs + external URLs (Unsplash, imimg, Pinterest) | See [Image Strategy](#image-strategy--sources) |
| **Hosting** | GitHub Pages | Free, reliable, HTTPS by default, git-based deployment |
| **PWA** | manifest.json with SVG icons | "Add to Home Screen" support on Android |

### Architecture Pattern

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│                                                  │
│  index.html ──── style.css (4678 lines)          │
│      │                                           │
│      ├── script.js (1466 lines)                  │
│      │     ├── Product data (24 items, inline)   │
│      │     ├── Cart logic (localStorage)         │
│      │     ├── Wishlist logic (localStorage)     │
│      │     ├── UI rendering (DOM manipulation)   │
│      │     ├── Hero slider                       │
│      │     ├── Animations & scroll effects       │
│      │     └── Dark mode, search, modals         │
│      │                                           │
│      ├── translations.js (493 lines)             │
│      │     ├── English strings                   │
│      │     └── Hindi strings                     │
│      │                                           │
│      └── manifest.json (PWA)                     │
│                                                  │
│  External CDNs:                                  │
│  ├── Google Fonts (Poppins, Playfair Display)    │
│  ├── Font Awesome 6.5.1                         │
│  └── Unsplash (hero images, some products)       │
│                                                  │
│  SEO files:                                      │
│  ├── robots.txt                                  │
│  ├── sitemap.xml                                 │
│  └── google59604456b94119d1.html (verification)  │
└─────────────────────────────────────────────────┘
```

### No Backend

There is **no server, no API, no database**. Everything runs client-side. The "checkout" flow composes a WhatsApp message with order details and opens `wa.me` — the merchant then confirms manually.

---

## File Structure & Responsibilities

```
mahesh-company-website/
│
├── index.html                      # Main HTML (1114 lines) — all sections, modals, structured data
├── style.css                       # All styling (4678 lines) — includes responsive breakpoints, dark mode, animations
├── script.js                       # All logic (1466 lines) — product data, cart, wishlist, slider, modals
├── translations.js                 # English + Hindi translations (493 lines)
├── manifest.json                   # PWA manifest with SVG icons
│
├── robots.txt                      # Search engine crawl directives
├── sitemap.xml                     # XML sitemap for Google
├── google59604456b94119d1.html     # Google Search Console verification file
├── .nojekyll                       # Tells GitHub Pages to skip Jekyll processing
│
├── mukesh-mantri.png               # Founder photo (124 KB)
├── atul-mantri.png                 # Co-founder photo (147 KB)
├── business-card.png               # Business card image used in About section + OG image (521 KB)
├── honda-engines.png               # Honda engine stock image (704 KB)
├── customer-review-1.png           # Customer testimonial photo 1 (228 KB)
├── customer-review-2.png           # Customer testimonial photo 2 (272 KB)
│
├── .git/                           # Git repository
└── README.md                       # This documentation file
```

### File Size Summary

| File | Lines | Size (approx) | Purpose |
|------|-------|----------------|---------|
| `index.html` | 1,114 | 70 KB | Structure, content, structured data, all HTML |
| `style.css` | 4,678 | 84 KB | Styling, responsive design, dark mode, animations |
| `script.js` | 1,466 | 55 KB | Product data, business logic, UI interactions |
| `translations.js` | 493 | 29 KB | Bilingual content (EN/HI) |
| **Total code** | **7,751** | **238 KB** | |
| **Images (local)** | — | ~2 MB | 6 local PNG images |

---

## HTML Structure (index.html)

### Document Head (Lines 1-120 approx)

The `<head>` contains:

1. **Viewport meta**: `width=device-width, initial-scale=1.0, maximum-scale=5.0` — allows pinch-zoom for accessibility
2. **Theme color**: `#2d6a4f` (primary green) — colors the Android Chrome address bar
3. **Preconnect hints**: `images.unsplash.com`, `fonts.googleapis.com`, `fonts.gstatic.com` — speeds up external resource loading
4. **DNS prefetch**: `5.imimg.com`, `i.pinimg.com`, `cdnjs.cloudflare.com` — pre-resolves DNS for image CDNs
5. **Apple meta tags**: PWA support for iOS (standalone, status bar style)
6. **PWA manifest**: Links to `manifest.json` for "Add to Home Screen"
7. **Favicon**: Inline SVG data URI (no external file needed)
8. **SEO meta tags**: `description`, `keywords`, `author`, `robots`, `canonical`
9. **Open Graph tags**: For Facebook/WhatsApp link previews (uses `business-card.png`)
10. **Twitter Card tags**: For Twitter link previews
11. **Geo tags**: `geo.region`, `geo.placename`, `geo.position`, `ICBM` — for local SEO
12. **JSON-LD Structured Data**: Two blocks:
    - `LocalBusiness` schema: Name, address, geo, hours, phone, products, services, price range
    - `WebSite` schema: Name, URL, publisher

### Page Sections (in order)

| Section | HTML ID/Class | Description |
|---------|--------------|-------------|
| Top Bar | `.top-bar` | Phone numbers, WhatsApp, address strip |
| Navbar | `.navbar` | Sticky nav with logo, links, search, dark mode, language, wishlist, cart icons |
| Hero Slider | `#home` `.hero` | 3-slide auto-rotating banner with `<picture>` + `<img>` (not `background-image`) |
| Brand Strip | `.brands-strip` | Scrolling marquee of dealer certifications |
| Categories | `#categories` | 6 category cards: Threshers, Engines, JCB, Parts, Tools, Pumps |
| Products | `#products` | Dynamically rendered product grid with filter tabs + "Recently Viewed" |
| Price Disclaimer | `.price-disclaimer` | "*Actual price may vary at the time of order confirmation." |
| Offer Banner | `.offer-banner` | Monsoon sale promotional banner with countdown timer |
| Services | `#services` | 6 service cards: JCB Rent, Repair, Installation, Delivery, Buyback, EMI |
| Testimonials | `.testimonials-section` | 3 customer reviews (2 with photos, 1 text-only) |
| FAQ | `.faq-section` | Accordion-style frequently asked questions |
| About | `#about` | Company history, team photos, business card image |
| Contact | `#contact` | Contact cards, delivery estimator, enquiry form, Google Maps embed |
| Legal | `.legal-section` | Collapsible Terms & Conditions / Disclaimer / Privacy Policy (13 sub-sections) |
| Footer | `.footer` | Quick links, categories, contact info, copyright |

### Modals (overlays, not separate pages)

| Modal | Trigger | Purpose |
|-------|---------|---------|
| Cart Sidebar | Cart icon click | Shows cart items, quantities, total, checkout button |
| Wishlist Sidebar | Heart icon click | Shows wishlisted items |
| Checkout Modal | "Proceed to Checkout" button | Order form (name, phone, address, payment method) |
| Success Modal | Order placed | Shows order ID, "Send on WhatsApp" button |
| Quick View Modal | Product "eye" icon | Product details with features list |
| EMI Calculator | "EMI Calculator" button | Calculates monthly payments by price, tenure, rate |

### Key HTML Patterns

- **`data-translate` attributes**: Used on elements that need Hindi translation. The translation system reads these keys and replaces `innerHTML` or attribute values.
- **`data-count` attributes**: Used on stat numbers for animated counting (e.g., `data-count="5000"` animates from 0 to 5000).
- **`loading="lazy"` / `loading="eager"`**: First hero slide image is `eager` (critical), everything else is `lazy`.
- **`<picture>` + `<source>`**: Hero slides use `<picture>` elements with mobile-sized `<source>` for screens ≤640px (800px images vs 1600px).

---

## CSS Architecture (style.css)

### 4,678 lines organized into these major sections:

```
1. Reset & Base Styles (lines ~1-50)
2. CSS Custom Properties / Variables (lines ~50-70)
3. Common Components (buttons, containers, headings)
4. Top Bar
5. Navbar (sticky, responsive hamburger menu at 900px)
6. Hero Section (slider with opacity transitions)
7. Brand Strip (CSS animation marquee)
8. Categories Grid
9. Products Grid (dynamically rendered)
10. Product Cards (badges, wishlist, action overlay)
11. Services Grid
12. Offer Banner
13. Testimonials
14. FAQ Accordion
15. About Section (grid with images)
16. Contact Section (grid with form + cards)
17. Footer
18. Modals (cart, wishlist, checkout, quick view, EMI)
19. WhatsApp Float
20. Share Float
21. Mobile Call Bar (bottom fixed bar on mobile)
22. Back to Top button
23. Toast notifications
24. Seasonal Banner
25. Skeleton loading animation
26. Dark Mode overrides
27. Legal Section
28. Team Section
29. Business Card
30. Responsive Breakpoints
```

### CSS Custom Properties (Design Tokens)

```css
--primary: #2d6a4f;          /* Main green */
--primary-dark: #1b4332;     /* Dark green */
--primary-light: #40916c;    /* Light green */
--secondary: #d4a017;        /* Gold/yellow accent */
--secondary-light: #f0c040;  /* Light gold */
--text: #1a1a2e;             /* Body text */
--text-light: #6c757d;       /* Muted text */
--bg: #f8f9fa;               /* Page background */
--bg-alt: #ffffff;           /* Card backgrounds */
--border: #e9ecef;           /* Borders */
--shadow: ...;               /* Box shadows */
--radius: 12px;              /* Border radius */
--radius-lg: 16px;           /* Large radius */
--transition: all 0.3s ease; /* Default transition */
--gradient: linear-gradient(...); /* Primary gradient */
```

### Dark Mode

Dark mode is implemented via `[data-theme="dark"]` attribute on `<html>`. When toggled, CSS overrides all custom properties:

```css
[data-theme="dark"] {
    --text: #e4e6eb;
    --text-light: #b0b3b8;
    --bg: #18191a;
    --bg-alt: #242526;
    --border: #3e4042;
    /* ... and component-specific overrides */
}
```

Theme preference is persisted in `localStorage` key `maheshTheme`.

### Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|-----------|--------|-------------|
| `≤ 1200px` | Tablets landscape | Reduce grid columns |
| `≤ 900px` | Tablets portrait | Hamburger menu activates, grids go single-column |
| `≤ 768px` | Large phones | Further layout compression |
| `≤ 640px` | Standard phones | **Primary mobile breakpoint**: hero fixed heights, horizontal scroll filters, mobile call bar appears, WhatsApp float hides, share float becomes icon-only, all grids 1-2 columns |
| `≤ 380px` | Small phones | Extra compression: smaller fonts, tighter spacing |
| `hover: none, pointer: coarse` | Touch devices | Larger tap targets (44px min), always-visible action overlays |

### Key Mobile Decisions

1. **Hero uses concrete heights on mobile** (`75vh` with `min-height: 420px`, `max-height: 600px`) instead of `height: auto` — prevents layout collapse with absolutely-positioned slides.
2. **Hero overlay opacity reduced on mobile** (0.75 vs 0.88 on desktop) — makes background images actually visible on small screens.
3. **Product filter buttons horizontally scroll** on mobile (not wrap) — prevents 3-row stacking on small screens.
4. **Mobile call bar** appears at bottom on ≤640px with "Call" and "WhatsApp" buttons — replaces floating WhatsApp button.
5. **`aspect-ratio`** used on product and category images on mobile — prevents broken layouts when images load slowly.

### Animations

| Animation | Used For |
|-----------|----------|
| `@keyframes shimmer` | Skeleton loading placeholders |
| `@keyframes scrollBrands` | Infinite horizontal scrolling brand strip |
| `@keyframes bounce` | WhatsApp floating button |
| `@keyframes slideDown` | Hero badge entrance |
| `@keyframes pulse` | Various attention-grabbing elements |
| CSS `transition` | Card hovers, modal open/close, accordion expand/collapse |

---

## JavaScript Logic (script.js)

### 1,466 lines organized into these sections:

```
1. Product Data Array (24 products, lines 1-365)
2. State Variables (lines 367-378)
3. DOMContentLoaded Initialization (lines 383-398)
4. Dark Mode (lines 406-430)
5. Seasonal Banner (lines 432-442)
6. Product Rendering with Skeleton Loading (lines 444-670)
7. Price Formatting (lines 681-683)
8. Cart Management (lines 685-820)
9. Wishlist Management (lines 822-920)
10. Recently Viewed (lines 922-990)
11. Checkout & Order Flow (lines 992-1090)
12. Search Functionality (lines 1092-1130)
13. Product Filters (lines 1132-1180)
14. Hero Slider (lines 1183-1219)
15. Countdown Timer (lines 1221-1260)
16. Stat Counter Animation (lines 1262-1310)
17. Scroll Effects & Reveal Animations (lines 1312-1400)
18. Quick View Modal (lines 1402-1430)
19. EMI Calculator (lines 1432-1450)
20. FAQ Accordion (lines 1452-1465)
21. Keyboard Events (lines 1467-1480)
22. Legal Section Toggle (lines 1482-1492)
```

### Key Functions

| Function | Purpose |
|----------|---------|
| `renderProducts()` | Generates product card HTML from `products[]` array, applies filter, builds DOM |
| `renderProductsWithSkeleton()` | Shows shimmer skeleton for 800ms, then calls `renderProducts()` |
| `addToCart(id)` | Adds product to cart array, saves to localStorage, updates UI, shows toast |
| `removeFromCart(id)` | Removes item from cart |
| `updateQty(id, delta)` | Increments/decrements quantity in cart |
| `updateCartUI()` | Re-renders cart sidebar HTML, updates badge count and total |
| `toggleWishlist(id)` | Adds/removes product from wishlist, persists to localStorage |
| `updateWishlistUI()` | Re-renders wishlist sidebar |
| `trackRecentlyViewed(id)` | Adds product ID to recently viewed list (max 6, deduplicated) |
| `renderRecentlyViewed()` | Renders recently viewed products strip |
| `placeOrder(e)` | Validates form, generates order ID, composes WhatsApp message, opens `wa.me` URL |
| `filterByCategory(cat)` | Sets `currentFilter`, re-renders products, scrolls to products section |
| `searchProducts(query)` | Filters products by name/category/description match |
| `changeSlide(direction)` | Hero slider: transitions between slides using CSS opacity |
| `goToSlide(index)` | Jump to specific hero slide |
| `startCountdown()` | Countdown timer for offer banner (hardcoded end date) |
| `animateStats()` | Intersection Observer triggers counting animation on stat numbers |
| `setupRevealAnimations()` | Intersection Observer adds `.revealed` class for scroll-in animations |
| `calculateEmi()` | EMI calculator modal: computes monthly payment from price, tenure, rate |
| `formatPrice(price)` | Returns `₹X,XX,XXX*` (Indian locale formatting with asterisk) |
| `initDarkMode()` | Reads theme from localStorage, applies `data-theme` attribute |
| `toggleDarkMode()` | Switches theme, saves preference |

### Order Flow

```
1. User adds items to cart (localStorage)
2. User clicks "Proceed to Checkout"
3. Checkout modal opens with form
4. User fills name, phone, address, payment method
5. placeOrder() validates required fields
6. Generates order ID: "MC-" + timestamp
7. Composes WhatsApp message with order details
8. Opens: https://wa.me/917297047681?text=<encoded_order>
9. Shows success modal
10. Clears cart
```

The order is NOT processed programmatically. The merchant (Atul Mantri) receives the WhatsApp message and manually confirms.

---

## Translation System (translations.js)

### How It Works

- `translations.js` exports a `translations` object with `en` and `hi` keys
- Each key contains ~200 translation strings keyed by identifiers
- HTML elements use `data-translate="key_name"` attributes
- `applyTranslations(lang)` function iterates all `[data-translate]` elements and sets `innerHTML` to the corresponding translation
- Language state is persisted in `localStorage` key `maheshLang`
- Default language: English
- Toggle button shows "हिंदी" (switches to Hindi) or "English" (switches back)

### Translation Coverage

- Navigation labels
- Hero section (all 3 slides)
- Section headers and subtitles
- Product category names
- Service descriptions
- About section content
- Contact section labels
- Footer content
- Modal labels and buttons
- FAQ questions and answers
- Cart/checkout labels

### What Is NOT Translated

- Product names (kept in English as these are brand names)
- Prices (numbers, universal)
- Phone numbers and addresses
- Legal/T&C section (kept in English for legal validity)

---

## Product Data Model

Each product in the `products[]` array follows this schema:

```javascript
{
    id: Number,              // Unique identifier (1-24)
    name: String,            // Display name
    category: String,        // One of: "thresher", "engine", "jcb", "parts", "tools", "pump"
    price: Number,           // Current price in INR (displayed with asterisk)
    originalPrice: Number,   // Strikethrough "was" price in INR
    image: String,           // Image URL (external or local filename)
    rating: Number,          // Star rating (e.g., 4.8)
    reviews: Number,         // Review count
    badge: String,           // One of: "sale", "new", "hot", "auth", or empty
    badgeText: String,       // Badge label text (e.g., "15% OFF", "Authorized")
    inStock: Boolean,        // Stock availability
    description: String,     // Multi-sentence product description
    features: [String]       // Array of 4-5 feature bullet points
}
```

### Product Categories & Counts

| Category Key | Display Name | Product IDs | Count |
|-------------|-------------|-------------|-------|
| `thresher` | Thresher Machines | 1, 2, 3, 7 | 4 |
| `engine` | Engines | 4, 5, 6, 8 | 4 |
| `jcb` | JCB Services | 9, 10, 11 | 3 |
| `parts` | Agriculture Parts | 12, 13, 14, 15 | 4 |
| `tools` | Farming Tools | 17, 18, 19, 24 | 4 |
| `pump` | Pumps & Irrigation | 16, 20, 21, 22 | 4 |

**Note:** Product ID 23 does not exist (was removed). ID 24 is the newest addition.

### Price Range

- Cheapest: ₹350 (Khurpi Garden Tool Set)
- Most expensive: ₹230,000 (Sonalika Maize Sheller)
- All prices are **indicative** with asterisk (*), per the price disclaimer

---

## State Management

All state is managed in `localStorage` (no server-side state):

| Key | Type | Purpose | Default |
|-----|------|---------|---------|
| `maheshCart` | JSON Array | Cart items: `[{id, qty}]` | `[]` |
| `maheshWishlist` | JSON Array | Wishlisted product IDs: `[1, 5, ...]` | `[]` |
| `maheshRecent` | JSON Array | Recently viewed product IDs (max 6) | `[]` |
| `maheshTheme` | String | `"dark"` or `"light"` | `"light"` |
| `maheshLang` | String | `"en"` or `"hi"` | `"en"` |

### State Persistence Behavior

- Cart, wishlist, and recently viewed persist across page refreshes and browser restarts
- Cart is cleared on successful order placement
- Recently viewed is capped at 6 items (FIFO)
- Invalid product IDs (from removed products) are filtered out on page load
- Theme and language preferences persist indefinitely

---

## SEO & Discoverability

### Meta Tags

- `<title>`: "Mahesh & Company Aspur | Sonalika Thresher, Honda Engine & JCB Services in Rajasthan"
- `<meta name="description">`: 160-char description with location, products, phone number
- `<meta name="keywords">`: 12 keyword phrases targeting local search
- `<link rel="canonical">`: Points to production URL

### Structured Data (JSON-LD)

Two Schema.org blocks in `<head>`:

1. **LocalBusiness**: Name, alternate name, description, URL, phone (3 numbers), founder, postal address, geo coordinates, opening hours (Mon-Sat 8-8, Sun 9-2), image, price range, currencies, payment methods, area served (Aspur + Rajasthan), offer catalog (6 categories)

2. **WebSite**: Name, URL, description, publisher

### Open Graph & Twitter Cards

- `og:image` and `twitter:image` both point to `business-card.png`
- Ensures proper link previews when shared on WhatsApp, Facebook, Twitter

### Geo Tags

- `geo.region`: IN-RJ (Rajasthan, India)
- `geo.placename`: Aspur, Dungarpur, Rajasthan
- `geo.position` and `ICBM`: Exact GPS coordinates

### Files

- `robots.txt`: Allows all crawlers, points to sitemap
- `sitemap.xml`: Single URL entry (homepage), weekly change frequency
- `google59604456b94119d1.html`: Google Search Console verification (do NOT delete)
- `.nojekyll`: Required for GitHub Pages to serve `sitemap.xml` correctly (Jekyll would otherwise process XML files)

### Google Search Console

- Property verified via HTML file method
- Sitemap submitted
- URL inspection requested

### What Still Needs to Be Done (by the owner)

- Create **Google Business Profile** at [business.google.com](https://business.google.com) — critical for local "near me" and Maps searches
- List on **JustDial**, **IndiaMART**, **Sulekha** for backlinks
- Consider a custom domain (e.g., `maheshandcompany.com`) for better SEO authority

---

## Mobile Responsiveness Strategy

### Why Mobile Matters

The primary user base is farmers in rural Rajasthan who access the internet primarily through Android smartphones on 4G/3G connections. Desktop is secondary.

### Hero Banner: The Major Mobile Fix

The hero section went through a critical fix. Originally used CSS `background-image` with Unsplash URLs:

```html
<!-- OLD (broken on mobile): -->
<div class="hero-slide" style="background-image: url('...?w=1600')">
```

This was replaced with proper `<img>` tags inside `<picture>` elements:

```html
<!-- NEW (works on mobile): -->
<div class="hero-slide">
    <picture>
        <source media="(max-width: 640px)" srcset="...?w=800&q=70">
        <img class="hero-slide-img" src="...?w=1600&q=80" alt="..." loading="eager">
    </picture>
</div>
```

**Why `background-image` failed on mobile:**
1. External 1600px images too heavy for mobile data
2. `background-image` on absolutely-positioned divs with opacity transitions is unreliable on mobile Chrome/WebView
3. No fallback mechanism when images fail to load

**Why `<img>` works:**
1. Native browser image loading with retry/fallback
2. `<picture>` + `<source>` serves 800px images on mobile (half the data)
3. `loading="eager"` on first slide ensures immediate load
4. `object-fit: cover` replicates the `background-size: cover` behavior

### Mobile-Specific Components

| Component | Mobile Behavior |
|-----------|----------------|
| **Navbar** | Hamburger menu at ≤900px |
| **Mobile Call Bar** | Fixed bottom bar with Call + WhatsApp buttons (≤640px only) |
| **WhatsApp Float** | Hidden on mobile (replaced by call bar) |
| **Share Float** | Becomes icon-only on mobile |
| **Product Filters** | Horizontal scroll instead of wrap |
| **Product Grid** | 2 columns on mobile, 1 on very small screens |
| **Category Grid** | 2 columns on mobile |
| **Hero Slider** | Fixed heights (75vh, min 420px, max 600px), reduced overlay opacity |
| **All images** | `aspect-ratio` CSS property ensures consistent display before load |
| **Touch targets** | Minimum 44px tap targets via `(hover: none, pointer: coarse)` media query |

### Body Padding

When the mobile call bar is visible, `body` gets `padding-bottom: 72px` to prevent content from being hidden behind the fixed bar.

---

## Performance Optimizations

| Optimization | Implementation |
|-------------|---------------|
| **Preconnect** | `<link rel="preconnect">` for Unsplash, Google Fonts |
| **DNS Prefetch** | `<link rel="dns-prefetch">` for imimg, Pinterest CDN, CloudFlare |
| **Lazy Loading** | `loading="lazy"` on all images except first hero slide |
| **Skeleton Loading** | Products show shimmer animation for 800ms while rendering |
| **Responsive Images** | Hero `<picture>` serves 800px on mobile vs 1600px on desktop |
| **No Framework** | Zero JS framework overhead (no React/Vue/Angular) |
| **Single Page** | No page navigation = no additional HTTP requests |
| **CSS Animations** | Hardware-accelerated transforms/opacity only |
| **Font Display** | `&display=swap` on Google Fonts prevents FOIT |
| **SVG Favicon** | Inline SVG data URI — no extra HTTP request |
| **SVG PWA Icons** | Inline SVG in manifest — no icon files needed |

### What Could Be Further Optimized

- Compress local PNG images (some are 500KB+)
- Self-host Google Fonts for faster loading
- Bundle and minify CSS/JS
- Use WebP format for local images
- Add service worker for offline support (PWA)

---

## Legal & Compliance

### Terms & Conditions / Disclaimer Section

A collapsible legal section is placed in the footer, above the copyright line. It is hidden by default (collapsed) and expands when clicked. The text is intentionally in **very small font** (0.6rem / ~9.6px) as is standard practice for T&C sections.

### 13 Legal Sub-Sections

| Section | Key Protection |
|---------|----------------|
| General Disclaimer | All content is for advertising/informational purposes only; not a binding offer |
| Product Info & Pricing | Prices are indicative; specifications are approximate; may change without notice |
| Images & Visual Content | Images sourced from internet; may not be accurate; used for representation only |
| No Warranty | Website provided "as is"; no guarantees of accuracy or completeness |
| Limitation of Liability | Not liable for any damages from website use or decisions based on its content |
| Third-Party Links | No responsibility for external websites linked from the site |
| Customer Reviews | Reviews are promotional; may be edited; names may be changed; not guaranteed results |
| Dealership & Authorization | Certifications subject to change; verify directly with brands |
| Communication & Orders | Orders not binding until confirmed by the company; subject to stock and acceptance |
| Delivery & Service Area | Delivery estimates are approximate; actual times may vary |
| Privacy & Data Usage | Data used for inquiries only; not sold to third parties |
| Indemnification | Users agree to hold the company harmless from claims |
| Governing Law & Jurisdiction | Disputes subject to courts in **Dungarpur, Rajasthan, India** |

### Copyright Protections for Images

The Images & Visual Content section explicitly states:
- Images are sourced from the internet and used for representational/advertising purposes
- Trademarks belong to their respective owners
- Use does not imply endorsement
- Copyright holders can contact for removal

### Price Disclaimer

All product prices display an asterisk (*), and a disclaimer paragraph below the products section states: *"Actual price may vary at the time of order confirmation."*

---

## Image Strategy & Sources

### Local Images (in repository)

| File | Source | Used In |
|------|--------|---------|
| `mukesh-mantri.png` | Provided by business owner | About section — Founder photo |
| `atul-mantri.png` | Provided by business owner | About section — Co-Founder photo |
| `business-card.png` | Provided by business owner | About section + OG meta image |
| `honda-engines.png` | Provided by business owner | Categories + Honda product images |
| `customer-review-1.png` | Provided by business owner | Testimonial 1 photo |
| `customer-review-2.png` | Provided by business owner | Testimonial 2 photo |

### External Images (CDN URLs)

| Source | Used For | URL Pattern |
|--------|----------|-------------|
| Unsplash | Hero slides (3), some product images | `images.unsplash.com/photo-...?w=1600&q=80` |
| IndiaMart (imimg.com) | Sonalika Thresher image, cultivator blades | `5.imimg.com/data5/...` |
| Pinterest (i.pinimg.com) | JCB image | `i.pinimg.com/originals/...` |

### Image Evolution History

Images went through multiple iterations:
1. **Initial**: Generic Unsplash stock photos
2. **Update 1**: Replaced with more relevant agricultural equipment photos
3. **Update 2**: Fixed 21 broken images returning 403 Forbidden
4. **Update 3**: Added actual business photos (owners, business card, Honda engines, customer photos)

### Important Note on External Images

External image URLs can break at any time (the source may remove or restrict the image). If images stop displaying:
1. Check the URL directly in a browser
2. Find a replacement image
3. Update the URL in `script.js` (for products) or `index.html` (for categories/hero)

---

## Deployment & Hosting

### GitHub Pages Configuration

- **Repository**: `nikitasomani14/mahesh-company-website`
- **Branch**: `main`
- **Source**: Root (`/`)
- **Custom domain**: None (uses `nikitasomani14.github.io` subdomain)
- **HTTPS**: Enforced by GitHub Pages automatically

### How to Deploy Changes

```bash
# 1. Make changes to files
# 2. Stage, commit, and push
git add -A
git commit -m "Description of changes"
git push
# 3. GitHub Pages auto-deploys within 1-2 minutes
```

### SSH Configuration

The repository uses a specific SSH key for authentication. The SSH config (`~/.ssh/config`) has a host alias:

```
Host github.com-nikitasomani14
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_nikitasomani14
```

The git remote URL uses this alias:

```
git@github.com-nikitasomani14:nikitasomani14/mahesh-company-website.git
```

**If you get `Permission denied` on `git push`**, verify:
1. The SSH key `~/.ssh/github_nikitasomani14` exists
2. The remote URL uses `github.com-nikitasomani14` (not `github.com`)

### `.nojekyll` File

GitHub Pages runs Jekyll by default, which interferes with:
- `sitemap.xml` (Jekyll processes XML files, causing 500 errors)
- Any file starting with `_`

The empty `.nojekyll` file tells GitHub Pages to serve files as-is. **Do NOT delete this file.**

### Files That Should Never Be Deleted

| File | Reason |
|------|--------|
| `.nojekyll` | Breaks sitemap.xml serving |
| `google59604456b94119d1.html` | Breaks Google Search Console verification |
| `robots.txt` | Search engines lose crawl directives |
| `sitemap.xml` | Google loses page index |

---

## Git History & Evolution

### Complete Commit History (newest first)

```
a5475eb Remove video section (no video content available)
4db8c12 Fix hero banner images not displaying on mobile (Android)
72dc4f8 Add Terms & Conditions, Disclaimer, and Privacy Policy section
74dbd6a Add .nojekyll to fix sitemap.xml serving on GitHub Pages
1bf2b69 Add files via upload (Google Search Console verification)
4d15db2 Add sitemap, robots.txt, and structured data for Google SEO
933bc81 Rename reviewer, add price disclaimer, remove compare feature
46e4cdd Fix compare bar X button not working on mobile and desktop
5b6ec38 Fix compare button, add Honda engine & customer review images
b4099a9 Make website fully mobile-responsive for mobile-first users
c8ca445 Add 18 new features for enhanced UX and engagement
ec0cd26 Fix 21 broken product images returning 403 Forbidden
cca7170 Update product images with actual Indian agricultural equipment photos
496612a Replace Google Translate with custom Hindi translation system
d2143e1 Improve mobile responsiveness and update product images
b06c3cb Update product images with relevant agricultural equipment photos
0e81b5f Update product images with more relevant agricultural equipment photos
7f8937b Add SEO: meta tags, sitemap.xml, robots.txt for Google indexing
fe1fc0a Fix team photos positioning - show faces properly
a4fed8c Add Atul Mantri photo and update role to Co-Founder
6786462 Add Mukesh Mantri photo to Meet Our Team section
351972e Add WhatsApp order notification - orders sent directly to shop owner
8a87d52 Replace custom translation with Google Translate widget
0cf4ada Add business info: owners, phones, address, business card, Google Maps
d9d60ab Add Hindi translation feature with language toggle button
6a749b4 Update phone number to +91-7297047681
434a527 Initial commit: Mahesh & Company Aspur - Agriculture E-Commerce Website
```

### Key Evolution Milestones

1. **Initial build** (434a527): Core website with products, cart, basic design
2. **Business personalization** (6a749b4 → 0cf4ada): Added real phone numbers, addresses, owner photos, business card
3. **Translation system** (d9d60ab → 496612a): Started with custom system → Google Translate → back to custom system (Google Translate had UI/UX issues)
4. **Image fixes** (0e81b5f → ec0cd26): Multiple rounds of replacing broken/irrelevant stock photos
5. **Feature expansion** (c8ca445): 18 new features including dark mode, EMI calculator, skeleton loading, seasonal banner, recently viewed, FAQ, delivery estimator, share button
6. **Mobile overhaul** (b4099a9 → 4db8c12): Comprehensive mobile responsiveness fixes, hero banner image fix
7. **Compare feature lifecycle**: Added, then fixed, then removed entirely (customers didn't need it)
8. **SEO & Legal** (4d15db2 → 72dc4f8): Added structured data, sitemap, robots.txt, Google Search Console, legal disclaimers
9. **Cleanup** (a5475eb): Removed video section (no video content available)

---

## Known Issues & Limitations

### Current Known Issues

| Issue | Severity | Details |
|-------|----------|---------|
| External image dependency | Medium | Hero and some product images load from Unsplash/imimg CDNs — can break if sources change |
| No real inventory system | Low | Product stock is hardcoded; `inStock` is always `true` |
| Countdown timer hardcoded | Low | The monsoon sale countdown has a hardcoded end date that may have passed |
| No form backend | Medium | Contact form `onsubmit` only shows a toast; no emails are actually sent |
| No analytics | Low | No Google Analytics or similar tracking |
| Large local images | Low | Some PNGs are 500-700KB; could be compressed |
| Single page SEO limitation | Medium | Only one URL to index; multi-page would rank for more keywords |

### Browser Support

- **Chrome (Android)**: Primary target, fully tested
- **Safari (iOS)**: Works, PWA features limited
- **Chrome (Desktop)**: Fully works
- **Firefox**: Works
- **Edge**: Works
- **IE11**: Not supported (uses CSS custom properties, Grid, `aspect-ratio`)

---

## Future Improvements

### High Priority
- [ ] Add Google Analytics for traffic tracking
- [ ] Create Google Business Profile for Maps visibility
- [ ] Register custom domain (e.g., `maheshandcompany.com`)
- [ ] Compress local images to WebP format
- [ ] Add a service worker for offline PWA support
- [ ] Connect contact form to a backend (Formspree, Google Sheets, etc.)

### Medium Priority
- [ ] Add more product images (multiple angles)
- [ ] Create separate pages for each product (better SEO)
- [ ] Add WhatsApp Business API for automated responses
- [ ] Add Google Analytics events for cart/wishlist/checkout actions
- [ ] Self-host Google Fonts for faster loading
- [ ] Add schema.org Product markup for individual products

### Low Priority
- [ ] Add a blog section with farming articles (SEO content)
- [ ] Social media integration (Facebook, Instagram)
- [ ] Add video content when available
- [ ] Add customer photo gallery
- [ ] Implement actual rating/review submission

---

## Key Decisions & Trade-offs

### Why No Framework?

**Decision**: Pure HTML/CSS/JS with no build step.

**Rationale**: 
- Target audience uses low-end Android phones; smaller bundle = faster load
- Single developer (AI-assisted); no team coordination needs
- No complex state management needs; localStorage suffices
- Zero toolchain means anyone can edit by opening files in Notepad
- GitHub Pages serves static files directly; no build pipeline needed

### Why Not a CMS (WordPress, Wix)?

**Decision**: Hand-coded static site.

**Rationale**:
- Full control over every pixel and behavior
- No hosting costs (GitHub Pages is free)
- No plugin bloat or security vulnerabilities
- No vendor lock-in
- Owner doesn't need to manage a CMS (changes are made by developer)

### Why WhatsApp Instead of Payment Gateway?

**Decision**: All orders route to WhatsApp.

**Rationale**:
- Target customers (farmers in rural Rajasthan) are familiar with WhatsApp
- No PCI compliance burden
- No payment gateway fees
- Merchant can negotiate prices (common in this market)
- Trust is built through conversation, not transactions

### Why Custom Translation Instead of Google Translate?

**Decision**: Custom `translations.js` with manual EN/HI strings.

**History**: 
1. First attempt: Custom system
2. Second attempt: Google Translate widget (automatic, covers everything)
3. Final: Back to custom system

**Why Google Translate was abandoned**:
- Injected its own UI elements that conflicted with the design
- Translation quality was poor for product-specific terms
- Added external JS dependency and latency
- The floating toolbar was ugly and couldn't be customized

### Why `<img>` Tags Instead of CSS `background-image` for Hero?

**Decision**: Changed hero from `background-image` to `<picture>` + `<img>`.

**Rationale**:
- `background-image` fails silently on mobile Android (no retry, no fallback)
- `<img>` tags have native browser retry/loading mechanisms
- `<picture>` enables responsive image serving (different sizes for different screens)
- Better for SEO (search engines index `<img>` but not `background-image`)
- `loading="eager"` / `loading="lazy"` attributes available

### Why Prices Have Asterisks?

**Decision**: All displayed prices show `₹X,XX,XXX*`.

**Rationale**:
- Prices are indicative (the business doesn't have a fixed-price e-commerce model)
- Protects against complaints if prices change between website visit and purchase
- Legal disclaimer references the asterisk: "Actual price may vary at the time of order confirmation"
- Common practice in Indian automotive/agricultural equipment sales

---

## How to Modify

### Adding a New Product

1. Open `script.js`
2. Find the `products` array (starts at line 4)
3. Add a new object following the schema:

```javascript
{
    id: 25,  // Next available ID
    name: "Product Name",
    category: "thresher",  // One of: thresher, engine, jcb, parts, tools, pump
    price: 50000,
    originalPrice: 60000,
    image: "https://example.com/image.jpg",  // or "filename.png" for local
    rating: 4.5,
    reviews: 0,
    badge: "new",  // sale, new, hot, auth, or ""
    badgeText: "New",
    inStock: true,
    description: "Product description here.",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
}
```

4. Commit and push

### Changing a Price

1. Open `script.js`
2. Find the product by `id` or `name` in the `products` array
3. Change `price` and/or `originalPrice`
4. Commit and push

### Adding a New Section

1. Open `index.html`
2. Add new `<section>` element in the desired position
3. Add corresponding CSS in `style.css` (including responsive breakpoints at 900px, 640px, 380px)
4. If section has interactive behavior, add JS in `script.js`
5. If section has translatable text, add keys in both `en` and `hi` objects in `translations.js`

### Changing Contact Information

Contact information appears in multiple places:
- `index.html`: Top bar, contact section, footer, structured data JSON-LD, team section
- `script.js`: WhatsApp order URL (`wa.me/917297047681`)
- `manifest.json`: Description

Search for the old phone number/address and replace in all locations.

### Adding a YouTube Video

If you get a YouTube video in the future, add this section back to `index.html` (before the testimonials section):

```html
<section class="video-section" id="video">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Watch & Learn</span>
            <h2 class="section-title">See Our Machines in <span class="highlight">Action</span></h2>
        </div>
        <div class="video-embed-wrap">
            <div class="video-aspect">
                <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0"
                    title="Video title" allow="accelerometer; autoplay; clipboard-write;
                    encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                    loading="lazy"></iframe>
            </div>
        </div>
    </div>
</section>
```

The CSS for `.video-section`, `.video-embed-wrap`, and `.video-aspect` still exists in `style.css` and doesn't need to be re-added.

---

## Contact Information (Real)

| Role | Name | Phone | WhatsApp |
|------|------|-------|----------|
| Founder | Mukesh Mantri | +91-94147 24472 | — |
| Co-Founder | Atul Mantri | +91-91660 3621 | +91-7297047681 |

**Address**: Dabrawat Complex, Near Roadways Bus Stand, Aspur, Dungarpur District, Rajasthan - 314021

**Google Maps**: [23.9583635, 74.0804451](https://maps.google.com/?q=23.9583635,74.0804451)

---

*Last updated: April 2026*
