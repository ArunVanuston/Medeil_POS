import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class custEditService  {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  



  constructor(private http: Http) {}
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
    
      private    URL=this.baseResUrl+'/patient/';
  
    savePatient(serobj: string) {
      this.headertoken();
      return this.http
        .post(this.URL+`updatePatient`, serobj, {headers: this.head}).map((res: Response) => res.json());
    }
  
  
    viewPatientEdit(serobj: string) {
      this.headertoken();
           return this.http.post( this.URL+`viewPatientEdit`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
  
    }
  
    viewCountry(serobj: string) {
      this.headertoken();
           return this.http.post( this.URL+`viewCountry`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
  
    }
  
    viewState(serobj: string) {
      this.headertoken();
           return this.http.post( this.URL+`viewState`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
    viewCity(serobj: string) {
      this.headertoken();
           return this.http.post( this.URL+`viewCity`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
  
  
  
    deletePatient(serobj: string) {
      this.headertoken();
           return this.http.post( this.URL+`deletePatient`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  

    getcuststateedit(serobj: string) {
      this.headertoken();
         return this.http.post( this.URL+`editCusState`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }

    getcustcityedit(serobj: string) {
      this.headertoken();
         return this.http.post( this.URL+`editCusCity`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }

}
