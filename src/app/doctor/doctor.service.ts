import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()

export class DoctorService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private getCountries = this.baseResUrl+'/getCountry';
  private getState = this.baseResUrl+'/getState';
  private getCitys = this.baseResUrl+'/getCity';
  private countryCode = this.baseResUrl+'/getCountrycode';
  private docURL = this.baseResUrl+'/saveDoctor';
  private docupdateURL = this.baseResUrl+'/updateDoctor';
  private viewUrl = this.baseResUrl+'/viewDoctor';
  private editURL = this.baseResUrl+'/editDoctorinfo';
  private editStateUrl = this.baseResUrl+'/editDoctorstate';
  private editCcodeUrl = this.baseResUrl+'/editDoctorcode';
  private editCityUrl = this.baseResUrl+'/editDoctorcity';
  private deleteURL = this.baseResUrl+'/deleteDoctor'
  // URL to web API
 
  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

  getcountry(): Promise<any> {
    this.headertoken();
    return this.http.get(this.getCountries, { headers: this.head })
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getStates(countryid: number) {
    this.headertoken();
    return this.http.get(this.getState + '/' + countryid, { headers: this.head }).map(response => response.json());
  }

  getCountrycode(countryid: number) {
    this.headertoken();
    return this.http.get(this.countryCode + '/' + countryid, { headers: this.head }).map(response => response.json());
  }

  getCity(sid: number) {
    this.headertoken();
    return this.http.get(this.getCitys + '/' + sid, { headers: this.head }).map(response => response.json());
  }
  createDoctor(data: String): any {
    this.headertoken();
    return this.http.post(this.docURL, data, { headers: this.head }).map(res => res.json())
      .catch(this.handleError);
  }



  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, { headers: this.head }).map(res=> res.json()); 

  }

  updateDoctor(data: String): any {
    this.headertoken();
    return this.http.post(this.docupdateURL, data, { headers: this.head }).map(res => res.json())
      .catch(this.handleError);
  }




  viewDoctor(cid: any, bid: any) {
    this.headertoken();
    return this.http.get(this.viewUrl + '/' + cid + '/' + bid, { headers: this.head }).map(res => res.json());
  }

  editDoctorinfo(id: any) {
    this.headertoken();
    return this.http.get(this.editURL + '/' + id, { headers: this.head }).map(res => res.json());
  }
  getEditStates(id: number) {
    this.headertoken();
    return this.http.get(this.editStateUrl + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getCcode(id: number) {
    this.headertoken();
    return this.http.get(this.editCcodeUrl + '/' + id, { headers: this.head }).map(response => response.json());
  }

  geteditCity(id: number) {
    this.headertoken();
    return this.http.get(this.editCityUrl + '/' + id, { headers: this.head }).map(response => response.json());
  }

  deleteDoctor(id: any) {
    this.headertoken();
    return this.http.get(this.deleteURL + '/' + id, { headers: this.head }).map(res => res.json());
  }


  searchdoctor(comid:any,branchid:any,locname:any,locrefid:any,doc:any){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/searchdoct' + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + doc ,{headers:this.head}).map(Response=>Response.json());
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
