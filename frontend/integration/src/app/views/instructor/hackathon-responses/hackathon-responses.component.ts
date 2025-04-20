import { Component, OnInit } from '@angular/core';
import { HackathonService, Hackathon } from '@/app/services/hackathon.service';
import { SoumissionService, Soumission } from '@/app/services/soumission.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hackathon-responses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hackathon-responses.component.html',
  styleUrls: ['./hackathon-responses.component.scss']
})
export class HackathonResponsesComponent implements OnInit {
  hackathons: Hackathon[] = [];
  selectedHackathonId!: number;
  soumissions: Soumission[] = [];

  constructor(
    private hackathonService: HackathonService,
    private soumissionService: SoumissionService
  ) {}

  ngOnInit(): void {
    this.hackathonService.getAllHackathons().subscribe((data) => {
      this.hackathons = data;
    });
  }
  loadResponses(): void {
    if (!this.selectedHackathonId) return;

    this.soumissionService.getSoumissionsByHackathon(this.selectedHackathonId).subscribe({
      next: (data) => {
        this.soumissions = data;
      },
      error: (err) => {
        console.error('❌ Erreur récupération des soumissions :', err);
      }
    });
  }
  corrigerSoumission(s: Soumission) {
    s.enCorrection = true;
  }

  annulerCorrection(s: Soumission) {
    s.enCorrection = false;
  }

  validerCorrection(s: Soumission) {
    this.soumissionService.noterSoumission(s.id!, s.note!).subscribe({
      next: () => {
        s.enCorrection = false;
        alert('✅ Note enregistrée avec succès');
      },
      error: (err) => {
        console.error('❌ Erreur enregistrement note', err);
        alert('Erreur lors de la sauvegarde');
      }
    });
  }



}
