import { currentYear } from '@/app/common/constants'
import { Component, Input } from '@angular/core'
import { Hackathon } from '@/app/services/hackathon.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'event-detail-organization',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './organization.component.html',
  styles: ``,
})
export class OrganizationComponent {
  currentYear = currentYear
  @Input() hackathon!: Hackathon
}
