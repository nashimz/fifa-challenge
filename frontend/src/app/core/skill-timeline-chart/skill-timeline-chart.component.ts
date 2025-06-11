import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-skill-timeline-chart',
  standalone: true,
  imports: [NgIf],
  template: ` <canvas id="skillTimelineChart" *ngIf="isBrowser"></canvas> `,
  styleUrls: ['./skill-timeline-chart.component.scss'],
})
export class SkillTimelineChartComponent implements OnChanges {
  @Input() timelineData: {
    [skill: string]: { fifa_version: number; value: number }[];
  } = {};
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isBrowser && changes['timelineData'] && this.timelineData) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    const ctx = (
      document.getElementById('skillTimelineChart') as HTMLCanvasElement
    )?.getContext('2d');

    if (!ctx) return;

    const skills = Object.keys(this.timelineData);
    if (skills.length === 0) return;

    const labels = this.timelineData[skills[0]].map((entry) =>
      entry.fifa_version.toString()
    );

    const datasets = skills.map((skill, index) => ({
      label: skill.charAt(0).toUpperCase() + skill.slice(1),
      data: this.timelineData[skill].map((entry) => entry.value),
      borderColor: this.getColor(index),
      backgroundColor: 'white',
      tension: 0.3,
    }));

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white',
              font: { size: 14 },
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'FIFA Version', color: 'white' },
            ticks: { color: 'white' },
          },
          y: {
            title: { display: true, text: 'Skill Value', color: 'white' },
            min: 0,
            max: 100,
            ticks: { color: 'white' },
          },
        },
      },
    });
  }

  private getColor(index: number): string {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[index % colors.length];
  }
}
