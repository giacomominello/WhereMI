import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable ,of } from 'rxjs';
import { tap, catchError, window } from 'rxjs/operators';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username = '';
  password = '';

  message = '';
  public data:any=[];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.http.post('/api/signup',this.username).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['login']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  /*logout() {
    if (localStorage.length > 0)

    alert("Utente sloggato correttamente");

    console.log('Logged out succesfully');
    localStorage.clear();
    (<HTMLElement>document.querySelector('#ciao')).style.visibility = 'hidden';


  } */
  saveInLocal(): void {
    console.log('recieved= key username:' + 'value:' + this.username);
    console.log('recieved= key password:'  + 'value:' + this.password);
    localStorage.clear();
    this.storage.set(this.username, this.username);
    this.storage.set(this.password, this.password);
    alert("Utente " + JSON.stringify(localStorage.getItem(this.username)) + " loggato correttamente");
    this.data[this.username]= this.storage.get(this.username);
    (<HTMLElement>document.querySelector('#ciao')).style.visibility = 'visible';
   }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
