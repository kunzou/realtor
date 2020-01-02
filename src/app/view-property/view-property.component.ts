import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Image } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  @Input() property: Property;
  imagesRect: Image[];
  
  constructor(
    private propertyService: PropertyService,
    private location: Location,
    private route: ActivatedRoute,
    ) { }
    
    ngOnInit() {
      this.getProperty();
    }
    
    getProperty(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.propertyService.getProperty(id)
      .subscribe(property => {
        this.property = property;
        this.imagesRect = property.additionalImages.map(
          (item,index) => new Image(index, { img: item.link }, { img: item.smallLink })
          );
        });
      }
      
      goBack(): void {
        this.location.back();
      }
    }
    