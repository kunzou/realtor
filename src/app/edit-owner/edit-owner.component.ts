import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../User'
import { UserService } from '../user-service';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent implements OnInit {
  owner: User;

  constructor(
    private userService: UserService,
    private location: Location,
    ) { }

  ngOnInit() {
    this.getOwner();
  }

  getOwner(): void {
    this.userService.getOwner()
      .subscribe(user => {
        this.owner = user;
        // console.log(user.id);
        console.log(this.owner.displayName)
      });
  }  

  save(): void {
    this.userService.updateUser(this.owner).subscribe(() => this.goBack());
  }  

  goBack(): void {
    this.location.back();
  }  

}
