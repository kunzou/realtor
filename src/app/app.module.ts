import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
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
  MatNativeDateModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
// import { QuillModule } from 'ngx-quill'

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
import { ViewPropertyComponent } from './view-property/view-property.component';
// import { RichTextAreaComponent } from './rich-text-area/rich-text-area.component';

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
    PostDialogComponent,
    ViewPropertyComponent,
    // RichTextAreaComponent
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
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // QuillModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBQtADp6_iewgAvgtmRu3YTx7eLHXxYQvQ'
    })
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
