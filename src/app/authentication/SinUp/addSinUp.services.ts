import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
@Injectable()
export class SinUpService {
  handleError: any;
  private saveUrl = 'api/saveSinup';
  private productinfoUrl = 'api/getproductinfo';
  private getCountries = 'api/getCountry';
  private getState = 'api/getState';
  private getCitys = 'api/getCity';
  private countryCode = 'api/getCountrycode';
  private DomainUrl = 'api/getDomain';
  private SubDomainUrl = 'api/getsubDomain';
  private editionUrl = 'api/getEdition';
  constructor(private http: Http) { }


  createCompany(cmpcreate: String) {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.saveUrl, cmpcreate, { headers: head }).map(response => response.json());
  }

  getProductinfo(id: number) {
    //Get product Info
    return this.http.get(this.productinfoUrl + '/' + id).map(response => response.json());
  }

  getCountry() {
    //Get Coutries 
    return this.http.get(this.getCountries).map(response => response.json());
  }

  getDomainInfo(cid: number, pid: number) {
    //Get Domain Information 
    return this.http.get(this.DomainUrl + '/' + cid + '/' + pid).map(response => response.json());
  }

  getsubDomainInfo(cid: number, pid: number, did: number) {
    //Get Sub Domain Information 
    return this.http.get(this.SubDomainUrl + '/' + cid + '/' + pid + '/' + did).map(response => response.json());
  }

  getEdition(cid: number, pid: number, did: number, sdid: number) {
    //Get Edition Information
    return this.http.get(this.editionUrl + '/' + cid + '/' + pid + '/' + did + '/' + sdid).map(response => response.json());
  }

  getStates(countryid: number) {
    //Get States 
    return this.http.get(this.getState + '/' + countryid).map(response => response.json());
  }

  getCountrycode(countryid: number) {
    //Get Country Code
    return this.http.get(this.countryCode + '/' + countryid).map(response => response.json());
  }

  getCity(sid: number) {
    //Get City 
    return this.http.get(this.getCitys + '/' + sid).map(response => response.json());
  }

  getLocalstore() {
    //Get Coutries 
    return this.http.get('/api/getMain').map(response => response.json());
  }
}
