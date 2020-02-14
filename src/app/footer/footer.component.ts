import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';
import { UserService } from '../service/user-service';
import { EmailDetail } from '../domain/emailDetail';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  me: User;
  emailDetail: EmailDetail = new EmailDetail;
  constructor(
    private userService: UserService,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    this.getOwner();
  }

  getOwner(): void {
    this.userService.getOwner()
      .subscribe(user => {
        this.me = user;
      });
  }    

  sendEmail(): void {
    this.emailDetail.address = '';
    this.emailService.sendEmail(this.emailDetail);
  }  
}
