import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { Iuser } from '../../iuser';

@Injectable({
  providedIn: 'root'
})
export class TripServiceService {
  private currentUserSource = new ReplaySubject<Iuser>(1);

  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _HttpClient:HttpClient) { }
  getCities(): Observable<any> {
    return this._HttpClient.get(`https://localhost:7011/api/City`);
  }

  createTrip(formData: any): Observable<any> {
    let token=''
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',   token);
    console.log(token)
    return this._HttpClient.post(`https://localhost:7011/api/Trip/CreateTrip`, formData) 
    }

  




}
