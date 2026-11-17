# Adeyemi Gabriel — Portfolio

A responsive personal portfolio built with HTML, custom CSS, and JavaScript. GSAP is included locally for optional animation; reduced-motion preferences are respected.

## Run locally

No package installation is required. With Node.js 18 or later, build the site:

```sh
npm run build
```

Serve the project directory with any static server, for example:

```sh
python3 -m http.server 8080
```

Open http://localhost:8080 to view the root page, or http://localhost:8080/dist/ to preview the deployment build.

## Edit and deploy

Edit `index.html`, `src/input.css`, and `js/app.js`, then run `npm run build` again. The `build-css` command remains an alias for the full build.

The build creates `dist/index.html`, `dist/output.css`, and copies local assets referenced by the page or its stylesheets. It uses only Node.js built-in modules and leaves unrelated existing files untouched. Deploy the contents of `dist/` to any static host.

Original images and project assets remain in `img/`. GSAP's license information is preserved in `js/gsap.min.js`.
