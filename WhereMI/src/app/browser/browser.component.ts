import { Component, OnInit } from '@angular/core';
import { Place } from '../place';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  
  lat = 51.678418;
  lng = 7.809007;
  
  places:Place[];

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getPlaces();
  }


  getPlaces(): void {
    this.placeService.getPlaces()
        .subscribe(places => this.places = places);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.placeService.addPlace({ name } as Place)
      .subscribe(place => {
        this.places.push(place);
      });
  }

  delete(place: Place): void {
    this.places = this.places.filter(h => h !== place);
    this.placeService.deletePlace(place).subscribe();
  }

}
