# ParticleText.js Examples - Detailed Specification

**Document Version:** 1.0
**Last Updated:** 2025-10-22
**Package Version:** 0.1.0
**Status:** Implementation Planning

---

## 1. Overview

This document specifies the complete requirements for creating comprehensive HTML examples demonstrating the ParticleText.js library capabilities. Since the package is unreleased (v0.1.0), examples will use the source file directly rather than npm installation.

### 1.1 Goals

- **Demonstrate all configuration options** - Show practical usage of every parameter
- **Validate functionality** - Ensure JS executes without errors using browser emulation
- **Provide learning resources** - Help users understand how to customize the library
- **Test responsive behavior** - Verify breakpoint-based configurations work correctly
- **Showcase visual variety** - Display different colors, sizes, and animation behaviors

### 1.2 Technology Stack

- **Current Implementation:** Vanilla HTML/CSS/JavaScript
- **Future Enhancement (Documented):** React/Vue/Angular framework examples to be added later

---

## 2. File Structure

```
examples/
├── index.html                    # Main examples directory index with links to all examples
├── basic/
│   └── basic.html               # Basic usage with minimal configuration
├── colors/
│   ├── single-color.html        # Single color demonstration
│   ├── multi-color.html         # Multiple colors (gradient-like effect)
│   └── theme-colors.html        # Real-world color schemes (brand colors)
├── sizing/
│   ├── small-text.html          # Small font size (30-50px)
│   ├── medium-text.html         # Medium font size (80-120px)
│   └── large-text.html          # Large font size (150-250px)
├── particles/
│   ├── particle-density.html    # Different particle sizes and densities
│   ├── explosion-radius.html    # Various explosion radius values
│   └── friction-effects.html    # Friction variations (slow vs fast convergence)
├── responsive/
│   └── responsive-config.html   # Breakpoint-based configurations
├── advanced/
│   ├── manual-control.html      # Manual animation control (autoAnimate: false)
│   ├── custom-breakpoints.html  # Custom breakpoint override
│   ├── error-handling.html      # Error callback demonstration
│   └── slow-browser.html        # Slow browser detection simulation
├── performance/
│   └── max-particles.html       # Performance with maxParticles limits
└── FUTURE_EXAMPLES.md            # Documentation of framework examples to implement
```

**Total Examples:** 16 HTML files + 2 documentation files

---

## 3. Detailed Example Specifications

### 3.1 index.html - Main Examples Directory

**Purpose:** Central hub for navigating all examples

**Features:**
- Styled navigation with categories
- Brief description of each example
- Links to all example files
- Quick reference to library documentation
- Visual categorization (icons or color coding)
- Responsive grid layout

**Content Sections:**
1. Introduction to ParticleText.js
2. Getting Started (basic installation)
3. Example Categories (collapsible sections)
4. External Resources (GitHub, documentation)

---

### 3.2 Basic Examples

#### basic/basic.html

**Configuration:**
```javascript
initParticleJS('#canvas', {
  text: 'ParticleText.JS',
  colors: ['#695aa6']
});
```

**Validation Points:**
- Canvas renders without errors
- Text forms correctly from particles
- Mouse interaction triggers explosion effect
- Particles return to original positions
- No console errors

**Expected Behavior:**
- Purple particles spell "ParticleText.JS"
- Particles explode on mouseover with ~150px radius
- Smooth animation at 60fps on modern browsers

---

### 3.3 Color Examples

#### colors/single-color.html

**Configuration:**
```javascript
{
  text: 'SINGLE COLOR',
  colors: ['#FF6B6B'],
  fontSize: 100
}
```

**Purpose:** Demonstrate single color (#FF6B6B coral red)

---

#### colors/multi-color.html

**Configuration:**
```javascript
{
  text: 'RAINBOW TEXT',
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
  fontSize: 100
}
```

**Purpose:** Show random color assignment creating rainbow effect

**Validation:** Each particle should have one of the 5 specified colors

---

#### colors/theme-colors.html

**Three separate canvas instances:**

1. **Brand Blue Theme**
   ```javascript
   colors: ['#0066CC', '#004999', '#3385D6', '#0052A3']
   ```

2. **Sunset Theme**
   ```javascript
   colors: ['#FF6F61', '#FFB88C', '#FF8C42', '#DE5D83']
   ```

3. **Forest Theme**
   ```javascript
   colors: ['#2D5016', '#4E7128', '#7A9A5A', '#A4C28E']
   ```

**Purpose:** Real-world color palette applications

---

### 3.4 Sizing Examples

#### sizing/small-text.html

**Configuration:**
```javascript
{
  text: 'small',
  fontSize: 40,
  particleRadius: { xs: { base: 1, rand: 1 } }
}
```

**Canvas Size:** 800x200px
**Purpose:** Demonstrate legibility with small particles

---

#### sizing/medium-text.html

**Configuration:**
```javascript
{
  text: 'MEDIUM',
  fontSize: 100,
  particleRadius: { xs: { base: 2, rand: 1 } }
}
```

**Canvas Size:** 1200x300px
**Purpose:** Standard readable size

---

#### sizing/large-text.html

**Configuration:**
```javascript
{
  text: 'BIG',
  fontSize: 200,
  particleRadius: { xs: { base: 3, rand: 2 } }
}
```

**Canvas Size:** 1800x500px
**Purpose:** Large display text (hero sections)

---

### 3.5 Particle Behavior Examples

#### particles/particle-density.html

**Three canvas instances:**

1. **Dense Small Particles**
   ```javascript
   particleRadius: { xs: { base: 1, rand: 0.5 } }
   ```

2. **Medium Density**
   ```javascript
   particleRadius: { xs: { base: 2, rand: 1 } }
   ```

3. **Sparse Large Particles**
   ```javascript
   particleRadius: { xs: { base: 4, rand: 3 } }
   ```

**Purpose:** Show particle density impact on visual appearance

---

#### particles/explosion-radius.html

**Three canvas instances:**

1. **Small Explosion (50px)**
   ```javascript
   explosionRadius: { xs: 50, lg: 50 }
   ```

2. **Medium Explosion (150px)**
   ```javascript
   explosionRadius: { xs: 150, lg: 150 }
   ```

3. **Large Explosion (300px)**
   ```javascript
   explosionRadius: { xs: 300, lg: 300 }
   ```

**Purpose:** Demonstrate explosion radius effect on interaction

**Visual Aid:** On-screen radius indicator showing explosion zone

---

#### particles/friction-effects.html

**Three canvas instances:**

1. **High Friction (Slow, Smooth)**
   ```javascript
   friction: { base: 0.95, rand: 0.03 }
   ```
   - Particles move slowly
   - Little bounce/oscillation
   - Smooth convergence

2. **Medium Friction (Default)**
   ```javascript
   friction: { base: 0.9, rand: 0.05 }
   ```
   - Balanced movement
   - Natural feel

3. **Low Friction (Fast, Bouncy)**
   ```javascript
   friction: { base: 0.8, rand: 0.1 }
   ```
   - Fast movement
   - Visible overshoot/bounce
   - Energetic feel

**Purpose:** Illustrate friction impact on animation character

**Visual Labels:** "Slow & Smooth", "Balanced", "Fast & Bouncy"

---

### 3.6 Responsive Examples

#### responsive/responsive-config.html

**Configuration:**
```javascript
{
  text: 'RESPONSIVE',
  colors: ['#695aa6', '#ABC121'],
  particleRadius: {
    'xxxs': { base: 1, rand: 0.5 },
    'xs': { base: 1.5, rand: 1 },
    'md': { base: 2, rand: 1 },
    'lg': { base: 3, rand: 2 },
    'xxxl': { base: 4, rand: 2 }
  },
  explosionRadius: {
    'xxxs': 15,
    'xs': 20,
    'md': 50,
    'lg': 100,
    'xxxl': 200
  }
}
```

**Purpose:** Demonstrate responsive breakpoint system

**UI Features:**
- Display current breakpoint name
- Update on window resize
- Visual indicator of particle size changes

**Implementation:**
```javascript
let pt = initParticleJS('#canvas', config);
document.getElementById('breakpoint').textContent = pt.getCurrentBreakpoint();
window.addEventListener('resize', () => {
  document.getElementById('breakpoint').textContent = pt.getCurrentBreakpoint();
});
```

---

### 3.7 Advanced Control Examples

#### advanced/manual-control.html

**Configuration:**
```javascript
{
  text: 'MANUAL CONTROL',
  autoAnimate: false
}
```

**UI Controls:**
- **Start Button** - Calls `particleText.startAnimation()`
- **Stop Button** - Calls `particleText.destroy()`
- **Single Frame Button** - Calls `particleText.forceRequestAnimationFrame()`
- **Status Display** - Shows `particleText.isAnimating`

**Purpose:** Demonstrate programmatic animation control

**Validation:** Verify start/stop/single frame render work correctly

---

#### advanced/custom-breakpoints.html

**Configuration:**
```javascript
let pt = initParticleJS('#canvas', { text: 'CUSTOM' });

// Override breakpoint function
pt.getCurrentBreakpoint = function() {
  let width = window.innerWidth;
  if (width < 500) return 'mobile';
  if (width < 1000) return 'tablet';
  return 'desktop';
};
```

**Purpose:** Show how to override breakpoint logic

**UI Display:** Current custom breakpoint name

---

#### advanced/error-handling.html

**Configuration:**
```javascript
{
  text: 'ERROR TEST',
  colors: ['#695aa6'],
  onError: function(error) {
    document.getElementById('error-log').innerHTML +=
      `<div class="error">${error.message}</div>`;
    console.error('ParticleText Error:', error);
  }
}
```

**Purpose:** Demonstrate error callback functionality

**UI Features:**
- Error log display area
- Button to trigger invalid operations
- Clear error log button

**Test Cases:**
- Invalid color format
- Missing canvas element
- Invalid configuration values

---

#### advanced/slow-browser.html

**Configuration:**
```javascript
{
  text: 'PERFORMANCE',
  supportSlowBrowsers: true,
  renderTimeThreshold: 10, // Lower threshold for demo
  slowBrowserDetected: function() {
    document.getElementById('status').innerHTML =
      '<span class="warning">⚠️ Slow browser detected - quality reduced</span>';
  }
}
```

**Purpose:** Demonstrate slow browser detection and optimization

**UI Features:**
- Performance status indicator
- Render time display
- Manual quality toggle

**Note:** May be difficult to trigger on modern devices - document expected behavior

---

### 3.8 Performance Examples

#### performance/max-particles.html

**Three canvas instances:**

1. **Low Particle Count (500)**
   ```javascript
   maxParticles: 500
   ```

2. **Medium Particle Count (2000)**
   ```javascript
   maxParticles: 2000
   ```

3. **High Particle Count (5000)**
   ```javascript
   maxParticles: 5000
   ```

**Purpose:** Show impact of particle count on visual density and performance

**UI Features:**
- FPS counter (using requestAnimationFrame timing)
- Particle count display
- Performance comparison

---

## 4. Common HTML Structure

All example files should follow this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Example Name] - ParticleText.js Examples</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      min-height: 100vh;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 28px;
    }

    .description {
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .canvas-wrapper {
      background: #000;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 20px;
    }

    canvas {
      display: block;
      width: 100%;
      height: auto;
    }

    .info {
      background: #f8f9fa;
      border-left: 4px solid #695aa6;
      padding: 15px;
      margin-top: 20px;
      border-radius: 4px;
    }

    .code-block {
      background: #282c34;
      color: #abb2bf;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 10px 0;
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }

    .nav-links {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }

    .nav-links a {
      color: #695aa6;
      text-decoration: none;
      margin-right: 15px;
    }

    .nav-links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>[Example Title]</h1>
    <p class="description">[Example description and purpose]</p>

    <div class="canvas-wrapper">
      <canvas id="canvas" width="[WIDTH]" height="[HEIGHT]" data-text="[TEXT]"></canvas>
    </div>

    <div class="info">
      <h3>Configuration:</h3>
      <div class="code-block">
        [Configuration code snippet]
      </div>
    </div>

    <div class="nav-links">
      <a href="../index.html">← Back to Examples</a>
      <a href="https://github.com/aayusharyan/particleText.js">GitHub</a>
    </div>
  </div>

  <script src="../../src/particleText.js"></script>
  <script>
    // Example initialization code
  </script>
</body>
</html>
```

---

## 5. Browser Testing Strategy

### 5.1 Browser Emulation

Use **Puppeteer** or **Playwright** for automated browser testing:

**Test Cases for Each Example:**
1. Page loads without JavaScript errors
2. Canvas element is found and initialized
3. No console errors during first 5 seconds
4. Canvas context is created (2D)
5. Particles are rendered (check canvas pixel data)
6. Animation loop is running (check isAnimating property)

**Browser Targets:**
- Chrome/Chromium (latest)
- Firefox (latest) - if time permits
- Mobile viewport simulation (375x667)

### 5.2 Manual Validation Checklist

For each example, verify:
- [ ] Page loads without errors
- [ ] Text renders as particles
- [ ] Particles form recognizable text shape
- [ ] Mouse interaction triggers explosion
- [ ] Particles return to position after explosion
- [ ] Animation is smooth (no flickering)
- [ ] Canvas is responsive (if applicable)
- [ ] All UI controls work (if applicable)
- [ ] No console errors or warnings

---

## 6. Documentation Requirements

### 6.1 FUTURE_EXAMPLES.md

Document future example implementations:

**React Examples:**
- Functional component with hooks
- Class component implementation
- Integration with React Router
- TypeScript integration
- Next.js usage

**Vue Examples:**
- Vue 3 Composition API
- Vue 2 Options API
- Nuxt.js integration

**Angular Examples:**
- Component implementation
- Directive approach
- Universal/SSR considerations

**Other Frameworks:**
- Svelte implementation
- Solid.js implementation
- Web Components wrapper

**Advanced Scenarios:**
- Multiple instances management
- Dynamic text updates
- Integration with animation libraries (GSAP, anime.js)
- Canvas as WebGL texture
- Three.js integration

---

## 7. Success Criteria

### 7.1 Functional Requirements

- [ ] All 16 HTML examples created
- [ ] All examples load without JavaScript errors
- [ ] All examples demonstrate intended functionality
- [ ] Examples use correct relative paths to source file
- [ ] Navigation between examples works
- [ ] Code snippets match actual implementation

### 7.2 Quality Requirements

- [ ] Consistent visual design across all examples
- [ ] Clear descriptions and documentation
- [ ] Proper HTML semantics and accessibility
- [ ] Responsive design (mobile-friendly)
- [ ] Code is clean and well-commented
- [ ] Examples are educational and easy to understand

### 7.3 Testing Requirements

- [ ] Browser emulation tests pass for all examples
- [ ] Manual validation checklist completed
- [ ] No console errors in any example
- [ ] Performance is acceptable (>30fps on mid-range devices)

---

## 8. Implementation Notes

### 8.1 File Paths

Since package is unreleased, use relative paths:
```html
<script src="../../src/particleText.js"></script>
```

Examples in subdirectories need `../../` to reach source file.

### 8.2 Canvas Sizing

Set canvas dimensions as HTML attributes (not CSS):
```html
<canvas id="canvas" width="1200" height="400"></canvas>
```

Canvas will scale responsively via CSS `width: 100%`.

### 8.3 Color Selection

Use visually distinct colors for better demonstration:
- High contrast for visibility
- Diverse hues for multi-color examples
- Professional palettes for theme examples

### 8.4 Performance Considerations

- Keep canvas sizes reasonable (max 2000x600)
- Use appropriate particle counts for example purpose
- Document expected performance characteristics
- Note when examples may be slow on older devices

---

## 9. Maintenance Plan

### 9.1 Future Updates

When package is released:
- Update script paths to CDN or npm package
- Add installation instructions
- Update version references
- Test with minified production build

### 9.2 Version Tracking

Document in each file:
```html
<!-- ParticleText.js v0.1.0 Example -->
<!-- Last Updated: 2025-10-22 -->
```

---

## 10. Accessibility Considerations

Each example should:
- Include proper heading structure
- Use semantic HTML
- Include descriptive text for screen readers
- Respect `prefers-reduced-motion` (library handles this)
- Have sufficient color contrast in UI elements

---

## Appendix A: Color Palettes

**Professional Palettes for Examples:**

**Tech Blue:**
- #0066CC, #004999, #3385D6, #0052A3

**Vibrant Mix:**
- #FF6B6B, #4ECDC4, #45B7D1, #FFA07A, #98D8C8

**Purple Gradient:**
- #695aa6, #8A7BB8, #AB9CCA, #CCBDDC

**Sunset:**
- #FF6F61, #FFB88C, #FF8C42, #DE5D83

**Forest:**
- #2D5016, #4E7128, #7A9A5A, #A4C28E

**Ocean:**
- #006994, #007BA7, #0099CC, #00B5E2

---

## Appendix B: Responsive Testing Viewports

**Desktop:**
- 1920x1080 (Full HD)
- 1440x900 (Laptop)
- 1280x720 (Small Desktop)

**Tablet:**
- 768x1024 (iPad Portrait)
- 1024x768 (iPad Landscape)

**Mobile:**
- 375x667 (iPhone 6/7/8)
- 414x896 (iPhone XR)
- 360x640 (Android)

---

**End of Specification Document**
