import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientModule }    from '@angular/common/http';
import { YTPlayerModule } from 'angular-youtube-player';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { BrowserComponent } from './browser/browser.component';

import { MessagesComponent } from './messages/messages.component';

import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    BrowserComponent,
    MessagesComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    YTPlayerModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzSnXXXXXXXXXXXXXXXXXSZGGWU',
      libraries: ['places']
    }),

    AppRoutingModule,

  

  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
