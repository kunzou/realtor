import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../User'
import { UserService } from '../user-service';
import { UploadService } from '../upload.service';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent implements OnInit {
  owner: User;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  constructor(
    private userService: UserService,
    private location: Location,
    private uploadService: UploadService
    ) { }

  ngOnInit() {
    this.getOwner();
  }

  getOwner(): void {
    this.userService.getOwner()
      .subscribe(user => {
        this.owner = user;
      });
  }  

  private uploadFiles(field): void {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file, field);
    });
  }

  uploadBarcode(): void {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
        Array.from(fileUpload.files).forEach(element => {
        this.files.push({ data: element, inProgress: false, progress: 0 });
      });  
        
      this.uploadFiles(this.owner.weChatBarcode);
    };
    fileUpload.click();
  }  

  uploadFile(file, field): void {
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
          field = event.body;
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
