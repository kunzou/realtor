import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
  MatRadioModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

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
import { PostDialogComponent } from './post-dialog/post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesComponent,
    PropertyDetailComponent,
    MessagesComponent,
    DashboardComponent,
    PropertySearchComponent,
    EditPropertyComponent,
    PropertyCardComponent,
    PostDialogComponent
  ],
  entryComponents: [PostDialogComponent],
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
    MatFormFieldModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
