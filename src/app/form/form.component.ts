import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  registerForm: FormGroup;
  submitted = true;
  value: any;
  public isChecked: boolean = false;
  public showPassword = false;
  public showConfirmPassword = false;
  user = []

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();

  }

  public createForm(){
    this.submitted = false;
    if(this.id>0){
      this.registerForm = this.formBuilder.group({
        id:this.id,
        confirmPassword: ['', Validators.required],
        title: ['', Validators.required],
        acceptValidators: [false],
        firstName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.required],
        lastName: [null],
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    }else{
    this.registerForm = this.formBuilder.group({
      id: [0],
      confirmPassword: ['', Validators.required],
      title: ['', Validators.required],
      acceptValidators: [false],
      firstName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.required],
      lastName: [null],

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
}
  public passwordText='password';
  public displayPassword(){
    this.showPassword=!this.showPassword
    this.passwordText = this.showPassword ? 'text':'password';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  data: any[] = [];

  public id=0;
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.isChecked);
      alert("invalid data");
    }
    else{
    // display form values on success
    if(this.editMode==true){
      this.registerForm.get('id').setValue(this.editData.id)
      this.submitted = false;
      // for(let i=0;i<this.user.length;i++){
      //   if(this.user[i].id==this.editData.id){
      //     this.user[i]=this.registerForm.getRawValue();
      //   }
      // }
      // this.user.splice(this.editData.id, 1,this.registerForm.getRawValue());
     this.user=this.user.map(item=>{
        if(item.id==this.editData.id){
          item=this.registerForm.getRawValue();
        }return item;
      })
      console.log(this.registerForm.getRawValue())
      this.registerForm.controls['password'].enable();
      this.registerForm.controls['confirmPassword'].enable();
      this.registerForm.controls['password'].updateValueAndValidity();
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      this.editMode=!this.editMode
      this.registerForm.get('id').setValue(this.id)
      console.log(this.id);
      this.createForm()
    }else{
    console.log(this.registerForm.value);
    this.submitted = false;
    this.user.push(this.registerForm.getRawValue());
    this.id=this.id+1;
    console.log(this.id)
    this.createForm()
  }
    }
  }



  public bVal: boolean = false;
  onClick(event) {
    this.isChecked = event.target.checked;
      console.log(event)
      console.log(this.isChecked);
      if(event.target.checked){
        console.log(event.target.checked);

        this.registerForm.controls['lastName'].setValidators([Validators.required]); // 5.Set Required Validator
        this.registerForm.controls['lastName'].updateValueAndValidity();
    }else{
      // this.registerForm.controls['lastName'].setValidators([Validators.required]); // 5.Set Required Validator
        this.registerForm.controls['lastName'].removeValidators([Validators.required]);
        this.registerForm.controls['lastName'].updateValueAndValidity();

    }
  }

  // label: string;
  // onChange(isChecked) {
  //   this.value = isChecked;
  //   this.getChange.emit(this.isChecked);
  //   this.onChangeCallback(this.value);
  // }
  public editMode:boolean=false;
  public editData ;
eventHandler(event:any){
  this.editMode=true;
  this.editData = event;
  console.log(this.editData);

this.registerForm.get('lastName').setValue(this.editData.lastName)
this.registerForm.get('firstName').patchValue(this.editData.firstName)
this.registerForm.get('title').patchValue(this.editData.title)
this.registerForm.get('email').patchValue(this.editData.email)
this.registerForm.get('password').patchValue(this.editData.password)
this.registerForm.get('confirmPassword').patchValue(this.editData.confirmPassword)
// this.registerForm.get('password').patchValue({value: this.editData.password, disabled:true }, [Validators.required])
this.registerForm.controls['password'].disable();
this.registerForm.controls['confirmPassword'].disable();
// this.registerForm.controls['password'].setValidators({value: this.editData.password, disabled:true }, [Validators.required]); // 5.Set Required Validator
// this.registerForm.controls['lastName'].updateValueAndValidity();
}

}
