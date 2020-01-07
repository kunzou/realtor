import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  imagesRect: Image[];
  safeURL: SafeResourceUrl;
  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getProperty();
  }

  getProperty(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
      .subscribe(property => {
        this.property = property;
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(property.youtubeLink.replace("watch?v=", "embed/"));
        this.imagesRect = property.additionalImages.map(
          (item,index) => new Image(index, { img: item.link }, { img: item.smallLink })
          );
        });
  }
}
