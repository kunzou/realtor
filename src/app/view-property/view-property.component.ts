import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  @Input() property: Property;
  // lat: number;
  // lng: number;
  constructor(
    private propertyService: PropertyService,
    private location: Location, 
    private route: ActivatedRoute,   
  ) { }

  ngOnInit() {
    this.getProperty();
    // this.lat = this.property.location.lat;
    // this.lng = this.property.location.lng;
  }

  getProperty(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
      .subscribe(property => this.property = property);
  }  

  goBack(): void {
    this.location.back();
  }  


}
