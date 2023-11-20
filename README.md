# "The most inappropriate tech stack" contest 😂

ClickSwift is a link shortening service that offers enhanced security options, allowing users to set passwords & limit the number of clicks for access. Built using [Astro][astro] and [Supabase][supabase]

[preview](https://github.com/dev5c32373043/clickswift/assets/13788002/03cbb0b5-a983-43b2-9765-ca0de3d3ca05)

## Getting started

Add `.env` or `.env.local` file (`.env.example` as an example)

```bash
npm install && npm run dev
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

[astro]: https://astro.build/
[supabase]: https://supabase.com/
