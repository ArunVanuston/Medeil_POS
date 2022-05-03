import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class salesreportService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
 private countryURL = this.baseResUrl+'/getCountry';
 private getcustinfo = this.baseResUrl+'/getcustinfo';
 private getState = this.baseResUrl+'/getState';
 private getCitys = this.baseResUrl+'/getCity';
 private countryCode = this.baseResUrl+'/getCountrycode';
 private deviceurl=this.baseResUrl+'/User/saveUserActivity';


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

 getCountry() {
  this.headertoken();
   return this.http.get(this.countryURL,{headers: this.head}).map(response => response.json());
 }

 getStates(countryid: number) {
  this.headertoken();
   return this.http.get(this.getState + '/' + countryid,{headers: this.head}).map(response => response.json());
 }

 getCountrycode(countryid: number) {
  this.headertoken();
   return this.http.get(this.countryCode + '/' + countryid,{headers: this.head}).map(response => response.json());
 }

 getCity(sid: number) {
  this.headertoken();
   return this.http.get(this.getCitys + '/' + sid,{headers: this.head}).map(response => response.json());
 }

 getCustomerInfo(compid: number, branchid: number, locname: number, locrefid: number)    {
  this.headertoken();
   return this.http.get(this.getcustinfo  + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
 }

 getsotype(){
  this.headertoken();
  return this.http.get(this.baseResUrl+'/salesOrderType',{headers: this.head}).map(response => response.json());
}
getManufacturer(value: string) {
  this.headertoken();
  return this.http.get(this.baseResUrl+'/getPharmacompany' + '/' + value,{headers: this.head}).map(response => response.json());
}

viewdevicedetails(data){
  this.headertoken();
  return this.http
    .post(this.deviceurl, data, {headers: this.head})  .map((res: Response) => res.json());
}


}


