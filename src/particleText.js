let ww = window.innerWidth;
let wh = window.innerHeight;

// Cannot use class because I wish to support Internet Explorer.
function initParticleJS(elementSelector, customConfigObject) {
  // The main Object which will be returned exposing the Properties and Methods
  const particleJS = {
    isAnimating: false,
    particleList: [],
  };

  // Validation assert which will stop further execution of the script.
  const assertStop = function (cond, text, dontThrow) {
    if (cond) {
      return;
    }
    if (dontThrow) {
      debugger;
    } else {
      throw new Error(text || 'Something failed!');
    }
  };

  // Ordered list of breakpoints from smallest to largest
  const BREAKPOINTS = [
    { key: 'xxxs', minWidth: 0 },
    { key: 'xxs', minWidth: 320 },
    { key: 'xs', minWidth: 375 },
    { key: 'sm', minWidth: 768 },
    { key: 'md', minWidth: 1024 },
    { key: 'lg', minWidth: 1440 },
    { key: 'xl', minWidth: 2560 },
    { key: 'xxl', minWidth: 3440 },
    { key: 'xxxl', minWidth: 3840 },
  ];

  // This method will return the current breakpoint for better responsive handling.
  const getCurrentBreakpoint = function () {
    const ww = window.innerWidth;
    let breakPoint = 'xxxs';

    for (let i = BREAKPOINTS.length - 1; i >= 0; i--) {
      if (ww >= BREAKPOINTS[i].minWidth) {
        breakPoint = BREAKPOINTS[i].key;
        break;
      }
    }

    return breakPoint;
  };
  // This method can also be exposed using the main object which can be customized and overwritten.
  particleJS.getCurrentBreakpoint = getCurrentBreakpoint;

  // Universal helper to get breakpoint value from config
  const getBreakpointValue = function (configValue, defaultValue, ww) {
    let currentValue = null;
    let lastDefinedValue = null;

    for (let i = 0; i < BREAKPOINTS.length; i++) {
      const bp = BREAKPOINTS[i];

      if (ww >= bp.minWidth) {
        // Check config value
        if (configValue && configValue[bp.key] !== undefined) {
          currentValue = configValue[bp.key];
          lastDefinedValue = currentValue;
        } else if (lastDefinedValue !== null) {
          currentValue = lastDefinedValue;
        } else if (defaultValue && defaultValue[bp.key] !== undefined) {
          currentValue = defaultValue[bp.key];
        }
      }
    }

    return currentValue !== null ? currentValue : defaultValue ? defaultValue.xxxs : null;
  };

  // Calculate the Explosion Radius of the Particles on mouse hover / on Touch Input
  const getExplosionRadius = function (configObject) {
    const defaultExplosionRadius = getDefaultConfig().explosionRadius;
    const configExplosionRadius = configObject.explosionRadius;

    return getBreakpointValue(configExplosionRadius, defaultExplosionRadius, ww);
  };

  // This function is to calculate the radius of a single particle. This also handles the randomness part.
  const getParticleRadius = function (configObject) {
    const configParticleRadius = configObject.particleRadius;
    if (typeof configParticleRadius === 'function') {
      return configParticleRadius();
    }
    const defaultParticleRadius = getDefaultConfig().particleRadius;
    const radiusConfig = getBreakpointValue(configParticleRadius, defaultParticleRadius, ww);

    const radiusBase = radiusConfig.base;
    const radiusRand = radiusConfig.rand;
    const particleRadius = Math.random() * radiusRand + radiusBase;
    return particleRadius;
  };

  // This function is used to calculate the friction of a single particle. This also handles the randomness part.
  const getFriction = function (configObject) {
    const configFriction = configObject.friction;
    if (typeof configFriction === 'function') {
      return configFriction();
    }
    const defaultFriction = getDefaultConfig().friction;
    let frictionBase = defaultFriction.base;
    let frictionRand = defaultFriction.rand;
    if (configFriction !== undefined) {
      frictionBase = configFriction.base;
      frictionRand = configFriction.rand;
    }

    const friction = Math.random() * frictionRand + frictionBase;
    return friction;
  };

  // The default config parameters.
  let getDefaultConfig = function (element) {
    const config = {
      colors: ['#000000'],
      fontWeight: 'bold',
      textAlign: 'center',
      // TODO: Adjust the default Values
      particleRadius: {
        xxxs: {
          base: 1,
          rand: 2,
        },
        xxs: {
          base: 2,
          rand: 1,
        },
        xs: {
          base: 2,
          rand: 1,
        },
        sm: {
          base: 2,
          rand: 1,
        },
        md: {
          base: 2,
          rand: 1,
        },
        lg: {
          base: 2,
          rand: 1,
        },
        xl: {
          base: 2,
          rand: 1,
        },
        xxl: {
          base: 2,
          rand: 1,
        },
        xxxl: {
          base: 2,
          rand: 1,
        },
      },
      // TODO: Adjust the Default Values
      explosionRadius: {
        xxxs: 150,
        xxs: 150,
        xs: 150,
        sm: 150,
        md: 150,
        lg: 150,
        xl: 150,
        xxl: 150,
        xxxl: 150,
      },
      autoAnimate: true,
      friction: {
        base: 0.9,
        rand: 0.05,
      },
      supportSlowBrowsers: false,
      slowBrowserDetected() {},
      renderTimeThreshold: 15,
      maxParticles: 5000,
      trackCursorOnlyInsideCanvas: false,
    };

    if (element !== undefined) {
      config.fontSize = element.height / 2;
    }

    return config;
  };

  // This is used to validate the config object and throw console error if any invalid configuration is found.
  const validateConfig = function (configObject) {
    const errors = [];

    // Validate text
    if (!configObject.text && !element.dataset.text) {
      errors.push("Missing required 'text' property");
    }

    // Validate colors
    if (configObject.colors !== undefined) {
      if (!Array.isArray(configObject.colors)) {
        configObject.colors = [configObject.colors];
      }
      if (configObject.colors.length === 0) {
        errors.push("'colors' array must contain at least one color");
      }
      configObject.colors.forEach(function (color, index) {
        if (typeof color !== 'string' || !/^#[0-9A-F]{6}$/i.test(color)) {
          errors.push(
            `Color at index ${index} ('${color}') is not a valid hex color (format: #RRGGBB)`,
          );
        }
      });
    }

    // Validate particleRadius
    if (configObject.particleRadius !== undefined) {
      if (typeof configObject.particleRadius === 'function') {
        // Function is valid
      } else if (typeof configObject.particleRadius === 'object') {
        const validBreakpoints = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
        for (const bp in configObject.particleRadius) {
          if (!validBreakpoints.includes(bp)) {
            errors.push(
              `Invalid breakpoint '${
                bp
              }' in particleRadius. Valid breakpoints: ${validBreakpoints.join(', ')}`,
            );
          } else {
            const radiusConfig = configObject.particleRadius[bp];
            if (
              typeof radiusConfig !== 'object' ||
              radiusConfig.base === undefined ||
              radiusConfig.rand === undefined
            ) {
              errors.push(`particleRadius.${bp} must have 'base' and 'rand' properties`);
            }
            if (typeof radiusConfig.base !== 'number' || typeof radiusConfig.rand !== 'number') {
              errors.push(`particleRadius.${bp}.base and .rand must be numbers`);
            }
          }
        }
      } else {
        errors.push("'particleRadius' must be either a function or an object with breakpoint keys");
      }
    }

    // Validate explosionRadius
    if (configObject.explosionRadius !== undefined) {
      if (typeof configObject.explosionRadius === 'function') {
        // Function is valid
      } else if (typeof configObject.explosionRadius === 'object') {
        const validBreakpoints = ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
        for (const bp in configObject.explosionRadius) {
          if (!validBreakpoints.includes(bp)) {
            errors.push(
              `Invalid breakpoint '${
                bp
              }' in explosionRadius. Valid breakpoints: ${validBreakpoints.join(', ')}`,
            );
          } else if (typeof configObject.explosionRadius[bp] !== 'number') {
            errors.push(`explosionRadius.${bp} must be a number`);
          }
        }
      } else {
        errors.push(
          "'explosionRadius' must be either a function or an object with breakpoint keys",
        );
      }
    }

    // Validate friction
    if (configObject.friction !== undefined) {
      if (typeof configObject.friction === 'function') {
        // Function is valid
      } else if (typeof configObject.friction === 'object') {
        if (configObject.friction.base === undefined || configObject.friction.rand === undefined) {
          errors.push("'friction' must have 'base' and 'rand' properties");
        }
        if (
          typeof configObject.friction.base !== 'number' ||
          typeof configObject.friction.rand !== 'number'
        ) {
          errors.push('friction.base and friction.rand must be numbers');
        }
      } else {
        errors.push(
          "'friction' must be either a function or an object with 'base' and 'rand' properties",
        );
      }
    }

    // Validate renderTimeThreshold
    if (
      configObject.renderTimeThreshold !== undefined &&
      typeof configObject.renderTimeThreshold !== 'number'
    ) {
      errors.push("'renderTimeThreshold' must be a number");
    }

    // Validate trackCursorOnlyInsideCanvas
    if (
      configObject.trackCursorOnlyInsideCanvas !== undefined &&
      typeof configObject.trackCursorOnlyInsideCanvas !== 'boolean'
    ) {
      errors.push("'trackCursorOnlyInsideCanvas' must be a boolean");
    }

    // Report errors
    if (errors.length > 0) {
      const errorMessage = `ParticleText.js Configuration Errors:\n${errors
        .map(function (e, i) {
          return `  ${i + 1}. ${e}`;
        })
        .join('\n')}`;
      throw new Error(errorMessage);
    }
  };

  let element = document.querySelector(elementSelector);
  assertStop(
    element.tagName.toUpperCase() === 'CANVAS',
    `Required element Canvas, found ${element.tagName}.`,
  );

  const configObject = getDefaultConfig(element);
  for (const key in customConfigObject) {
    configObject[key] = customConfigObject[key];
  }

  // Validate configuration
  validateConfig(configObject);

  // Add accessibility attributes
  element.setAttribute('role', 'img');
  if (customConfigObject && customConfigObject.text) {
    element.setAttribute('aria-label', `Particle animation displaying: ${customConfigObject.text}`);
  } else if (element.dataset.text) {
    element.setAttribute('aria-label', `Particle animation displaying: ${element.dataset.text}`);
  } else {
    element.setAttribute('aria-label', 'Particle text animation');
  }

  let { text } = element.dataset;
  if (configObject.text !== undefined) {
    text = configObject.text;
  }
  assertStop(text !== undefined, 'There is no text passed, Check Documentation.');

  // Sanitize text to prevent potential XSS issues
  // Convert to string and remove any HTML tags
  text = String(text).replace(/[<>]/g, '');

  if (!Array.isArray(configObject.colors)) {
    configObject.colors = [configObject.colors];
  }

  assertStop(configObject.colors.length != 0, 'Atleast 1 color should be present');
  configObject.colors.forEach(function validateHex(element) {
    assertStop(/^#[0-9A-F]{6}$/i.test(element), `The color ${element} is not valid.`);
  });

  let slowBrowser = false;
  let isTested = false;
  let scaleToFit = 3;
  let ctx = element.getContext('2d');
  let particles = [];
  let amount = 0;
  const mouse = { x: -9999, y: -9999 };
  let radius = getExplosionRadius(configObject);

  // Performance monitoring for periodic slow browser detection
  let performanceCheckCount = 0;
  let lastPerformanceCheck = 0;
  let performanceCheckInterval = 2000; // 2 seconds initially

  // Main Particle Class
  class Particle {
    constructor(x, y) {
      this.x = Math.random() * element.width;
      this.y = Math.random() * element.height;
      this.vx = (Math.random() - 0.5) * 10;
      this.vy = (Math.random() - 0.5) * 10;
      const rand = Math.random();
      this.dest = { x, y };
      this.r = getParticleRadius(configObject);

      if (slowBrowser) {
        if (ww <= 2048) {
          this.r = 1;
        } else if (ww <= 3000) {
          this.r = rand * 1 + 2;
        } else {
          this.r = rand * 2 + 2;
        }
      }

      this.accX = 0;
      this.accY = 0;
      this.friction = getFriction(configObject);
      if (slowBrowser) {
        this.friction /= 1.1;
      }

      this.color = configObject.colors[Math.floor(Math.random() * configObject.colors.length)];
    }

    // Rended method
    render() {
      this.accX = (this.dest.x - this.x) / 100;
      this.accY = (this.dest.y - this.y) / 100;
      if (slowBrowser) {
        this.accX *= 8;
        this.accY *= 8;
      }
      this.vx += this.accX;
      this.vy += this.accY;
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.x += this.vx;
      this.y += this.vy;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(Math.floor(this.x), Math.floor(this.y), Math.floor(this.r), Math.PI * 2, false);
      ctx.fill();

      // Exploding logic on Mouse Move
      const a = this.x - mouse.x;
      const b = this.y - mouse.y;
      const distance = Math.sqrt(a * a + b * b);
      if (distance < radius) {
        this.accX = (this.x - mouse.x) / 10;
        this.accY = (this.y - mouse.y) / 10;
        if (slowBrowser) {
          this.accX *= 4;
          this.accY *= 4;
        }
        this.vx += this.accX;
        this.vy += this.accY;
      }
    }
  }

  // Change mouse pointers on mouse movement
  function onMouseMove(e) {
    const rect = element.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    // Check if cursor tracking should be restricted to canvas bounds
    if (configObject.trackCursorOnlyInsideCanvas) {
      if (relativeX < 0 || relativeX > rect.width || relativeY < 0 || relativeY > rect.height) {
        mouse.x = -9999;
        mouse.y = -9999;
        return;
      }
    }

    mouse.x = relativeX * (element.width / rect.width);
    mouse.y = relativeY * (element.height / rect.height);
    if (slowBrowser) {
      mouse.x /= scaleToFit;
      mouse.y /= scaleToFit;
    }
  }

  // Handling for touch inputs. Take only first touch. (For multi touch devices)
  function onTouchMove(e) {
    if (e.touches.length > 0) {
      const rect = element.getBoundingClientRect();
      const relativeX = e.touches[0].clientX - rect.left;
      const relativeY = e.touches[0].clientY - rect.top;

      // Check if cursor tracking should be restricted to canvas bounds
      if (configObject.trackCursorOnlyInsideCanvas) {
        if (relativeX < 0 || relativeX > rect.width || relativeY < 0 || relativeY > rect.height) {
          mouse.x = -9999;
          mouse.y = -9999;
          return;
        }
      }

      mouse.x = relativeX * (element.width / rect.width);
      mouse.y = relativeY * (element.height / rect.height);
      if (slowBrowser) {
        mouse.x /= scaleToFit;
        mouse.y /= scaleToFit;
      }
    }
  }

  // For touch devices - Need to reset when finger is lifted.
  function onTouchEnd(e) {
    mouse.x = -9999;
    mouse.y = -9999;
  }

  // Initialization Function
  function initScene() {
    ww = window.innerWidth;
    wh = window.innerHeight;

    ctx.clearRect(0, 0, element.width, element.height);

    // Fill canvas with text (Temporarily!)
    ctx.font = `${configObject.fontWeight} ${configObject.fontSize}px sans-serif`;
    ctx.textAlign = configObject.textAlign;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, element.width / 2, element.height / 2);

    // Take snapshot and clear canvas
    const { data } = ctx.getImageData(0, 0, element.width, element.height);
    ctx.clearRect(0, 0, element.width, element.height);
    ctx.globalCompositeOperation = 'screen';

    // Let the fun games begin!
    particles = [];
    for (let i = 0; i < element.width; i += Math.round(element.width / 150)) {
      for (let j = 0; j < wh; j += Math.round(element.height / 150)) {
        if (data[(i + j * element.width) * 4 + 3] > 150) {
          particles.push(new Particle(i, j));
          // Cap particles for performance
          if (particles.length >= configObject.maxParticles) {
            break;
          }
        }
      }
      // Break outer loop too if max reached
      if (particles.length >= configObject.maxParticles) {
        break;
      }
    }
    amount = particles.length; // For easy tracking and looping
  }

  // Event Looooooooooooop
  function render(a) {
    try {
      animationFrameId = requestAnimationFrame(render);

      const now = performance.now();
      let shouldCheckPerformance = false;

      // Initial test
      if (!isTested) {
        shouldCheckPerformance = true;
      }
      // Periodic checks: every 2s for first 10s, then every 30s
      else if (now - lastPerformanceCheck > performanceCheckInterval) {
        shouldCheckPerformance = true;
        performanceCheckCount += 1;

        // After 5 checks (10 seconds), switch to 30 second intervals
        if (performanceCheckCount >= 5) {
          performanceCheckInterval = 30000;
        }
      }

      let t0 = 0;
      if (shouldCheckPerformance) {
        t0 = performance.now();
      }

      ctx.clearRect(0, 0, element.width, element.height);
      for (let i = 0; i < amount; i++) {
        particles[i].render();
      }

      if (shouldCheckPerformance) {
        const t1 = performance.now();
        lastPerformanceCheck = t1;

        if (t1 - t0 > configObject.renderTimeThreshold) {
          if (!slowBrowser) {
            slowBrowser = true;
            browserIsSlow();
          }
        }
        isTested = true;
      }
    } catch (error) {
      // Stop animation on error
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      particleJS.isAnimating = false;

      // Call error callback if defined
      if (typeof configObject.onError === 'function') {
        configObject.onError(error);
      } else {
        console.error('ParticleText.js error:', error);
      }
    }
  }

  function browserIsSlow() {
    if (slowBrowser) {
      if (ww <= 320) {
        scaleToFit = 1;
      }
      element.width = ww / scaleToFit;
      element.height = wh / scaleToFit;
      element.style.transformOrigin = '0 0'; // Scale from the Top left corner
      element.style.transform = `scale(${scaleToFit})`;
      radius = 170 / (2 * scaleToFit);
      ctx = element.getContext('2d');
      particles = [];
      amount = 0;

      // Conditions for Responsiveness
      if (ww <= 320) {
        radius = 25 / (scaleToFit * 2);
      } else if (ww <= 375) {
        radius = 20 / (scaleToFit * 2);
      } else if (ww <= 768) {
        radius = 60 / (scaleToFit * 2);
      } else if (ww <= 1024) {
        radius = 80 / (scaleToFit * 2);
      } else if (ww <= 1440) {
        radius = 100 / (scaleToFit * 2);
      } else if (ww <= 2048) {
        radius = 140 / (scaleToFit * 2);
      }

      // document.getElementById('slowBrowserMessage').style.display = "initial";
      // This check can be removed once the custom config object validation is in place
      if (typeof configObject.slowBrowserDetected === 'function') {
        configObject.slowBrowserDetected();
      }
      initScene();
    }
  }

  // Initialize and Render
  window.addEventListener('resize', initScene);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('touchend', onTouchEnd);
  initScene();

  let animationFrameId = null;

  // Check for prefers-reduced-motion
  let prefersReducedMotion = false;
  if (window.matchMedia) {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = motionQuery.matches;
  }

  if (configObject.autoAnimate && !prefersReducedMotion) {
    particleJS.isAnimating = true;
    animationFrameId = requestAnimationFrame(render);
  }

  particleJS.startAnimation = function () {
    if (!particleJS.isAnimating) {
      particleJS.isAnimating = true;
      animationFrameId = requestAnimationFrame(render);
    }
  };

  particleJS.forceRequestAnimationFrame = function () {
    animationFrameId = requestAnimationFrame(render);
  };

  particleJS.destroy = function () {
    // Cancel animation frame
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    particleJS.isAnimating = false;

    // Remove all event listeners
    window.removeEventListener('resize', initScene);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);

    // Clear canvas
    ctx.clearRect(0, 0, element.width, element.height);

    // Clear particles array
    particles = [];
    amount = 0;
  };

  return particleJS;
}

// Namespace global export / provide module export
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  // CommonJS/Node.js
  module.exports = initParticleJS;
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define(function () {
    return initParticleJS;
  });
} else {
  // Browser global
  if (typeof window.ParticleText === 'undefined') {
    window.ParticleText = {};
  }
  window.ParticleText.init = initParticleJS;
  // Backward compatibility
  window.initParticleJS = initParticleJS;
}
