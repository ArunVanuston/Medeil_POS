import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
import { environment } from 'environments/environment.prod';
@Injectable()
export class DruginsertService {
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  
  private drugsearchUrl=this.baseResUrl+'/getVanustonDrugsSearch/';
  private drugsearcbyid=this.baseResUrl+'/getVanustonDrugsID/';
  private savevanustonproduct=this.baseResUrl+'/import-product-from-vanuston-to-customer';
  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  searchdrug(countryid:any,searchval: any) {
    this.headertoken();
    return this.http.get(this.drugsearchUrl+countryid+'/'+searchval , { headers: this.head }).map(response => response.json());
  }

  searchdrugbyid(searchid: any) {
    this.headertoken();
    return this.http.get(this.drugsearcbyid+searchid , { headers: this.head }).map(response => response.json());
  }

  savevanustonproducts(drugval: any) {
    this.headertoken();
    return this.http.post(this.savevanustonproduct, drugval, {headers: this.head}).map((res: Response) => res.json())
    .catch((error: any) => {  return Observable.throw(error.json());
    });
    //return this.http.post(this.savevanustonproduct, drugval , { headers: this.head }).map(response => response.json());
  }
  

}
