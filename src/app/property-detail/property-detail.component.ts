import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { Property } from '../domain/property';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../service/property.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from '../service/upload.service';
import { Image } from '../domain/image';
import { PropertyType } from '../domain/propertyType';
import { Basement } from '../domain/basement';
import { PropertySource } from '../domain/propertySource';
import { PropertyStatus } from '../domain/propertyStatus';
import { PropertyStyle } from '../domain/propertyStyle';
import { PropertyUsage } from '../domain/propertyUsage';
import { Garage } from '../domain/garage';
import { HoldType } from '../domain/holdType';
import { Remaining } from '../domain/remaining';
import { Feature } from '../domain/feature';
import { Highlight } from '../domain/highlight';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  language: string;
  selectedFeature:string;
  featureYear:string;

  propertyTypes = Object.values(PropertyType);
  basementConditions = Object.values(Basement);
  propertyStatuses = Object.values(PropertyStatus);
  sources = Object.values(PropertySource);
  propertyStyles = Object.values(PropertyStyle);
  usages = Object.values(PropertyUsage);
  garageTypes = Object.values(Garage);
  holdTypes = Object.values(HoldType);
  remainings = Object.values(Remaining);
  features = Object.values(Feature);
    
  property: Property;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private location: Location,
    private uploadService: UploadService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getProperty();
    this.language = 'zh';
  }

  getProperty(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
      .subscribe(property => {
        this.property = property;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.propertyService.updateProperty(this.property).subscribe(() => this.goBack());
  }

  addFeature(): void {
    this.property.features.push(new Highlight(this.featureYear, this.selectedFeature));
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
            this.property.primaryImage = event.body;
          } else {
            this.property.additionalImages.push(event.body);
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
    this.property.additionalImages = this.property.additionalImages.filter(item => item !== image)
  }

  deleteFeature(hightlight: Highlight): void {
    this.property.features = this.property.features.filter(item => item !== hightlight)
  }
}
