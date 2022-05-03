import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class sdummySaveService  {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;


  constructor(private http: Http) {}





  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
    private    URL=this.baseResUrl+'/slsdum/';

    private    URLnew=this.baseResUrl+'/slsinv/';
  






      saveSalesDummy(serobj: string) {
        this.headertoken();
    
      
        return this.http
          .post(this.URL+`saveSalesDummy`, serobj, {headers: this.head}) .map((res: Response) => res.json());
      }






      saveSDProducts(serobj: string) {
        
        this.headertoken();
            return this.http
              .post(this.URL+`saveSDProduct`, serobj, {headers: this.head}) .map((res: Response) => res.json());

              
          }



                savePresImage(serobj: FormData) {
                  let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});

                       return this.http.post( this.URL+`saveSDPresImage`, serobj, {headers: imghead}) 
                       .map((res: Response) => res.text() ) ;
                  
                }



       viewCustomers(serobj: string) {
        this.headertoken();
               return this.http.post( this.URL+`viewSDCustomers`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
       }
            

       viewDoctors(serobj: string) {
        this.headertoken();
     return this.http.post( this.URL+`viewSDDoctors`, serobj, {headers: this.head})
             .map((res: Response) => res.json());
       }


     viewSDProductNames(serobj: string) {
      this.headertoken();
               return this.http.post( this.URL+`viewSDProductNames`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
       }
      

      viewSDProductName(serobj: string   ) {
        this.headertoken();
               return this.http.post( this.URL+`viewSDProductName`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
      }


  
  
        viewBarCodeProd(serobj: string   ) {
          this.headertoken();
                 return this.http.post( this.URL+`viewSDBarCodeProd`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
        }




      viewPriceSettings(serobj: string   ) {
        this.headertoken();
          return this.http.post( this.URL+`viewSDPriceSettings`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
      }


      viewInvoiceNoInc(serobj: string   ) {
        this.headertoken();
               return this.http.post( this.URL+`viewInvoiceNoInc`, serobj, {headers: this.head})
    .map((res: Response) => res.text());
      }















      viewSITaxSettings(serobj: string   ) {
        this.headertoken();
               return this.http.post( this.URLnew+`viewSITaxSettings`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
      }




}
