import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementsFormComponent } from './agreements-form.component';

describe('AgreementsFormComponent', () => {
  let component: AgreementsFormComponent;
  let fixture: ComponentFixture<AgreementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
