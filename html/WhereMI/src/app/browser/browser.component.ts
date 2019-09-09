import { Place } from '../place';
import { PlaceService } from '../place.service';
import { Clip } from '../clip'
import { ClipService } from '../clip.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

 
  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;
  places:Place[];
  clips:Clip[];

  constructor(
    private placeService: PlaceService,
    private clipService: ClipService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
      });

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.showTrackingPosition(position);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }

    this.getPlaces();
    this.getClips();
  
  }

  
  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.zoom = 12;
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //this.map.panTo(location);
  }

 // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }



  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  
  getPlaces(): void {
    this.placeService.getPlaces()
        .subscribe(places => this.places = places);
  }

  getClips(): void {
    this.clipService.getClips()
        .subscribe(clips => this.clips = clips);
  }

}
