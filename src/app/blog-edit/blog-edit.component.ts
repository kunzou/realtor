import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

import { Blog } from '../domain/blog';
import { Image } from '../domain/image';
import { BlogService } from '../service/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { debounceTime, map, catchError } from 'rxjs/operators';
import { BlogCategory } from '../domain/blog-category';
import { UploadService } from '../service/upload.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  blog: Blog;
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef; files = [];
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  categories = Object.values(BlogCategory)
  language: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private location: Location,
    private uploadService: UploadService,
    public auth: AuthService
  ) { 
    this.getBlog();
  }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this.language = 'zh';
  }

  getBlog(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlog(id)
      .subscribe(blog => {
        this.blog = blog;
      });
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    this.blogService.deleteBlog(this.blog).subscribe();
    this.goBack();
  } 
  
  save(): void {
    this.blogService.updateBlog(this.blog).subscribe(() => this.showMessage());

  }  

  showMessage() {
    this._success.next(`${new Date()} - 存好了！`);
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
            this.blog.coverImage = event.body;
          } else {
            this.blog.images.push(event.body);
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
  
  deleteImage(image: Image): void {
    this.blog.images = this.blog.images.filter(item => item !== image)
  }  
}
