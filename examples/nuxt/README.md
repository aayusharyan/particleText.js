# ParticleText.js - Nuxt Example

This is a complete example of using ParticleText.js with Nuxt 3.

## Features

- 💚 Built with Nuxt 3
- 🖖 Vue 3 Composition API
- 🎨 Interactive particle text animation
- 📱 Fully responsive design
- 🔄 Client-side dynamic import for SSR compatibility
- 📦 Static generation ready

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) to view it in your browser.

### Build

```bash
npm run build
```

### Generate Static Site

```bash
npm run generate
```

The built files will be in the `.output/public` directory.

### Preview

```bash
npm run preview
```

## Usage

The main page is in `pages/index.vue`. It demonstrates:

- Using `ref` to reference the canvas element
- Dynamic import of ParticleText.js with `process.client` check
- Initializing ParticleText.js in `onMounted`
- Properly cleaning up with the `destroy()` method in `onBeforeUnmount`
- Configuring particle colors, size, and behavior

## Important Notes

### SSR Compatibility

ParticleText.js requires browser APIs (Canvas, window, etc.) and must be loaded on the client side. This example uses:

1. `process.client` check before initializing
2. Dynamic import inside `onMounted` to ensure browser-only execution

### Static Generation

This example supports static site generation (`nuxt generate`), making it easy to deploy to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Learn More

- [ParticleText.js Documentation](https://particletext.js.org)
- [Nuxt 3 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
