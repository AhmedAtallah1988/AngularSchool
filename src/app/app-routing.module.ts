import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { UniversityFormComponent } from './university-form/university-form.component';
import { UniversityComponent } from './university/university.component';

const routes: Routes = [{
  path: 'person',
  component:PersonComponent,
},
{
  path: 'studentform',
  component:StudentFormComponent,
},
{
  path: 'students/edit/:id',
  component:StudentFormComponent,
},
{
  path: 'universities',
  component:UniversityComponent,
},
{
  path:'universityform',
  component:UniversityFormComponent,
},
{
  path:'universities/edit/:id',
  component:UniversityFormComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
