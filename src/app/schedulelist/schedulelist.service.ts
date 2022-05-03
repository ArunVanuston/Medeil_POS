import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
@Injectable()
export class SchedulelistService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
 private getschdata = this.baseResUrl +'/getschdldata';
 private schedule = this.baseResUrl+'/getschedules';
 private schedulechange = this.baseResUrl+'/editschedule';
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
    //Api's created in Stocks Controller
    getscheduledata(comid:any,branchid:any,locname:any,locrefid:any){
        this.headertoken();
        return this.http.get(this.getschdata + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid ,{headers :this.head}).map(Response => Response.json());

    }
    getschedule(){
        this.headertoken();
        return this.http.get(this.schedule ,{headers:this.head}).map(Response => Response.json());
    }
  
    editschedule(scheduleid:any,productid:any){
        this.headertoken();
        return this.http.get(this.schedulechange + '/' + scheduleid + '/' + productid,{headers:this.head}).map(Response => Response.json());

    }
}