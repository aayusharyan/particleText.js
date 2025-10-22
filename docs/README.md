# ParticleText.js Documentation

Official documentation site for [ParticleText.js](https://github.com/aayusharyan/particleText.js) - a vanilla JavaScript particle text animation library.

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
# Visit http://localhost:4321

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 📁 Project Structure

```
docs/
├── public/
│   └── particleText.js           # Main library file
├── src/
│   ├── components/
│   │   ├── CanvasExample.astro   # Live canvas demo component
│   │   ├── CodePreview.astro     # Code display with copy button
│   │   └── Head.astro            # Custom head component
│   ├── content/
│   │   └── docs/                 # Documentation pages (MDX)
│   └── styles/
│       └── custom.css            # Custom styling
├── astro.config.mjs              # Astro configuration
├── package.json                  # Dependencies
├── SPEC.md                       # Technical specification
├── TODO.md                       # Progress tracking
└── IMPLEMENTATION_SUMMARY.md     # Implementation details
```

## 📝 Writing Documentation

### Adding a New Page

1. Create an MDX file in `src/content/docs/`:
```mdx
---
title: Page Title
description: Page description for SEO
---

# Page Title

Your content here...
```

2. Add to sidebar in `astro.config.mjs`:
```javascript
sidebar: [
  {
    label: 'Section Name',
    items: [
      { label: 'Page Title', slug: 'path/to/page' },
    ],
  },
]
```

### Using Components

#### CanvasExample Component

Display live particle text demonstrations:

```mdx
import CanvasExample from '../../../components/CanvasExample.astro';

<CanvasExample
  title="Example Name"
  config={{
    text: 'ParticleText',
    colors: ['#695aa6', '#8b7bb8'],
    fontSize: 100
  }}
  height={400}
  showStats={true}
/>
```

**Props:**
- `title` (string) - Display title
- `config` (object) - ParticleText.js configuration
- `height` (number) - Canvas height in pixels (default: 400)
- `text` (string) - Override text in config
- `showStats` (boolean) - Show FPS/particle count (default: false)
- `canvasId` (string) - Custom canvas ID (auto-generated)

#### CodePreview Component

Display code with syntax highlighting and copy button:

```mdx
import CodePreview from '../../../components/CodePreview.astro';

<CodePreview
  title="Configuration"
  code={`const config = {
  text: 'Hello World',
  colors: ['#695aa6'],
  fontSize: 100
};`}
  language="javascript"
/>
```

**Props:**
- `code` (string) - Code to display
- `language` (string) - Syntax highlighting language (default: 'javascript')
- `title` (string) - Optional title
- `showLineNumbers` (boolean) - Show line numbers (default: true)

## 🎨 Technology Stack

- **Astro v5.14.8** - Static site generator
- **Starlight v0.36.1** - Documentation theme
- **MDX v4.3.7** - Markdown with JSX
- **React v18.3.1** - Interactive components
- **Sharp v0.34.4** - Image optimization
- **@astrojs/sitemap v3.6.0** - Sitemap generation

## 📊 Current Status

**Phase 1: Infrastructure** ✅ Complete
- [x] Astro Starlight setup
- [x] MDX and React integration
- [x] Custom components (CanvasExample, CodePreview)
- [x] Sidebar navigation structure
- [x] 44 pages created (3 complete, 41 placeholders)
- [x] Build system operational
- [x] Sitemap generation
- [x] Search indexing (Pagefind)

**Phase 2: Content Migration** ⚠️ In Progress
- [ ] Migrate 18 HTML examples to MDX
- [ ] Populate API Reference documentation
- [ ] Write guide content
- [ ] Create framework integration guides
- [ ] Build interactive playground

See [TODO.md](./TODO.md) for detailed progress tracking.

## 🛠 Development Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start dev server at localhost:4321 |
| `pnpm run build` | Build production site to `dist/` |
| `pnpm run preview` | Preview production build locally |
| `pnpm run astro` | Run Astro CLI commands |

## 📚 Documentation

- [SPEC.md](./SPEC.md) - Complete technical specification
- [TODO.md](./TODO.md) - Detailed progress tracker
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Implementation details

## 🔗 Resources

- [Astro Documentation](https://docs.astro.build)
- [Starlight Documentation](https://starlight.astro.build)
- [MDX Documentation](https://mdxjs.com)
- [ParticleText.js Repository](https://github.com/aayusharyan/particleText.js)

## 📄 License

MIT - Same as ParticleText.js library

---

**Last Updated:** 2025-10-22
