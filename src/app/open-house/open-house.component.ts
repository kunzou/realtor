import { Component, OnInit } from '@angular/core';
import { NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { PropertyService } from '../service/property.service';
import { PropertyCard } from '../domain/property-card';

@Component({
  selector: 'app-open-house',
  templateUrl: './open-house.component.html',
  styleUrls: ['./open-house.component.css']
})
export class OpenHouseComponent implements OnInit{

  icon = './assets/open-house.png';

  hoveredDate: NgbDate;
  selectedProperties: PropertyCard[];
  properties: PropertyCard[]; 

  
  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }  

  getEvents(): void {
    this.propertyService.getOpenHouses().subscribe(properties => {
      this.properties = properties;
    });
  }

  onDateSelection(date: NgbDate) {
    this.selectedProperties = this.properties.filter(property => this.equalDates(date, property.openHouseDate))
  }

  showTooltip(date: NgbDate) {
    if(!this.isEventDay(date)) {
      return '';
    } else {
      return this.properties
        .filter(property => this.equalDates(date, property.openHouseDate))
        .map(property=>this.getTooltip(property)).join(';')
    }        
  }

  getTooltip(property: PropertyCard) {
    return new Date(property.openHouseDate).toLocaleTimeString().slice(0,-3) + ' ' + property.address
  }

  isEventDayClicked(date: NgbDate) {
    return true;
  }

  isHovered(date: NgbDate) {
    return false;
  }

  isInside(date: NgbDate) {
    return false;
  }

  isEventDay(date: NgbDate) {
    return this.properties.map(property=>property.openHouseDate).some(eventDate => this.equalDates(date, eventDate));
  }  

  equalDates(ngbDate: NgbDate, cDate: Date) {
    var date = new Date(cDate);
    return date.getUTCDate() == ngbDate.day && date.getUTCMonth()+1 == ngbDate.month && date.getFullYear() == ngbDate.year;
  }

  getOpenHouses(): void {
    this.propertyService.getOpenHouses().subscribe(properties => {
      this.properties = properties;
    });
  }
}
