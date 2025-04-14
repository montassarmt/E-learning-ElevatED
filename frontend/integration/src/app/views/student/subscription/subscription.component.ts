import { Component, type OnInit } from '@angular/core'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'
import { ParticipationService } from '@/app/services/participation.service';
import { CommonModule, DatePipe } from '@angular/common';

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

  constructor(private participationService: ParticipationService) {}

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
}
