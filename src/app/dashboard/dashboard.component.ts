import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit{

  constructor(
    private propertyService: PropertyService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
    ) { }
  properties: Property[] = [];
  dataSource = new PostDataSource(this.propertyService);
  // displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  displayedColumns = ['address', 'status', 'yearBuilt', 'price', 'edit'];
  
  ngOnInit() {
    this.getProperties();
  }

  getProperties(): void {
    this.propertyService.getProperties()
    .subscribe(properties => this.properties = properties);
  }

  add(address: string): void {
    address = address.trim();
    if (!address) {
      return;
    }
    this.propertyService.addProperty({ address: address } as Property)
      .subscribe(property => {
        // this.dataSource.connect();
        // this.properties.push(property);
        this.dataSource = new PostDataSource(this.propertyService);
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