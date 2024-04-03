import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  isLoading:boolean=false

  constructor(private _Auth:AuthService,private _Router:Router){}



 LoginForm:FormGroup=new FormGroup({

  email:new FormControl(null, [Validators.required, Validators
      .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][A-Za-z0-9@#*&^%!]*$')]),

      
    });
 
    onSubmit() {
      this._Auth.signIn(this.LoginForm.value).subscribe(() => {
        this._Router.navigate(['./home']);
        console.log("success")
 
      }, 
      
      error => {
        console.log(error);
      })
    }
 

  
    // signIn(registerForm: FormGroup) {
    //   this.isLoading = true;
    
    //   this._Auth.signIn(this.LoginForm.value).subscribe(
    //     (success: boolean) => {
    //       if (success) {
    //         this._Router.navigate(['/home']); // توجيه بعد تسجيل الدخول إلى الصفحة المناسبة
    //       } else {
    //         console.log("Failed to sign in");
    //         // يمكنك إضافة رسالة للمستخدم أو تنبيه هنا في حالة عدم نجاح تسجيل الدخول
    //       }
    //       this.isLoading = false;
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.isLoading = false;
    //     }
    //   );
    // }
 
 
 
}
