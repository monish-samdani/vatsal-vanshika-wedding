## Vatsal & Vanshika Wedding Website (`airVnV`)

This is the React single-page wedding website for **Vatsal Mandhania** & **Vanshika Dhingra**, built with React 18, React Router v6, and Framer Motion.

### Tech stack

- **React 18**
- **React Router v6**
- **Framer Motion** for page transitions
- **Webpack 5** + Babel

### File structure

- `public/index.html` — root HTML shell, Google Fonts are loaded here
- `public/photos/` — drop all couple photos here (see filenames below)
- `public/music/` — add background music here (see below)
- `src/index.js` — React entry point
- `src/index.css` — global styles, CSS variables, custom cursor, animations
- `src/App.jsx` — routing + page transitions
- `src/components/Nav.jsx` — sticky navigation bar
- `src/components/EventPage.jsx` — reusable ceremony layout
- `src/pages/Home.jsx` — hero, countdown, event cards
- `src/pages/*.jsx` — all event and gallery pages

### Required photos

Create the `public/photos/` folder and add these files (exact filenames):

- `home-bg.jpg`
- `ganesh-pujan.jpg`
- `sufi-night.jpg`
- `haldi.jpg`
- `sajjangoth.jpg`
- `baraat.jpg`
- `phere.jpg`
- `reception.jpg`
- `gallery-1.jpg` through `gallery-12.jpg`

If any photo is missing, the gallery will show a **📷 Photo coming soon** placeholder instead of breaking.

**Optional (event page chat bubbles):** `vatsal-avatar.jpg` and `vanshika-avatar.jpg` — square or portrait images shown as circular avatars next to each message. If missing, the initials “V” are shown instead.

Backgrounds use `background-size: contain` and `background-position: center center` so the full photo is visible.

**Retina / high-DPI:** The site is retina-ready. For sharper images on high-DPI screens you can add 2× versions (same name with `@2x` before the extension). Optional files: `home-bg@2x.jpg`, `logo@2x.png`, and for event pages e.g. `ganesh-pujan@2x.jpg`. If present, they are used automatically on retina devices.

### Background music (per page)

Each page can have its own track. Add MP3 files in `public/music/` with these **exact filenames**:

| Page        | File              |
|------------|-------------------|
| Home       | `home.mp3`        |
| Ganesh Pujan | `ganesh-pujan.mp3` |
| Sufi Night | `sufi-night.mp3`   |
| Haldi      | `haldi.mp3`       |
| Sajjangoth | `sajjangoth.mp3`   |
| Baraat     | `baraat.mp3`      |
| Phere      | `phere.mp3`       |
| Reception  | `reception.mp3`   |
| Gallery    | `gallery.mp3`     |

A floating music button (bottom-right) lets guests play or mute. When they switch pages, the track switches to that page’s file; if music was playing, it continues with the new track. If a file is missing for a page, that page will have no sound until you add the file.

### Install & run

From the `D:\airVnV` folder:

```bash
npm install
npm run dev
```

This starts the dev server on `http://localhost:3000` and opens your browser automatically.

### Build for deployment

To produce a production build into `public/bundle.js`:

```bash
npm run build
```

You can then deploy the `public/` folder to static hosting (Netlify, Vercel, etc.). Make sure history fallback is enabled because this is a SPA using React Router.

