import { Component, inject, ViewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
  type Event,
} from '@angular/router';
import { BackToTopComponent } from './components/back-to-top.component';
import { TitleService } from './core/service/title.service';
import { NgProgressComponent, NgProgressModule } from 'ngx-progressbar';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackToTopComponent, NgProgressModule, ReactiveFormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;

  private router = inject(Router);
  private titleService = inject(TitleService);

  constructor() {
    this.router.events.subscribe((event: Event) => {
      this.checkRouteChange(event);
    });
  }

  ngOnInit(): void {
    this.titleService.init();
  }

  // Show loader when route changes
  checkRouteChange(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.progressBar.start();
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      setTimeout(() => {
        this.progressBar.complete();
      }, 200);
    }
  }
}