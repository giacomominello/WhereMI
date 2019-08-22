import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
 createDb(){
   const places = [
    { id: 11, name: 'Bologna' },
    { id: 12, name: 'Treviso' },
    { id: 13, name: 'Carità' },
    { id: 14, name: 'Lancenigo' },
    { id: 15, name: 'Spercenigo' },
    { id: 16, name: 'Dio pinguino' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dresdna' },
    { id: 19, name: 'Minsk' },
    { id: 20, name: 'Atene' }
  ];
  return {places};
 }

 // Overrides the genId method to ensure that a place always has an id.
  // If the places array is empty,
  // the method below returns the initial number (11).
  // if the places array is not empty, the method below returns the highest
  // place id + 1.
  genId(places: Place[]): number {
    return places.length > 0 ? Math.max(...places.map(place => place.id)) + 1 : 11;
  }
}