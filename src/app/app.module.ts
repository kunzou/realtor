import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient }    from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { 
  MatCardModule, 
  MatListModule, 
  MatToolbarModule, 
  MatIconModule, 
  MatButtonModule, 
  MatProgressBarModule, 
  MatInputModule,
  MatSidenavModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatRadioModule,
  MatGridListModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MAT_RADIO_DEFAULT_OPTIONS
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertySearchComponent } from './property-search/property-search.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PropertyComponent } from './property/property.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { FooterComponent } from './footer/footer.component';
import { OpenHouseComponent } from './open-house/open-house.component';
import { MyServiceComponent } from './my-service/my-service.component';
import { PropertyManagementComponent } from './property-management/property-management.component';
import { SiteManagementComponent } from './site-management/site-management.component';
import { BlogManagementComponent } from './blog-management/blog-management.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogComponent } from './blog/blog.component';
import { DescriptionPipe } from './utility/translateUtility'
import {AuthService} from './auth.service';
import { CallbackComponent } from './callback/callback.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    DescriptionPipe,
    PropertiesComponent,
    PropertyDetailComponent,
    DashboardComponent,
    PropertySearchComponent,
    PropertyCardComponent,
    AboutComponent,
    HomeComponent,
    PropertyComponent,
    ListingCardComponent,
    BlogListComponent,
    BlogPageComponent,
    EditOwnerComponent,
    FooterComponent,
    OpenHouseComponent,
    MyServiceComponent,
    PropertyManagementComponent,
    SiteManagementComponent,
    BlogManagementComponent,
    BlogEditComponent,
    BlogComponent,
    CallbackComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,  
    MatIconModule,  
    MatCardModule,  
    MatButtonModule,  
    MatProgressBarModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,  
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDR3T__m16460PprVv6V6CisApDq0_IvVA'
    }),
    GalleryModule.forRoot(),    
    CKEditorModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }}
    ),
    NgbModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  },
  AuthService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
