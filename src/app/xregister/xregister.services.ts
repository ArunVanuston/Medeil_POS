import { Injectable } from "@angular/core";
import {  Response, Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from "environments/environment.prod";
import { Observable } from "rxjs";

@Injectable()
export class XRegisterServices {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
    constructor(private http: Http) { }


    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
    }

    getOpenRegdetails(userid:any,logintime:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/get-employee-openregister-details/'+userid+'/'+logintime,{headers: this.head}).map(response => response.json());
    }

    getTranscdetails(userid:any, logintime:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/get-employee-transaction-details/'+userid+ '/'+ logintime,{headers: this.head}).map(response => response.json());
    }

    getEmployeedetails(userid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/get-employee-details/'+userid,{headers: this.head}).map(response => response.json());
    }

    getAddRemoveTotal(userid:any, logintime:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/addremovecash-total/'+userid+ '/'+ logintime,{headers: this.head}).map(response => response.json());
    }

    getDistributordetails(compid: number,brnchid: number,locname:number,locrefid: number){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getbarqrDistributors/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,{headers: this.head}).map(response => response.json());
    }

    xOpenRegisterSave(obj: any) {
        this.headertoken();
        return this.http.post(this.baseResUrl +`/login-employee-openregister-save`, obj, {headers: this.head}).map((res: Response) => res.json());
    }

    xCloseRegisterSave(obj: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl +`/logout-employee-closeregister-save`, obj, {headers: this.head}).map((res: Response) => res.json());
    }

    //view Form Api's
    ViewallOpenRegisterdetails(cid:any, bid:any, lname:any, lrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/view-open-register-details/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(response => response.json());
    }

    ViewallCloseRegisterdetails(cid:any, bid:any, lname:any, lrefid:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/view-close-register-details/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(response => response.json());
    }

    ViewCashMovements(userid:any, logintime:any, logouttime:any){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/cash-movementdetails/'+userid+'/'+logintime+'/'+logouttime,{headers: this.head}).map(response => response.json());
    }

    viewSummary(obj: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+`/xandz/viewsummary`, obj, {headers: this.head}).map((res: Response) => res.json());
    }

    xOpenRegisterAccountSave(obj: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl +`/login-employee-openregjournal-save`, obj, {headers: this.head}).map((res: Response) => res.json());
    }

    xCloseRegisterAccountSave(obj: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl +`/login-employee-closeregjournal-save`, obj, {headers: this.head}).map((res: Response) => res.json());
    }

    //Accounts
    viewAccountType(serobj: string) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/accounts/viewAccountType', serobj, { headers: this.head })
        .map((res: Response) => res.json());
    }

    GetAccountTypeLists(cid: any,bid:any,lname:any,lrefid:any,accid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/accounts/GetAccTypeLists'+'/'+cid+'/'+bid+'/'+lname+'/'+ lrefid+'/'+accid, { headers: this.head })
        .map((res: Response) => res.json());
    }

    UpdateAccBal(serobj: string) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/accounts/UpdateAccBalance', serobj, { headers: this.head })
        .map((res: Response) => res.json());
    }

    //save cash manage
    saveCashManage(cashmanage: string) {
      this.headertoken();
      return this.http.post(this.baseResUrl+`/cashmanage-save`, cashmanage, {headers: this.head})  .map((res: Response) => res.json())
        .catch((error: any) => {  return Observable.throw(error.json());
        });
    }



}