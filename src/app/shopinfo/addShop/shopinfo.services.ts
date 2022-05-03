import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
import { environment } from 'environments/environment.prod';
@Injectable()
/**@Author Ajith Kumar**/
export class shopService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  handleError: any;
  private shopUrl = this.baseResUrl+'/createshopRecord';
  private getCountries = this.baseResUrl+'/getCountry';
  private getState = this.baseResUrl+'/getState';
  private getCitys = this.baseResUrl+'/getCity';
  private getAllCompanies = this.baseResUrl+'/getAllCompanies';

  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
  createShop(shopcreate: String) {
    this.headertoken();
    return this.http.post(this.shopUrl, shopcreate, { headers: this.head }).map(response => response.json());
     
  }


  deviceDetails(serobj: any){

    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map((res:Response)=> res.json()); 

  }

  getCountry() {
    //Get Coutries 
    this.headertoken();
    return this.http.get(this.getCountries,{headers: this.head}).map(response => response.json());
  }
  getStates(countryid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getState + '/' + countryid,{headers: this.head}).map(response => response.json());
  }

  getCity(sid: number) {
    this.headertoken();
    //Get City 
    return this.http.get(this.getCitys + '/' + sid,{headers: this.head}).map(response => response.json());
  }
  getBranch(cid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/userbranchlist' + '/' + cid,{headers: this.head}).map(res => res.json());
  }
  getAllCompany() {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getAllCompanies,{headers: this.head}).map(response => response.json());
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
