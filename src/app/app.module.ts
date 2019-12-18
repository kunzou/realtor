import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { MatCardModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatInputModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertySearchComponent } from './property-search/property-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PropertyCardComponent } from './property-card/property-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    PropertyDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PropertySearchComponent,
    EditPropertyComponent,
    PropertyCardComponent
  ],
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
    MatInputModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
