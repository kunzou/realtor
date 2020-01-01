import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { 
  MatCardModule, 
  MatToolbarModule,  
  MatIconModule,  
  MatButtonModule, 
  MatProgressBarModule, 
  MatInputModule,
  MatSidenavModule,
  MatTableModule,
  MatSelectModule,
  MatFormFieldModule,
  MatRadioModule,
  MatGridListModule,
  MatNativeDateModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertySearchComponent } from './property-search/property-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { GalleryModule } from  '@ngx-gallery/core';
import { GallerizeModule } from  '@ngx-gallery/gallerize';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PropertyComponent } from './property/property.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    PropertyDetailComponent,
    DashboardComponent,
    PropertySearchComponent,
    EditPropertyComponent,
    PropertyCardComponent,
    AboutComponent,
    HomeComponent,
    PropertyComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,
    MatProgressBarModule,   
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    FlexLayoutModule,
    MatSelectModule,  
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBQtADp6_iewgAvgtmRu3YTx7eLHXxYQvQ'
    }),
    GalleryModule,
    GallerizeModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
