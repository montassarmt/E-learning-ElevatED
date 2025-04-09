import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EntrepriseService } from '@/app/PartnershipManagement/Services/entreprise.service';
import { CommonModule } from '@angular/common';
import { User } from '@/app/core/helpers/user';

@Component({
  selector: 'app-entreprise-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl:'./entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss']
})
export class EntrepriseFormComponent implements OnInit {
  entrepriseForm!: FormGroup;
  entrepriseId: number | null = null;
  isEditMode = false;
  isLoading = false; // Track form loading state
  errorMessage: string | null = null; // Track errors
  selectedPartner!: User; // Add this property to bind the selected partner
  partners: User[] = [];

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.entrepriseForm = this.fb.group({
      nameEntreprise: ['', [Validators.required, Validators.minLength(3)]],
      addressEntreprise: ['', [Validators.required, Validators.minLength(5)]],
      phoneEntreprise: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      emailEntreprise: ['', [Validators.required, Validators.email]],
      descriptionEntreprise: ['', Validators.minLength(10)]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.entrepriseId = +id;
        this.isEditMode = true;
        this.loadEntrepriseData(this.entrepriseId); // Fetch the entreprise data
      }
    });
  }

  // Function to load entreprise data
  loadEntrepriseData(id: number): void {
    this.entrepriseService.getEntrepriseById(id).subscribe({
      next: (entreprise) => {
        // Populate the form with the existing entreprise data
        this.entrepriseForm.patchValue(entreprise);
      },
      error: (err) => {
        console.error('Error loading entreprise:', err);
      }
    });
  }
  onSubmit() {
    if (this.entrepriseForm.invalid) return;
    this.isLoading = true;

    const entrepriseData = this.entrepriseForm.value;

    if (this.isEditMode && this.entrepriseId) {
      this.entrepriseService.updateEntreprise(this.entrepriseId, entrepriseData).subscribe({
        next: () => {
          this.router.navigate(['/admin/entreprises']);
        },
        error: () => {
          this.errorMessage = 'Failed to update entreprise.';
          this.isLoading = false;
        },
      });
    } else {
      this.entrepriseService.createEntreprise(entrepriseData).subscribe({
        next: () => {
          this.entrepriseForm.reset();
          this.router.navigate(['/admin/entreprises']);
        },
        error: () => {
          this.errorMessage = 'Failed to create entreprise.';
          this.isLoading = false;
        },
      });
    }
  }
}
