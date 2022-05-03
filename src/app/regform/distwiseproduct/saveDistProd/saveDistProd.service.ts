import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';


@Injectable()
export class saveDistProdService {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  

    private    URL=this.baseResUrl+'/distprod/';
    private    URL1=this.baseResUrl+'/dist/';


  constructor(private http: Http) {}
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }


  

  
    saveDistProd(serobj: string ) {
     
      this.headertoken();
     
          return this.http
            .post(this.URL+`saveDistProd`, serobj, {headers: this.head}) .map((res: Response) => res.json());
        }
  

        
        deviceDetails(serobj: any){

          this.headertoken();
          return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map((res:Response)=> res.json()); 
      
        }

  
    viewProdDistributors(serobj: string ) {
      this.headertoken();
                     return this.http.post( this.URL+`viewProdDistributors`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }
  


      

    viewDPCustProducts(serobj: string ) {
      this.headertoken();
   return this.http.post( this.URL+`viewDPCustProducts`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }



    viewDPCustProduct(serobj: string ) {
      this.headertoken();
   return this.http.post( this.URL+`viewDPCustProduct`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }













































   viewDPPhCompanies(serobj: string ) {
    this.headertoken();
   return this.http.post( this.URL1+`viewDstPhCompanies`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }



    viewProductPhComp(serobj: string ) {
      this.headertoken();
   return this.http.post( this.URL+`viewProductPhComp`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }


      

}
