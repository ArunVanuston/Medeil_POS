import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class slsRetEditService  {


  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  



  constructor(private http: Http) {}
  
  

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }    
    private    URL=this.baseResUrl+'/slsretn/';

  
  

  
      saveSalesReturn(serobj: string) {
      
      this.headertoken();
          return this.http
            .post(this.URL+`updateSalesReturn`, serobj, {headers: this.head} )   .map((res: Response) => res.json());
        }
  
        saveSrProducts(serobj: string) {
          
          
          this.headertoken();
              return this.http
                .post(this.URL+`updateSrProducts`, serobj, {headers: this.head})  .map((res: Response) => res.json());
            }
  
  
    //fixed rouud off
    getfixedroudoff(cid:any,bid:any,lname:any,lrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/getdecimalstatus` + '/' +cid + '/' + bid + '/' + lname + '/' + lrefid,{headers: this.head}).map((res: Response) => res.json())
      .catch((error: any) => {  return Observable.throw(error.json());
        });
    }

    viewSalesReturnNo(serobj: string) {
       
         
      this.headertoken();  
               return this.http.post( this.URL+`viewSalesReturnNo`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }
 
  
    viewSalesReturn(serobj: string) {
      this.headertoken();
                 
               return this.http.post( this.URL+`viewSalesReturn`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }
  

    viewSrProduct(serobj: string) {
      this.headertoken();
                 
               return this.http.post( this.URL+`viewSrProduct`, serobj, {headers: this.head})
    .map((res: Response) => res.json());

    }
  
  
    viewSrProductRemain(serobj: string) {
      
      this.headertoken();
    return this.http.post( this.URL+`viewSrProductRemain`, serobj, {headers: this.head})
                .map((res: Response) => res.json());
 }



 viewSalesReturnAll(serobj: string ) {
  this.headertoken();      
         return this.http.post( this.URL+`viewSalesReturnAll`, serobj, {headers: this.head})
.map((res: Response) => res.json());
}




    deleteSalesRetn(serobj: string) {
      
      this.headertoken();
    return this.http.post( this.URL+`deleteSalesRetn`, serobj, {headers: this.head})
                .map((res: Response) => res.json());
 }

}
