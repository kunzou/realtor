import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../domain/property';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent {
  @Input() property: Property;
  constructor() { }
}
