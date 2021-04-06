import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../services/university.service';

@Component({
  selector: 'app-university-form',
  templateUrl: './university-form.component.html',
  styleUrls: ['./university-form.component.scss']
})
export class UniversityFormComponent implements OnInit {
  universityForm: FormGroup;
  submited: boolean = false;
  universityId: number;
  university: any;

  constructor(private universityService: UniversityService,
              private formBuilder: FormBuilder,
              private activateRouter: ActivatedRoute,
              private route: Router) { 
                this.universityId = Number(this.activateRouter.snapshot.paramMap.get('id'));
              }

  ngOnInit(): void {
    this.universityForm = this.getForm();
    if(this.universityId != null && this.universityId != 0)
    {
      this.universityService.getById(this.universityId).subscribe(data =>{
        this.university = data;
        if(this.university != null)
        {
          this.universityForm.patchValue({
            Id: this.university.id,
            Name: this.university.name,
            Address: this.university.address
          })
        }
      })
    }
  }

  private getForm(): FormGroup{
    const form = this.formBuilder.group({
      Id: [''],
      Name: ['',Validators.required],
      Address: ['',Validators.required],
    });
    return form;
  }

  onSubmit(){
    this.submited= true;
    if(this.universityForm.invalid)
    {
      return ;
    }
    const obj = this.universityForm.value;
    const id = obj.Id;
    const studentModel = {
      name: obj.Name,
      address: obj.Address
    }
    if(id != null && id != 0)
    {
      this.universityService.updateUniversity(id, studentModel).subscribe(data =>{
        this.route.navigate(['/universities'])
      })
    }else{
    this.universityService.addUniversity(studentModel).subscribe(data =>{
      this.route.navigate(['/universities'])
    })
   }
  }

}
