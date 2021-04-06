import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  submited: boolean = false;
  studentList: any[] = [];
  studentId: number;
  student: any;
  genderList: any[] = [];
  universityList: any[] = [];
  constructor(private formBuilder: FormBuilder,
              private studentService: StudentService,
              private activateRouter: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private route: Router) { 
                this.studentId = Number(this.activateRouter.snapshot.paramMap.get('id'));
              }

  ngOnInit(): void {
    this.studentForm = this.getForm();
    this.studentService.getGender().subscribe(data => {
      this.genderList = data;
    })
    
    this.studentService.getUniversity().subscribe(data => {
      this.universityList = data;
    })
    
    if(this.studentId != null && this.studentId != 0)
    {
      this.studentService.getById(this.studentId).subscribe(data =>{
        this.student = data;
        if(this.student != null)
        {
          this.studentForm.patchValue({
            Id: this.student.id,
            Name: this.student.name,
            Address: this.student.address,
            Average: this.student.average,
            Gender: this.student.genderId,
            University: this.student.unvId
          })
        }
      })
    }
  }

  private getForm(): FormGroup{
    const form = this.formBuilder.group({
      Id: [''],
      Name: ['',[Validators.required,Validators.maxLength(30)]],
      Address: ['',[Validators.required,Validators.maxLength(30)]],
      Average: ['',[Validators.required,Validators.min(45),Validators.max(99)]],
      Gender: ['',Validators.required],
      University: ['',Validators.required],
      

    });
    return form;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onSubmit(){
    this.submited = true;
    if(this.studentForm.invalid)
    {
      return;
    }
      const obj = this.studentForm.value;
      const id = obj.Id;
      const studentModel = {
        name: obj.Name,
        address: obj.Address,
        average: obj.Average,
        genderId: obj.Gender,
        unvId: obj.University
      }
      if(id != null && id != 0)
      {
        this.studentService.updatestudent(id, studentModel).subscribe(data =>{
          this.openSnackBar(obj.Name + " has been successfuly updated", null);
          this.route.navigate(['/students']);
        },error =>{
          this.openSnackBar(error.error.Description, null);
        })
      }
      else{
      console.log(this.studentForm.value);
      this.studentService.addStudent(studentModel).subscribe(data =>{
        this.openSnackBar(obj.Name + " has been successfuly added", null);
        this.route.navigate(['/students']);
      },error =>{
        this.openSnackBar(error.error.Description, null);
      })
    }
  }

}
