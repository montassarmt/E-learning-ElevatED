import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipFormComponent } from './partnership-form.component';

describe('PartnershipFormComponent', () => {
  let component: PartnershipFormComponent;
  let fixture: ComponentFixture<PartnershipFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnershipFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnershipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
