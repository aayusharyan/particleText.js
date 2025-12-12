# ParticleText.js - Vue Example

This is a complete example of using ParticleText.js with Vue 3 and Vite.

## Features

- 🖖 Built with Vue 3 Composition API
- ⚡ Powered by Vite for fast development
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

Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

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

The main component is in `src/App.vue`. It demonstrates:

- Using `ref` to reference the canvas element
- Initializing ParticleText.js in `onMounted`
- Properly cleaning up with the `destroy()` method in `onBeforeUnmount`
- Configuring particle colors, size, and behavior

## Learn More

- [ParticleText.js Documentation](https://particletext.js.org)
- [Vue 3 Documentation](https://vuejs.org)
- [Vite Documentation](https://vitejs.dev)
