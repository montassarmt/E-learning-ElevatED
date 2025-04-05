import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Hackathon, HackathonService } from '@/app/services/hackathon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hackathons',
  standalone: true,
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
    AccountLayoutComponent
  ],
  templateUrl: './add-hackathons.component.html',
  styleUrl: './add-hackathons.component.scss',
})
export class AddHackathonsComponent implements OnInit {
  newHackathon: Hackathon = {
    nom: '',
    theme: '',
    description: '',
    dateDebut: '',
    dateFin: ''
  };

  constructor(private hackathonService: HackathonService, private router: Router) {}

  ngOnInit() {}

  addHackathon(): void {
    if (this.validateHackathon()) {
      this.hackathonService.createHackathon(this.newHackathon).subscribe(() => {
        alert('Hackathon ajouté avec succès!');
        this.router.navigate(['/hackathons']); // Redirect to list after addition
      });
    } else {
      alert("Veuillez remplir tous les champs obligatoires.");
    }
  }

  private validateHackathon(): boolean {
    return !!(this.newHackathon.nom && this.newHackathon.theme && this.newHackathon.dateDebut && this.newHackathon.dateFin);
  }
}
