import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class editPRService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  constructor(private http: Http) {}
  
  private    URL=this.baseResUrl+'/pr/';
  private distvalURL = this.baseResUrl+'/getpiDistvalues';
  private decsts = this.baseResUrl+'/getdecimalstatus';

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    updatePurchReturn(serobj: string) {
      this.headertoken();
          return this.http
            .post(this.URL+`updatePurchReturn`, serobj, {headers: this.head} )     .map((res: Response) => res.json());
        }

  
    savePrProducts(serobj: string) {
        this.headertoken();  
              return this.http
                .post(this.URL+`updatePrProducts`, serobj, {headers: this.head} )  .map((res: Response) => res.json());
            }
  

    viewMedcInvoices(serobj: string) {
        this.headertoken();
               return this.http.post( this.URL+`viewPurcInvoicesNo`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());
    }
  

    viewPiProduct(serobj: string) {
        this.headertoken();                 
               return this.http.post( this.URL+`viewPiProduct`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());
    }


    viewPurchReturnAll(serobj: string) {
          this.headertoken();
               return this.http.post( this.URL+`viewPurchReturnNo`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());
    }
 
  
    viewPurchaseReturn(serobj: string) {
            this.headertoken();
               return this.http.post( this.URL+`viewPurchaseReturn`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());
    }
 

    viewPrProduct(serobj: string) {
            this.headertoken();
               return this.http.post( this.URL+`viewPrProduct`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());

    }
  
  
    deletePurchReturn(serobj: string) {
          this.headertoken();
               return this.http.post( this.URL+`deletePurchReturn`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());

    }
  
    getDistvalues(distid: number) {
      this.headertoken();
      return this.http.get(this.distvalURL + '/' + distid, {headers: this.head} ).map(res => res.json());
    }
 //Get Fieldhide value 
 getFieldhide(cid: any, bid: any, shopid: any, locname: any) {
  this.headertoken();
  return this.http.get(this.baseResUrl+'/getTaxmaster' + '/' + cid + '/' + bid + '/' + shopid + '/' + locname, {headers: this.head} ).map(res => res.json());
}

getDecimalsts(compid: number,brnchid: number,locname:number,locrefid: number){
  this.headertoken();
  return this.http.get(this.decsts + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,{headers: this.head}).map(response => response.json());
}

}
