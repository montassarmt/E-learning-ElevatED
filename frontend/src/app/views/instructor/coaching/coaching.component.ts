import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {CoachingService, SeanceCoaching} from "@/app/services/coaching.service";

@Component({
  selector: 'app-coaching',
  standalone: true,
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class CoachingComponent implements OnInit {
  seances: SeanceCoaching[] = [];

  constructor(
      private seanceService: CoachingService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSeances();
  }

  loadSeances(): void {
    this.seanceService.getAllSeances().subscribe((data: SeanceCoaching[]) => {
      this.seances = data;
    });
  }

  deleteSeance(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette séance ?')) {
      this.seanceService.deleteSeance(id).subscribe(() => {
        this.seances = this.seances.filter(s => s.id !== id);
      });
    }
  }

  navigateToAdd(): void {
    this.router.navigate(['/add-coaching']);
  }
}
