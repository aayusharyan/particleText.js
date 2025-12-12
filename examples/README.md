# ParticleText.js Framework Examples

This directory contains fully functional example projects demonstrating how to integrate ParticleText.js with popular JavaScript frameworks.

## Available Examples

### ⚛️ [React](./react)
Modern React example using hooks and Vite.
- Port: 3000
- Start: `cd react && npm install && npm run dev`

### 🖖 [Vue](./vue)
Vue 3 example with Composition API and Vite.
- Port: 3001
- Start: `cd vue && npm install && npm run dev`

### ⚡ [Svelte](./svelte)
Svelte 5 example with reactive bindings.
- Port: 3002
- Start: `cd svelte && npm install && npm run dev`

### 🅰️ [Angular](./angular)
Angular 19 example with standalone components.
- Port: 3003
- Start: `cd angular && npm install && npm run dev`

### ▲ [Next.js](./nextjs)
Next.js 15 example with App Router and TypeScript.
- Port: 3004
- Start: `cd nextjs && npm install && npm run dev`

### 💚 [Nuxt](./nuxt)
Nuxt 3 example with SSR compatibility.
- Port: 3005
- Start: `cd nuxt && npm install && npm run dev`

## Quick Start

Each example is a standalone project with its own dependencies. To run an example:

1. Navigate to the example directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open the URL shown in your terminal

## Features

All examples demonstrate:

- ✅ Proper initialization of ParticleText.js
- ✅ Cleanup on component unmount
- ✅ Responsive canvas sizing
- ✅ Custom particle colors
- ✅ Interactive mouse/touch effects
- ✅ "Particle Text" displayed as the text

## Building for Production

Each example includes production build scripts:

```bash
npm run build
```

The built files will be in the `dist` or `out` directory, ready for deployment.

## Common Patterns

### Canvas Reference
- **React/Next.js**: `useRef` hook
- **Vue/Nuxt**: `ref` with template binding
- **Svelte**: `bind:this`
- **Angular**: `@ViewChild` decorator

### Lifecycle Hooks
- **React/Next.js**: `useEffect` hook
- **Vue/Nuxt**: `onMounted` / `onBeforeUnmount`
- **Svelte**: `onMount` / `onDestroy`
- **Angular**: `ngOnInit` / `ngOnDestroy`

### SSR Considerations
- **Next.js**: Dynamic import with `'use client'` directive
- **Nuxt**: `process.client` check with dynamic import
- **Others**: Not applicable (client-side only)

## Learn More

- [ParticleText.js Documentation](https://particletext.js.org)
- [API Reference](/docs/api-reference)
- [Configuration Options](/docs/configuration)

## Support

Each example directory contains its own README with framework-specific details and troubleshooting tips.
