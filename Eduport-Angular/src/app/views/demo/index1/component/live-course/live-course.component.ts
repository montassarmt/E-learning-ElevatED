import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component';
import type { TinySliderSettings } from 'tiny-slider';
import { CoachingService, SeanceCoaching } from '@/app/services/coaching.service';
import {LightgalleryModule} from "lightgallery/angular";

@Component({
  selector: 'index1-live-course',
  standalone: true,
  imports: [TinySliderComponent, CommonModule, LightgalleryModule],
  templateUrl: './live-course.component.html',
  styleUrl: './live-course.components.scss',
})
export class LiveCourseComponent implements OnInit {
  upcomingSeances: SeanceCoaching[] = [];
  sliderReady = false;

  SliderSetting: TinySliderSettings = {
    arrowKeys: true,
    edgePadding: 2,
    controls: true,
    controlsText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>'
    ],
    gutter: 30,
    responsive: {
      0: {
        items: 1
      },
      1200: {
        items: 2
      }
    }
  };

  constructor(
      private coachingService: CoachingService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.coachingService.getAllSeances().subscribe(data => {
      this.upcomingSeances = data
          .filter(s => new Date(s.dateFin) >= today)
          .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime());

      this.cdr.detectChanges();

      setTimeout(() => {
        this.sliderReady = true;
      }, 50);
    });
  }

  getImageForSeance(nom: string): string {
    return `assets/images/bg/08.jpg`;
  }
}
