import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
@Injectable()
export class securitymonitoringService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 private getuserlockdetails = this.baseResUrl+'/Viewuserlockdetails';
 private updattolock = this.baseResUrl+'/updatetoloc';
 private updattounlock=this.baseResUrl+'/updatetounloc';
 private getlogindata=this.baseResUrl+'/loginhistory';
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    getuserdata(){
      this.headertoken();
      return this.http.get(this.getuserlockdetails,{headers:this.head}).map(Response=>Response.json());
    }

    //unlock to lock
    updatetolock(val:any){
      this.headertoken();
      return this.http.get(this.updattolock + '/' + val,{headers:this.head}).map(Response=>Response.json());
    }

    //lock to unlock
    updatetounlock(val1:any){
      this.headertoken();
      return this.http.get(this.updattounlock + '/' + val1,{headers:this.head}).map(Response=>Response.json());
    }

    //Veiw Login History
    getloginhistory(){
      this.headertoken();
      return this.http.get(this.getlogindata,{headers:this.head}).map(Response=>Response.json());
    }

    //Get Access Token Time

    gettokendetails(){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/getaccesstokentime`,{headers:this.head}).map(Response=>Response.json());
    }

    //Update Access token time
    savetime(tokenid:any,attime:any,rttime:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+`/updatetokentime` + '/' + tokenid + '/' + attime + '/' +rttime,{headers:this.head}).map(Response =>Response.json());

    }

    //Get User Password History
    getupasshistory(){
    this.headertoken();
    return this.http.get(this.baseResUrl+`/getpassdetails`,{headers:this.head}).map(Response =>Response.json());
    }
  }