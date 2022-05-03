


import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
import { analyzeAndValidateNgModules } from "@angular/compiler";
@Injectable()
export class BonusloyalityService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private genqrcodeUrl =this.baseResUrl+'/genqrcode';
 
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
 
    //Bonus Loyality Form //Design Raja 
    //Get Customer Type
    getcusttype(comid:any,branchid:any,locname:any,locrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/getcusttype` +'/'+  comid +'/'+ branchid +'/'+ locname +'/'+ locrefid,{headers:this.head}).map(Response =>Response.json());
    }
    //Get Product
    getproduct(comid:any,branchrefid:any,locname:any,locrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/getmainproduct` +'/'+ comid +'/'+ branchrefid +'/'+ locname +'/'+ locrefid,{headers:this.head}).map(Response=>Response.json()); 
    }
    //Save Bonus Loyality Form Data
    saveformdata(serobj:any){
      this.headertoken();
      return this.http.post(this.baseResUrl+`/savebonusdata`,serobj,{headers:this.head}).map(Response =>Response.json());
    }

    //Save Bonus Product

    savebonusproduct(serobj:any){
      this.headertoken();
      return this.http.post(this.baseResUrl+`/savebonusproduct`,serobj,{headers:this.head}).map(Response =>Response.json());
    }


    //View Bonus Loyality

    getbounus(comid:any,branchrefid:any,locname:any,locrefid:any){
      this.headertoken();
    return this.http.get(this.baseResUrl+`/getbonuslist` +'/'+ comid +'/'+ branchrefid +'/'+ locname +'/'+ locrefid,{headers:this.head}).map(Response=>Response.json()); 
      }

      getblproduct(blid:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+`/getblproduct` + '/' + blid,{headers:this.head}).map(Response =>Response.json());
      }
      GetAlerts(language){
        let langurl="/assets/alerts/en.json";
        if(language=='fr'){
          langurl="/assets/alerts/fr.json";
        }else if(language=='ar'){
          langurl="/assets/alerts/ar.json";
        }else if(language=='es'){
          langurl="/assets/alerts/es.json";
        }else if(language=='es'){
          langurl="/assets/alerts/es.json";
        }else{
          langurl="/assets/alerts/en.json";
        }
        return this.http.get(langurl).map(res => res.json());
      }
  }
  