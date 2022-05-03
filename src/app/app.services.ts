

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()

export class AppService{
  
 
  constructor(private http: Http) {}


  getIPAddress()
  {
    return this.http.get("http://api.ipify.org/?format=json").map(response => response.json());
  
  }


}

