import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  displayedColumns: string[] = ['id' , 'name' , 'email' , 'phone' , 'action']
  dataSource: any = [];
  personLenght: number;
  personList: any[] = [];

  @ViewChild('personListPaginator', {static: false}) personListPaginator: MatPaginator;
  constructor(private personService: PersonService,
              private route: Router) { }

  ngOnInit(): void {
    this.loadData(0,10);
  }

  ngAfterViewInit() {
    merge(this.personListPaginator.page).pipe(tap(() => {
      this.loadData(this.personListPaginator.pageIndex, this.personListPaginator.pageSize);
    })).subscribe();
}

  private loadData(pageIndex: number, pageSize: number){
    this.personService.getPerson(null, pageIndex, pageSize).subscribe(data => {
      this.dataSource = data.items;
    })
  }

  searchByName(filter: string) {
    console.log(filter);
    this.personService.getPerson(filter, 0, 10).subscribe(data => {
      this.dataSource = data.items;
    })
  }

}
