import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { BrowserComponent } from './browser/browser.component';
import { EditorComponent } from './editor/editor.component';
import { LocationDetailComponent }  from './location-detail/location-detail.component';

import { BookComponent }   from './book/book.component';
import { LoginComponent }   from './login/login.component';
import { SignupComponent }   from './signup/signup.component';
import { BookCreateComponent } from './book-create/book-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: LocationDetailComponent },
  { path: 'browser', component: BrowserComponent },
  { path: 'books', component: BookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'editor' , component: EditorComponent },
  { path: 'book-create',component: BookCreateComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
