import { Component, OnInit } from '@angular/core';
import { Property } from '../domain/property';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  properties: Property[];
  constructor(private propertyService: PropertyService,) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getSaleProperties()
    .subscribe(properties => this.properties = properties);
  }

}
