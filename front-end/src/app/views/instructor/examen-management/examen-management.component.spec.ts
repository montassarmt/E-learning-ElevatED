import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenManagementComponent } from './examen-management.component';

describe('ExamenManagementComponent', () => {
  let component: ExamenManagementComponent;
  let fixture: ComponentFixture<ExamenManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamenManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
