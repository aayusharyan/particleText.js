# ParticleText.js Documentation Site Specification

**Version:** 1.0.0
**Date:** 2025-10-22
**Author:** Documentation Team
**Project:** ParticleText.js FOSS Documentation

---

## 1. Overview

This specification outlines the complete documentation site for ParticleText.js, a vanilla JavaScript particle text animation library. The documentation will be built using Astro Starlight framework to provide a modern, fast, and accessible documentation experience.

### 1.1 Goals

- Provide comprehensive documentation for all library features
- Migrate 18 existing examples with interactive demonstrations
- Create framework integration guides for popular frameworks
- Build an interactive playground for configuration testing
- Ensure excellent SEO through sitemap generation
- Optimize images using astro-sharp
- Support MDX for rich documentation content

### 1.2 Technology Stack

- **Framework:** Astro v4.x with Starlight theme
- **Content Format:** MDX (Markdown with JSX)
- **Image Optimization:** Built-in Astro Sharp integration
- **SEO:** @astrojs/sitemap plugin
- **Interactive Components:** Astro client-side components (React/Preact)
- **Styling:** Starlight's default theme with custom overrides
- **Canvas Rendering:** Client-side JavaScript integration

---

## 2. Architecture

### 2.1 Directory Structure

```
docs/
├── public/                          # Static assets
│   ├── particleText.js             # Library file (copied from src/)
│   ├── favicon.png                 # Dark background favicon derived from logo
│   └── logo.png                    # Shared logo asset
├── src/
│   ├── content/
│   │   ├── docs/                   # Documentation pages (MDX)
│   │   │   ├── index.mdx          # Homepage
│   │   │   ├── getting-started/
│   │   │   │   ├── installation.mdx
│   │   │   │   ├── quick-start.mdx
│   │   │   │   └── basic-usage.mdx
│   │   │   ├── api-reference/
│   │   │   │   ├── initialization.mdx
│   │   │   │   ├── configuration.mdx
│   │   │   │   ├── methods.mdx
│   │   │   │   └── properties.mdx
│   │   │   ├── examples/
│   │   │   │   ├── index.mdx
│   │   │   │   ├── basic.mdx
│   │   │   │   ├── colors/
│   │   │   │   │   ├── single-color.mdx
│   │   │   │   │   ├── multi-color.mdx
│   │   │   │   │   └── theme-colors.mdx
│   │   │   │   ├── sizing/
│   │   │   │   │   ├── small-text.mdx
│   │   │   │   │   ├── medium-text.mdx
│   │   │   │   │   └── large-text.mdx
│   │   │   │   ├── particles/
│   │   │   │   │   ├── density.mdx
│   │   │   │   │   ├── explosion-radius.mdx
│   │   │   │   │   └── friction.mdx
│   │   │   │   ├── responsive/
│   │   │   │   │   └── breakpoints.mdx
│   │   │   │   ├── advanced/
│   │   │   │   │   ├── manual-control.mdx
│   │   │   │   │   ├── custom-breakpoints.mdx
│   │   │   │   │   ├── error-handling.mdx
│   │   │   │   │   └── slow-browser.mdx
│   │   │   │   ├── cursor/
│   │   │   │   │   ├── restricted-tracking.mdx
│   │   │   │   │   └── comparison.mdx
│   │   │   │   └── performance/
│   │   │   │       └── max-particles.mdx
│   │   │   ├── frameworks/
│   │   │   │   ├── index.mdx
│   │   │   │   ├── react.mdx
│   │   │   │   ├── vue.mdx
│   │   │   │   ├── angular.mdx
│   │   │   │   ├── svelte.mdx
│   │   │   │   ├── nextjs.mdx
│   │   │   │   └── nuxt.mdx
│   │   │   ├── playground/
│   │   │   │   └── index.mdx
│   │   │   ├── guides/
│   │   │   │   ├── breakpoint-system.mdx
│   │   │   │   ├── performance-optimization.mdx
│   │   │   │   ├── multiple-instances.mdx
│   │   │   │   └── accessibility.mdx
│   │   │   └── troubleshooting/
│   │   │       ├── index.mdx
│   │   │       ├── common-issues.mdx
│   │   │       └── browser-support.mdx
│   │   └── config.ts               # Content collections config
│   ├── components/
│   │   ├── CanvasExample.astro    # Canvas example wrapper
│   │   ├── LiveDemo.astro         # Live demo component
│   │   ├── ConfigPlayground.tsx   # Interactive playground (React)
│   │   └── CodePreview.astro      # Code preview with syntax highlighting
│   ├── layouts/
│   │   └── CustomLayout.astro     # Custom layouts if needed
│   └── styles/
│       └── custom.css              # Custom styles
├── astro.config.mjs                # Astro configuration
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Docs README
```

### 2.2 Component Architecture

#### 2.2.1 CanvasExample Component

Reusable component for rendering canvas examples:

```astro
---
// src/components/CanvasExample.astro
interface Props {
  title: string;
  config: object;
  height?: number;
  text?: string;
}
---
```

Features:

- Accepts configuration object
- Handles canvas initialization
- Client-side hydration for interactivity
- Responsive sizing
- Error boundary handling

#### 2.2.2 ConfigPlayground Component

Interactive configuration builder:

```tsx
// src/components/ConfigPlayground.tsx (React)
- Live configuration editor (JSON/Form)
- Real-time preview canvas
- Code export functionality (copy to clipboard)
- Preset configurations
- Validation and error display
```

---

## 3. Content Migration

### 3.1 Example Migration Strategy

Each of the 18 HTML examples will be converted to MDX pages with:

1. **Description Section:** Explain the example's purpose and use case
2. **Live Demo:** Interactive canvas using CanvasExample component
3. **Configuration Code:** Syntax-highlighted code block showing the config
4. **Key Points:** Bullet points explaining configuration options
5. **Try It Yourself:** Link to playground with pre-filled config

### 3.2 Example Page Template

````mdx
---
title: Example Title
description: Brief description of what this example demonstrates
---

import CanvasExample from '@components/CanvasExample.astro';

# Example Title

Description paragraph explaining what this example shows and when to use it.

## Live Demo

<CanvasExample
  title="Example Name"
  config={{
    text: 'ParticleText',
    colors: ['#695aa6'],
    fontSize: 100,
  }}
/>

## Configuration

```javascript
const config = {
  text: 'ParticleText',
  colors: ['#695aa6'],
  fontSize: 100,
};

initParticleJS('#canvas', config);
```
````

## Key Features

- Feature 1 explanation
- Feature 2 explanation
- Feature 3 explanation

## Try It Yourself

Experiment with this configuration in the [Playground](/playground?preset=example-name).

## Related Examples

- [Related Example 1](/examples/category/example)
- [Related Example 2](/examples/category/example)

````

---

## 4. Framework Integration

### 4.1 Framework Support Matrix

| Framework | Version | Example Type | Component Type |
|-----------|---------|--------------|----------------|
| React | 18+ | Hooks, Class Component | Functional + Class |
| Vue | 3.x | Composition API | Single File Component |
| Angular | 16+ | Component + Directive | Component Class |
| Svelte | 4.x | Standard | Svelte Component |
| Next.js | 14+ | App Router, Pages | Server + Client |
| Nuxt | 3.x | Composition API | Vue Component |

### 4.2 Framework Integration Documentation Structure

Each framework guide will include:

1. **Prerequisites:** Framework version requirements
2. **Installation:** npm/yarn/pnpm commands
3. **Basic Setup:** Minimal working example
4. **Component Wrapper:** Framework-specific wrapper component
5. **TypeScript Support:** Type definitions (if applicable)
6. **SSR Considerations:** Server-side rendering notes
7. **Full Example:** Complete working project
8. **Common Issues:** Framework-specific troubleshooting

### 4.3 Astro Configuration for Framework Examples

To support live framework examples, configure Astro with framework integrations:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [
    starlight({...}),
    react(),
    vue(),
    svelte()
  ]
});
````

---

## 5. Interactive Playground

### 5.1 Features

- **Configuration Editor:**
  - JSON editor with syntax highlighting
  - Form-based editor with dropdowns and sliders
  - Real-time validation
  - Toggle between JSON/Form view

- **Live Preview:**
  - Instant canvas rendering
  - Responsive preview modes (mobile, tablet, desktop)
  - FPS counter
  - Particle count display

- **Code Export:**
  - Copy vanilla JS code
  - Copy framework-specific code (React, Vue, etc.)
  - Download as HTML file
  - Share via URL (config in query params)

- **Presets:**
  - All 18 example configurations
  - User custom presets (localStorage)
  - Import/Export preset JSON

### 5.2 Playground Implementation

```tsx
// ConfigPlayground.tsx structure
interface ConfigPlaygroundProps {
  initialConfig?: ParticleConfig;
}

Components:
- ConfigEditor (JSON/Form toggle)
- LiveCanvas (real-time preview)
- ExportPanel (code generation)
- PresetSelector (example configs)
- PerformanceMonitor (FPS, particle count)
```

---

## 6. SEO and Performance

### 6.1 SEO Strategy

- **Sitemap:** Auto-generated via @astrojs/sitemap
- **Meta Tags:** Dynamic per-page titles, descriptions, OG images
- **Structured Data:** JSON-LD for software documentation
- **Canonical URLs:** Prevent duplicate content
- **Robots.txt:** Proper crawler directives
- **XML Sitemap:** Submitted to Google Search Console

### 6.2 Performance Optimization

- **Image Optimization:**
  - All images processed through Astro Sharp
  - WebP format with PNG fallback
  - Responsive image sizing
  - Lazy loading

- **Code Splitting:**
  - Canvas examples client-only
  - Playground loaded on-demand
  - Framework examples isolated

- **Caching:**
  - Static page generation
  - CDN-friendly headers
  - Service worker (optional)

---

## 7. Accessibility

### 7.1 Requirements

- **WCAG 2.1 Level AA Compliance:**
  - Keyboard navigation for all interactive elements
  - Screen reader announcements for canvas state changes
  - Focus indicators on all focusable elements
  - Color contrast ratios meet standards

- **Canvas Accessibility:**
  - ARIA labels on canvas elements
  - Text alternatives for visual demos
  - Reduced motion support (prefers-reduced-motion)
  - Skip links for keyboard users

- **Documentation Accessibility:**
  - Semantic HTML structure
  - Proper heading hierarchy
  - Alt text for all images
  - Descriptive link text

---

## 8. Build and Deployment

### 8.1 Build Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

### 8.2 Deployment Targets

- **Recommended:** Netlify, Vercel, Cloudflare Pages
- **Build Output:** Static site (HTML/CSS/JS)
- **CI/CD:** GitHub Actions workflow
- **Performance Budget:** Lighthouse score > 95

---

## 9. Testing Strategy

### 9.1 Test Coverage

- **Visual Testing:**
  - All 18 examples render correctly
  - Canvas displays on all breakpoints
  - Interactive elements respond properly

- **Functional Testing:**
  - Playground generates correct code
  - Copy-to-clipboard works
  - URL sharing preserves config

- **Cross-Browser Testing:**
  - Chrome, Firefox, Safari, Edge
  - Mobile browsers (iOS Safari, Chrome Mobile)
  - IE11 compatibility notes

- **Performance Testing:**
  - Lighthouse CI scores
  - Canvas performance with max particles
  - Page load times

---

## 10. Documentation Standards

### 10.1 Writing Style

- **Tone:** Professional, friendly, educational
- **Voice:** Active voice preferred
- **Tense:** Present tense for current features
- **Audience:** Developers familiar with JavaScript
- **Code Style:** Match library's .eslintrc and .prettierrc

### 10.2 Code Examples

- **Syntax Highlighting:** JavaScript, TypeScript, HTML, JSON
- **Comments:** Explain non-obvious code
- **Completeness:** Examples should be copy-paste ready
- **Consistency:** Use same variable names across docs

---

## 11. Maintenance Plan

### 11.1 Update Triggers

- Library version releases
- New examples added
- Framework version updates
- User feedback and issues
- Broken link checks (quarterly)

### 11.2 Version Compatibility

- Document version compatibility matrix
- Archive old version docs if breaking changes
- Clear upgrade guides between versions

---

## 12. Success Metrics

### 12.1 Launch Criteria

- [ ] All 18 examples migrated and functional
- [ ] 6+ framework integrations documented
- [ ] Playground fully functional
- [ ] Lighthouse score > 95
- [ ] All internal links working
- [ ] Sitemap generated and submitted
- [ ] Mobile responsive on all pages
- [ ] Accessibility audit passed

### 12.2 Post-Launch KPIs

- Page views and unique visitors
- Time on page (engagement)
- Playground usage statistics
- Framework guide popularity
- Search ranking for "particle text javascript"
- GitHub stars/downloads increase

---

## 13. Open Questions / Future Enhancements

### 13.1 Phase 1 (Current Scope)

- All items in sections 1-12 above

### 13.2 Phase 2 (Future)

- Video tutorials embedded in docs
- Interactive tutorial wizard
- User-submitted examples gallery
- CodeSandbox/StackBlitz embeds
- API search functionality
- Multiple theme support (dark/light)
- Internationalization (i18n) for non-English

---

## 14. References

- Astro Documentation: https://docs.astro.build
- Starlight Documentation: https://starlight.astro.build
- ParticleText.js Repository: https://github.com/aayusharyan/particleText.js
- Existing Examples: `/examples/*`
- Example Specifications: `EXAMPLES_SPEC.md`

---

**End of Specification**
