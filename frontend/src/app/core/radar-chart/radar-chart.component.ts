import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';

// Register all required Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [CommonModule],
  template: ` <canvas id="radarChart" *ngIf="isBrowser"></canvas> `,
  styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent implements OnChanges {
  @Input() attributes: { name: string; value: number }[] = [];
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isBrowser && changes['attributes'] && this.attributes.length > 0) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    const ctx = (
      document.getElementById('radarChart') as HTMLCanvasElement
    )?.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: this.attributes.map((attr) => attr.name),
          datasets: [
            {
              label: 'Player Attributes',
              data: this.attributes.map((attr) => attr.value),
              backgroundColor: 'rgba(255, 102, 0, 0.6)',
              borderColor: 'rgb(231, 131, 0)',
              borderWidth: 2,
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: 'white', // Set "Player Attributes" label to white
                font: {
                  size: 14,
                  weight: 'bold',
                },
              },
            },
          },
          scales: {
            r: {
              pointLabels: {
                font: {
                  size: 12,
                  weight: 'bold',
                },
                color: 'white',
              },
              ticks: {
                color: 'white', // Change number color to white (or any other color)
                font: {
                  size: 12,
                  weight: 'bold',
                },
              },
            },
          },
        },
      });
    }
  }
}
