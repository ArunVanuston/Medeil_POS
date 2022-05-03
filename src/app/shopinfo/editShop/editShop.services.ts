import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
import { environment } from 'environments/environment.prod';

@Injectable()
export class shopeditService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  handleError: any;
  private shopUrl = this.baseResUrl+'/updateshopRecord';
  private getid = this.baseResUrl+'/shopid';
  private imagesave = this.baseResUrl+'/uploadshoplogophoto';
  private getCountries = this.baseResUrl+'/getCountry';
  private geteditState = this.baseResUrl+'/geteditshopState';
  private geteditCitys = this.baseResUrl+'/geteditshopCity';
  private getState = this.baseResUrl+'/getState';
  private getCitys = this.baseResUrl+'/getCity';
  private geteditState1 = this.baseResUrl+'/geteditshopsState';
  private geteditCitys1 = this.baseResUrl+'/geteditshopsCity';
  private geteditCompany1 = this.baseResUrl+'/geteditcompany1';
  private geteditBranch1 = this.baseResUrl+'/geteditbranch1';
  private getAllCompanies = this.baseResUrl+'/getAllCompanies';
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
  shopeditservice(id: number) {
    this.headertoken();
    return this.http.get(this.getid + '/' + id,{headers: this.head}).map(response => response.json());
  }


  updateShoprecord(updatecreate: String) {

    
    this.headertoken();
   
  return  this.http.post(this.shopUrl, updatecreate, { headers: this.head }).map(response => response.json())
      
    
    // .subscribe(
    //     () => { console.log("Error Occured On update Record") }
    //   );
 
 
 
 
 
 
 
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


  geteditStates(id: number) {
    this.headertoken();
    //Get EditStates 
    return this.http.get(this.geteditState + '/' + id,{headers: this.head}).map(response => response.json());
  }

  geteditCity(id: number) {
    this.headertoken();
    //Get Edit City 
    return this.http.get(this.geteditCitys + '/' + id,{headers: this.head}).map(response => response.json());
  }

  geteditStates1(id: number) {
    this.headertoken();
    //Get EditStates 
    return this.http.get(this.geteditState1 + '/' + id,{headers: this.head}).map(response => response.json());
  }

  geteditCity1(id: number) {
    this.headertoken();
    //Get Edit City 
    return this.http.get(this.geteditCitys1 + '/' + id,{headers: this.head}).map(response => response.json());
  }

  geteditCompany(id: number) {
    this.headertoken();
    //Get Edit company
    return this.http.get(this.geteditCompany1 + '/' + id,{headers: this.head}).map(response => response.json());
  }

  geteditBranch(id: number) {
    this.headertoken();
    //Get Edit Branch
    return this.http.get(this.geteditBranch1 + '/' + id,{headers: this.head}).map(response => response.json());
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
  saveimage(image) {
    let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.post(this.imagesave, image, { headers: imghead }).map((res: Response) => res.json());
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
