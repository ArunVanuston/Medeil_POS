import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()
export class pharmacistreportService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
   handleError: any;
   headers: any;
  //  private getscheules = this.baseResUrl+'/getschedules';

    constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      }
      // getschedule(){
      //   this.headertoken();
      //   return this.http.get(this.getscheules,{headers:this.head}).map(Response =>Response.json());
      // }

    }