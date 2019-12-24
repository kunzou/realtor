import { Injectable } from '@angular/core';
import { Property } from './property';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class PropertyService {
  private propertyUrl = 'http://localhost:8080/properties';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.propertyUrl)
      .pipe(
        catchError(this.handleError<Property[]>('getProperties', []))
      )
  }

  getSaleProperties(): Observable<Property[]> {
    const url = `${this.propertyUrl}/sale`;
    return this.http.get<Property[]>(url)
      .pipe(
        catchError(this.handleError<Property[]>('getProperties', []))
      )
  }

  getSoldPurchasedProperties(): Observable<Property[]> {
    const url = `${this.propertyUrl}/soldPurchased`;
    return this.http.get<Property[]>(url)
      .pipe(
        catchError(this.handleError<Property[]>('getProperties', []))
      )
  }  

  getProperty(id: string): Observable<Property> {
    const url = `${this.propertyUrl}/${id}`;
    return this.http.get<Property>(url).pipe(
      tap(_ => this.log(`fetched property id=${id}`)),
      catchError(this.handleError<Property>(`getProperties id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`PropertyService: ${message}`);
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateProperty (property: Property): Observable<any> {
    return this.http.put(this.propertyUrl, property, this.httpOptions).pipe(
      tap(_ => this.log(`updated property id=${property.id}`)),
      catchError(this.handleError<any>('updateProperty'))
    );
  }

  addProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(this.propertyUrl, property, this.httpOptions).pipe(
      tap((newProperty: Property) => this.log(`added property w/ id=${newProperty.id}`)),
      catchError(this.handleError<Property>('addProperty'))
    );
  }

  deleteProperty (property: Property | number): Observable<Property> {
    const id = typeof property === 'number' ? property : property.id;
    const url = `${this.propertyUrl}/${id}`;
  
    return this.http.delete<Property>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted property id=${id}`)),
      catchError(this.handleError<Property>('deleteProperty'))
    );
  }

  searchProperties(term: string): Observable<Property[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Property[]>(`${this.propertyUrl}/?address=${term}`).pipe(
      tap(_ => this.log(`found properties matching "${term}"`)),
      catchError(this.handleError<Property[]>('searchProperties', []))      
    );
  }
}
