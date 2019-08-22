import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { BrowserComponent } from './browser/browser.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    BrowserComponent,
    LocationDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
