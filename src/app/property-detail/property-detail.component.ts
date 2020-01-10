import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { Property } from '../property';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../property.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from '../upload.service';
import { Image } from '../Image';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  primaryImage: Image;
  additionalImages: Image[];

  propertyTypes: string[] = [
    'House',
    'Town House',
    'Condo'
  ];

  propertyStatuses: string[] = [
    'Sale',
    'Sold',
    'Purchased',
  ];

  @Input() property: Property;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private location: Location,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.getProperty();
  }

  getProperty(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
      .subscribe(property => {
        this.property = property;
        this.primaryImage = property.primaryImage;
        this.additionalImages = property.additionalImages;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.property.primaryImage = this.primaryImage;
    this.property.additionalImages = this.additionalImages;
    this.propertyService.updateProperty(this.property).subscribe(() => this.goBack());
  }

  uploadFile(file, isPrimary): void {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.address} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
          if(isPrimary) {
            // this.property.primaryImage = event.body;
            this.primaryImage = event.body;
          } else {
            // this.property.additionalImages.push(event.body);
            this.additionalImages.push(event.body);
          }
          
        }
      });
  }

  private uploadFiles(isPrimary): void {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file, isPrimary);
    });
  }

  uploadPrimary(): void {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
        Array.from(fileUpload.files).forEach(element => {
        this.files.push({ data: element, inProgress: false, progress: 0 });
      });  
        
      this.uploadFiles(true);
    };
    fileUpload.click();
  }  

  uploadAdditional(): void {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
        Array.from(fileUpload.files).forEach(element => {
        this.files.push({ data: element, inProgress: false, progress: 0 });
      });  
        
      this.uploadFiles(false);
    };
    fileUpload.click();
  }  

  delete(): void {
    this.propertyService.deleteProperty(this.property).subscribe();
    this.goBack();
  }
  
  deleteImage(image: Image): void {
    this.additionalImages = this.additionalImages.filter(item => item !== image)
  }
}
