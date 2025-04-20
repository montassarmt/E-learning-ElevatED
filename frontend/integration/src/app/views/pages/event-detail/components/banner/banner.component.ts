import { Component, Input } from '@angular/core'
import { Hackathon } from '@/app/services/hackathon.service'

@Component({
  selector: 'event-detail-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent {
  @Input() hackathon!: Hackathon
}
