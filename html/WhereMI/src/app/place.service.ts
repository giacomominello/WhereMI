import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Place } from './place';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  
  private placesUrl = 'api/places';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  httpOptionsAuth = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken'),'Content-Type': 'application/json' })
    };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  
  /** GET placess from the server */
  getPlaces (): Observable<Place[]> {
    return this.http.get<Place[]>(this.placesUrl)
      .pipe(
        tap(_ => this.log('fetched places')),
        catchError(this.handleError<Place[]>('getPlaces', []))
      );
  }

  /** GET place by id. Return `undefined` when id not found */
  getPlaceNo404<Data>(id: number): Observable<Place> {
    const url = `${this.placesUrl}/?id=${id}`;
    return this.http.get<Place[]>(url)
      .pipe(
        map(places => places[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} place id=${id}`);
        }),
        catchError(this.handleError<Place>(`getPlace id=${id}`))
      );
  }

  /** GET place by id. Will 404 if id not found */
  getPlace(id: number): Observable<Place> {
    const url = `${this.placesUrl}/${id}`;
    return this.http.get<Place>(url).pipe(
      tap(_ => this.log(`fetched place id=${id}`)),
      catchError(this.handleError<Place>(`getPlace id=${id}`))
    );
  }

  /* GET places whose name contains search term */
  searchPlaces(term: string): Observable<Place[]> {
    if (!term.trim()) {
      // if not search term, return empty place array.
      return of([]);
    }
    return this.http.get<Place[]>(`${this.placesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found places matching "${term}"`)),
      catchError(this.handleError<Place[]>('searchPlaces', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new place to the server */
  addPlace (place: Place): Observable<Place> {
    return this.http.post<Place>(this.placesUrl, place, this.httpOptionsAuth).pipe(
      tap((place: Place) => this.log(`added place w/ id=${place.id}`)),
      catchError(this.handleError<Place>('addPlace'))
    );
  }

  /** DELETE: delete the place from the server */
  deletePlace (place: Place | number): Observable<Place> {
    const id = typeof place === 'number' ? place : place.id;
    const url = `${this.placesUrl}/${id}`;

    return this.http.delete<Place>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted place id=${id}`)),
      catchError(this.handleError<Place>('deletePlace'))
    );
  }

  /** PUT: update the place on the server */
  updatePlace (place: Place): Observable<any> {
    return this.http.put(this.placesUrl, place, this.httpOptions).pipe(
      tap(_ => this.log(`updated place id=${place.id}`)),
      catchError(this.handleError<any>('updatePlace'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PlaceService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PlaceService: ${message}`);
  }
}