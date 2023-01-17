import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PsListComponent} from '../app/ps-list/ps-list.component';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
const routes: Routes = [
  {path:'',component:AppComponent},
  {path:'psList',component:PsListComponent},
  {path:'form',component:FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
