import { Component, OnInit } from '@angular/core'
import { Hackathon, HackathonService } from '@/app/services/hackathon.service'
import { ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { Soumission, SoumissionService } from '@/app/services/soumission.service'
import { AppMenuComponent } from '@components/app-menu/app-menu.components'
import { BannerComponent } from '@views/pages/event-detail/components/banner/banner.component'
import { OrganizationComponent } from '@views/pages/event-detail/components/organization/organization.component'

@Component({
  selector: 'app-hackathon-detail',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    AppMenuComponent,
    BannerComponent,
    OrganizationComponent,
  ],
  templateUrl: './hackathon-detail.component.html',
  styleUrl: './hackathon-detail.component.scss',
})
export class HackathonDetailComponent implements OnInit {
  hackathon!: Hackathon
  userId!: number; // avec le ! pour dire "il sera défini plus tard"
  responseText = ''
  soumissionExistante: Soumission | null = null;

  constructor(
    private route: ActivatedRoute,
    private hackathonService: HackathonService,
    private soumissionService: SoumissionService
  ) {}

  ngOnInit(): void {
    const idStr = localStorage.getItem('id');
    if (!idStr || isNaN(Number(idStr))) return;

    this.userId = Number(idStr);
    const hackathonId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(hackathonId)) return;

    this.hackathonService.getHackathonById(hackathonId).subscribe({
      next: (data) => {
        this.hackathon = data;

        // 🧠 Une fois le hackathon chargé, on va chercher la soumission de l'utilisateur
        this.soumissionService.getSoumissionsByHackathon(hackathonId).subscribe((soums) => {
          const existing = soums.find(s => s.userId === this.userId);
          if (existing) {
            this.soumissionExistante = existing;
            this.responseText = existing.reponse; // Afficher la réponse dans le champ (readonly)
          }
        });
      },
      error: (err) => console.error('❌ Erreur chargement hackathon :', err)
    });
  }


  submitResponse(): void {
    if (this.soumissionExistante) {
      alert('Vous avez déjà soumis une réponse.');
      return;
    }

    if (this.responseText.trim() && this.hackathon?.id) {
      this.soumissionService
        .submitSolution(this.userId, this.hackathon.id, this.responseText)
        .subscribe({
          next: () => alert('Soumission réussie ✅'),
          error: (err) =>
            alert('❌ Échec de la soumission : ' + (err.error?.message || 'Erreur inconnue')),
        });
    }
  }



}
