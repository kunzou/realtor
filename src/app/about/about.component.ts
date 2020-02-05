import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { Property } from '../property';
import { MouseEvent } from '@agm/core';
import { User } from '../user';
import { UserService } from '../user-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  properties: Property[];
  owner: User;
  // sold = './assets/sold.png';
  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getPropertyes();
    this.getOwner();
  }

  getOwner(): void {
    this.userService.getOwner()
      .subscribe(user => {
        this.owner = user;
      });
  }

  getPropertyes(): void {
    this.propertyService.getSoldPurchasedProperties()
      .subscribe(properties => this.properties = properties);
  }

  getIcon(property): string {
    if (property.propertyStatus == 'Sold') {
      return './assets/sold.png';
    }
    if (property.propertyStatus == 'Purchased') {
      return './assets/purchased.png';
    }
  }
}
