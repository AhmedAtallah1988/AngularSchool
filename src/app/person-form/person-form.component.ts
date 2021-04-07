import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  personForm: FormGroup;
  submited: boolean = false;
  personList: any[] = [];
  personId: number;
  person: any;

  constructor(private personService: PersonService,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar,
              private route: Router,
              private activatedRoute: ActivatedRoute) { 
                this.personId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
              }

  ngOnInit(): void {
    this.personForm = this.getForm();

    if(this.personId != null && this.personId != 0)
    {
      this.personService.getById(this.personId).subscribe(data =>{
        this.person = data;
        if(this.person != null)
        {
          this.personForm.patchValue({
            Id: this.person.id,
            Name: this.person.name,
            Email: this.person.email,
            Phone: this.person.phone,
          })
        }
      })
    }
  }

  private getForm(): FormGroup{
    const form = this.formBuilder.group({
      Id: [''],
      Name: ['',[Validators.required,Validators.maxLength(30)]],
      Email: ['',[Validators.required,Validators.maxLength(30),Validators.email]],
      Phone:['',[Validators.required,Validators.maxLength(30)]],
     });
     return form;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onSubmit() { 
    this.submited = true;
    if(this.personForm.invalid){
      return;
    }
    const obj = this.personForm.value;
    const id = obj.Id;
    const personModel = {
      name: obj.Name,
      email: obj.Email,
      phone: obj.Phone
    }
    if(id != null && id != 0)
    {
      this.personService.updatePerson(id, personModel).subscribe(data =>{
        this.openSnackBar(obj.Name + " has been succsessfully updated.",null);
        this.route.navigate(['/person']);
      },error =>{
        this.openSnackBar("something wrong",null);
      })
    }
    else{
    this.personService.addPerson(personModel).subscribe(data => {
      this.openSnackBar(obj.Name + " has beeen successfuly added.", null);
    this.route.navigate(['/person'])
    }, error => {
     this.openSnackBar("somrthing wrong",null);
   })
 }
 
}

}
