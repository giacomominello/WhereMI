import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  
  selectedLocation: Location;
  
  locations:Location[];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.getLocations();
  }

  onSelect(location: Location): void {
    this.selectedLocation = location;
  }

  getLocations(): void {
    this.locationService.getLocations()
        .subscribe(locations => this.locations = locations);
  }

}
