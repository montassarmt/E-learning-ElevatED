import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'
import { Component, OnInit } from '@angular/core'
import { CounterComponent } from './component/counter/counter.component'
import { PopularCourseComponent } from './component/popular-course/popular-course.component'
import { ActionBoxComponent } from './component/action-box/action-box.component'
import { TrendingComponent } from './component/trending/trending.component'
import { ReviewsComponent } from './component/reviews/reviews.component'
import { FooterComponent } from '@/app/components/footers/footer/footer.component'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { NgClass, NgForOf } from '@angular/common'
import {BannerComponent} from "@views/demo/index2/components/banner/banner.component";
import {EventComponent} from "@views/demo/index1/component/event/event.component";
import {LiveCourseComponent} from "@views/demo/index1/component/live-course/live-course.component";

@Component({
    selector: 'app-index1',
    standalone: true,
    imports: [
        AppMenuComponent,
        BannerComponent,
        CounterComponent,
        PopularCourseComponent,
        ActionBoxComponent,
        TrendingComponent,
        ReviewsComponent,
        FooterComponent,
        FormsModule,
        NgClass,
        NgForOf,
        EventComponent,
        BannerComponent,
        EventComponent,
        LiveCourseComponent,
    ],
    templateUrl: './index1.component.html',
    styles: ``,
})
export class Index1Component implements OnInit {
    users: any[] = []
    meetingName: string = ''

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}



    ngOnInit(): void {
        const connectedUser = localStorage.getItem('connectedUser')
        if (!connectedUser) {
            this.router.navigate(['/sign-in'])
            return
        }

        this.loadUsers()
    }

    loadUsers(): void {
        this.http.get<any[]>('http://localhost:8087/api/v1/users').subscribe({
            next: (data) => (this.users = data),
            error: (err) => console.error('Error fetching users', err),
        })
    }

    handleLogout(): void {
        const connectedUser = localStorage.getItem('connectedUser')
        this.http
            .post('http://localhost:8087/api/v1/users/logout', connectedUser, {
                headers: { 'Content-Type': 'application/json' },
            })
            .subscribe({
                next: () => {
                    localStorage.removeItem('connectedUser')
                    this.router.navigate(['/sign-in'])
                },
                error: (err) => console.error('Logout error', err),
            })
    }

    handleNewMeeting(): void {
        const connectedUser = JSON.parse(localStorage.getItem('connectedUser') || '{}');
        this.router.navigate(['/video-call'], {
            queryParams: { username: connectedUser.username }
        });
    }


    handleJoinMeeting(): void {
        const connectedUser = JSON.parse(localStorage.getItem('connectedUser') || '{}');
        this.router.navigate(['/video-call'], {
            queryParams: {
                roomID: this.meetingName,
                username: connectedUser.username
            }
        });
    }

}
