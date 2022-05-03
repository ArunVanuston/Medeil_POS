import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class slsInvEditService  {


  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  

  constructor(private http: Http) {}
  
  
  
  
  
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }      
      private    URL=this.baseResUrl+'/slsinv/';
      private deviceurl=this.baseResUrl+'/User/saveUserActivity';

  
  
  
  
  
  
        saveSalesInvoice(serobj: string) {
      
      this.headertoken();
          return this.http
            .post(this.URL+`updateSalesInvoice`, serobj, {headers: this.head}).map((res: Response) => res.json());
            
        }
  
  
  
        saveSIProducts(serobj: string) {
          
          
          this.headertoken();
              return this.http
                .post(this.URL+`updateSIProduct`, serobj, {headers: this.head}).map((res: Response) => res.json());
            }
  
  
  
  
  
  
    viewSalesInvoices(serobj: string) {
      this.headertoken();
                 return this.http.post( this.URL+`viewSalesInvoices`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
  
    viewSISalesInvoice(serobj: string) {
      this.headertoken();
                 return this.http.post( this.URL+`viewSISalesInvoice`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
    viewSIProducts(serobj: string) {
      this.headertoken();
                 return this.http.post( this.URL+`viewSIProducts`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
    viewCustomers(serobj: string) {
      this.headertoken();
                 return this.http.post( this.URL+`viewCustomers`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
       }
      
  
    viewSIProductNames(serobj: string) {
      this.headertoken();
                 return this.http.post( this.URL+`viewSIProductNames`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
       }
      
  
      viewSIProductName(serobj: string) {
        this.headertoken();
                 return this.http.post( this.URL+`viewSIProductName`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
      }
  

  
        viewBarCodeProd(serobj: string   ) {
          this.headertoken();
                 return this.http.post( this.URL+`viewSIBarCodeProd`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
        }



        viewSalesInvoiceAll(serobj: string) {
          this.headertoken();
                   return this.http.post( this.URL+`viewSalesInvoiceAll`, serobj, {headers: this.head})
        .map((res: Response) => res.json());
        }
      

        

        viewSITaxSettings(serobj: string   ) {
          this.headertoken();
                 return this.http.post( this.URL+`viewSITaxSettings`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
        }



        
        

  
      deleteSalesInvoice(serobj: string) {
        this.headertoken();     
                 return this.http.post( this.URL+`deleteSalesInvoice`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
      }


      editdevicedetails(data){
        this.headertoken();
        return this.http
          .post(this.deviceurl, data, {headers: this.head})  .map((res: Response) => res.json());
      }
      


}
