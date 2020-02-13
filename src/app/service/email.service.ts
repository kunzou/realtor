import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailDetail } from '../domain/emailDetail';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  SERVER_URL: string = environment.baseUrl + '/sendEmail';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(emailDetail) {
    this.http.post<EmailDetail>(this.SERVER_URL, emailDetail).subscribe(
      res => {
        alert('Email Sent successfully');        
      });    
  }
}
