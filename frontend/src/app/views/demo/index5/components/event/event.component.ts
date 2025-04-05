import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component';
import type { TinySliderSettings } from 'tiny-slider';
import { HackathonService, Hackathon } from '@/app/services/hackathon.service';

@Component({
  selector: 'index5-event',
  standalone: true,
  imports: [CommonModule, TinySliderComponent],
  templateUrl: './event.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventComponent implements OnInit {
  hackathons: Hackathon[] = [];
  upcomingHackathons: Hackathon[] = [];

  // ✅ Store hackathon-specific images in a dictionary
  hackathonImages: { [key: string]: string } = {
    'Web': 'assets/images/courses/4by3/22.jpg',
    'Security': 'assets/images/courses/4by3/15.jpg',
    'AI': 'assets/images/event/images.jpeg',
    'Cloud': 'assets/images/courses/4by3/22.jpg',
    'Data':'assets/images/courses/4by3/15.jpg',
    'Blockchain':'assets/images/courses/4by3/21.jpg',
    // More hackathons can be added dynamically without limitation
  };

  sliderConfig: TinySliderSettings = {
    autoplay: false,
    arrowKeys: true,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    gutter: 30,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 },
    },
  };

  constructor(private hackathonService: HackathonService) {}

  ngOnInit(): void {
    this.hackathonService.getAllHackathons().subscribe(data => {
      this.hackathons = data;
      this.loadUpcomingHackathons();
    });
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

  // ✅ Function to get an image dynamically based on hackathon name
  getHackathonImage(hackathonName: string): string {
    return this.hackathonImages[hackathonName] || 'assets/images/hackathons/default.jpg'; // Default image
  }
}