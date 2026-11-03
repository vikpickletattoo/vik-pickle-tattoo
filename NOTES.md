# Recovered from deployed bundle

Confirmed from the bundle:
- Vite (Rollup-hashed /assets), React 18.3.1, react-router-dom v6 (BrowserRouter, basename "/")
- Tailwind v3.x (no @property, no typography plugin), custom theme in tailwind.config.js
- framer-motion (page transitions, whileInView, AnimatePresence)
- @emailjs/browser 4.4.1 (contact form, sendForm)
- Behold Instagram widget (<behold-widget feed-id=...>, script loaded in index.html)
- (Removed in rewrite) Blog: 3 posts as a JS array {slug,title,date,coverImage,excerpt,tags,published,html} rendered with
  dangerouslySetInnerHTML. HTML was pre-rendered from markdown at build time (marked-style entities),
  so the original likely had /content/*.md plus a small script or Vite plugin. Not recoverable, only its output.

Not recoverable: file layout, comments, original markdown, exact framer-motion / router minor versions,
the .env (EmailJS IDs were hardcoded in the bundle: service/template/public key).

Known quirks in the original worth fixing in the rewrite:
- Skills page: <h2 class=...> should be className
- Gallery: three slides share id 4 (used as React key on the slideshow image) and have copy-pasted alt text
- Blog "Previous/Next" labels are swapped relative to array order
- About page (/about) is routed but not linked in the nav; its content is leftover from a different template
  (Margaret Cole, "Gilded Hand", Bristol), so it is dead copy

## Removed from the rewrite (not reachable from any link in the live UI)
- /about (About.jsx) and /blog, /blog/:slug (Blog.jsx, BlogPost.jsx) plus the embedded post data.
  Nothing in the nav, footer or pages linked to them; /blog was only linked from the blog pages themselves.
  Also removed the leftover Unsplash images and the `prose` class block that only the blog used.
- Fixed while rewriting: Skills `class` -> `className`; gallery slide ids made unique; Skills' four copy-pasted
  sections collapsed into src/data/skills.js; EmailJS IDs moved to env vars.
