import { Injectable } from '@angular/core';
import { Http, Response,  Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class slsRetViewService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  

  


  constructor(private http: Http) {}
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }      
    private    URL=this.baseResUrl+'/slsretn/';


    GetAllSalesreturns(serobj: string ) {
     this.headertoken();  
        return this.http.post( this.URL+`viewSalesReturnAll`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }
  
    ReturnProductsView(serobj: string ) {
      this.headertoken();  
        return this.http.post( this.URL+`viewSalesReturnProducts`, serobj, {headers: this.head})
     .map((res: Response) => res.json());
    }

    DeleteSalesReturn(serobj: any ) {
      this.headertoken();  
                return this.http.post( this.URL+`deleteSalesRetn`, serobj, {headers: this.head})
     .map((res: Response) => res.json());
    }
   
}
