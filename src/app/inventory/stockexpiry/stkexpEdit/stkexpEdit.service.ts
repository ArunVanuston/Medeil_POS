import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class stkexpEditService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  private ureURL = this.baseResUrl + '/stockexp/';
  private getlocrefname = this.baseResUrl + '/getLocreference';
  private getloctype = this.baseResUrl + '/getLoctype';


  constructor(private http: Http) { }

  head: any;
  headertoken() {
    this.head = new Headers({
      'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
      'Content-Type': 'application/json'
    });
  }

  saveStockExpiry(serobj: string) {
    this.headertoken();
    return this.http
      .post(this.ureURL + `updateStockExpiry`, serobj, { headers: this.head }).map((res: Response) => res.json());
  }

  getlocrefid(locname: any): any {
    this.headertoken();
    return this.http.get(this.getlocrefname + '/' + locname, { headers: this.head }).map(response => response.json());
  }

  getLoctype(): any {
    // alert('Inside init function')
    this.headertoken();
    return this.http.get(this.getloctype, { headers: this.head }).map(response => response.json());
  }




  viewStockExpiry(serobj: string) {

    this.headertoken();
    let header = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.ureURL + `viewStockExpiry`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }



  viewStockExpAll(serobj: string) {
    this.headertoken();
    let header = new Headers({ 'Content-Type': 'application/json' });


    return this.http.post(this.ureURL + `viewStockExpAll`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }



  deleteStockExpiry(serobj: string) {
    this.headertoken();
    let header = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: header });
    return this.http.post(this.ureURL + `deleteStockExpiry`, serobj,{headers:this.head})
      .map((res: Response) => res.json());
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
