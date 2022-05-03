import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()
export class addpurchaseApprovalService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private invoiceURL = this.baseResUrl+'/getApprovalinvoice';
  private AppURl = this.baseResUrl+'/getPurcapprovaldata';
  private saveURL = this.baseResUrl+'/savepurchaseApprovalRecord';
  private savemaintanceURL = this.baseResUrl+'/savepurchaseApprovaldata';
  private distvalues = this.baseResUrl+'/getpurchasevendordetails';
  private saveinvjr = this.baseResUrl+'/savePAJournal';
  private purjourn = this.baseResUrl+"/savePIJournal";
  
  constructor(private http: Http) { }

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

  getApprovalinvoices(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.invoiceURL + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, { headers: this.head } ).map(res => res.json());
  }

  getPurcApprovaldata(id: number) {
    this.headertoken();
    return this.http.get(this.AppURl + '/' + id, { headers: this.head } ).map(res => res.json());
  }
  /* Create purchase Invoice  Record */
  getApprovaldata(data: string): any {
    return this.http.post(this.saveURL, data, { headers: this.head } ).map(response => response.json()).catch(this._serverError);
  }

  
  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, { headers: this.head } ).map((res:Response)=> res.json()); 

  }

  getApprovalrecord(data: string): any {
    this.headertoken();
    return this.http.post(this.savemaintanceURL, data, { headers: this.head }).map(response => response.json()).catch(this._serverError);
  }

  getVendordetails(data: any) {
    this.headertoken();
    return this.http.get(this.distvalues+'/'+data, { headers: this.head }).map(response => response.json()).catch(this._serverError);
  }

   Saveinvjrnl(data: string): any {
    this.headertoken();
    return this.http.post(this.saveinvjr, data, { headers: this.head }).map(response => response.json()).catch(this._serverError);
  }

  savepurjournal(purctabData: string) {
    this.headertoken();
    this.http.post(this.purjourn, purctabData, { headers: this.head }).map(response => { response.json() })
      .subscribe(
        () => { console.log(purctabData) }
      );
  }

  private _serverError(err: any) {
    console.log('sever error:', err);  // debug
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error');
    }
    return Observable.throw(err || 'backend server error');
  }
}