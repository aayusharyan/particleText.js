# ParticleText.js – Production Readiness To-Do

Below is a structured set of tasks required to move the library from demo status to a production-ready state. Each task contains:
• **Problem** – why this matters.
• **Proposed Solution** – what should be done (implementation hints in italics).

Use the check-boxes to track progress.

---

## 2. Performance Optimisation

- [ ] **Optimise mouse-interaction lookup**
      **Problem**: Naïve O(n) distance check for every particle every frame.
      **Proposed Solution**:
      _Implement spatial hashing or quad-tree_ to query nearby particles only.

- [ ] **Minimise math overhead in `Particle.render()`**
      **Problem**: Repeated `Math.floor` and other FPU calls.
      **Proposed Solution**: Pre-compute integer positions when drawing or drop flooring if canvas anti-aliasing is acceptable.

---

## 3. Browser Compatibility

- [ ] **Polyfill missing APIs when needed**
      **Problem**: `requestAnimationFrame`, `performance.now`, `dataset`, etc., not available in older browsers.
      **Proposed Solution**: Provide lightweight polyfills or document that host page must include them.

---

## 5. Build, Test & CI

- [ ] **Unit & visual regression tests**
      **Problem**: No automated safety net.
      **Proposed Solution**:
      • Use Jest + Canvas mocks for logic.
      • Use Playwright or Cypress for rendering snapshots.

- [ ] **GitHub Actions CI**
      **Problem**: Manual verification only.
      **Proposed Solution**: Run lint, tests, build, and bundle-size check on push/PR.

---

## 8. Documentation & Licensing

- [ ] **Provide interactive demo (CodeSandbox / StackBlitz) linked to latest release**

---

> **Legend**:
> ☑︎ = done | ⬜ = pending
