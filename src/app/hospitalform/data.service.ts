import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class DataHospitalform {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private countryURL = this.baseResUrl+'/getCountry';
  private getState = this.baseResUrl+'/getState';
  private getCitys = this.baseResUrl+'/getCity';
  private countryCode = this.baseResUrl+'/getCountrycode';
  private saveHosp = this.baseResUrl+'/saveHospinfo';
  private updateHosp = this.baseResUrl+'/updateHospinfo';
  private specURL = this.baseResUrl+'/getspeciality';
  private gethospitalUrl = this.baseResUrl+'/viewHospitaldetails';
  private editURl = this.baseResUrl+'/edithospitalinfo';
  private editStateUrl = this.baseResUrl+'/gethospeditState';
  private editCityUrl = this.baseResUrl+'/gethospeditCity';
  private editCcodeUrl = this.baseResUrl+'/gethospeditCcode';
  private deleteUrl = this.baseResUrl+'/deleteHospitaldetails';
  
  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getCountry() {
    this.headertoken();
    return this.http.get(this.countryURL, { headers: this.head }).map(response => response.json());
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

  createHospital(data: String) {
    this.headertoken();
      return this.http.post(this.saveHosp, data, { headers: this.head }).map(res => res.json());
  }
  getSpeciality() {
    this.headertoken();
    return this.http.get(this.specURL, { headers: this.head }).map(response => response.json());
  }

  gethospitals(cid: any, bid: any): Promise<any> {
    this.headertoken();
    return this.http.get(this.gethospitalUrl + '/' + cid + '/' + bid, { headers: this.head })
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  getEdithospital(id: number) {
    this.headertoken();
    return this.http.get(this.editURl + '/' + id, { headers: this.head }).map(res => res.json()).catch(this.handleError);
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

  updateHospital(data: String) {
    this.headertoken();
    return this.http.post(this.updateHosp, data, { headers: this.head }).map(res => res.json()).catch(this.handleError);
  }

  deleteHospital(id: number) {
    this.headertoken();
    return this.http.get(this.deleteUrl + '/' + id, { headers: this.head }).map(res => res.json()).catch(this.handleError);
  }
  
}
