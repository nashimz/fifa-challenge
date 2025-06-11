import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTimelineChartComponent } from './skill-timeline-chart.component';

describe('SkillTimelineChartComponent', () => {
  let component: SkillTimelineChartComponent;
  let fixture: ComponentFixture<SkillTimelineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillTimelineChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillTimelineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
