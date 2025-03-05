import { Component, OnInit } from '@angular/core';
import { HackathonService, Hackathon } from '../../../services/hackathon.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from '@views/instructor/dashboard/components/chart/chart.component';
import { CounterComponent } from '@views/instructor/dashboard/components/counter/counter.component';
import { SellingCoursesComponent } from '@views/instructor/dashboard/components/selling-courses/selling-courses.component';
import { AppMenuComponent } from '@components/app-menu/app-menu.components';
import { AdditionalInfoComponent } from '@views/instructor/create-course/components/additional-info/additional-info.component';
import { CourseDetailComponent } from '@views/instructor/create-course/components/course-detail/course-detail.component';
import { CourseMediaComponent } from '@views/instructor/create-course/components/course-media/course-media.component';
import { CurriculumComponent } from '@views/instructor/create-course/components/curriculum/curriculum.component';
import { Footer3Component } from '@components/footers/footer3/footer3.component';
import { StepperDirective } from '@core/directive/stepper.directive';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive';
import { SidebarComponent } from '@layouts/account-layout/component/sidebar/sidebar.component';
import { AccountLayoutComponent } from '@layouts/account-layout/account-layout.component';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-hackathon',
  standalone: true,
  templateUrl: './hackathon.component.html',
  styleUrls: ['./hackathon.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    NgbPagination,
    ChartComponent,
    CounterComponent,
    SellingCoursesComponent,
    AppMenuComponent,
    AdditionalInfoComponent,
    CourseDetailComponent,
    CourseMediaComponent,
    CurriculumComponent,
    Footer3Component,
    StepperDirective,
    NgbPaginationModule,
    CommonModule,
    SelectFormInputDirective,
    SidebarComponent,
    AccountLayoutComponent,
    RouterLink,
  ],
})
export class HackathonComponent implements OnInit {
  hackathons: Hackathon[] = [];
  newHackathon: Hackathon = { nom: '', theme: '', description: '', dateDebut: '', dateFin: '' };

  constructor(private hackathonService: HackathonService, private router: Router) {}

  ngOnInit(): void {
    this.loadHackathons();
  }

  loadHackathons(): void {
    this.hackathonService.getAllHackathons().subscribe((data: Hackathon[]) => {
      this.hackathons = data;
    });
  }

  addHackathon(): void {
    if (this.validateHackathon()) {
      this.hackathonService.createHackathon(this.newHackathon).subscribe((hackathon: Hackathon) => {
        this.hackathons.push(hackathon);
        this.newHackathon = { nom: '', theme: '', description: '', dateDebut: '', dateFin: '' }; // Reset form
      });
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  }

  deleteHackathon(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce hackathon ?")) {
      this.hackathonService.deleteHackathon(id).subscribe(() => {
        this.hackathons = this.hackathons.filter(h => h.id !== id);
      });
    }
  }

  private validateHackathon(): boolean {
    return !!(this.newHackathon.nom && this.newHackathon.theme && this.newHackathon.dateDebut && this.newHackathon.dateFin);
  }
}
