import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from '../../../../../services/feedbackservice';
import { NgbRatingModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewComponent, ReactiveFormsModule, NgbRatingModule, NgbProgressbarModule],
      providers: [FormBuilder, FeedbackService]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});