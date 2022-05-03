import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
@Injectable()
// @Auther Desing Raja
export class BannedDrugService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  private getbandrug = this.baseResUrl+'/getbanneddrug';
  private druglist = this.baseResUrl+`/viewBannedProductNames`;
  private getproducts = this.baseResUrl+`/getproductdata`;
  private drugban = this.baseResUrl+`/updatebanned`;
  private getbangen = this.baseResUrl+`/getbangenr`;
 

  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'})
    }
    // Back End  Drug Controller
    getbanneddrug(countryid:any,bannedstatus:any){
      this.headertoken();
      return this.http.get(this.getbandrug + '/' +countryid + '/' +bannedstatus,{headers : this.head}).map(Response=>Response.json());

    }
    


    //Add Banned Drug
    searchdrug(data: any) {  // for drug product search
      this.headertoken();
      return this.http.post(this.druglist, data, {headers: this.head}).map((res: Response) => res.json())
        .catch((error: any) => {  return Observable.throw(error.json());
          });
       }

      getproduct(genericid:any,countryid:any){
        this.headertoken();
        return this.http.get(this.getproducts + '/' + genericid + '/' + countryid,{headers:this.head}).map(Response => Response.json());

       }

      //Banned Drug Update

      drugbanned(genericid:any,countryid:any,bannedfrom:any,reason:any){
        this.headertoken();
        return this.http.get(this.drugban + '/' + genericid + '/' + countryid + '/' + bannedfrom + '/' + reason ,{headers:this.head}).map(Response => Response.json());

       }

       //BannedGeneric

       getbannedgeneric(country:any){
         this.headertoken();
         return this.http.get(this.getbangen + '/' + country,{headers:this.head}).map(Response=>Response.json());
       }
 
    
}