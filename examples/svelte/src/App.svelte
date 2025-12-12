<script>
  import { onMount, onDestroy } from 'svelte';
  import initParticleJS from 'particletext.js';

  let canvas;
  let particleInstance;

  onMount(() => {
    if (canvas) {
      particleInstance = initParticleJS(canvas, {
        text: 'Particle Text',
        colors: ['#FF3E00', '#40B3FF', '#676778'],
        fontSize: 80,
        particleRadius: {
          xxxs: { base: 1, rand: 1 },
          sm: { base: 1.5, rand: 1 },
          md: { base: 2, rand: 1 },
        },
        explosionRadius: {
          xxxs: 40,
          sm: 60,
          md: 80,
          lg: 100,
        },
      });
    }
  });

  onDestroy(() => {
    if (particleInstance && particleInstance.destroy) {
      particleInstance.destroy();
    }
  });
</script>

<div class="app">
  <div class="container">
    <h1>ParticleText.js + Svelte</h1>
    <p class="subtitle">Interactive particle text animation built with Svelte</p>
    <div class="canvas-wrapper">
      <canvas
        bind:this={canvas}
        width="1200"
        height="400"
        class="particle-canvas"
      ></canvas>
    </div>
    <div class="info">
      <p>Move your mouse over the text to interact with the particles!</p>
    </div>
  </div>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .container {
    max-width: 1400px;
    width: 100%;
    text-align: center;
  }

  h1 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .canvas-wrapper {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    margin-bottom: 2rem;
  }

  .particle-canvas {
    width: 100%;
    height: auto;
    display: block;
    max-width: 100%;
  }

  .info {
    color: white;
    font-size: 1rem;
    opacity: 0.9;
  }

  .info p {
    margin: 0.5rem 0;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 0.95rem;
    }

    .canvas-wrapper {
      padding: 15px;
    }
  }
</style>
