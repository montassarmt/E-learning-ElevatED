import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component';
import type { TinySliderSettings } from 'tiny-slider';
import { HackathonService, Hackathon } from '@/app/services/hackathon.service';
import { ParticipationService } from '@/app/services/participation.service';

@Component({
  selector: 'index1-trending',
  standalone: true,
  imports: [TinySliderComponent, CommonModule],
  templateUrl: './trending.component.html',
})
export class TrendingComponent implements OnInit {
  hackathons: Hackathon[] = [];
  upcomingHackathons: Hackathon[] = [];
  participatingIds: number[] = [];
  sliderReady = false;
  userEmail = '';

  SliderSetting: TinySliderSettings = {
    autoplay: true,
    controls: true,
    nav: false,
    gutter: 30,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  constructor(
      private hackathonService: HackathonService,
      private participationService: ParticipationService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      console.warn("Email utilisateur non trouvé dans le localStorage.");
      return;
    }
    this.userEmail = email;

    this.loadUpcomingHackathons();
    this.loadParticipation();
    console.log('Hackathons chargés :', this.upcomingHackathons);

  }

  loadParticipation(): void {
    this.participationService.getMyHackathons(this.userEmail).subscribe({
      next: (hackathons) => {
        this.participatingIds = hackathons
            .map(h => h.id)
            .filter((id): id is number => id !== undefined);
        setTimeout(() => {
          this.sliderReady = false;
          this.cdr.detectChanges(); // important !
          this.sliderReady = true;
        }, 10);
        console.log('✅ Participations mises à jour :', this.participatingIds);
        this.cdr.detectChanges(); // <-- Force le rafraîchissement du DOM
      },
      error: err => console.error('❌ Erreur participation', err),
    });
  }


  loadUpcomingHackathons(): void {
    const today = new Date();
    this.hackathonService.getAllHackathons().subscribe({
      next: (data: Hackathon[]) => {
        this.upcomingHackathons = data
            .filter(h => new Date(h.dateFin) >= today)
            .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());

        this.loadParticipation(); // <-- Charger après récupération des hackathons
        this.cdr.detectChanges();
        setTimeout(() => {
          this.sliderReady = false;
          this.cdr.detectChanges(); // important !
          this.sliderReady = true;
        }, 10);

      },
      error: err => console.error('Erreur chargement hackathons', err),
    });
  }


  isParticipating(h: Hackathon): boolean {
    if (!h.id) return false;
    return this.participatingIds.includes(Number(h.id));
  }



  isPast(h: Hackathon): boolean {
    return new Date(h.dateDebut) < new Date();
  }
  toggleParticipation(h: Hackathon): void {
    if (!h.id) return;

    const action = this.isParticipating(h)
        ? this.participationService.unregister(this.userEmail, h.id)
        : this.participationService.register(this.userEmail, h.id);

    action.subscribe({
      next: () => {
        this.loadParticipation();
      },
      error: (err) => {
        console.error('💥 Erreur brute : ', err);
        const message = typeof err?.error === 'string' ? err.error : err?.error?.message || '';
        const status = err.status;

        if (status === 409 || message.includes('Already registered')) {
          alert('⚠️ Vous êtes déjà inscrit à ce hackathon.');

          // 🔒 Mise à jour locale immédiate (si pas déjà là)
          if (!this.participatingIds.includes(h.id!)) {
            this.participatingIds.push(h.id!);
            this.cdr.detectChanges();
          }

        } else {
          alert('❌ Une erreur est survenue lors de la participation.');
        }
      }
    });
  }

  getHackathonImage(nom: string): string {
    const images: Record<string, string> = {
      Web: 'assets/images/courses/4by3/22.jpg',
      Security: 'assets/images/courses/4by3/15.jpg',
      AI: 'assets/images/event/images.jpeg',
      Cloud: 'assets/images/courses/4by3/22.jpg',
      Data: 'assets/images/courses/4by3/15.jpg',
      Blockchain: 'assets/images/courses/4by3/21.jpg',
    };
    return images[nom] || 'assets/images/courses/4by3/21.jpg';
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/courses/4by3/placeholder.jpg'; // une image valide de secours
  }

}
