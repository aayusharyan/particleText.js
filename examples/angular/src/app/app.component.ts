import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private particleInstance: any;

  async ngOnInit(): Promise<void> {
    if (this.canvasRef?.nativeElement) {
      // Dynamic import to handle module loading
      const particleModule: any = await import('particletext.js');
      const initParticleJS = particleModule.default || particleModule;

      this.particleInstance = initParticleJS(this.canvasRef.nativeElement, {
        text: 'Particle Text',
        colors: ['#DD0031', '#C3002F', '#1976D2'],
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
  }

  ngOnDestroy(): void {
    if (this.particleInstance && this.particleInstance.destroy) {
      this.particleInstance.destroy();
    }
  }
}
