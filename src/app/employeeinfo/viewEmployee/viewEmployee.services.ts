import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class viewEmployeeServices {
private viewUrl='api/viewEmployee'
private deleteUrl='api/deleteEmployee'
  constructor(private http: Http) {

  }

  employeeView() {
   return this.http.get(this.viewUrl).map(response => response.json());
  }

  employeeDelete(empId: number) {  
    return this.http.get(this.deleteUrl+'/'+empId).map(response => response.json());
  }

}
