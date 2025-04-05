import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component';
import type { TinySliderSettings } from 'tiny-slider';
import { HackathonService, Hackathon } from '@/app/services/hackathon.service';

@Component({
  selector: 'index1-trending',
  standalone: true,
  imports: [TinySliderComponent, CommonModule],
  templateUrl: './trending.component.html',
})
export class TrendingComponent implements OnInit {
  hackathons: Hackathon[] = [];
  upcomingHackathons: Hackathon[] = [];
  sliderReady = false;

  constructor(
      private hackathonService: HackathonService,
      private cdr: ChangeDetectorRef
  ) {}

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

  ngOnInit(): void {
    this.hackathonService.getAllHackathons().subscribe(data => {
      const today = new Date();
      this.upcomingHackathons = data
          .filter(h => new Date(h.dateFin) >= today)
          .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());

      // ✅ Forcer Angular à finir son rendu DOM avant d'activer le slider
      this.cdr.detectChanges();

      // ✅ Activer le slider après un tout petit délai
      setTimeout(() => {
        this.sliderReady = true;
      }, 50);
    });
  }

  getHackathonImage(nom: string): string {
    return {
      'Web': 'assets/images/courses/4by3/22.jpg',
      'Security': 'assets/images/courses/4by3/15.jpg',
      'AI': 'assets/images/event/images.jpeg',
      'Cloud': 'assets/images/courses/4by3/22.jpg',
      'Data': 'assets/images/courses/4by3/15.jpg',
      'Blockchain': 'assets/images/courses/4by3/21.jpg',
    }[nom] || 'assets/images/hackathons/default.jpg';
  }



  loadUpcomingHackathons(): void {
    const today = new Date();

    this.hackathonService.getAllHackathons().subscribe({
      next: (data: Hackathon[]) => {
        this.upcomingHackathons = data
            .filter(h => new Date(h.dateFin) >= today)
            .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());
      },
      error: (err) => console.error('Error loading hackathons', err),
    })
  }

}
