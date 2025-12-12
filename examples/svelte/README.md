# ParticleText.js - Svelte Example

This is a complete example of using ParticleText.js with Svelte and Vite.

## Features

- ⚡ Built with Svelte 5
- 🚀 Powered by Vite for fast development
- 🎨 Interactive particle text animation
- 📱 Fully responsive design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) to view it in your browser.

### Build

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview

```bash
npm run preview
```

## Usage

The main component is in `src/App.svelte`. It demonstrates:

- Using `bind:this` to reference the canvas element
- Initializing ParticleText.js in `onMount`
- Properly cleaning up with the `destroy()` method in `onDestroy`
- Configuring particle colors, size, and behavior

## Learn More

- [ParticleText.js Documentation](https://particletext.js.org)
- [Svelte Documentation](https://svelte.dev)
- [Vite Documentation](https://vitejs.dev)
