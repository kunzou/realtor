import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service';
import { User } from '../domain/user';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {
  visitHistories = [];
  totalVisits: number;
  constructor(
    private userService: UserService,
  ) { }

  page :number = 1
  pageSize :number = 30

  ngOnInit() {
    this.getOwner();
  }

  getOwner(): void {
    this.userService.getOwner()
      .subscribe(user => {
        this.visitHistories = user.visitHistories;
        this.totalVisits = user.totalVisits;
      });
  }     

}
