import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentService } from './services/student.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { StudentFormComponent } from './student-form/student-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UniversityComponent } from './university/university.component';
import { UniversityService } from './services/university.service';
import { UniversityFormComponent } from './university-form/university-form.component';
import { PersonComponent } from './person/person.component';
import { PersonService } from './services/person.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    DeleteDialogComponent,
    UniversityComponent,
    UniversityFormComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    StudentService,
    PersonService,
    UniversityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
