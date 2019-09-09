import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable ,of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupData = { username:'', password:'' };
  message = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.http.post('/api/signup',this.signupData).subscribe(resp => {
      console.log(resp);
      alert(JSON.stringify(resp));
      this.router.navigate(['/browser']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
