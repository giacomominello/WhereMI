import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable ,of } from 'rxjs';
import { tap, catchError, window } from 'rxjs/operators';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {username:'', password:''};
  username = '';
  password = '';
  userData ='';
  message = '';
  public data:any=[];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.http.post('/api/signin',this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['/editor']);
    }, err => {
      this.message = err.error.msg;
    });

    this.saveInLocal();
  }

  saveInLocal(): void {
    console.log('recieved= key username:' + 'value:' + this.loginData.username);
    console.log('recieved= key password:'  + 'value:' + this.loginData.password);


    localStorage.clear();
    this.storage.set(this.loginData.username, this.loginData.username);
    this.storage.set(this.loginData.password, this.loginData.password);
    alert("Utente " + JSON.stringify(localStorage.getItem(this.loginData.username)) + " loggato correttamente");
    this.data[this.loginData.username]= this.storage.get(this.loginData.username);
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
