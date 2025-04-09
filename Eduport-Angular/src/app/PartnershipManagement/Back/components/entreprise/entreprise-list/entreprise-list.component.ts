import { Entreprise } from '@/app/PartnershipManagement/Models/Entreprise';
import { EntrepriseService } from '@/app/PartnershipManagement/Services/entreprise.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-entreprise-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './entreprise-list.component.html',
  styleUrl: './entreprise-list.component.scss'
})
export class EntrepriseListComponent implements OnInit {
  entreprises: Entreprise[] = [];
  filteredEntreprises: Entreprise[] = [];
  searchTerm: string = '';

  constructor(private entrepriseService: EntrepriseService , private router:Router) {}

onSubmit() {
throw new Error('Method not implemented.');
}


  ngOnInit(): void {
    this.loadEntreprises();
  }

  loadEntreprises(): void {
    this.entrepriseService.getAllEntreprises().subscribe({
      next: (data) => {
        console.log('Entreprises:', data); // Check if data is received
        this.entreprises = data;
        this.filteredEntreprises = data;
      },
      error: (error) => {
        console.error('Error fetching entreprises:', error);
      }
    });
  }

  filterEntreprises(): void {
    console.log('Search Term:', this.searchTerm); // Debugging
    this.filteredEntreprises = this.entreprises.filter((entreprise) =>
      entreprise.nameEntreprise.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      entreprise.descriptionEntreprise.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log('Filtered Entreprises:', this.filteredEntreprises); // Check filtering result
  }
  
  deleteEntreprise(id: number): void {
    this.entrepriseService.deleteEntreprise(id).subscribe(
      () => {
        this.entreprises = this.entreprises.filter(ent => ent.idEntreprise !== id);
      },
      (error) => {
        console.error('Error deleting entreprise:', error);
      }
    );
  }
  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this entreprise?')) {
      this.entrepriseService.deleteEntreprise(id).subscribe({
        next: () => {
          this.loadEntreprises();
        },
        error: (error) => {
          console.error('Error deleting entreprise:', error);
        }
      });
    }
  }
  /*confirmDelete(idEntreprise: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this entreprise?');
    if (confirmation) {
      this.deleteEntreprise(idEntreprise);
    }
  }*/

  navigateToEntrepriseForm(): void {
    this.router.navigate(['/entreprise-form']);
  }

  
}
