import { Component, OnInit } from '@angular/core';
import { Property } from '../domain/property'
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  currentSource: string;
  selectedProperties: Property[] = [];
  
  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.getProperties();
    this.currentSource = 'fuju';
  }

  getProperties(): void {
    this.propertyService.getProperties().subscribe(properties => {
      this.properties = properties;
      this.setSource();
    });
  }

  setSource(): void {
    if(this.currentSource === 'all') {
      this.selectedProperties = this.properties;
    } else {
      this.selectedProperties = this.properties.filter(property => property.source === this.currentSource)
    }
  }
}