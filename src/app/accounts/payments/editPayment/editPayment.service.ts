import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';


@Injectable()
export class editPaymentService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private    URL=this.baseResUrl+'/payment/';
  private    URLnew='http://localhost:4200/api/';

  constructor(private http: Http) { }
  
  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }
  
  
        savePayment(myObj: string) {
          this.headertoken();
        return this.http
          .post( this.URL+`updatePayment`   , myObj, { headers: this.head }).map((res: Response) => res.json());
      }




             viewPaymentNo(serobj: string) {
              this.headertoken();
             return this.http.post( this.URL+`viewPaymentNo`  , serobj, { headers: this.head })
            .map((res: Response) => res.json());
               }
              
        
               viewPayment(serobj: string   ) {
               this.headertoken();
          return this.http.post( this.URL+`viewPayment`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }

       

                
              viewPaymentAll(serobj: string) {
                this.headertoken();
           return this.http.post( this.URL+`viewPaymentAll`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
    }
  


            deletePayment(serobj: string   ) {
                this.headertoken();
          return this.http.post( this.URL+`deletePayment`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }

              
}
