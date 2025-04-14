
import {Component, OnInit} from "@angular/core";
import {CoachingService, SeanceCoaching} from "@/app/services/coaching.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-add-coaching',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  minDate: string = '';

  constructor(private seanceService: CoachingService, private router: Router) {}

  ngOnInit() {
    const now = new Date();
    this.minDate = now.toISOString().slice(0, 16); // format YYYY-MM-DDTHH:mm
  }

  onDateDebutChange(): void {
    // Optional: reset dateFin if it's older than dateDebut
    if (this.newSeance.dateFin && this.newSeance.dateFin < this.newSeance.dateDebut) {
      this.newSeance.dateFin = this.newSeance.dateDebut;
    }
  }

  addSeance(): void {
    if (!this.validateSeance()) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }

    this.seanceService.createSeance(this.newSeance).subscribe(() => {
      alert('Séance de coaching ajoutée avec succès!');
      this.router.navigate(['/instructor/coaching']);
    });
  }

  private validateSeance(): boolean {
    const { nom, dateDebut, dateFin } = this.newSeance;
    return (
        !!nom &&
        !!dateDebut &&
        !!dateFin &&
        new Date(dateDebut) >= new Date(this.minDate) &&
        new Date(dateFin) >= new Date(dateDebut)
    );
  }
}
