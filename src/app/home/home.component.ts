import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Property } from '../domain/property';
import { PropertyService } from '../service/property.service';
import { PropertyCard } from '../domain/property-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  properties: Property[];
  slides = [];
  homePropertCards: PropertyCard[];
  constructor(
    private propertyService: PropertyService,
    config: NgbCarouselConfig
    ) {
      config.interval = 4000;
      config.wrap = true;
      config.keyboard = false;
      config.pauseOnHover = false;      
    }

  ngOnInit() {
    this.getProperties();
    this.getHomePropertCards();
  }

  getProperties(): void {
    this.propertyService.getSaleProperties().subscribe(properties => {
      this.properties = properties;
      properties.forEach(item => {
        item.additionalImages.map(image => this.slides.push({url:image.link, text:item.address, id:item.id, price:item.askingPrice, openHouse: item.openHouseDate}))
      })
      this.slides = this.slides.sort((one, two) => Math.random()>0.5?-1:1)
    });
  }

  getHomePropertCards(): void {
    this.propertyService.getHomePageProperties().subscribe(properties => {
      this.homePropertCards = properties;
    });    
  }
}