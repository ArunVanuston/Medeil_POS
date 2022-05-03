import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()

export class PickingReportService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
   handleError: any;
   headers: any;
  
   private getemployees = this.baseResUrl+'/viewEmployees';

    constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      }
    getEmployeesList(compid: number, branchid: number, locname: number, locrefid: number)    {
      this.headertoken();
      return this.http.get(this.getemployees  + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
    }
  
}

