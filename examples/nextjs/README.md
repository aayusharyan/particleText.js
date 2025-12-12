# ParticleText.js - Next.js Example

This is a complete example of using ParticleText.js with Next.js App Router.

## Features

- ⚡ Built with Next.js 15 (App Router)
- ⚛️ React Server Components compatible
- 🎨 Interactive particle text animation
- 📱 Fully responsive design
- 🔄 Client-side dynamic import for optimal performance
- 📦 Static export ready

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3004](http://localhost:3004) to view it in your browser.

### Build

```bash
npm run build
```

The built files will be in the `out` directory (static export).

### Start (Production)

```bash
npm start
```

## Usage

The main component is in `src/app/page.tsx`. It demonstrates:

- Using `'use client'` directive for client-side rendering
- Dynamic import of ParticleText.js to avoid SSR issues
- Using `useRef` to reference the canvas element
- Initializing ParticleText.js in `useEffect`
- Properly cleaning up with the `destroy()` method
- Configuring particle colors, size, and behavior

## Important Notes

### Client-Side Only

ParticleText.js requires browser APIs (Canvas, window, etc.) and must be loaded on the client side. This example uses:

1. `'use client'` directive at the top of the component
2. Dynamic import inside `useEffect` to ensure browser-only execution

### Static Export

This example is configured for static export (`output: 'export'` in `next.config.js`), making it easy to deploy to any static hosting service.

## Learn More

- [ParticleText.js Documentation](https://particletext.js.org)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
