import { ProposalService } from '@/app/PartnershipManagement/Services/proposal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proposal-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './proposal-form.component.html',
  styleUrl: './proposal-form.component.scss'
})
export class ProposalFormComponent implements OnInit {
  proposalForm!: FormGroup;
  proposalId: number | null = null; // Track if editing

  constructor(
    private fb: FormBuilder,
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proposalForm = this.fb.group({
      proposalName: ['', Validators.required],
      proposalDescription: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      plannedAmount: [0, [Validators.required, Validators.min(1)]],
      proposalStatus: ['Pending', Validators.required],
      proposalType: ['', Validators.required],
      user: [''],
    });

    // Check if editing (get proposal ID from URL)
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.proposalId = +id;
        this.loadProposal(this.proposalId);
      }
    });
  }

  loadProposal(id: number): void {
    this.proposalService.getProposalById(id).subscribe(
      (proposal) => {
        this.proposalForm.patchValue(proposal); // Populate form with existing data
      },
      (error) => {
        console.error('Error loading proposal:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.proposalForm.valid) {
      if (this.proposalId) {
        // Editing existing proposal
        this.proposalService.updateProposal(this.proposalId, this.proposalForm.value).subscribe(
          () => {
            console.log('Proposal updated successfully');
            this.router.navigate(['/admin/proposals']); // Redirect after update
          },
          (error) => {
            console.error('Error updating proposal:', error);
          }
        );
      } else {
        // Creating new proposal
        this.proposalService.createProposal(this.proposalForm.value).subscribe(
          () => {
            console.log('Proposal created successfully');
            this.router.navigate(['/admin/proposals']); // Redirect after creation
          },
          (error) => {
            console.error('Error creating proposal:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
