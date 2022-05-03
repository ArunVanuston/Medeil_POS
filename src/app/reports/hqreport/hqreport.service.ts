import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()

export class hqReportServices {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
  handleError: any;
  headers: any;
  private empUrl = this.baseResUrl+'/empcreateRecord';
  private getCompanies = this.baseResUrl+'/getEmpCompany';
  private getBranches = this.baseResUrl+'/getEmpBranch';
  private getShops = this.baseResUrl+'/getEmpShop';
  private getAllCompanies = this.baseResUrl+'/getAllCompanies';
  private getcustinfo = this.baseResUrl+'/getcustinfo';
  private getdistinfo = this.baseResUrl+'/getdistinfo';
  private getState = this.baseResUrl+'/getState';
  private getCitys = this.baseResUrl+'/getCity';
  private countryCode = this.baseResUrl+'/getCountrycode';
  private countryURL = this.baseResUrl+'/getCountry';


  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }

  getcompany(): Promise<any> {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getCompany',{headers: this.head})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);


  }

  getBranch(cid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/userbranchlist' + '/' + cid,{headers: this.head}).map(res => res.json());
  }

  getShopName(bid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getshopname' + '/' + bid,{headers: this.head}).map(res => res.json());
  }

  getAllCompany() {
    this.headertoken();
    //Get Companies
    return this.http.get(this.getAllCompanies,{headers: this.head}).map(response => response.json());
  }

  getCustomerInfo() {
    this.headertoken();
    return this.http.get(this.getcustinfo,{headers: this.head}).map(response => response.json());
  }


  getDistributorInfo() {
    this.headertoken();
    return this.http.get(this.getdistinfo,{headers: this.head}).map(response => response.json());
  }


  getCountry() {
    this.headertoken();
    return this.http.get(this.countryURL,{headers: this.head}).map(response => response.json());
  }

  getStates(countryid: number) {
    this.headertoken();
    return this.http.get(this.getState + '/' + countryid,{headers: this.head}).map(response => response.json());
  }

  getCountrycode(countryid: number) {
    this.headertoken();
    return this.http.get(this.countryCode + '/' + countryid,{headers: this.head}).map(response => response.json());
  }

  getCity(sid: number) {
    this.headertoken();
    return this.http.get(this.getCitys + '/' + sid,{headers: this.head}).map(response => response.json());
  }

  getshop(cid: number,bid: number){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getshopname1' + '/' + cid + '/' + bid,{headers: this.head}).map(res => res.json());

  }

  getdist(cid: number,bid: number){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getshopname1' + '/' + cid + '/' + bid,{headers: this.head}).map(res => res.json());

  }
}