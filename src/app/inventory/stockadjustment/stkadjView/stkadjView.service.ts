import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class stkadjViewService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 



  constructor(private http: Http) {}
  
  
      private    URL=this.baseResUrl+'/stkadj/';
  
      head:any;
      headertoken(){
          this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
          'Content-Type':'application/json'});
        }
   
    phcompanyView(serobj: string) {
        this.headertoken();
           return this.http.post( this.URL+`viewStockAdjAll`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
    }
   
    viewmul75(serobj: FormData) {
        this.headertoken();
           return this.http.post( this.URL+`viewmul75`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
    }
  


}
