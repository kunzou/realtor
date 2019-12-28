import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property';
import { GalleryItem, Gallery, ImageItem } from '@ngx-gallery/core';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  items: GalleryItem[];

  constructor(
    private propertyService: PropertyService,
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
}
