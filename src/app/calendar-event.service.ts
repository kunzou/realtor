import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { publishReplay, refCount } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { CalendarEvent } from './domain/calendarEvent';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {

  calendarEvents: CalendarEvent[] = [];
  private userUrl = environment.baseUrl + '/calendarEvents';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  getCalendarEvents(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.userUrl)
      .pipe(
        catchError(this.handleError<CalendarEvent[]>('getProperties', []))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
