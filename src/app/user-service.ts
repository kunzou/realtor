import { Injectable } from '@angular/core';
import { Property } from './property';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = environment.baseUrl + '/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  getOwner(): Observable<User> {
    const url = `${this.userUrl}/owner`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getOwner`))
    );
  }

  updateUser (property: User): Observable<any> {
    return this.http.put(this.userUrl, property, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
