import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [{
  path: 'person',
  component:PersonComponent,
},
{
  path: 'personform',
  component:PersonFormComponent,
},
{
  path: 'aboutus',
  component:AboutUsComponent,
},
{
  path: 'person/edit/:id',
  component:PersonFormComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
