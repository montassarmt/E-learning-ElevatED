import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {Router} from "@angular/router";
import {CoachingService, SeanceCoaching} from "@/app/services/coaching.service";


@Component({
  selector: 'app-add-coaching',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './add-coaching.component.html',
  styleUrl: './add-coaching.component.scss'
})
export class AddCoachingComponent implements OnInit {
  newSeance: SeanceCoaching = {
    nom: '',
    description: '',
    dateDebut: '',
    dateFin: ''
  };

  constructor(private seanceService: CoachingService, private router: Router) {}

  ngOnInit() {}

  addSeance(): void {
    if (this.validateSeance()) {
      this.seanceService.createSeance(this.newSeance).subscribe(() => {
        alert('Séance de coaching ajoutée avec succès!');
        this.router.navigate(['/seances']); // redirection
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  private validateSeance(): boolean {
    return !!(this.newSeance.nom && this.newSeance.dateDebut && this.newSeance.dateFin);
  }
}
