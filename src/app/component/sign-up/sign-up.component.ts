import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private _Auth:AuthService){}
  errormassege:string=""
  isLoading:boolean=false

  
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('Repassword')?.value;

    if (password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }

resgisterForm:FormGroup=new FormGroup({
displayName:new FormControl(null,[Validators.required]),
email:new FormControl(null, [Validators.required, Validators
  .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
  password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][A-Za-z0-9@#*&^%!]*$')]),
  Repassword:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][A-Za-z0-9@#*&^%!]{5,}$')]),
  phoneNumber:new FormControl(null,Validators.required)
// })
}, { validators: this.passwordMatchValidator.bind(this) });


signUp(registerForm:FormGroup){
  this.isLoading=true

 this._Auth.signUp(this.resgisterForm.value).subscribe({
  next:(Response)=>{console.log(Response)
    this.isLoading=false
  },
  error:(err)=>{
    // this.errormassege=err.error.errors
    console.log(err)
  this.isLoading=false

  }
 }) 
 
}



}
