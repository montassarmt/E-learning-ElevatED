import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoachingComponent } from './edit-coaching.component';

describe('EditCoachingComponent', () => {
  let component: EditCoachingComponent;
  let fixture: ComponentFixture<EditCoachingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCoachingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
