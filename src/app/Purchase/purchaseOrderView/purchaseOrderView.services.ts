import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class purchaseOrderViewService{
  handleError: any;
  headers: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private viewPurchaseOrder = this.baseResUrl+'/viewpurchaseorder';
  private deletePurchaseOrder=this.baseResUrl+'/deletePurchaseOrder'

  constructor(private http: Http) {}

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

  viewPurchaseOrders(compid: number,brnchid: number,loc: number,locref: number) {
    this.headertoken();  
    return this.http.get(this.viewPurchaseOrder+"/"+compid+"/"+brnchid+"/"+loc+"/"+locref, {headers: this.head} ).map(response => response.json());
  }
  
  PurchaseOrderDelete(poid: number) {  
    this.headertoken();
    return this.http.get(this.deletePurchaseOrder+'/'+poid, {headers: this.head} ).map(response => response.json());
  }
  
  getprintmodel(cid: any, bid: any, lname: any, lrefid: any, formid: any) {
    return this.http.get(this.baseResUrl + '/viewformsprintmodel' + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + formid, { headers: this.head }).map(res => res.json());
  }

  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head} ).map((res:Response)=> res.json()); 

  }


}
