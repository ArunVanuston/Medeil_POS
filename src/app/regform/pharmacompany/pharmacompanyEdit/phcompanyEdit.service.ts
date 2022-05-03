import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';
@Injectable()
export class PhcompanyEditService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
  constructor(private http: Http) {}
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }  
    private    URL=this.baseResUrl+'/phcompany/';
    private    URLnew=this.baseResUrl+'/patient/';
  

  savePhcompany(serobj: string) {
    this.headertoken();
  return this.http
      .post(this.URL+`updatePhCompany`, serobj, {headers: this.head}).map((res: Response) => res.json()); 
  }

  deviceDetails(serobj: any){
    this.headertoken();
   
   
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map((res:Response)=> res.json()); 

  }

  
  saveComptype(serobj: string) {
    
    this.headertoken();
    
        return this.http
          .post(this.URL+`updateComptype`, serobj, {headers: this.head}).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log('Error occured');
          }
          )
      }
    
    
    
      saveDivision(serobj: string) {
    
        this.headertoken();
    
        return this.http
          .post(this.URL+`updateDivision`, serobj, {headers: this.head}).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log('Error occured');
          }
          )
      }
      viewPhCompanyEdit(serobj: string) {
        this.headertoken();
      return this.http.post( this.URL+`viewPhCompanyEdit`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
  viewComptype(serobj: string) {
    this.headertoken();
      return this.http.post( this.URL+`viewComptype`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
  viewDivision(serobj: string) {
    this.headertoken();
      return this.http.post( this.URL+`viewDivision`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
  viewCountry(serobj: string) {
    this.headertoken();
      return this.http.post( this.URLnew+`viewCountry`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
  viewState(serobj: string) {
    this.headertoken();
      return this.http.post( this.URLnew+`viewState`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
  viewCity(serobj: string) {
    this.headertoken();
       return this.http.post( this.URLnew+`viewCity`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
  viewCustComptype(serobj: string) {
    this.headertoken();
      return this.http.post( this.URL+`viewCustComptype`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
  viewCustDivision(serobj: string) {
    this.headertoken();
      return this.http.post( this.URL+`viewCustDivision`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }

  
  deletePhCompany(serobj: string) {
    this.headertoken();
       return this.http.post( this.URL+`deletePhCompany`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
  
  getpheditstate(serobj: string) {
    this.headertoken();
     return this.http.post( this.URL+`editPCState`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }

    
  getpheditcity(serobj: string) {
    this.headertoken();
    return this.http.post( this.URL+`editPCCity`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }
}
