import { Place } from '../place';
import { PlaceService } from '../place.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
 
 
  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;
  places:Place[];
 
  constructor(
    private placeService: PlaceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
   
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
   
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
   
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.showTrackingPosition(position);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }

    this.getPlaces();
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

}
