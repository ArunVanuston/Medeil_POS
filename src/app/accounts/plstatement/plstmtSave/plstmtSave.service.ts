import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class plstmtSaveService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;


  private URL = this.baseResUrl + '/accounts/';

  constructor(private http: Http) { }

  head: any;
  headertoken() {
    this.head = new Headers({
      'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
      'Content-Type': 'application/json'
    });
  }

  viewPLAccount(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewPLAccount`, serobj, { headers: this.head }).map((res: Response) => res.json());
  }
  viewtotpurchase(cid: any, bid: any, lname: any, lrefid: any, date: any) {
    this.headertoken();
    return this.http.get(this.URL + 'Viewtotalpurchase'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date, { headers: this.head }).map((res: Response) => res.json());
  }
  viewtotsales(cid: any, bid: any, lname: any, lrefid: any, date: any) {
    this.headertoken();
    return this.http.get(this.URL + 'Viewtotalsales'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date, { headers: this.head }).map((res: Response) => res.json());
  }

  viewOpenstk(cid: any, bid: any, lname: any, lrefid: any, date: any) {
    this.headertoken();
    return this.http.get(this.URL + 'openstkamount'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date, { headers: this.head }).map((res: Response) => res.json());
  }

  viewClosestk(cid: any, bid: any, lname: any, lrefid: any, date: any) {
    this.headertoken();
    return this.http.get(this.URL + 'closestkamount'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date, { headers: this.head }).map((res: Response) => res.json());
  }

}
