import { Injectable } from '@angular/core';
import { Http, Response,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class slsMaintViewService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  

  constructor(private http: Http) {}
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }   
    private    URL=this.baseResUrl+'/slsinv/';
    private    URLnew=this.baseResUrl+'/slsdum/';

    viewQuotateInvoiceAll(cid:any,bid:any,lname:any,lrefid:any) {
     this.headertoken();
               return this.http.get(this.baseResUrl+`/viewPerformainvoiceall/`+cid+'/'+bid+'/'+lname+'/'+lrefid, {headers: this.head})
    .map((res: Response) => res.json());
    }
  
    ViewQIProducts(invoiceid: string) {
      this.headertoken();
      return this.http.get( this.baseResUrl+'/viewPerformainvoiceProducts/'+invoiceid, {headers: this.head})
    .map((res: Response) => res.json());
    }
  
    viewSalesInvCustAll(serobj: string) {
      this.headertoken();
      return this.http.post( this.URL+`viewSalesInvCustAll`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }
  
    viewSalesDumCustAll(serobj: string) {
      this.headertoken(); 
      return this.http.post( this.URL+`viewSalesDumCustAll`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }

    viewCustomers(serobj: string) {
      this.headertoken();
      return this.http.post( this.URL+`viewSICustomers`, serobj, {headers: this.head}).map((res: Response) => res.json());
    }


}
