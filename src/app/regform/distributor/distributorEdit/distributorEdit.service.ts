import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class DistributorEditService  {


  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  

  constructor(private http: Http) {}
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
    private    URL=this.baseResUrl+'/dist/';
    private    URLnew=this.baseResUrl+'/patient/';
  
  

      saveDistributor(serobj: string) {
    
        this.headertoken();
        return this.http
          .post(this.URL+`updateDistributor`, serobj, {headers: this.head}).map((res: Response) => res.json());
      }
      

      
  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map((res:Response)=> res.json()); 

  }

    
    
        
      viewDistributorEdit(serobj: string) {
        this.headertoken();
                           return this.http.post( this.URL+`viewDistributorEdit`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
        
          }
  
    
      
      viewDisttype(serobj: string) {
        this.headertoken();
                       return this.http.post( this.URL+`viewDistType`, serobj, {headers: this.head})
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
    

  
   deleteDistributor(serobj: string) {
    this.headertoken();
                       return this.http.post( this.URL+`deleteDistributor`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
      }
    


     
      viewDistEditPhCompanies(serobj: string) {
        this.headertoken();
                           return this.http.post( this.URL+`viewDistEditPhCompanies`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
        
          }


          
      viewDstPhCompanies(serobj: string) {
        this.headertoken();
                       return this.http.post( this.URL+`viewDstPhCompanies`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
      }


      geteditstate(serobj: string){
        this.headertoken();
                       return this.http.post( this.URL+`geteditdistState`, serobj, {headers: this.head})
    .map((res: Response) => res.json());

      }

      geteditcity(serobj: string){
        this.headertoken();
                       return this.http.post( this.URL+`geteditdistCity`, serobj, {headers: this.head})
    .map((res: Response) => res.json());

      }
  
      getdisttype(serobj: string){
        this.headertoken();
                       return this.http.post( this.URL+`geteditdistType`, serobj, {headers: this.head})
    .map((res: Response) => res.json());

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
