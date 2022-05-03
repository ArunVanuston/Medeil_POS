import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {FormGroup} from "@angular/forms";
import { environment } from 'environments/environment.prod';
@Injectable()  
export class AddbranchService {
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private saveUrl = this.baseResUrl+'/saveBranchUrl';
  private getCompanies = this.baseResUrl+'/getCompanies';
  private getCountries = this.baseResUrl+'/getCountry';
  private getState = this.baseResUrl+'/getState';
  private getCity = this.baseResUrl+'/getCity';
  private countryCode = this.baseResUrl+'/getCountrycode';
  private isBranchExistUrl = this.baseResUrl+'/isBranchExist';
  private getAllCompanies = this.baseResUrl+'/getAllCompanies';
  
  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  createBranch(cmpcreate: String) {
    this.headertoken();
  return  this.http.post(this.saveUrl, cmpcreate, {headers:this.head}).map(response => response.json())
      // .subscribe(
      // () => {console.log(cmpcreate)}
      // );
  }


  getCountry() {
    //Get Coutries 
    this.headertoken();
    return this.http.get(this.getCountries, { headers: this.head }).map(response => response.json());
  }

  getCompany(comp:number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getCompanies+'/'+comp, { headers: this.head }).map(response => response.json());
  }
  
  getAllCompany() {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getAllCompanies, { headers: this.head }).map(response => response.json());
  }


  getStates(countryid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getState + '/' + countryid, { headers: this.head }).map(response => response.json());
  }
  

  getCities(stateID: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getCity + '/' +stateID, { headers: this.head }).map(response => response.json());
  }



  isExistBranch(brnchname: any,compID:any){
    //Get States 
    this.headertoken();
    return this.http.get(this.isBranchExistUrl + '/' +brnchname+'/'+compID, { headers: this.head }).map(response => response.json());
  }



  getCountrycode(countryid: number) {
    //Get Country Code
    this.headertoken();
    return this.http.get(this.countryCode + '/' + countryid, { headers: this.head }).map(response => response.json());
  }

  

}
