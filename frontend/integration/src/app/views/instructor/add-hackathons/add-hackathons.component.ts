import {Hackathon, HackathonService} from "@/app/services/hackathon.service";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbPagination, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {CounterComponent} from "@views/demo/index1/component/counter/counter.component";
import {
  SellingCoursesComponent
} from "@views/instructor/dashboard/components/selling-courses/selling-courses.component";
import {AppMenuComponent} from "@components/app-menu/app-menu.components";
import {
  AdditionalInfoComponent
} from "@views/instructor/create-course/components/additional-info/additional-info.component";
import {CourseDetailComponent} from "@views/instructor/create-course/components/course-detail/course-detail.component";
import {CourseMediaComponent} from "@views/instructor/create-course/components/course-media/course-media.component";
import {CurriculumComponent} from "@views/course/detail/components/curriculum/curriculum.component";
import {Footer3Component} from "@components/footers/footer3/footer3.component";
import {StepperDirective} from "@core/directive/stepper.directive";
import {SelectFormInputDirective} from "@core/directive/select-form-input.directive";
import {SidebarComponent} from "@views/instructor/hackathon/sidebar/sidebar.component";
import {AccountLayoutComponent} from "@layouts/account-layout/account-layout.component";
@Component({
  selector: 'app-add-hackathons',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbPagination,
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
    dateFin: '',
    probleme: ''
  };

  minDate: string = '';


  constructor(private hackathonService: HackathonService, private router: Router) {}

  ngOnInit() {
    const now = new Date();
    this.minDate = now.toISOString().slice(0, 16); // Format compatible datetime-local
  }

  onDateDebutChange(): void {
    if (this.newHackathon.dateFin && this.newHackathon.dateFin < this.newHackathon.dateDebut) {
      this.newHackathon.dateFin = this.newHackathon.dateDebut;
    }
  }

  addHackathon(): void {
    if (!this.validateHackathon()) {
      alert("Please fill out all fields correctly.");
      return;
    }

    this.hackathonService.createHackathon(this.newHackathon).subscribe(() => {
      alert("Hackathon added successfully!");
      this.router.navigate(['instructor/hackathon']);
    });
  }

  private validateHackathon(): boolean {
    const { nom, theme, description, probleme, dateDebut, dateFin } = this.newHackathon;
    return (
      !!nom &&
      !!theme &&
      !!description &&
      !!probleme &&
      !!dateDebut &&
      !!dateFin &&
      new Date(dateDebut) >= new Date(this.minDate) &&
      new Date(dateFin) >= new Date(dateDebut)
    );
  }

}
