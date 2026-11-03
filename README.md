# Vik Pickle Tatto

> This codebase was reconstructed from the deployed, minified bundle. See [NOTES.md](./NOTES.md) for what was recovered, what couldn't be, and what was changed in the process.

## Tech stack

| Area | Choice |
| --- | --- |
| Build tool | [Vite](https://vitejs.dev/) 5 |
| UI | [React](https://react.dev/) 18.3 (JSX, no TypeScript) |
| Routing | [React Router](https://reactrouter.com/) v6 (`BrowserRouter`) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v3.4 + PostCSS/Autoprefixer |
| Animation | [Framer Motion](https://www.framer.com/motion/) (page transitions, scroll reveals, hero slideshow) |
| Contact form | [EmailJS](https://www.emailjs.com/) (`@emailjs/browser`), no backend required |
| Gallery | [Behold](https://behold.so/) Instagram widget (web component) |
| Fonts | Playfair Display (headings) and Lato (body) via Google Fonts |

There is no backend, database or CMS. The build output is plain static files.

## Getting started

### Prerequisites

- Node.js 18 or later
- npm

### Install and run

```bash
npm install
cp .env.example .env     # EmailJS settings, see below
npm run dev              # http://localhost:5173
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

## Configuration

### Environment variables

The contact form sends email through EmailJS. Set these in `.env`:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

Vite inlines `VITE_` variables into the client bundle, so these values are visible to anyone who views the site. That's normal for EmailJS public keys, but restrict the allowed domains in the EmailJS dashboard (Account > Security) so the key can't be used from other sites.

The EmailJS template should expect these parameters, which match the form's field names: `from_name`, `from_email`, `project_type`, `message`.

If you deploy through a host such as Netlify, Vercel or Cloudflare Pages, add the same variables in the host's dashboard. `.env` is git-ignored and is not deployed.

### Images

Hero slideshow images live in `src/assets/` and are imported in `src/data/slides.js`. Expected files:

```
grounded-board.jpg  moped.jpg  no7-salon.jpg  sol-mirror.jpg  tattoo-walkins.jpg
```

Add a `public/favicon.svg` too, as `index.html` links to it.

### Instagram feed

The gallery page renders `<behold-widget feed-id="...">`. The feed ID is the `BEHOLD_FEED_ID` constant in `src/pages/Gallery.jsx`, and the widget script is loaded in `index.html`. Create a feed in your Behold account and swap in its ID.

### Theme

Colours and fonts are defined in `tailwind.config.js`:

| Token | Value |
| --- | --- |
| `ink` | `#1a1410` |
| `cream` / `cream-dark` | `#f7f3ec` / `#ede7da` |
| `gold` / `gold-light` / `gold-dark` | `#c9a84c` / `#e8c97a` / `#8b6914` |
| `font-display` | Playfair Display |
| `font-body` | Lato |

Reusable component classes (`.btn-primary`, `.btn-secondary`, `.nav-link`, `.section-title`, `.section-label`, `.input-field`) are in `src/index.css`.

## Project structure

```
.
├── index.html               # entry HTML, fonts, Behold script, meta tags
├── tailwind.config.js       # theme colours and fonts
├── vite.config.js
├── public/                  # static files served as-is (favicon.svg)
└── src/
    ├── main.jsx             # React root + BrowserRouter
    ├── App.jsx              # layout and routes
    ├── index.css            # Tailwind layers + component classes
    ├── assets/              # images imported by the code
    ├── data/
    │   ├── slides.js        # hero slideshow images
    │   └── skills.js        # skills page content
    ├── components/
    │   ├── Navbar.jsx       # fixed header, mobile menu
    │   ├── Footer.jsx       # social links
    │   ├── Hero.jsx         # auto-advancing slideshow
    │   └── PageTransition.jsx
    └── pages/
        ├── Home.jsx         # /
        ├── Skills.jsx       # /skills
        ├── Gallery.jsx      # /gallery
        └── Contact.jsx      # /contact
```

## Editing content

- **Services, about text:** `src/pages/Home.jsx`
- **Skills lists:** `src/data/skills.js` (add or remove sections and items; the page renders whatever is there)
- **Hero images:** `src/data/slides.js`
- **Nav links:** the `links` array in `src/components/Navbar.jsx`
- **Project types in the enquiry form:** the `PROJECT_TYPES` array in `src/pages/Contact.jsx`
- **Business name, social links, location:** `Navbar.jsx`, `Footer.jsx` and `index.html` (title and meta description)

## Deployment

`npm run build` produces a static site in `dist/`, which can go on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, etc.).

Because the site uses `BrowserRouter` (clean URLs like `/gallery`), the host must serve `index.html` for unknown paths, otherwise refreshing or deep-linking a page returns a 404. Examples:

- **Netlify:** add `public/_redirects` containing `/*  /index.html  200`
- **Vercel:** add a `vercel.json` rewrite of `/(.*)` to `/index.html`
- **Cloudflare Pages:** SPA fallback is on by default when there is no `404.html`

If the site is served from a sub-path instead of the domain root, set `base` in `vite.config.js` and the `basename` on `BrowserRouter` in `src/main.jsx`.
