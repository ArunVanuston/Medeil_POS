import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class stkminqtySaveService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 

  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  private URL = this.baseResUrl+'/stkmin/';
  private URL1 = this.baseResUrl+'/slsinv/';
  private deviceurl=this.baseResUrl+'/User/saveUserActivity';

  saveStkMinQty(serobj: string) {
    this.headertoken();
    return this.http
      .post(this.URL + `saveStkMinQty`, serobj, { headers: this.head } ).map((res: Response) => res.json());
  }



  oneProduct(serobj: string) {
    this.headertoken();
    return this.http
      .post(this.URL1 + `oneProduct`, serobj, { headers: this.head } ).map((res: Response) => res.json());
  }

  saveStkMinQty1(serobj: string) {

    this.headertoken();
    return this.http
      .post(this.URL1 + `savenewprodminqty`, serobj, { headers: this.head } ).map((res: Response) => res.json());
  }


  saveNewprod(serobj: string) {
    this.headertoken();
    return this.http
      .post(this.URL1 + `savenewprod`, serobj, { headers: this.head } ).map((res: Response) => res.json());
  }



  viewMinimumStock(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewMinimumStock`, serobj, { headers: this.head } )
      .map((res: Response) => res.json());
  }



  viewMinimumProdNew(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewMinimumProdNew`, serobj, { headers: this.head } )
      .map((res: Response) => res.json());
  }



  viewAll(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewStockExpAll`, serobj, { headers: this.head } )
      .map((res: Response) => res.json());
  }

adddevicedetails(data){
  this.headertoken();
  return this.http
    .post(this.deviceurl, data, { headers: this.head } )  .map((res: Response) => res.json());

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
