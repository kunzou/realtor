import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent {

  constructor(private propertyService: PropertyService) { }
  properties: Property[] = [];
  dataSource = new PostDataSource(this.propertyService);
  // displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  displayedColumns = ['name'];
  
  getProperties(): void {
    this.propertyService.getProperties()
    .subscribe(properties => this.properties = properties);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.propertyService.addProperty({ name } as Property)
      .subscribe(property => {
        this.properties.push(property);
      })
  }  
}

export class PostDataSource extends DataSource<any> {
  constructor(private propertyService: PropertyService) {
    super();
  }

  connect(): Observable<Property[]> {
    return this.propertyService.getProperties();
  }

  disconnect() {
  }
}