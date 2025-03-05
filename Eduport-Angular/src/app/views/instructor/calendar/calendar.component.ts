import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HackathonService, Hackathon } from '@/app/services/hackathon.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    editable: true,
    selectable: true,
    eventClassNames: ['event'],
  };

  currentDate: Date = new Date(); // Stocke la date actuelle

  constructor(private hackathonService: HackathonService) {}

  ngOnInit(): void {
    this.loadHackathons();
  }

  loadHackathons(): void {
    this.hackathonService.getAllHackathons().subscribe((hackathons: Hackathon[]) => {
      this.calendarOptions.events = hackathons.map((hackathon) => ({
        title: `${hackathon.nom} (${this.formatTime(hackathon.dateDebut)} - ${this.formatTime(hackathon.dateFin)})`,
        start: hackathon.dateDebut,
        end: hackathon.dateFin,
        description: hackathon.description,
        classNames: ['event'],
      }));
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format HH:MM
  }

  /** Change de mois */
  changeMonth(offset: number): void {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    this.currentDate = newDate;
    this.calendarOptions.initialDate = newDate;
  }
}
