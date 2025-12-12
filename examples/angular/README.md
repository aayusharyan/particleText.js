# ParticleText.js - Angular Example

This is a complete example of using ParticleText.js with Angular (standalone components).

## Features

- 🅰️ Built with Angular 19 (Standalone Components)
- 🎨 Interactive particle text animation
- 📱 Fully responsive design
- 🔥 Uses ViewChild and lifecycle hooks

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Or:

```bash
npm start
```

Open [http://localhost:3003](http://localhost:3003) to view it in your browser.

### Build

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

The main component is in `src/app/app.component.ts`. It demonstrates:

- Using `@ViewChild` to reference the canvas element
- Initializing ParticleText.js in `ngOnInit`
- Properly cleaning up with the `destroy()` method in `ngOnDestroy`
- Configuring particle colors, size, and behavior
- Using Angular standalone components (no NgModule required)

## Learn More

- [ParticleText.js Documentation](https://particletext.js.org)
- [Angular Documentation](https://angular.dev)
