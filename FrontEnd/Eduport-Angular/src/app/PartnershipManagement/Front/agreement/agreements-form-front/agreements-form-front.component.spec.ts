import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementsFormFrontComponent } from './agreements-form-front.component';

describe('AgreementsFormFrontComponent', () => {
  let component: AgreementsFormFrontComponent;
  let fixture: ComponentFixture<AgreementsFormFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementsFormFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreementsFormFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
