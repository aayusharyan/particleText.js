import { useEffect, useRef } from 'react';
import initParticleJS from 'particletext.js';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const particleRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      particleRef.current = initParticleJS(canvasRef.current, {
        text: 'Particle Text',
        colors: ['#61DAFB', '#282C34', '#20232A'],
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

    return () => {
      if (particleRef.current && particleRef.current.destroy) {
        particleRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1>ParticleText.js + React</h1>
        <p className="subtitle">Interactive particle text animation built with React</p>
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={1200}
            height={400}
            className="particle-canvas"
          />
        </div>
        <div className="info">
          <p>Move your mouse over the text to interact with the particles!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
