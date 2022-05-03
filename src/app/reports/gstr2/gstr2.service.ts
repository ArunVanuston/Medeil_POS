

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()

export class Gst2ReportService  {
   baseUrl: string = environment.backend.baseURL;
   baseResUrl: string = environment.backend.baseResUrl;
   
   handleError: any;
   headers: any;

    constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
   
      }
    
    }