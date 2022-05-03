import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class sdummyEditService  {

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
          .post(this.URL+`updateSalesDummy`, serobj, {headers: this.head})  .map((res: Response) => res.json());
          
      }



      saveSDProduct(serobj: string) {
        
        this.headertoken();
            return this.http
              .post(this.URL+`updateSDProduct`, serobj, {headers: this.head}) .map((res: Response) => res.json());


          }






  viewSalesDummys(serobj: string) {

    this.headertoken();
  return this.http.post( this.URL+`viewSalesDummys`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }


  viewSalesDummy(serobj: string) {

    this.headertoken();
               return this.http.post( this.URL+`viewSalesDummy`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }

  viewSDProducts(serobj: string) {
    this.headertoken();
      
               return this.http.post( this.URL+`viewSDProducts`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
  }

  viewCustomers(serobj: string) {
    this.headertoken();
               return this.http.post( this.URL+`viewCustomers`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
     }
    

  viewSDProductNames(serobj: string) {
    this.headertoken();
               return this.http.post( this.URL+`viewSDProductNames`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
     }
    

    viewSDProductName(serobj: string) {
      this.headertoken();
               return this.http.post( this.URL+`viewSDProductName`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }



        viewBarCodeProd(serobj: string   ) {
          this.headertoken();
                 return this.http.post( this.URL+`viewSDBarCodeProd`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
        }




        viewSalesDummyAll(serobj: string) {
       
          this.headertoken();
                   return this.http.post( this.URL+`viewSalesDummyAll`, serobj, {headers: this.head})
        .map((res: Response) => res.json());
        }
      

        
        

  deleteSalesDummy(serobj: string) {
    this.headertoken();
               return this.http.post( this.URL+`deleteSalesDummy`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
    }












    viewSITaxSettings(serobj: string   ) {
      this.headertoken();
             return this.http.post( this.URLnew+`viewSITaxSettings`, serobj, {headers: this.head})
  .map((res: Response) => res.json());
    }



}
