import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class Stockservice {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
 private countryURL = this.baseResUrl+'/getCountry';



 private headers = new Headers({ 'Content-Type': 'application/json' });

 constructor(private http: Http) { }
 head:any;
 headertoken(){
     this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
     'Content-Type':'application/json'});

   }
 private handleError(error: any): Promise<any> {
   return Promise.reject(error.message || error);
 }

 getbatch(comid:any,branchid:any,locname:any,locrefid:any){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getbatch'  + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }

 


}


