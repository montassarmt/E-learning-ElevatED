import { Entreprise } from '@/app/PartnershipManagement/Models/Entreprise';
import { EntrepriseService } from '@/app/PartnershipManagement/Services/entreprise.service';
import { PartnershipService } from '@/app/PartnershipManagement/Services/partnership.service';
import { ProposalService } from '@/app/PartnershipManagement/Services/proposal.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-partnership-form',
   standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './partnership-form.component.html',
  styleUrls: ['./partnership-form.component.scss'],
})
export class PartnershipFormComponent implements OnInit {
  partnershipForm!: FormGroup;
  entreprises: any[] = [];
  proposals: any[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private partnershipService: PartnershipService,
    private entrepriseService: EntrepriseService,
    private proposalService: ProposalService,
    private router: Router  // Assuming EntrepriseService is provided in the parent component
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadEntreprises();
    this.loadProposals();
  }

  // Initialize the form
  initForm(): void {
    this.partnershipForm = this.fb.group({
      entreprise: [null, Validators.required],
      proposals: [null, Validators.required]
    });
  }

  // Load entreprises from the API
  loadEntreprises(): void {
    this.entrepriseService.getAllEntreprises().subscribe({
      next: (data) => {
        console.log('Entreprises:', data); // Check if data is received
        this.entreprises = data;
    }});
  }

  // Load proposals from the API
  loadProposals(): void {
    this.proposalService.getAllProposals().subscribe({
      next: (data: any) => {
        console.log('Proposals:', data);  // Log the data
        this.proposals = data;
      }
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.partnershipForm.valid) {
      const entrepriseId = this.partnershipForm.value.entreprise;
      const proposalId = this.partnershipForm.value.proposals;
  
      // Set loading state
      this.isSubmitting = true;
  
      // Call the applyForPartnership method from the service
      this.partnershipService.applyForPartnership(entrepriseId, proposalId).subscribe({
        next: (response) => {
          this.isSubmitting = false; // Reset loading state
          console.log('Partnership application submitted successfully:', response);
          alert('Your partnership application has been submitted!');
          
          // Navigate to the Proposal page after successful submission
          this.router.navigate(['/proposalf']); // Adjust the route if needed
  
          this.partnershipForm.reset(); // Optionally, reset the form after submission
        },
        error: (error) => {
          this.isSubmitting = false; // Reset loading state
          console.error('Error submitting partnership application:', error);
          alert('There was an error submitting your application. Please try again.');
        }
      });
    }
  }
}
