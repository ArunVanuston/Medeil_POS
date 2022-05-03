import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()

export class Gst1ReportService  {
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
    
      getgst1invoice(comid:any,branchid:any,locname:any,locrefid:any){
          this.headertoken();
          return this.http.get(this.baseResUrl+`/getgst1invoice` + '/' +comid +'/'+ branchid+'/'+ locname +'/' + locrefid,{headers:this.head}).map(Response => Response.json());
      }
}

