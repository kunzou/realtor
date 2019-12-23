import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GalleryItem, Gallery, ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  @Input() property: Property;
  items: GalleryItem[];
    
  constructor(
    private propertyService: PropertyService,
    private location: Location, 
    private route: ActivatedRoute,   
    public gallery: Gallery,
    ) { }
    
    ngOnInit() {
      this.getProperty(); 
    }
    
    getProperty(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.propertyService.getProperty(id)
      .subscribe(property => {
        this.property = property;
        this.items = property.imgUrls.map(
        item => new ImageItem({ src: item, thumb: item }));          
      });  
    }  
    
    goBack(): void {
      this.location.back();
    }      
  }

  