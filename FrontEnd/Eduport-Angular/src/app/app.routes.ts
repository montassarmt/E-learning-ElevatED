import { inject } from '@angular/core'
import {
  ActivatedRoute,
  RedirectCommand,
  Router,
  Routes,
  type RouterStateSnapshot,
  type UrlTree,
} from '@angular/router'
import { AuthService } from './core/service/auth-service.service'
import { AccountLayoutComponent } from './layouts/account-layout/account-layout.component'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component'
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component'
import { EntrepriseListComponent } from './PartnershipManagement/Back/components/entreprise/entreprise-list/entreprise-list.component'
import { EntrepriseFormComponent } from './PartnershipManagement/Back/components/entreprise/entreprise-form/entreprise-form.component'
import { ProposalListComponent } from './PartnershipManagement/Back/components/proposal/proposal-list/proposal-list.component'
import { ProposalFormComponent } from './PartnershipManagement/Back/components/proposal/proposal-form/proposal-form.component'
import { PartnershipListComponent } from './PartnershipManagement/Back/components/partnership/partnership-list/partnership-list.component'
import { PartnershipFormComponent } from './PartnershipManagement/Back/components/partnership/partnership-form/partnership-form.component'
import { ProposalListFrontComponent } from './PartnershipManagement/Front/Proposal/proposal-list-front/proposal-list-front.component'
import { PartnershipDetailsComponent } from './PartnershipManagement/Back/components/partnership/partnership-details/partnership-details.component'
import { ScrapingComponent } from './PartnershipManagement/Back/components/webScraping/scraping/scraping.component'

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/index-1',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/demo/demo.route').then((mod) => mod.DEMO_ROUTES),
  },

  {
    path: 'course',
    loadChildren: () =>
      import('./views/course/course.route').then((mod) => mod.COURSE_ROUTES),
  },
  {
    path: 'hero',
    loadChildren: () =>
      import('./views/hero/hero.route').then((mod) => mod.HERO_ROUTES),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./views/shop/shop.route').then((mod) => mod.SHOP_ROUTES),
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./views/help/help.route').then((mod) => mod.HELP_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEWS_ROUTES),
  },
  {
    path: 'instructor',
    component: AccountLayoutComponent,
    canActivate: [
      (url: any) => {
        const router = inject(Router)
        const authService = inject(AuthService)
        if (!authService.session) {
          return router.createUrlTree(['/sign-in'], {
            queryParams: { returnUrl: url._routerState.url },
          })
        }
        return true
      },
    ],
    loadChildren: () =>
      import('./views/instructor/instructor.route').then(
        (mod) => mod.INSTRUCTOR_ROUTES
      ),
  },
  {
    path: 'proposalf',
    component: AccountLayoutComponent,
    canActivate: [
      (url: any) => {
        return true; // Add authentication logic if needed
      },
    ],
    children: [
      {
        path: '',
        component: ProposalListFrontComponent, // List of proposals
      },
      {
        path: 'add',
        component: ProposalFormComponent, // Form to add a new proposal
      },
      {
        path: 'edit/:id',
        component: ProposalFormComponent, // Form to edit an existing proposal
      },
      {
        path: 'apply',
        component: PartnershipFormComponent, // Form to add a new proposal
      },
      { path: 'partnership/details/:id', component: PartnershipDetailsComponent },
    ],
  },
 
  {
    path: 'student',
    component: AccountLayoutComponent,
    canActivate: [
      (url: any) => {
        const router = inject(Router)
        const authService = inject(AuthService)
        if (!authService.session) {
          return router.createUrlTree(['/sign-in'], {
            queryParams: { returnUrl: url._routerState.url },
          })
        }
        return true
      },
    ],
    loadChildren: () =>
      import('./views/student/student.route').then((mod) => mod.STUDENT_ROUTES),
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [
      (url: any) => {
        //const router = inject(Router)
       // const authService = inject(AuthService)
       // if (!authService.session) {
       //   return router.createUrlTree(['/sign-in'], {
        //    queryParams: { returnUrl: url._routerState.url },
        //  })
       // }
        return true
      },
    ],
    loadChildren: () =>
      import('./views/admin/admin.route').then((mod) => mod.ADMIN_ROUTES),
  },
  {
    path: 'admin/entreprises', // You can choose a different path if needed
    component: AdminLayoutComponent, // Use the appropriate layout
    canActivate: [
      (url: any) => {
       // const router = inject(Router);
       // const authService = inject(AuthService);
       // if (!authService.session) {
        //  return router.createUrlTree(['/sign-in'], {
         ///   queryParams: { returnUrl: url._routerState.url },
         // });
      //  }
        return true;
      },
    ],
    children: [
      {
        path: '',
        component: EntrepriseListComponent, // List of entreprises
      },
      {
        path: 'add',
        component: EntrepriseFormComponent, // Form to add a new entreprise
      },
      {
        path: 'edit/:id', 
        component: EntrepriseFormComponent
            }
    ],
  },
  {
    path: 'admin/proposals',
    component: AdminLayoutComponent,
    canActivate: [
      (url: any) => {
        return true; // Add authentication logic if needed
      },
    ],
    children: [
      {
        path: '',
        component: ProposalListComponent, // List of proposals
      },
      {
        path: 'add',
        component: ProposalFormComponent, // Form to add a new proposal
      },
      {
        path: 'edit/:id',
        component: ProposalFormComponent, // Form to edit an existing proposal
      },
  
    ],
  },

  {
    path: 'admin/partnerships',
    component: AdminLayoutComponent,
    canActivate: [
      (url: any) => {
        return true; // Add authentication logic if needed
      },
    ],
    children: [
      {
        path: '',
        component: PartnershipListComponent // List of proposals
      },
      {
        path: 'add',
        component: PartnershipFormComponent, // Form to add a new proposal
      },
      {
        path: 'edit/:id',
        component: PartnershipFormComponent, // Form to edit an existing proposal
      },
    ],
  },

  {
    path: 'admin/webScraping',
    component: AdminLayoutComponent,
    canActivate: [
      (url: any) => {
        return true; // Add authentication logic if needed
      },
    ],
    children: [
      {
        path: '',
        component: ScrapingComponent  // List of data
      },
    ],
  },


  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },

  
]
