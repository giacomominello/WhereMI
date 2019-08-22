import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Location } from './location';
import { LOCATIONS } from './mock-locations';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  constructor(private messageService: MessageService) { }

  getLocations(): Observable<Location[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('LocationService: fetched locations');
    return of(LOCATIONS);
  }
}
