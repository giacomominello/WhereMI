import { window } from 'rxjs/operators';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Where M I ?';
  myValue = "Controllo pre ricarica funziona";

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  ngOnInit(){

    if (localStorage.length > 0)

    (<HTMLElement>document.querySelector('#ciao')).style.visibility = 'visible';

    else (<HTMLElement>document.querySelector('#ciao')).style.visibility = 'hidden';

  }

  logout() {
    if (localStorage.length > 0)

    alert("Utente sloggato correttamente");

    else alert("Nessun utente loggato")
    console.log('Logged out succesfully');
    localStorage.clear();
    (<HTMLElement>document.querySelector('#ciao')).style.visibility = 'hidden';


  }

 /* @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log(this.myValue);

    if (localStorage.length > 0) {

      (<HTMLElement>document.querySelector('#ciao')).style.visibility = 'visible';
    }

    else (<HTMLElement>document.querySelector('#ciao')).style.visibility = 'hidden';


    event.returnValue = false;
}*/

}
