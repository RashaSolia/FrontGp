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
  // private currentUserSource = new ReplaySubject<Iuser>(1);
  // currentUser$ = this.currentUserSource.asObservable();
 
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
 
    if (localStorage.getItem('userToken') !== null) {
      this.decodedUserData();
    }

   }


   
  //  loadCurrentUser(token: string): Observable<Iuser | null> {
  //   if (token == null) {
  //     throw new Error('Token is null');

  //   }

  //   let headers = new HttpHeaders();
  //   headers = headers.set('userToken', token);

  //   return this._HttpClient.get<Iuser>('https://localhost:7011/api/Accounts/currentuser', { headers }).pipe(
  //     map((user: Iuser) => {
  //       if (user) {
  //         localStorage.setItem('token', user.token);
  //         return user; // Return the user
  //       }
  //       return null; // Return null if user is falsy
  //     })
  //   );
  // }




  decodedUserData() {
    let encoded = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken: any = jwtDecode(encoded);
    this.userData.next(decodedToken);
  }

  signUp(formData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:7011/api/Accounts/register`, formData);
  }

  signIn(formData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:7011/api/Accounts/login`, formData);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
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
