import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class ProductReportsService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 

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


 getvertical(){
     return this.http.get(this.baseResUrl+'/getverticals',{headers:this.head}).map(Response =>Response.json());
 }

 getmaingroup(verticalid:any){
    return this.http.get(this.baseResUrl+'/getmaingroups' + '/' + verticalid,{headers:this.head}).map(Response =>Response.json());
}
getsubgroup1(maingrpid:any){
    return this.http.get(this.baseResUrl+'/getsubgroup1' + '/' + maingrpid,{headers:this.head}).map(Response =>Response.json());
}


getsubgroup2(maingrp1id:any){
    return this.http.get(this.baseResUrl+'/getsubgroups2' + '/' + maingrp1id,{headers:this.head}).map(Response =>Response.json());
}

//  getCountry() {
//   this.headertoken();
//    return this.http.get(this.countryURL,{headers: this.head}).map(response => response.json());
//  }

//  getStates(countryid: number) {
//   this.headertoken();
//    return this.http.get(this.getState + '/' + countryid,{headers: this.head}).map(response => response.json());
//  }

//  getCountrycode(countryid: number) {
//   this.headertoken();
//    return this.http.get(this.countryCode + '/' + countryid,{headers: this.head}).map(response => response.json());
//  }


}


