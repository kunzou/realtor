import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { UserService } from '../service/user-service';
import { EmailDetail } from '../domain/emailDetail';
import { EmailService } from '../service/email.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Description } from '../domain/description';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  me: User;
  emailDetail: EmailDetail = new EmailDetail;
  emailResponse: Description;
  emailResponseAlertType: any;
  private _success = new Subject<Description>();  
  constructor(
    private userService: UserService,
    private emailService: EmailService,
    public router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getOwner();
    this._success.subscribe((message) => this.emailResponse = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.emailResponse = null);        
  }

  getOwner(): void {
    this.userService.getOwner()
      .subscribe(user => {
        this.me = user;
      });
  }    

  sendEmail(): void {
    this.emailDetail.address = '';
    this.emailService.sendEmail(this.emailDetail).subscribe(response => {
      this.emailResponseAlertType = response.status === 200?"success":"danger";
      this.emailResponse = response.body;
      this.showMessage();
    });
  }  

  showMessage() {
    this._success.next(this.emailResponse);
  }    
}
