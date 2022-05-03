import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
import { analyzeAndValidateNgModules } from "@angular/compiler";
@Injectable()
export class loyalitysettingsService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private genqrcodeUrl =this.baseResUrl+'/genqrcode';
 
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
    //Save Loyality
    savedata(serobj:any){
      this.headertoken();
      return this.http.post(this.baseResUrl+`/saveloyalitydata`, serobj, { headers: this.head } ) .map((res: Response) => res.json());
         
    }
   
   //Get Gift Product
   getgiftproduct(comid:any,branchid:any,locname:any,locrefid:any){
     this.headertoken();
    return this.http.get(this.baseResUrl+`/getgiftproduct` + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid,{headers:this.head}).map(Response => Response.json());
   }

   //get currency logo
   getcurrencylogo(countryid){
     this.headertoken();
     return this.http.get(this.baseResUrl+'/getcurrency'+ '/' + countryid,{headers:this.head} ).map(Response =>Response.json());
   }

   //View Gift Products
   viewgiftproduct(comid:any,branchid:any, locname:any,locrefid:any){
     this.headertoken();
     return this.http.get(this.baseResUrl+`/getgiftproducts` + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid,{headers:this.head}).map(Response =>Response.json());
   }
   
   
   
    //Save Gift Products
    savegiftprod(giftob:any){
      this.headertoken();
      return this.http.post(this.baseResUrl+`/giftproductsave`, giftob,{headers:this.head}).map((res:Response)=>res.json());

    }
         // Barcode Generater   //Design Raja 
    genqrcode(barcode1: String){
          this.headertoken();
          return this.http.post(this.genqrcodeUrl, barcode1, { headers: this.head })
          .map(res => res.json());
        }
          
   
   
        isExist(comid:any,gproduct:any){
          this.headertoken();
          return this.http.get(this.baseResUrl+`/isexist` + '/' + comid + '/' + gproduct,{headers:this.head}).map(Response => Response.json());
        }

        addgiftproduct(gprod:any){
            this.headertoken();
            return this.http.post(this.baseResUrl+`/addgiftproduct`,gprod,{headers:this.head}).map(Response =>Response.json());
        }
   
    //View Loyality Point 
    getpointsview(comid:any,branchid:any,locname:any,locrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/getviewpointscheme` + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid,{headers:this.head}).map(Response => Response.json());
    }



   
  
  
  
  //Customer Loyality Point Details //Design Raja 

    getcustloyality(comid:any,branchid:any,locname:any,locrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/getcustloyalitydetails` + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid,{headers:this.head}).map(Response => Response.json());
    }


  }
 
 
 