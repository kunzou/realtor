import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  imagesRect: Image[];
  constructor(
    private propertyService: PropertyService,
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
}
