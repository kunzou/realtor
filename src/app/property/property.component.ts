import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../domain/property';
import { PropertyService } from '../service/property.service';
import { ActivatedRoute } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../service/user-service';
import { User } from '../domain/user';
import { TranslateService } from '@ngx-translate/core';
import { EmailDetail } from '../domain/emailDetail';
import { EmailService } from '../service/email.service';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;
  me: User;
  imagesRect: Image[];
  safeURL: SafeResourceUrl;
  emailDetail: EmailDetail = new EmailDetail();

  constructor(
    private propertyService: PropertyService,
    private userService: UserService,
    private route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private emailService: EmailService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
    this.getProperty();
    this.getOwner();
  }

  getProperty(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id)
      .subscribe(property => {
        this.property = property;
        if(property.youtubeLink != null) {
          this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(property.youtubeLink.replace("watch?v=", "embed/"));
        }
        this.imagesRect = property.additionalImages.map(
          (item,index) => new Image(index, { img: item.link }, { img: item.smallLink })
          );
        });
  }

  getOwner(): void {
    this.userService.getOwner()
      .subscribe(user => {
        this.me = user;
      });
  }

  sendEmail(): void {
    this.emailDetail.address = this.property.address;
    this.emailService.sendEmail(this.emailDetail);
  }
}
