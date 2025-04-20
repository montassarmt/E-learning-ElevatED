import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackathonResponsesComponent } from './hackathon-responses.component';

describe('HackathonResponsesComponent', () => {
  let component: HackathonResponsesComponent;
  let fixture: ComponentFixture<HackathonResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackathonResponsesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackathonResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
