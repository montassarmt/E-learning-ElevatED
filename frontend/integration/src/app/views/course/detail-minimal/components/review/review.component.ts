import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Feedback } from '../../../../../models/feedback'; 
import { FeedbackService } from '../../../../../services/feedbackservice';
import { NgbRatingModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'minimal-review',
  standalone: true,
  imports: [NgbRatingModule, NgbProgressbarModule, ReactiveFormsModule, CommonModule],
  templateUrl: './review.component.html',
  styles: `
    .audio-controls {
      margin-top: 10px;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .recording-indicator {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: red;
      border-radius: 50%;
      margin-right: 5px;
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.3; }
      100% { opacity: 1; }
    }
  `
})
export class ReviewComponent {
  @ViewChild('audioUpload') audioUpload!: ElementRef;
  feedbackForm: FormGroup;
  isRecording = false;
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  audioBlob: Blob | null = null;
  audioUrl: string | null = null;
  recordingTime = 0;
  recordingTimer: any;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      comments: [''], // Start without required
      //comments: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      feedbackType: ['TEXT', Validators.required],
      audioFile: [null], // For file upload
      userId: [null, Validators.required]
    });
  }

  onFeedbackTypeChange() {
    if (this.feedbackForm.get('feedbackType')?.value !== 'AUDIO') {
      this.clearAudio();
    }
  }

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
    this.isRecording = !this.isRecording;
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };
      
      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
        this.audioUrl = URL.createObjectURL(this.audioBlob);
        stream.getTracks().forEach(track => track.stop());
        clearInterval(this.recordingTimer);
        this.recordingTime = 0;
      };
      
      this.mediaRecorder.start();
      this.startRecordingTimer();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access denied. Please allow microphone access to record audio.');
    }
  }

  startRecordingTimer() {
    this.recordingTime = 0;
    this.recordingTimer = setInterval(() => {
      this.recordingTime++;
    }, 1000);
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.audioBlob = input.files[0];
      this.audioUrl = URL.createObjectURL(this.audioBlob);
    }
  }

  clearAudio() {
    this.audioUrl = null;
    this.audioBlob = null;
    if (this.audioUpload) {
      this.audioUpload.nativeElement.value = '';
    }
    if (this.isRecording) {
      this.stopRecording();
      this.isRecording = false;
    }
    clearInterval(this.recordingTimer);
    this.recordingTime = 0;
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      return;
    }

    const feedback: Feedback = this.feedbackForm.value;
    
    if (feedback.feedbackType === 'AUDIO') {
      if (!this.audioBlob) {
        alert('Please record or upload an audio file for audio feedback');
        return;
      }

      const formData = new FormData();
      formData.append('audio', this.audioBlob);
      formData.append('feedback', JSON.stringify({
        comments: feedback.comments,
        rating: feedback.rating,
        feedbackType: feedback.feedbackType,
        userId: feedback.userId
      }));

      this.feedbackService.createFeedbackWithAudio(this.audioBlob,formData).subscribe({
        next: (response) => {
          console.log('Audio feedback created:', response); 
          this.feedbackForm.reset({
            rating: 5,
            feedbackType: 'TEXT'
          });
          this.clearAudio();
        },
        error: (error) => {
          console.error('Error creating audio feedback:', error);
        }
      });
    } else {
      this.feedbackService.createFeedback(feedback).subscribe({
        next: (response) => {
          console.log('Feedback created:', response);
          this.feedbackForm.reset({
            rating: 5,
            feedbackType: 'TEXT'
          });
        },
        error: (error) => {
          console.error('Error creating feedback:', error);
        }
      });
    }
  }
}