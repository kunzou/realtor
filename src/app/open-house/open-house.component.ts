import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGrigPlugin from '@fullcalendar/timegrid';
import { CalendarEventService } from '../calendar-event.service';

@Component({
  selector: 'app-open-house',
  templateUrl: './open-house.component.html',
  styleUrls: ['./open-house.component.css']
})
export class OpenHouseComponent implements OnInit{
  // @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  icon = './assets/open-house.png';
  events: EventInput[] = [];

  constructor(private calendarEventService: CalendarEventService) { }

  ngOnInit(): void {
    this.getEvents();
  }  

  getEvents(): void {
    this.calendarEventService.getCalendarEvents().subscribe(events => {
      this.events = events;
    });
  }  

  MouseOver(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      console.log(arg)
    }
  }


  handleEventClick(arg) {
    console.log(arg);
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      console.log(arg)
    }
  }
}
