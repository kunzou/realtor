import { EventInput } from '@fullcalendar/core';

export class CalendarEvent implements EventInput {
    location: {lat: number; lng: number;};
}
