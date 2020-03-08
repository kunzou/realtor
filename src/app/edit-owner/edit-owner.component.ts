import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../domain/user'
import { UserService } from '../service/user-service';
import { UploadService } from '../service/upload.service';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent implements OnInit {
  owner: User;
  language: string;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  constructor(
    private userService: UserService,
    private location: Location,
    private uploadService: UploadService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getOwner();
    this.language = 'zh';
  }

  getOwner(): void {
    this.userService.getOwner()
      .subscribe(user => {
        this.owner = user;
      });
  }

  private uploadFiles(imageType): void {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file, imageType);
    });
  }

  uploadBarcode(): void {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      Array.from(fileUpload.files).forEach(element => {
        this.files.push({ data: element, inProgress: false, progress: 0 });
      });

      this.uploadFiles(ImageType.barcode);
    };
    fileUpload.click();
  }

  uploadPortrait(): void {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      Array.from(fileUpload.files).forEach(element => {
        this.files.push({ data: element, inProgress: false, progress: 0 });
      });

      this.uploadFiles(ImageType.portrait);
    };
    fileUpload.click();
  }  

  uploadSignature(): void {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      Array.from(fileUpload.files).forEach(element => {
        this.files.push({ data: element, inProgress: false, progress: 0 });
      });

      this.uploadFiles(ImageType.signature);
    };
    fileUpload.click();
  }    

  uploadFile(file, imageType): void {
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
          // field = event.body;
          switch (imageType) {
            case ImageType.barcode:
              this.owner.barcode = event.body;
              break;
            case ImageType.signature:
              this.owner.signature = event.body;
              break;
            case ImageType.portrait:
              this.owner.portrait = event.body;
              break;
          }
        }
      });
  }

  save(): void {
    this.userService.updateUser(this.owner).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

enum ImageType {
  barcode,
  signature,
  portrait,
}