import { Place } from '../place';
import { PlaceService } from '../place.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from "@angular/router";
import { AfterViewInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';

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
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: boolean;

  markers: marker[] = [
    { name: 'Ciao',
      latitude: 42.868164,
      longitude: -71.018029,
      draggable: true },

      { name: 'Bella',
      latitude: 43.868164,
      longitude: -63.018029,
      draggable: true },

      { name: 'Bro',
      latitude: 39.868164,
      longitude: -73.018029,
      draggable: true },
  ];

  placeData = { id:0, name:'test', latitude:0,longitude:0};

  msbapAudioUrl:string;
  public searchElementRef: ElementRef;
  places:Place[];

  private stream: MediaStream;
  private recordRTC: any;

  constructor(
    private router: Router,
    private placeService: PlaceService,
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
    this.msbapAudioUrl="";

  }


  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.zoom = 12;
    //let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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

  clickedMarker(marker:marker, index:number) {
    console.log('Clicked Marker ' +marker.name + ' at index ' +index);
  }

  mapClicked($event:any) {

    var newMarker = {

      name: 'Untitled',
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: false,
    }

    this.markers.push(newMarker)
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

  addMarker() {

    console.log("Adding marker");
    // tslint:disable-next-line: triple-equals
    if (this.markerDraggable == true) {

      var isDraggable = true;


    }
    else { var isDraggable = false}

    var newMarker = {

      name:this.markerName,
      latitude: parseFloat(this.markerLat),
      longitude: parseFloat(this.markerLng),
      draggable: isDraggable

    }

    this.markers.push(newMarker);



  }



  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'audio/wav', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
  }

  errorCallback() {
    //handle error here
  }

  processVideo(audioURL) {
    let recordRTC = this.recordRTC;
    var recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
    console.log(audioURL);
  }

  startRecording() {
    let mediaConstraints = {
      video: false, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));


  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());

  }

  download() : void {
    this.recordRTC.save('audio.wav');
  }

  submitClip(): void {
  console.log('submitClip');
  }


  submitPlace() {
    this.placeData.latitude=this.latitude;
    this.placeData.longitude=this.longitude;
    this.placeService.addPlace(this.placeData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['editor']);
    }, err => {
      console.log(err.error.msg);
    });
  }
}
interface marker {

  name?:string;
  latitude: number;
  longitude: number;
  draggable: boolean;
}

