import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Clip } from './clip';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  private clipsUrl = 'api/clips';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  
  /** GET clips from the server */
  getClips (): Observable<Clip[]> {
    return this.http.get<Clip[]>(this.clipsUrl)
      .pipe(
        tap(_ => this.log('fetched clips')),
        catchError(this.handleError<Clip[]>('getClips', []))
      );
  }

  /** GET clip by id. Return `undefined` when id not found */
  getClipNo404<Data>(id: number): Observable<Clip> {
    const url = `${this.clipsUrl}/?id=${id}`;
    return this.http.get<Clip[]>(url)
      .pipe(
        map(clips => clips[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} clip id=${id}`);
        }),
        catchError(this.handleError<Clip>(`getClip id=${id}`))
      );
  }

  /** GET clip by id. Will 404 if id not found */
  getClip(id: number): Observable<Clip> {
    const url = `${this.clipsUrl}/${id}`;
    return this.http.get<Clip>(url).pipe(
      tap(_ => this.log(`fetched clip id=${id}`)),
      catchError(this.handleError<Clip>(`getClip id=${id}`))
    );
  }

  /* GET clips whose name contains search term */
  searchClips(term: string): Observable<Clip[]> {
    if (!term.trim()) {
      // if not search term, return empty clip array.
      return of([]);
    }
    return this.http.get<Clip[]>(`${this.clipsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found clips matching "${term}"`)),
      catchError(this.handleError<Clip[]>('searchClips', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new clip to the server */
  addClip (clip: Clip): Observable<Clip> {
    return this.http.post<Clip>(this.clipsUrl, clip, this.httpOptions).pipe(
      tap((newClip: Clip) => this.log(`added clip w/ id=${newClip.id}`)),
      catchError(this.handleError<Clip>('addClip'))
    );
  }

  /** DELETE: delete the clip from the server */
  deleteClip (clip: Clip | number): Observable<Clip> {
    const id = typeof clip === 'number' ? clip : clip.id;
    const url = `${this.clipsUrl}/${id}`;

    return this.http.delete<Clip>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted clip id=${id}`)),
      catchError(this.handleError<Clip>('deleteClip'))
    );
  }

  /** PUT: update the clip on the server */
  updateClip (clip: Clip): Observable<any> {
    return this.http.put(this.clipsUrl, clip, this.httpOptions).pipe(
      tap(_ => this.log(`updated clip id=${clip.id}`)),
      catchError(this.handleError<any>('updateClip'))
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

  /** Log a clipService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ClipService: ${message}`);
  }
}