import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { AuthService } from '../Service/auth.service';
import { Iuser } from '../../iuser';
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  message: string = '';
  constructor(private _Auth:AuthService) {
  
   }
    ngOnInit() {
    this.logMessage();
  
  }
   

  logMessage() {
    this.message = this._Auth.sharedVariable;
    }
    
}