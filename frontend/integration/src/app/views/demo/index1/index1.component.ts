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
import { AppMenuComponent } from '@/app/components/app-menu/app-menu.components'

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


    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}



    ngOnInit(): void {

    }









}
