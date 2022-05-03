import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class stkminqtyEditService  {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  constructor(private http: Http) {}
  
  
    private    URL=this.baseResUrl+'/stkmin/';
    private URL1 =this.baseResUrl+'/slsinv/';

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

    viewStkMinQty(serobj: string) {
        this.headertoken();
        return this.http
          .post(this.URL+`viewStkMinQty`, serobj, { headers: this.head } ).map((res: Response) => res.json());
      }


      newprview(serobj: string) {
     
      this.headertoken();
          return this.http
              .post(this.URL1+`newprview`, serobj, { headers: this.head } ).map((res: Response) => res.json());
          }
    

      viewStkMinQtyAll(serobj: string) {
        this.headertoken();
           return this.http.post( this.URL+`viewStkMinQtyAll`, serobj, { headers: this.head } )
      .map((res: Response) => res.json());
    }


    viewStkMinQtyAll1(serobj: string) {
      this.headertoken();
           return this.http.post( this.URL1+`newprno`, serobj, { headers: this.head } )
      .map((res: Response) => res.json());
    }
  

    updateMinProduct(serobj: string) {
     
      this.headertoken();
          return this.http
            .post(this.URL+`updatestkproduct`, serobj, { headers: this.head } ).map((res: Response) => res.json());
        }


    updateNewProduct(serobj: string) {
     
      this.headertoken();
          return this.http
            .post(this.URL1+`updatenewproduct`, serobj, { headers: this.head } ).map((res: Response) => res.json());
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
