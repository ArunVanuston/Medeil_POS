import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from 'environments/environment.prod';



@Injectable()
export class PrescriptionService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
    constructor(private http: Http) { }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

    getsolist(cid: number, bid: number, loc: number, lrid: number) {
      this.headertoken();
        return this.http.get(this.baseResUrl+'/getprescsalesorder' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid, {headers: this.head} ).map(response => response.json());
      }

      getsearchproduct(cid: number, bid: number, loc: number, lrid: number,val:any) {
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getprescprodetail' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid+'/'+val, {headers: this.head} ).map(response => response.json());
      }

      getprecdetails(orderid:any) {
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getprescslsordetail' + '/' + orderid, {headers: this.head} ).map(response => response.json());
      }

      saveprescptionlist(data: String) {
        this.headertoken();
        return this.http.post(this.baseResUrl+'/saveprescdigi', data, { headers: this.head }).map(response => response.json())
      }

      saveprescptionprod(data: String) {
        this.headertoken();
        return this.http.post(this.baseResUrl+'/saveprescdigitable', data, { headers: this.head }).map(response => response.json())
      }

      getproduct(compid: number,val:any) {
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getproduct' + '/' + compid+'/'+val, {headers: this.head} ).map(response => response.json());
      }

      getemplist(cid: number, bid: number, loc: number, lrid: number) {
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getPrescEmpdetails' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid, {headers: this.head} ).map(response => response.json());
      }


      rectionservice(cid: number, bid: number, loc: number, lrid: number,orderid: number) {
        this.headertoken();
        return this.http.get(this.baseResUrl+'/rejectedpresc' + '/' + cid + '/' + bid + '/' + loc + '/' + lrid+ '/' + orderid, {headers: this.head} ).map(response => response.json());
      }


}