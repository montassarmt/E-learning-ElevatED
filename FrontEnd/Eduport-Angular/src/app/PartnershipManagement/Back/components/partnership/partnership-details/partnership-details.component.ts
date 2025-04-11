import { AcceptanceStatus } from '@/app/PartnershipManagement/Models/AcceptanceStatus';
import { Assessment } from '@/app/PartnershipManagement/Models/Assessment';
import { Partnership } from '@/app/PartnershipManagement/Models/Partnership';
import { Status } from '@/app/PartnershipManagement/Models/Status';
import { AgreementsService } from '@/app/PartnershipManagement/Services/agreements.service';
import { PartnershipService } from '@/app/PartnershipManagement/Services/partnership.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partnership-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partnership-details.component.html',
  styleUrl: './partnership-details.component.scss'
})
export class PartnershipDetailsComponent implements OnInit {
  partnership!: Partnership; // Store partnership data
  id!: number;
  isFormVisible: boolean = false;  // Flag to control form visibility
  newAssessment: Assessment = {
    idAssessment: 0,
    score: 0,
    feedback: '',
    status: Status.PENDING, // Default value (ensure Status is an enum or valid type)
    acceptanceStatus: AcceptanceStatus.Pending, // Default value (ensure AcceptanceStatus is an enum or valid type)
    adminAcceptance: false,
    partnerAcceptance: false,
    partnership: this.partnership,  // Reference to the current partnership
  }; // Holds the new assessment data
  isAddingAssessment = false;

  constructor(
    private route: ActivatedRoute,
    private partnershipService: PartnershipService,
    private agreementService : AgreementsService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;  // Safely convert to number
    } else {
      // Handle the case where 'id' is not present
      console.error('ID parameter not found in the route');
    }
  }

  ngOnInit(): void {
    // Get ID from the route
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch partnership details
    if (this.id) {
      this.partnershipService.getPartnershipById(this.id).subscribe({
        next: (data) => {
          this.partnership = data;
        },
        error: (err) => {
          console.error('Error fetching partnership details:', err);
        }
      });
    }
  }

  loadPartnershipDetails() {
    // Call your service to get partnership details based on partnershipId
    this.partnershipService.getPartnershipById(this.id).subscribe(
      (data) => {
        this.partnership = data;
      },
      (error) => {
        console.error('Error loading partnership details', error);
      }
    );
  }

  // Method to download the PDF
  downloadPDF() {
    this.partnershipService.generatePartnershipPdf(this.id).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `partnership-details-${this.id}.pdf`; // Set your desired file name here
        link.click();
        window.URL.revokeObjectURL(url);  // Clean up the URL
      },
      (error) => {
        console.error('Error generating PDF', error);
      }
    );
  }

  showForm(): void {
    this.isFormVisible = true;
  }

  // Method to hide the form
  hideForm(): void {
    this.isFormVisible = false;
  }

  toggleAddAssessment(): void {
    this.isAddingAssessment = !this.isAddingAssessment;
  }

  addAssessment(): void {
    if (this.newAssessment.score && this.newAssessment.feedback) {
      if (this.partnership) {  // Check if partnership is not undefined or null
        const partnershipId = this.partnership.idPartnership;
  
        // Call the service to create the assessment
        this.agreementService.createAssessment(this.newAssessment, partnershipId).subscribe(
          (assessment) => {
            // Once the assessment is added, update the partnership's assessments
            if (this.partnership?.Assesements) {  // Safely access Assesements
              this.partnership.Assesements.push(assessment);
            }
            this.isAddingAssessment = false; // Hide the form after adding the assessment
            this.newAssessment = { // Reset the form
              idAssessment: 0,
              score: 0,
              feedback: '',
              status: Status.PENDING,
              acceptanceStatus: AcceptanceStatus.Pending,
              adminAcceptance: false,
              partnerAcceptance: false,
              partnership: this.partnership ?? { idPartnership: 0 }, // Ensure partnership exists
            };
          },
          (error) => {
            console.error('Error adding assessment:', error);
          }
        );
      } else {
        alert('Partnership is not available.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  }
  

}
