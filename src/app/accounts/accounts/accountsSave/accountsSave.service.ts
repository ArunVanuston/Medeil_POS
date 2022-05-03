import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';
@Injectable()
export class accountsSaveService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private URL = this.baseResUrl+'/accounts/';
  private decsts = this.baseResUrl + '/getdecimalstatus';

  constructor(private http: Http) { }
  
   head:any;
   headertoken(){
       this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
       'Content-Type':'application/json'});
     }

  saveAccount(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `saveAccount`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  saveAccBalance(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `saveAccBalance`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  saveTempAccTrnsfer(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `saveTempAccTrnsfer`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }
  viewAccountType(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewAccountType`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  viewBalanceSheet(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewBalanceSheet`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  Newbalanceshet(cid: any, bid: any, lname: any, lrefid: any, enddate: any){
    this.headertoken();
    return this.http.get(this.URL +'Viewnewbalancesheet'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+enddate,{headers: this.head }).map((res: Response) => res.json());
  }
  

  getDecimalsts(compid: number, brnchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.decsts + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }
}
