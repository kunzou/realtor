import { Injectable } from '@angular/core';
import { Blog } from '../domain/blog';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { BlogCard } from '../domain/blog-card';

@Injectable({
  providedIn: "root"
})
export class BlogService {
  private blogUrl = environment.baseUrl + '/blogs';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  cachedBlogs: Observable<BlogCard[]>;
  constructor(
    private http: HttpClient
  ) { }

  getBlogs(): Observable<BlogCard[]> {
    if(!this.cachedBlogs) {
      this.cachedBlogs = this.http.get<BlogCard[]>(this.blogUrl)
      .pipe(
        catchError(this.handleError<BlogCard[]>('getBlogs', []))
      )
    }
    return this.cachedBlogs;
  }

  clearCache() {
    this.cachedBlogs = null;
  }   

  getBlog(id: string): Observable<Blog> {
    const url = `${this.blogUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      catchError(this.handleError<Blog>(`getBlog id=${id}`))
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

  updateBlog (blog: Blog): Observable<any> {
    return this.http.put(this.blogUrl, blog, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBlog'))
    );
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.blogUrl, blog, this.httpOptions).pipe(
      catchError(this.handleError<Blog>('addBlog'))
    );
  }

  deleteBlog (blog: Blog | number): Observable<Blog> {
    const id = typeof blog === 'number' ? blog : blog.id;
    const url = `${this.blogUrl}/${id}`;
  
    return this.http.delete<Blog>(url, this.httpOptions).pipe(
      catchError(this.handleError<Blog>('deleteBlog'))
    );
  }

  searchBlogs(term: string): Observable<BlogCard[]> {
    if(!term.trim()) {
      return of([]);
    }

    return this.http.get<BlogCard[]>(`${this.blogUrl}/?address=${term}`).pipe(
      catchError(this.handleError<Blog[]>('searchProperties', []))      
    );
  }
}
