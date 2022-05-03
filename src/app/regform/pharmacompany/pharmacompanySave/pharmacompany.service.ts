import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';





@Injectable()
export class PharmacompanyService {
  
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
      .post(this.URL+`savePhCompany`, serobj, {headers: this.head}) .map((res: Response) => res.json());
  }

  SearchManufacture(companyID: any, branchID: any, locRefName1: any, locrefID1: any, sval: any) {
    //throw new Error('Method not implemented.');
    return this.http.get(this.baseResUrl+`/searchmanufacture/`+companyID+'/'+branchID+'/'+locRefName1+'/'+locrefID1+'/'+sval,{headers: this.head}).map((res: Response) => res.json());
  }

  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map((res:Response)=> res.json()); 

  }





  
    saveComptype(serobj: string) {
      this.headertoken();
    
        return this.http
          .post(this.URL+`savecomptype`, serobj, {headers: this.head})  .map((res: Response) => res.json());
      }
    
    
    
      saveDivision(serobj: string) {
    
        this.headertoken();
    
     
        return this.http
          .post(this.URL+`savedivision`, serobj, {headers: this.head})  .map((res: Response) => res.json());
      }
      

      saveIndvComptype(serobj: string) {
        this.headertoken();
        
            return this.http
              .post(this.URL+`addcomptype`, serobj, {headers: this.head})  .map((res: Response) => res.json());
     }



     saveIndvDivision(serobj: string) {
      this.headertoken();
            
                return this.http
                  .post(this.URL+`adddivision`, serobj, {headers: this.head})  .map((res: Response) => res.json());
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


    
   


}
