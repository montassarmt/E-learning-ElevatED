import { Route } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DeleteAccountComponent } from './delete-account/delete-account.component'
import { EarningComponent } from './earning/earning.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { OrderComponent } from './order/order.component'
import { PayoutComponent } from './payout/payout.component'
import { QuizComponent } from './quiz/quiz.component'
import { ReviewComponent } from './review/review.component'
import { SettingComponent } from './setting/setting.component'
import { StudentlistComponent } from './studentlist/studentlist.component'
import { HackathonComponent } from './hackathon/hackathon.component'
import { AddHackathonsComponent } from './add-hackathons/add-hackathons.component'
import {CalendarComponent} from "@views/instructor/calendar/calendar.component";
import {EditHackathonComponent} from "@views/instructor/edit-hackathon/edit-hackathon.component";
import {CoachingComponent} from "@views/instructor/coaching/coaching.component";
import {AddCoachingComponent} from "@views/instructor/add-coaching/add-coaching.component";

export const INSTRUCTOR_ROUTES: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Instructor Dashboard' },
  },
  {
    path: 'quiz',
    component: QuizComponent,
    data: { title: 'Instructor Quiz' },
  },
  {
    path: 'earning',
    component: EarningComponent,
    data: { title: 'Earning' },
  },
  {
    path: 'studentlist',
    component: StudentlistComponent,
    data: { title: 'Student List' },
  },
  {
    path: 'order',
    component: OrderComponent,
    data: { title: 'Order' },
  },
  {
    path: 'review',
    component: ReviewComponent,
    data: { title: 'Review' },
  },
  {
    path: 'payout',
    component: PayoutComponent,
    data: { title: 'Payout' },
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    data: { title: 'Edit Profile' },
  },
  {
    path: 'setting',
    component: SettingComponent,
    data: { title: 'Setting' },
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent,
    data: { title: 'Delete Account' },
  },
  {
    path: 'hackathon',
    component: HackathonComponent,
    data: { title: 'Hackathon' },
  },
  {
    path: 'add-hackathons',
    component: AddHackathonsComponent,
    data: { title: 'Add Hackathon' },
  },
  { path: 'calendar',
    component: CalendarComponent,
    data: { title: 'calendar' },
  },
  {
    path: 'edit-hackathon/:id',
    component: EditHackathonComponent,
    data: { title: 'Modifier Hackathon' },
  },
  {
    path: 'add-coaching',
    component:AddCoachingComponent,
    data: { title: 'Add Coaching Session' },
  },
  {
    path: 'coaching',
    component:CoachingComponent,
    data: { title: 'Coaching Sessions' },
  }



]
