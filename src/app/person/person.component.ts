import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  displayedColumns: string[] = ['ord' , 'id' , 'name' , 'email' , 'phone' , 'action']
  dataSource: any = [];
  personLenght: number;
  personList: any[] = [];
  submited:boolean = false;
  isLoading = false;

  @ViewChild('personListPaginator', {static: false}) personListPaginator: MatPaginator;
  constructor(private personService: PersonService,
              private route: Router,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData(0,10);
  }

  ngAfterViewInit() {
    merge(this.personListPaginator.page).pipe(tap(() => {
      this.loadData(this.personListPaginator.pageIndex, this.personListPaginator.pageSize);
    })).subscribe();
}

  private loadData(pageIndex: number, pageSize: number){
    this.isLoading = true;
    this.personService.getPerson(null, pageIndex, pageSize).subscribe(data => {
      this.personLenght = data.totalResults;
      this.dataSource = data.items;
      this.isLoading = false;
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  searchByName(filter: string) {
    console.log(filter);
    this.personService.getPerson(filter, 0, 10).subscribe(data => {
      this.dataSource = data.items;
    })
  }

  onSubmit(){
    this.submited = true;
    this.personService.deletePerson(null).subscribe(data =>{
      this.route.navigate(['person']);
    })
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, message: 'person'}
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.Delete(data);
      }
    })
  }
  
  Delete(id: number) {
    this.personService.deletePerson(id).subscribe(data =>{
      this.loadData(0, 10);
      this.openSnackBar("Person has been deleted.",null);
    },error =>{
      this.openSnackBar("Something error", null);
    })
  }

  Edit(id: number){
    this.route.navigate(['/person/edit/' + id]);
  }

}
