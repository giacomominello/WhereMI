import { Component, OnInit } from '@angular/core';

import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  places:Place[];

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getPlaces();
  }


  getPlaces(): void {
    this.placeService.getPlaces()
        .subscribe(places => this.places = places.slice(1, 5));
  }

}
