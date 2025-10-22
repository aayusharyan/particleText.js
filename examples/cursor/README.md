# Cursor Tracking Examples

This folder contains examples demonstrating the `trackCursorOnlyInsideCanvas` configuration option.

## What is `trackCursorOnlyInsideCanvas`?

This boolean configuration option controls whether particles should only react to cursor movement when it's inside the canvas boundaries.

- **Default (`false`)**: Particles track cursor position anywhere on the page for a smooth, fluid experience
- **Enabled (`true`)**: Particles only react when cursor is inside canvas boundaries

## Examples

### 1. Restricted Tracking (`restricted-tracking.html`)

Demonstrates particles that only react when the cursor is inside the canvas.

**Key Features:**
- Particles immediately snap back when cursor leaves canvas
- Clear visual boundaries for interaction zones
- Ideal for multiple canvas instances or precise interaction control

**Use Case:**
```javascript
ParticleText.init('#canvas', {
    text: 'RESTRICTED',
    trackCursorOnlyInsideCanvas: true,  // Only track inside canvas
    // ... other config
});
```

**When to use:**
- Multiple particle effects on the same page
- Page with interactive elements near the canvas
- You want clear boundaries for where the effect is active
- Performance optimization when cursor is far from canvas
- UI/UX clarity - making it explicit that effect only works within canvas area

### 2. Comparison (`comparison.html`)

Side-by-side comparison of restricted vs unrestricted cursor tracking.

**Features:**
- Two canvas instances with different settings
- Visual demonstration of behavioral differences
- Detailed explanations of use cases

**Perfect for:**
- Understanding the difference between both modes
- Deciding which mode suits your use case
- Learning best practices for each approach

## Configuration Reference

```javascript
ParticleText.init('#myCanvas', {
    // Other configuration...
    trackCursorOnlyInsideCanvas: false,  // Default: tracks cursor everywhere
});
```

```javascript
ParticleText.init('#myCanvas', {
    // Other configuration...
    trackCursorOnlyInsideCanvas: true,   // Only tracks inside canvas
});
```

## Use Case Decision Guide

### Choose **Unrestricted** (`false` - default) when:
- ✅ Single large canvas that takes up most of the viewport
- ✅ You want smooth transitions as cursor approaches
- ✅ Creating anticipation effects (particles react before cursor enters)
- ✅ Full-screen or hero section particle effects
- ✅ Seamless integration with page scrolling

### Choose **Restricted** (`true`) when:
- ✅ Multiple canvas elements on the same page
- ✅ Canvas is near other interactive UI elements (buttons, links, etc.)
- ✅ You want defined interaction zones with clear boundaries
- ✅ Performance optimization (reduce calculations when cursor is far away)
- ✅ Interactive galleries or portfolios with multiple particle effects
- ✅ Mobile-first design where touch interactions need precise boundaries

## Technical Details

### Unrestricted Mode (Default)
- Cursor position is always tracked and calculated
- Particles calculate distance from cursor globally
- Smooth experience as particles begin responding before entering canvas

### Restricted Mode
When cursor leaves canvas boundaries:
- Mouse position is reset to `(-9999, -9999)`
- Particles immediately return to rest positions
- No calculations performed for particles when cursor is outside

## Browser Support

Both modes work across all supported browsers including:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch devices (full support for touch events)
