import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { Property } from '../property';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  properties: Property[];
  // sold = './assets/sold.png';
  constructor(private propertyService: PropertyService,) { }

  ngOnInit() {
    this.getPropertyes();
  }

  getPropertyes(): void {
    this.propertyService.getSoldPurchasedProperties()
    .subscribe(properties => this.properties = properties);
  }

  getIcon(property): string {
    if(property.propertyStatus == 'Sold') {
      return './assets/sold.png';
    }
    if(property.propertyStatus == 'Purchased') {
      return './assets/purchased.png';
    }
  }
}
