import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, publishReplay, refCount } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  me: Observable<User>;
  private userUrl = environment.baseUrl + '/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  getOwner(): Observable<User> {
    if(!this.me) {
      const url = `${this.userUrl}/owner`;
      this.me = this.http.get<User>(url).pipe(
        publishReplay(1),
        refCount(),
        catchError(this.handleError<User>(`getOwner`))
      );
    }

    return this.me;
  }

  clearCache() {
    this.me = null;
  }  

  updateUser (property: User): Observable<any> {
    this.clearCache();
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
