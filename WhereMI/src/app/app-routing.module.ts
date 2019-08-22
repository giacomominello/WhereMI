import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserComponent } from './browser/browser.component';
import { EditorComponent } from './editor/editor.component';
const routes: Routes = [
  { path: 'browser', component: BrowserComponent },
  { path: 'editor' , component: EditorComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
