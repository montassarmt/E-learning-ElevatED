import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HackathonService, Hackathon } from '@/app/services/hackathon.service';

@Component({
  selector: 'app-edit-hackathon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-hackathon.component.html',
  styleUrls: ['./edit-hackathon.component.scss']
})
export class EditHackathonComponent implements OnInit {
  hackathon: Hackathon = {
    nom: '',
    theme: '',
    description: '',
    dateDebut: '',
    dateFin: ''
  };
  id!: number;

  constructor(
      private hackathonService: HackathonService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.hackathonService.getHackathonById(this.id).subscribe((data) => {
        this.hackathon = data;
      });
    }
  }

  updateHackathon(): void {
    if (this.validateHackathon()) {
      this.hackathonService.updateHackathon(this.id, this.hackathon).subscribe(() => {
        alert('Hackathon modifié avec succès!');
        this.router.navigate(['/instructor/hackathon']);
      });
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  }

  private validateHackathon(): boolean {
    return !!(this.hackathon.nom && this.hackathon.theme && this.hackathon.dateDebut && this.hackathon.dateFin);
  }
}
