import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()

export class Accountservice  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
   handleError: any;
   headers: any;
   private countryURL = this.baseResUrl+'/getCountry';
 private getState = this.baseResUrl+'/getState';
 private getCitys = this.baseResUrl+'/getCity';
 private countryCode = this.baseResUrl+'/getCountrycode';
   private empUrl = this.baseResUrl+'/empcreateRecord';
   private getCompanies = this.baseResUrl+'/getEmpCompany';
   private getBranches = this.baseResUrl+'/getEmpBranch';
   private getdistinfo = this.baseResUrl+'/getdistinfo';
   private prolist = this.baseResUrl+'/getdrugval';
   private batchlist = this.baseResUrl+'/batchname';
   private Purinvoice = this.baseResUrl+'/purchaseinvoice';

    constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      }
   getcompany(): Promise<any> {
    this.headertoken();
       return this.http.get(this.baseResUrl+'/getCompany',{headers: this.head})
       .toPromise()
       .then(response => response.json() as any)
       .catch(this.handleError);

      
   }
   getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
  }

  getbatchnamelist(val: any, cid: any, bid: any, locname: any, locrefid: any) {
    this.headertoken();
    return this.http.get(this.batchlist + '/' + val + '/' + cid + '/' + bid + '/' + locname + '/'+ locrefid,{headers: this.head}).map(res => res.json());
  }
  
  getpurchaseinvoice(cid:any, bid:any, locname:any, locrefid:any){
    this.headertoken();
    return this.http.get(this.Purinvoice  + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid,{headers: this.head}).map(res => res.json());
  }
   getBranch(cid: any) {
    this.headertoken();
       return this.http.get(this.baseResUrl+'/userbranchlist' + '/' + cid,{headers: this.head}).map(res => res.json());
     }
   

     getDistributorInfo()    {
      this.headertoken();
       return this.http.get(this.getdistinfo,{headers: this.head}).map(response => response.json());
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
  
}

