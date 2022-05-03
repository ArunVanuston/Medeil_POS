import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';
@Injectable()
export class stkexpSaveService {
 
 
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private getlocrefname=this.baseResUrl+'/getLocreference';
  private getloctype=this.baseResUrl+'/getLoctype';
  private ureURL = this.baseResUrl+'/stockexp/';
  private dest = this.ureURL+'destprod';

  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  getLoctype(): any {
   // alert('Inside init function')
   this.headertoken();
    return this.http.get(this.getloctype, { headers: this.head }).map(response => response.json());
  }

  getlocrefid(locname: any): any {
    this.headertoken();
    return this.http.get(this.getlocrefname + '/' + locname, { headers: this.head }).map(response => response.json());
  }

  saveStockExpiry(serobj: string) {
    this.headertoken();
    return this.http.post(this.ureURL + `saveStockExpiry`, serobj, { headers: this.head }).map((res: Response) => res.json());
  }

  viewMainstockExpiry(serobj: string) {
    this.headertoken();
    return this.http.post(this.ureURL + `viewMainstockExpiry`, serobj, { headers: this.head }).map((res: Response) => res.json());
  }
//DesingRaja
  destroy(stockid:any,prodid:any,comid:any,branchid:any,locname:any,locrefid:any){
    this.headertoken();
    return this.http.get(this.dest + '/' + stockid + '/' + prodid + '/' + comid + '/' + branchid + '/' + locname + '/'+ locrefid,{headers:this.head} ).map(Response =>Response.json());
  }
  GetAlerts(language){
    let langurl="/assets/alerts/en.json";
    if(language=='fr'){
      langurl="/assets/alerts/fr.json";
    }else if(language=='ar'){
      langurl="/assets/alerts/ar.json";
    }else if(language=='es'){
      langurl="/assets/alerts/es.json";
    }else if(language=='es'){
      langurl="/assets/alerts/es.json";
    }else{
      langurl="/assets/alerts/en.json";
    }
    return this.http.get(langurl).map(res => res.json());
  }
}
