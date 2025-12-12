'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleRef = useRef<any>(null);

  useEffect(() => {
    const loadParticleText = async () => {
      if (canvasRef.current) {
        const particleModule: any = await import('particletext.js');
        const initParticleJS = particleModule.default || particleModule;

        particleRef.current = initParticleJS(canvasRef.current, {
          text: 'Particle Text',
          colors: ['#000000', '#0070f3', '#666666'],
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
    };

    loadParticleText();

    return () => {
      if (particleRef.current && particleRef.current.destroy) {
        particleRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1>ParticleText.js + Next.js</h1>
        <p className={styles.subtitle}>
          Interactive particle text animation built with Next.js
        </p>
        <div className={styles.canvasWrapper}>
          <canvas
            ref={canvasRef}
            width={1200}
            height={400}
            className={styles.particleCanvas}
          />
        </div>
        <div className={styles.info}>
          <p>Move your mouse over the text to interact with the particles!</p>
        </div>
      </div>
    </div>
  );
}
