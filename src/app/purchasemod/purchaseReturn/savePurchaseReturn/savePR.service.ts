import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class savePRService  {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;


  constructor(private http: Http) {}

  private    URL=this.baseResUrl+'/pr/';
  private decsts = this.baseResUrl+'/getdecimalstatus';
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }


   //Get Fieldhide value 
  getFieldhide(cid: any, bid: any, shopid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getTaxmaster' + '/' + cid + '/' + bid + '/' + shopid + '/' + locname, {headers: this.head} ).map(res => res.json());
  }

  savePurchReturn(serobj: string) {
        this.headertoken();
        return this.http
          .post(this.URL+`savePurchReturn`, serobj, {headers: this.head} ).map((res: Response) => res.json());
      }

      savePrProducts(serobj: string) {
          this.headertoken();
            return this.http
              .post(this.URL+`savePrProducts`, serobj, {headers: this.head} )  .map((res: Response) => res.json());
          }  



      saveDebitNote(serobj: string) {
          this.headertoken();
            return this.http
              .post(this.URL+`saveDebitNote`, serobj, {headers: this.head} )   .map((res: Response) => res.json());
      } 


      deviceDetails(serobj: any){
        this.headertoken();
        return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head} ).map((res:Response)=> res.json()); 
    
      }
    
  
      viewMedcInvoices(serobj: string) {
            this.headertoken();
                  return this.http.post( this.URL+`viewPurcInvoicesNo`, serobj, {headers: this.head} )
        .map((res: Response) => res.json());
      }

        viewMedcInvoice(serobj: string) {
                  this.headertoken();  
                    return this.http.post( this.URL+`viewPurcInvoice`, serobj, {headers: this.head} )
          .map((res: Response) => res.json());
        }

  viewVendorName(serobj: string) {
      this.headertoken();
               return this.http.post( this.URL+`savevendoridPurchReturn`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());
  }


  viewPiProduct(serobj: string) {
          this.headertoken();
               return this.http.post( this.URL+`viewPiProduct`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());
  }

  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, {headers: this.head} ).map(res => res.json());
  }

  editdistname(serobj: string){
          this.headertoken();
            return this.http.post( this.URL+`savevendoridPurchReturn`, serobj, {headers: this.head} )
    .map((res: Response) => res.json());
  }

  getDecimalsts(compid: number,brnchid: number,locname:number,locrefid: number){
    this.headertoken();
    return this.http.get(this.decsts + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,{headers: this.head}).map(response => response.json());
  }
  
}
