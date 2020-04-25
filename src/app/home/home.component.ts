import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Property } from '../domain/property';
import { PropertyService } from '../service/property.service';
import { PropertyCard } from '../domain/property-card';
import { Slide } from '../domain/slide';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  properties: Property[];
  slides: Slide[];
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
    this.getHomePropertCards();
    this.getHomeSlides();
  }

  getProperties(): void {
    this.propertyService.getSaleProperties().subscribe(properties => {
      this.properties = properties;
    });
  }

  getHomePropertCards(): void {
    this.propertyService.getHomePageProperties().subscribe(properties => {
      this.homePropertCards = properties;
    });
  }

  getHomeSlides(): void {
    this.propertyService.getHomePageSlides().subscribe(slides => {
      this.slides = slides;
    });    
  }
}