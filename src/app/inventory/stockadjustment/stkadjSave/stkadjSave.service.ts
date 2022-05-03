import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class stkadjSaveService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 

  private    URL=this.baseResUrl+'/stkadj/';


  constructor(private http: Http) {}
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
  
    saveStockAdjust(serobj: string) {
      this.headertoken();
        return this.http
          .post(this.URL+`saveStockAdjust`, serobj, { headers: this.head } ).map((res: Response) => res.json());
        }


    viewSTWareHouseStocks(serobj: string) {
       this.headertoken();
      return this.http.post( this.URL+`viewSADMainstocks`, serobj, { headers: this.head } )
      .map((res: Response) => res.json());
         }
      

    viewSTWareHouseStock(serobj: string ) {
         this.headertoken();
        return this.http.post( this.URL+`viewSADMainstock`, serobj, { headers: this.head } )
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
