import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Partnership } from '@/app/PartnershipManagement/Models/Partnership';
import { Assessment } from '@/app/PartnershipManagement/Models/Assessment';
import { AcceptanceStatus } from '@/app/PartnershipManagement/Models/AcceptanceStatus';
import { Status } from '@/app/PartnershipManagement/Models/Status';
import { AgreementsService } from '@/app/PartnershipManagement/Services/agreements.service';
import { PartnershipService } from '@/app/PartnershipManagement/Services/partnership.service';

@Component({
  selector: 'app-partnership-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partnership-details.component.html',
  styleUrl: './partnership-details.component.scss'
})
export class PartnershipDetailsComponent implements OnInit {

  partnership: Partnership | undefined; // Marked as possibly undefined
  assessments: Assessment[] = [];

  id!: number;
  showAdd = false;
  newFeedback: string = '';


  adminButtonDisabled: boolean = false;
  partnerButtonDisabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private partnershipService: PartnershipService,
    private agreementService: AgreementsService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
    } else {
      console.error('ID parameter not found in the route');
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadPartnershipDetails();
      this.loadAssessments();
    }
  }

  loadPartnershipDetails(): void {
    this.partnershipService.getPartnershipById(this.id).subscribe(
      (data) => {
        this.partnership = data;
        this.assessments = data?.Assesements ?? []; // Ensures it's an empty array if undefined
      },
      (error) => {
        console.error('Error loading partnership details', error);
      }
    );
  }

  loadAssessments(): void {
    this.agreementService.getAssessmentsByPartnershipId(this.id).subscribe({
      next: (data) => {
        this.assessments = data;
      },
      error: (err) => {
        console.error('Error loading assessments:', err);
      }
    });
  } 

  saveAgreement(): void {
    const trimmedFeedback = this.newFeedback.trim();
    if (!trimmedFeedback) {
      alert('Agreement cannot be empty.');
      return;
    }

    if (!this.partnership) {
      alert('Partnership not found!');
      return;
    }

    const newAssessment: Assessment = {
      idAssessment: 0,
      score: 0,
      feedback: trimmedFeedback,
      status: Status.Pending,
      acceptanceStatus: AcceptanceStatus.Pending,
      adminAcceptance: false,
      partnerAcceptance: false,
      partnership: this.partnership // Now TypeScript will be sure it's defined
    };

    this.agreementService.createAssessment(newAssessment, this.partnership.idPartnership).subscribe(
      (createdAssessment) => {
        this.assessments.push(createdAssessment);
        this.newFeedback = '';
        this.showAdd = false;
      },
      (error) => {
        console.error('Error saving agreement:', error);
        if (error.error && error.error.message) {
          alert(error.error.message); // Display any error message sent from the backend
        }
      }
   );
  }

  downloadPDF(): void {
    if (!this.partnership) {
      console.error('Partnership not available for download.');
      return;
    }

    this.partnershipService.generatePartnershipPdf(this.id).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `partnership-details-${this.id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error generating PDF', error);
      }
    );
  }


  // assessment-list.component.ts
// Updated onAdminDecision and onPartnerDecision methods to ensure correct handling
onAdminDecision(id: number, status: 'Accept' | 'Reject') {
  this.adminButtonDisabled = true;  // Disable the admin button after click
  this.agreementService.updateStatusAdmin(id, status).subscribe({
    next: res => {
      console.log('Admin status updated:', res);
      // Optionally reload list or update UI
    },
    error: err => {
      console.error('Error updating admin status:', err);
      this.adminButtonDisabled = false;  // Re-enable if there is an error
    }
  });
}

// Update the partner status
onPartnerDecision(id: number, status: 'Accept' | 'Reject') {
  this.partnerButtonDisabled = true;  // Disable the partner button after click
  this.agreementService.updateStatusPartner(id, status).subscribe({
    next: res => {
      console.log('Partner status updated:', res);
      // Optionally reload list or update UI
    },
    error: err => {
      console.error('Error updating partner status:', err);
      this.partnerButtonDisabled = false;  // Re-enable if there is an error
    }
  });
}

getAcceptanceStatusClass(status: string): string {
  switch (status) {
    case 'Approved':
      return 'status-approved';
    case 'Pending':
      return 'status-pending';
    case 'Rejected':
      return 'status-rejected';
    default:
      return '';
  }}

  markAsCompleted(id: number) {
    this.agreementService.markAsCompleted(id).subscribe({
      next: (updatedAssessment) => {
        // Find the assessment in the array and update its status & score
        const index = this.assessments.findIndex(a => a.idAssessment === id);
        if (index !== -1) {
          this.assessments[index].status = updatedAssessment.status;
          this.assessments[index].score = updatedAssessment.score;
        }
      },
      error: (error) => {
        console.error('Error updating assessment:', error);
      }
    });
  }
  
  
    
    
    
  
  
}
