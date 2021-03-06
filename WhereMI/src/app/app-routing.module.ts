import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowserComponent } from './browser/browser.component';
import { EditorComponent } from './editor/editor.component';



import { LoginComponent }   from './login/login.component';
import { SignupComponent }   from './signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/browser', pathMatch: 'full' },
  { path: 'browser', component: BrowserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'editor' , component: EditorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
