import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class slsRetSaveService  {

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
            .post(this.URL+`saveSalesReturn`, serobj, {headers: this.head}).map((res: Response) => res.json());
        }
  
        saveSrProducts(serobj: string) {
          
          
          this.headertoken();
              return this.http
                .post(this.URL+`saveSrProducts`, serobj, {headers: this.head})  .map((res: Response) => res.json());
            }
  
              

     saveCreditNote(serobj: string) {
          
          
      this.headertoken();
              return this.http
                .post(this.URL+`saveCreditNote`, serobj, {headers: this.head})  .map((res: Response) => res.json());
      }

     getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl + '/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
     }  
     
     viewShop(cid: any, bid:any,locname:any,locrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewshopRecord/' + cid + '/' + bid + '/' +locname + '/' + locrefid,{headers: this.head}).map((res: Response) => {
        return res.json()});
    }
    //fixed rouud off
    getfixedroudoff(cid:any,bid:any,lname:any,lrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/getdecimalstatus` + '/' +cid + '/' + bid + '/' + lname + '/' + lrefid,{headers: this.head}).map((res: Response) => res.json())
      .catch((error: any) => {  return Observable.throw(error.json());
        });
    }

    viewSalesInvoiceNo(serobj: string) {
            
      this.headertoken();
                 
                 return this.http.post( this.URL+`viewSalesInvoiceNo`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
    viewSalesInvoice(serobj: string) {
        
          
      this.headertoken();
                 
                 return this.http.post( this.URL+`viewSalesInvoice`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
  
    viewSIProduct(serobj: string) {
        
          
      this.headertoken();       
                 return this.http.post( this.URL+`viewSIProduct`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
  



}
