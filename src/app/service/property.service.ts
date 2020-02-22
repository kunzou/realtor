import { Injectable } from '@angular/core';
import { Property } from '../domain/property';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { PropertyCard } from '../domain/property-card';

@Injectable({
  providedIn: "root"
})
export class PropertyService {
  private propertyUrl = environment.baseUrl + '/properties';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  cachedSaleProperties: Observable<Property[]>;
  openHouseCards: Observable<PropertyCard[]>;
  constructor(
    private http: HttpClient
  ) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.propertyUrl)
      .pipe(
        catchError(this.handleError<Property[]>('getProperties', []))
      )
  }

  getSaleProperties(): Observable<Property[]> {
    if(!this.cachedSaleProperties) {
      const url = `${this.propertyUrl}/sale`;
      this.cachedSaleProperties = this.http.get<Property[]>(url)
        .pipe(
          catchError(this.handleError<Property[]>('getSaleProperties', []))
        )
    }

    return this.cachedSaleProperties;
  }

  clearSaleCache() {
    this.cachedSaleProperties = null;
  }   

  clearOpenHouseCache() {
    this.openHouseCards = null;
  }

  getSoldPurchasedProperties(): Observable<Property[]> {
    const url = `${this.propertyUrl}/soldPurchased`;
    return this.http.get<Property[]>(url)
      .pipe(
        catchError(this.handleError<Property[]>('getSoldPurchasedProperties', []))
      )
  }  

  getOpenHouses(): Observable<PropertyCard[]> {
    if(!this.openHouseCards) {
      const url = `${this.propertyUrl}/openHouse`;
      this.openHouseCards = this.http.get<PropertyCard[]>(url)
        .pipe(
          catchError(this.handleError<PropertyCard[]>('getOpenHouses', []))
        )
    }
    return this.openHouseCards;
  }    

  getProperty(id: string): Observable<Property> {
    const url = `${this.propertyUrl}/${id}`;
    return this.http.get<Property>(url).pipe(
      catchError(this.handleError<Property>(`getProperties id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateProperty (property: Property): Observable<any> {
    this.clearOpenHouseCache();
    this.clearSaleCache();
    return this.http.put(this.propertyUrl, property, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateProperty'))
    );
  }

  addProperty(property: Property): Observable<Property> {
    this.clearOpenHouseCache();
    this.clearSaleCache();    
    return this.http.post<Property>(this.propertyUrl, property, this.httpOptions).pipe(
      catchError(this.handleError<Property>('addProperty'))
    );
  }

  deleteProperty (property: Property | number): Observable<Property> {
    this.clearOpenHouseCache();
    this.clearSaleCache();    
    const id = typeof property === 'number' ? property : property.id;
    const url = `${this.propertyUrl}/${id}`;
  
    return this.http.delete<Property>(url, this.httpOptions).pipe(
      catchError(this.handleError<Property>('deleteProperty'))
    );
  }

  searchProperties(term: string): Observable<Property[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<Property[]>(`${this.propertyUrl}/?address=${term}`).pipe(
      catchError(this.handleError<Property[]>('searchProperties', []))      
    );
  }
}
