# Future Examples - ParticleText.js

**Document Version:** 1.0
**Created:** 2025-10-22
**Status:** Planning

---

## Overview

This document outlines future example implementations for ParticleText.js demonstrating integration with popular JavaScript frameworks and advanced use cases. These examples are planned for future releases after the package reaches v1.0 and is published to npm.

---

## 1. React Examples

### 1.1 Functional Component with Hooks (React 18+)

**Priority:** HIGH
**Estimated Effort:** 2-3 hours

**Implementation:**
```jsx
import { useEffect, useRef } from 'react';
import initParticleJS from 'particletext.js';

function ParticleText({ text, colors, ...config }) {
  const canvasRef = useRef(null);
  const particleRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      particleRef.current = initParticleJS(canvasRef.current, {
        text,
        colors,
        ...config
      });
    }

    return () => {
      if (particleRef.current) {
        particleRef.current.destroy();
      }
    };
  }, [text, colors, config]);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={400}
      data-text={text}
    />
  );
}
```

**Features to Demonstrate:**
- Canvas ref handling
- Cleanup on unmount
- Dynamic prop updates
- TypeScript integration

---

### 1.2 Class Component Implementation

**Priority:** MEDIUM
**Estimated Effort:** 1-2 hours

**Use Case:** Legacy React applications still using class components

---

### 1.3 React Router Integration

**Priority:** MEDIUM
**Estimated Effort:** 2 hours

**Features:**
- Particle text on different routes
- Animation cleanup on route changes
- Lazy loading particle text component

---

### 1.4 Next.js Integration

**Priority:** HIGH
**Estimated Effort:** 3-4 hours

**Challenges:**
- SSR compatibility (canvas only works client-side)
- Dynamic imports
- Hydration handling

**Implementation Notes:**
```jsx
import dynamic from 'next/dynamic';

const ParticleText = dynamic(
  () => import('../components/ParticleText'),
  { ssr: false }
);
```

---

## 2. Vue Examples

### 2.1 Vue 3 Composition API

**Priority:** HIGH
**Estimated Effort:** 2-3 hours

**Implementation:**
```vue
<template>
  <canvas ref="canvasRef" :width="width" :height="height" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import initParticleJS from 'particletext.js';

const props = defineProps({
  text: String,
  colors: Array,
  width: { type: Number, default: 1200 },
  height: { type: Number, default: 400 }
});

const canvasRef = ref(null);
let particleInstance = null;

onMounted(() => {
  particleInstance = initParticleJS(canvasRef.value, {
    text: props.text,
    colors: props.colors
  });
});

onUnmounted(() => {
  if (particleInstance) {
    particleInstance.destroy();
  }
});
</script>
```

**Features:**
- Composition API with `<script setup>`
- Reactive props
- Lifecycle hooks

---

### 2.2 Vue 2 Options API

**Priority:** MEDIUM
**Estimated Effort:** 1-2 hours

**Use Case:** Legacy Vue 2 projects

---

### 2.3 Nuxt.js Integration

**Priority:** MEDIUM
**Estimated Effort:** 3 hours

**Implementation:**
- Plugin configuration
- Client-only components
- SSR considerations

---

## 3. Angular Examples

### 3.1 Component Implementation

**Priority:** MEDIUM
**Estimated Effort:** 3-4 hours

**Implementation:**
```typescript
import { Component, ElementRef, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import initParticleJS from 'particletext.js';

@Component({
  selector: 'app-particle-text',
  template: `<canvas #canvas [attr.width]="width" [attr.height]="height"></canvas>`
})
export class ParticleTextComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() text: string = '';
  @Input() colors: string[] = ['#695aa6'];
  @Input() width: number = 1200;
  @Input() height: number = 400;

  private particleInstance: any;

  ngOnInit(): void {
    this.particleInstance = initParticleJS(this.canvasRef.nativeElement, {
      text: this.text,
      colors: this.colors
    });
  }

  ngOnDestroy(): void {
    if (this.particleInstance) {
      this.particleInstance.destroy();
    }
  }
}
```

**Features:**
- TypeScript types
- Input bindings
- Lifecycle hooks
- ViewChild decorator

---

### 3.2 Directive Approach

**Priority:** LOW
**Estimated Effort:** 2-3 hours

**Use Case:** Apply particle effect to existing canvas elements

---

### 3.3 Angular Universal (SSR)

**Priority:** LOW
**Estimated Effort:** 3-4 hours

**Challenges:**
- Platform browser checks
- Transfer state
- Hydration

---

## 4. Svelte Examples

### 4.1 Svelte Component

**Priority:** MEDIUM
**Estimated Effort:** 2 hours

**Implementation:**
```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import initParticleJS from 'particletext.js';

  export let text = 'SVELTE';
  export let colors = ['#FF3E00', '#40B3FF'];

  let canvas;
  let particleInstance;

  onMount(() => {
    particleInstance = initParticleJS(canvas, { text, colors });
  });

  onDestroy(() => {
    if (particleInstance) {
      particleInstance.destroy();
    }
  });
</script>

<canvas bind:this={canvas} width="1200" height="400" />
```

---

### 4.2 SvelteKit Integration

**Priority:** LOW
**Estimated Effort:** 2-3 hours

**Features:**
- Browser-only imports
- Page transitions

---

## 5. Solid.js Examples

### 5.1 Solid Component

**Priority:** LOW
**Estimated Effort:** 2 hours

**Implementation:**
```jsx
import { onMount, onCleanup } from 'solid-js';
import initParticleJS from 'particletext.js';

function ParticleText(props) {
  let canvas;
  let instance;

  onMount(() => {
    instance = initParticleJS(canvas, {
      text: props.text,
      colors: props.colors
    });
  });

  onCleanup(() => {
    instance?.destroy();
  });

  return <canvas ref={canvas} width="1200" height="400" />;
}
```

---

## 6. Web Components

### 6.1 Custom Element Wrapper

**Priority:** MEDIUM
**Estimated Effort:** 3-4 hours

**Implementation:**
```javascript
class ParticleTextElement extends HTMLElement {
  connectedCallback() {
    const canvas = document.createElement('canvas');
    canvas.width = this.getAttribute('width') || 1200;
    canvas.height = this.getAttribute('height') || 400;
    this.appendChild(canvas);

    this.instance = initParticleJS(canvas, {
      text: this.getAttribute('text'),
      colors: JSON.parse(this.getAttribute('colors') || '["#695aa6"]')
    });
  }

  disconnectedCallback() {
    this.instance?.destroy();
  }
}

customElements.define('particle-text', ParticleTextElement);
```

**Usage:**
```html
<particle-text
  text="WEB COMPONENT"
  colors='["#695aa6", "#ABC121"]'
  width="1200"
  height="400">
</particle-text>
```

---

## 7. Advanced Integration Examples

### 7.1 Multiple Instances Management

**Priority:** MEDIUM
**Estimated Effort:** 2 hours

**Features:**
- Centralized instance registry
- Bulk start/stop control
- Performance monitoring across instances

---

### 7.2 Dynamic Text Updates

**Priority:** HIGH
**Estimated Effort:** 2-3 hours

**Features:**
- Live text editing
- Smooth transition between texts
- Form input integration

**Implementation:**
```javascript
function updateText(newText) {
  particleInstance.destroy();
  particleInstance = initParticleJS('#canvas', {
    text: newText,
    colors: currentColors
  });
}
```

---

### 7.3 GSAP Integration

**Priority:** MEDIUM
**Estimated Effort:** 3-4 hours

**Features:**
- Scroll-triggered animations
- Timeline integration
- Coordinate with other GSAP animations

**Example:**
```javascript
gsap.to('#particle-canvas', {
  scrollTrigger: {
    trigger: '#particle-section',
    start: 'top center',
    onEnter: () => particleInstance.startAnimation(),
    onLeave: () => particleInstance.destroy()
  }
});
```

---

### 7.4 Anime.js Integration

**Priority:** LOW
**Estimated Effort:** 2-3 hours

**Use Case:** Coordinate particle animations with other anime.js animations

---

### 7.5 Canvas as WebGL Texture

**Priority:** LOW
**Estimated Effort:** 4-6 hours

**Features:**
- Use particle canvas as texture in Three.js
- Apply effects and shaders
- 3D scene integration

---

### 7.6 Three.js Integration

**Priority:** MEDIUM
**Estimated Effort:** 4-6 hours

**Features:**
- Particle text as 3D object
- Camera interactions
- Lighting effects on particles

---

## 8. Build Tool Examples

### 8.1 Webpack Configuration

**Priority:** MEDIUM
**Estimated Effort:** 1 hour

**Features:**
- Module imports
- Code splitting
- Production optimization

---

### 8.2 Vite Integration

**Priority:** HIGH
**Estimated Effort:** 1 hour

**Features:**
- ESM imports
- HMR support
- Dev server configuration

---

### 8.3 Rollup Configuration

**Priority:** LOW
**Estimated Effort:** 1 hour

---

### 8.4 Parcel Integration

**Priority:** LOW
**Estimated Effort:** 30 minutes

---

## 9. Testing Examples

### 9.1 Jest Unit Tests

**Priority:** HIGH
**Estimated Effort:** 3-4 hours

**Test Cases:**
- Initialization
- Method calls
- Cleanup
- Configuration validation

---

### 9.2 Cypress E2E Tests

**Priority:** MEDIUM
**Estimated Effort:** 2-3 hours

**Test Cases:**
- Visual regression
- Mouse interaction
- Responsive behavior
- Performance benchmarks

---

### 9.3 Playwright Tests

**Priority:** MEDIUM
**Estimated Effort:** 2-3 hours

**Features:**
- Cross-browser testing
- Screenshot comparison
- Animation frame capture

---

## 10. Accessibility Examples

### 10.1 Screen Reader Support

**Priority:** HIGH
**Estimated Effort:** 2 hours

**Features:**
- ARIA labels
- Semantic markup
- Keyboard navigation alternatives

---

### 10.2 High Contrast Mode

**Priority:** MEDIUM
**Estimated Effort:** 1-2 hours

**Features:**
- Detect high contrast preference
- Adjust colors automatically
- Fallback static text

---

### 10.3 Reduced Motion Support

**Priority:** HIGH
**Estimated Effort:** 1 hour

**Features:**
- Detect prefers-reduced-motion
- Static text fallback
- Optional simplified animation

---

## Implementation Timeline

### Phase 1 (After v1.0 Release)
1. React Functional Component
2. Vue 3 Composition API
3. Dynamic Text Updates
4. Vite Integration
5. Jest Unit Tests

### Phase 2 (v1.1)
1. Next.js Integration
2. Web Components
3. Multiple Instances Management
4. GSAP Integration

### Phase 3 (v1.2)
1. Angular Component
2. Svelte Component
3. Nuxt.js Integration
4. Cypress E2E Tests

### Phase 4 (Future)
1. Three.js Integration
2. Remaining frameworks
3. Advanced animations
4. Performance optimizations

---

## Contributing

Community contributions for framework examples are welcome! Please ensure:

1. **Code Quality:** Follow framework best practices
2. **Documentation:** Clear README with setup instructions
3. **Dependencies:** Minimal external dependencies
4. **Testing:** Include basic tests when applicable
5. **Accessibility:** Consider a11y best practices

---

## Resources

- **React:** https://react.dev/
- **Vue:** https://vuejs.org/
- **Angular:** https://angular.io/
- **Svelte:** https://svelte.dev/
- **Solid:** https://www.solidjs.com/
- **GSAP:** https://greensock.com/gsap/
- **Three.js:** https://threejs.org/

---

**Last Updated:** 2025-10-22
