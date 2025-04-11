import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementListFrontComponent } from './agreement-list-front.component';

describe('AgreementListFrontComponent', () => {
  let component: AgreementListFrontComponent;
  let fixture: ComponentFixture<AgreementListFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementListFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreementListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
