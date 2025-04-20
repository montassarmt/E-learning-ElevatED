import { Component, type OnInit } from '@angular/core'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'
import { ParticipationService } from '@/app/services/participation.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [NgbProgressbarModule, DatePipe, CommonModule],
  templateUrl: './subscription.component.html',
  styles: ``,
})
export class SubscriptionComponent implements OnInit {
  myHackathons: any[] = []; // <-- contient des participations, pas juste des hackathons
  userEmail = '';
  userBadges: string[] = [];


  constructor(private participationService: ParticipationService,
              private router : Router,  private http: HttpClient ) {}

  ngOnInit(): void {
    aos.init();
    const email = localStorage.getItem('email');
    if (!email) return;

    this.userEmail = email;

    this.participationService.getMyHackathons(email).subscribe({
      next: (data) => {
        console.log('✅ Participations récupérées :', data);
        this.myHackathons = data;
      },
      error: (err) => {
        console.error('❌ Erreur récupération participations', err);
      }
    });
    this.http.get<{ badges: string[] }>(`http://localhost:8085/api/soumissions/user-badges?email=${email}`)
      .subscribe({
        next: (res) => {
          this.userBadges = res.badges || [];
          console.log('🏅 Badges utilisateur :', this.userBadges);
        },
        error: () => {
          this.userBadges = [];
          console.warn('❌ Erreur récupération des badges');
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
  isHackathonOuvert(hackathon: any): boolean {
    const now = new Date();
    return new Date(hackathon.dateDebut) <= now && now <= new Date(hackathon.dateFin);
  }
  goToHackathonDetail(id: number): void {
    this.router.navigate([`hackathon/${id}/details`]);

  }

}
