import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
import { analyzeAndValidateNgModules } from "@angular/compiler";
@Injectable()
export class loyalitycusttypeService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private genqrcodeUrl =this.baseResUrl+'/genqrcode';
 
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
    
    //Add Customer Type Form //Design Raja 
    
   datasave(subobj:any){
      this.headertoken();
      return this.http.post(this.baseResUrl+`/savecusttypedata`,subobj,{headers:this.head}).map(Response=>Response.json());
    }

    //View Custimer Type
    getcustype(comid:any,branchid:any,locname:any,locrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/getcustomtype`+'/'+ comid +'/'+ branchid +'/'+ locname +'/'+ locrefid,{headers:this.head}).map(Response=>Response.json()); 
    }

  }
 
 
 