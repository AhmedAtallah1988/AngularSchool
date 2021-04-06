import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityService } from '../services/university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
  displayedColumns: string[] = ['id' , 'ord' , 'name' , 'address' , 'studentsCount' , 'action']
  dataSource: any = [];

  constructor(private universityService: UniversityService,
              private route: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(){
    this.universityService.getUniversities(null).subscribe(data =>{
      this.dataSource = data;
    })
  }

  searchByName(filter: string){
    console.log(filter)
    this.universityService.getUniversities(filter).subscribe(data =>{
      console.log(data);
        this.dataSource = data;
    })
  }

  Delete(id: number){
    console.log(id);
    this.universityService.deleteUniversity(id).subscribe(data =>{
      this.loadData();
    })
  }

  Edit(id: number){
    this.route.navigate(['/universities/edit/' + id])
  }
}
