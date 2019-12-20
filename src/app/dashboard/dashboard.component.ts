import { Component, OnInit } from '@angular/core';
import { Property } from '../property';
import { PropertyService } from '../property.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent {

  constructor(
    private propertyService: PropertyService,
    public dialog: MatDialog
    ) { }
  properties: Property[] = [];
  dataSource = new PostDataSource(this.propertyService);
  // displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  displayedColumns = ['address', 'yearBuilt', 'edit'];
  
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
        this.properties.push(property);
      })
  }  

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Property'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.propertyService.addProperty({ address: result.data.address } as Property);
      this.dataSource = new PostDataSource(this.propertyService);
    });
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