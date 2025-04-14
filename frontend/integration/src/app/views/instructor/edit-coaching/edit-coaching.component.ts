import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachingService, SeanceCoaching } from '@/app/services/coaching.service';

@Component({
  selector: 'app-edit-coaching',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-coaching.component.html',
  styleUrls: ['./edit-coaching.component.scss']
})
export class EditCoachingComponent implements OnInit {
  seance: SeanceCoaching = {
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    lienMeet: ''
  };
  id!: number;

  constructor(
      private coachingService: CoachingService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.coachingService.getSeanceById(this.id).subscribe((data) => {
        this.seance = data;
      });
    }
  }

  updateSeance(): void {
    if (this.validateSeance()) {
      this.coachingService.updateSeance(this.id, this.seance).subscribe(() => {
        alert('Séance modifiée avec succès !');
        this.router.navigate(['/instructor/coaching']);
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  private validateSeance(): boolean {
    return !!(this.seance.nom && this.seance.description && this.seance.dateDebut && this.seance.dateFin);
  }
}
