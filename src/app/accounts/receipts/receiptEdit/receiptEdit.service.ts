import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';
@Injectable()
export class receiptEditService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private    URL=this.baseResUrl+'/receipt/';
  private    URLnew=this.baseResUrl+'/';
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
  
  
       saveReceipt(myObj: string) {
          this.headertoken();
        return this.http
          .post(this.URL+`updateReceipt`   , myObj, { headers: this.head }).map((res: Response) => res.json());
      }
      
             viewReceiptNo(serobj: string) {
              
            this.headertoken();
             return this.http.post( this.URL+`viewReceiptNo`  , serobj, { headers: this.head })
            .map((res: Response) => res.json());
               }
              
        
               viewReceipt(serobj: string   ) {
              this.headertoken();
          return this.http.post( this.URL+`viewReceipt`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }
              viewReceiptAll(serobj: string) {
                    this.headertoken();
                     return this.http.post( this.URL+`viewReceiptAll`, serobj, { headers: this.head })
                .map((res: Response) => res.json());
              }
            
               deleteReceipt(serobj: string   ) {
               this.headertoken();
          return this.http.post( this.URL+`deleteReceipt`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }
}
