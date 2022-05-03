import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
import { environment } from 'environments/environment.prod';
@Injectable()
export class viewinvoiceService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private viewcPurcUrl = this.baseResUrl+'/viewPurchasemaintance';
  private deletepurcUrl = this.baseResUrl+'/deletepurchaseRecord';

  constructor(private http: Http) { }

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

  viewPurchase(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.viewcPurcUrl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head} ).map(response => response.json());
  }

  deletePurc(id: number) {
    this.headertoken();
    return this.http.get(this.deletepurcUrl + '/' + id, {headers: this.head} ).map(response => response.json());
  }

}
