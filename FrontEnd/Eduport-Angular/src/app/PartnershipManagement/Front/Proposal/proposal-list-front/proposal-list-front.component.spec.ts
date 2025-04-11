import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalListFrontComponent } from './proposal-list-front.component';

describe('ProposalListFrontComponent', () => {
  let component: ProposalListFrontComponent;
  let fixture: ComponentFixture<ProposalListFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalListFrontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
