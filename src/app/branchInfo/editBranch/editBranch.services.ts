import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {FormGroup} from "@angular/forms";
import { environment } from 'environments/environment.prod';

@Injectable()
export class brancheditService {
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private cmpupdateUrl = this.baseResUrl+'/updateBranchUrl';
  private getBridId = this.baseResUrl+'/brnchId';
  private getid = this.baseResUrl+'/branchId';
  private getCountries = this.baseResUrl+'/getCountry';
  private getState = this.baseResUrl+'/getState';
  private getCity = this.baseResUrl+'/getCity';
  private countryCode = this.baseResUrl+'/getCountrycode';
  private getCompanies = this.baseResUrl+'/getCompanies';
  private isBranchExistUrl = this.baseResUrl+'/isBranchUpdateExist';


  //Below Url Onload Get ID  into  vales

  private editStateUrl = this.baseResUrl+'/geteditBranchState';
  private editCityUrl = this.baseResUrl+'/geteditBranchCity';
  private editCcodeUrl = this.baseResUrl+'/geteditBranchCcode';

  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

   comppeditservice(id: number) {
     this.headertoken();
    return this.http.get(this.getBridId + '/' + id, { headers: this.head }).map(response => response.json());
  }
  
  getCompany() {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getCompanies, { headers: this.head }).map(response => response.json());
  }
  
  brancheditservice(id: number) {
    this.headertoken();
    return this.http.get(this.getid + '/' + id, { headers: this.head }).map(response => response.json());
  }


  updateBranchRecord(updatecreate: String) {
    this.headertoken();
    this.http.post(this.cmpupdateUrl, updatecreate, {headers: this.head}).map(response => response.json())
      .subscribe(
      () => {console.log(updatecreate)}
      );
  }

  getCountry() {
    //Get Coutries 
    this.headertoken();
    return this.http.get(this.getCountries, { headers: this.head }).map(response => response.json());
  }


  getStates(countryid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getState + '/' + countryid, { headers: this.head }).map(response => response.json());
  }


  getCountrycode(countryid: number) {
    //Get Country Code
    this.headertoken();
    return this.http.get(this.countryCode + '/' + countryid, { headers: this.head }).map(response => response.json());
  }

  

  getCities(cityId: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getCity + '/' + cityId, { headers: this.head }).map(response => response.json());
  }



  //Below Methods Onload Get ID  into  values
  
 

  getEditStates(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.editStateUrl + '/' + id, { headers: this.head }).map(response => response.json());
  }

   getEditCities(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.editCityUrl + '/' + id, { headers: this.head }).map(response => response.json());
  }
  
  getCcode(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.editCcodeUrl + '/' + id, { headers: this.head }).map(response => response.json());
  }
  
  isExistBranch(brnchname: any,brnchid: number,compID: number){
    //Get States 
    this.headertoken();
    return this.http.get(this.isBranchExistUrl + '/' +brnchname+'/'+brnchid+'/'+compID, { headers: this.head }).map(response => response.json());
  }
}
