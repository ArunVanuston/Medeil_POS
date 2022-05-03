import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
@Injectable()
export class ShortexpiryService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private ureURL = this.baseResUrl+'/stockexp';
  private getsexpdata = this.ureURL+'/getdata';
  private getsexpstatus=this.ureURL+'/shortexpsatatus';
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    savesettings(serobj:any){
      this.headertoken();
      return this.http.post(this.ureURL+`/saveses`,serobj,{headers:this.head}).map(Response =>Response.json());
      

    }
    expstatus(com:any,branc:any,locname:any,locrefid){
      this.headertoken();
      return this.http.get(this.getsexpstatus + '/'  + com + '/' + branc + '/' + locname + '/' + locrefid,{headers:this.head}).map(Response =>Response.json());
     
    }


    //ViewShort Expiry

    getshortexpdata(companyrefid:any,branchid:any,locname:any,locrefid:any){
      this.headertoken();
      return this.http.get(this.getsexpdata + '/' + companyrefid + '/' + branchid + '/' + locname + '/' + locrefid,{headers:this.head}).map(Response =>Response.json());

    }


}