import { Place } from '../place';
import { PlaceService } from '../place.service';
import { ClipService } from '../clip.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from "@angular/router";

import { AfterViewInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { TestBed } from '@angular/core/testing';

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
   
  placeData = { id:0, name:'test', latitude:0,longitude:0};

  clipData = { id:0, idP:0, latitude:0,longitude:0, title:'test', purpose:'why', language:'ita', category:'art', audience:'gen', level:1,streamUrl:'https://www.youtube.com/embed/_Re22XL5jLs'};
  
  msbapAudioUrl:string;
  public searchElementRef: ElementRef;
  places:Place[];
  public formData = new FormData();
  private stream: MediaStream;
  private recordRTC: any;

  constructor(
    private router: Router,
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
    this.msbapAudioUrl="";

  }

  
  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.zoom = 12;
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



  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
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
    var recordedBlob = recordRTC.getBlob();
     this.formData.append('key', recordedBlob);

  }

  download() : void {
    this.recordRTC.save('audio.webm');
  }

  submitClip(): void {
  console.log('submitClip');
  
  this.clipService.addClip(this.clipData).subscribe(resp => {
    console.log(resp);
    this.router.navigate(['editor']);
  }, err => {
    console.log(err.error.msg);
  });
  
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

