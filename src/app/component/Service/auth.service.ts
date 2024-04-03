import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
import { of } from 'rxjs'; 
import { Iuser } from '../../iuser';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = new BehaviorSubject(null);
  sharedVariable: any;
  //private currentUserSource = new ReplaySubject<Iuser>(1);
  private currentUserSource = new BehaviorSubject<Iuser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
 
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
 
    // if (localStorage.getItem('userToken') !== null) {
    //   this.decodedUserData();
    // }

   }

   
   loadCurrentUser(token: string): Observable<Iuser | null> {
    if (token == null) {
      throw new Error('Token is null');

    }

    let headers = new HttpHeaders();
    headers = headers.set('userToken', token);

    return this._HttpClient.get<Iuser>('https://localhost:7011/api/accounts/currentuser', { headers }).pipe(
      map((user: any) => {
        if (user) {
          // console.log(user);
          localStorage.setItem('token', user.user.token);
          console.log(this.currentUser$);
          console.log(user);
          return user; // Return the user
        }
        return null; // Return null if user is falsy
      })
    );
  }





  signUp(formData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:7011/api/Accounts/register`, formData).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.user.token);
          console.log(this.currentUser$);
          console.log(user);
          this.currentUserSource.next(user);
          console.log(this.currentUser$);
        }
      })
    )
  }

  signIn(formData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:7011/api/Accounts/login`, formData)
    .pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.user.token);
          this.currentUserSource.next(user);
          // this.sharedVariable=user.user.displayName
          // console.log('sharedVariable' ,this.sharedVariable);
          console.log(this.currentUser$);
          console.log(user);
      
        }
        
      })
    )
  }

  // signIn(formData: any): Observable<any> {
  //   return this._HttpClient.post(`https://localhost:7011/api/Accounts/login`, formData).pipe(
  //     map((response: any) => {
  //       if (response.message === "success") {
  //         localStorage.setItem('token', response.user.token);
  //         this.decodedUserData(); // تحديث بيانات المستخدم بعد تسجيل الدخول
  //         return true; // إرجاع true للإشارة إلى نجاح تسجيل الدخول
  //       }
  //       return false; // إرجاع false في حالة عدم نجاح تسجيل الدخول
  //     })
  //   );
  // }

  decodedUserData() {
    let token = localStorage.getItem('token');
    if (token) {
      let decodedToken: any = jwtDecode(token);
      this.userData.next(decodedToken);
     this.sharedVariable=decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]
       console.log('sharedVariable' ,this.sharedVariable);
    } else {
      console.log("Token not found in local storage");
    }
  }
  

  // logOut() {
  //   localStorage.removeItem('token');
  //   this.currentUserSource.next(null);
  //   this._Router.navigate(["./signin"]);
   
  
  // }

  logOut() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.currentUserSource.next(null);
    }
    this._Router.navigate(["./signin"]);
  }
   
  getUser() {
    const encoded = localStorage.getItem('userToken');

    if (!encoded) {
      return null;
    }

    const jwtHelper = new JwtHelperService();
    console.log(jwtHelper.decodeToken(encoded))
    return jwtHelper.decodeToken(encoded);
  }








}
