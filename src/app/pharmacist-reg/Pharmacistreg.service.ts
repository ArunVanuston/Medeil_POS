import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
@Injectable()
export class pharmacistregService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private getscheules = this.baseResUrl+'/getschedules';
  private getschedu = this.baseResUrl + '/getscheduledata';
  private getallschedu  = this.baseResUrl + '/getallscheduledata';
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    
    //Api's Created in Product Controller
    getschedule(){
      this.headertoken();
      return this.http.get(this.getscheules,{headers:this.head}).map(Response =>Response.json());
    }


    getscheduler(schedule:any,fromdate:any,todate:String,companyid:String,locrefid:any){
      this.headertoken();
      return this.http.get(this.getschedu  + '/' + schedule + '/' + fromdate + '/' + todate + '/' + companyid +'/' + locrefid,{headers:this.head}).map(Response => Response.json());
    }
    getallschedule(companyid:String,branid:any,locname:any,locrefid:any){
      this.headertoken();
      return this.http.get(this.getallschedu + '/' + companyid +'/' + branid + '/' + locname + '/'+ locrefid,{headers:this.head}).map(Response => Response.json()); 
    }
}