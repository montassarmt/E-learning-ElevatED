import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHackathonComponent } from './edit-hackathon.component';

describe('EditHackathonComponent', () => {
  let component: EditHackathonComponent;
  let fixture: ComponentFixture<EditHackathonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHackathonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHackathonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
