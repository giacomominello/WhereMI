import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { BrowserComponent } from './browser/browser.component';
import { EditorComponent } from './editor/editor.component';
import { LocationDetailComponent }  from './location-detail/location-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: LocationDetailComponent },
  { path: 'browser', component: BrowserComponent },
  { path: 'editor' , component: EditorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
