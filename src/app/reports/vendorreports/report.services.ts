import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()

export class vendorReportModule  {
   baseUrl: string = environment.backend.baseURL;
   baseResUrl: string = environment.backend.baseResUrl;
   
   handleError: any;
   headers: any;
   private empUrl = this.baseResUrl+'/empcreateRecord';
   private getCompanies = this.baseResUrl+'/getEmpCompany';
   private getBranches = this.baseResUrl+'/getEmpBranch';
   private getdistinfo = this.baseResUrl+'/getdistinfo';
    constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
   
      }
   getcompany(): Promise<any> {
    this.headertoken();
       return this.http.get(this.baseResUrl+'/getCompany',{headers: this.head})
       .toPromise()
       .then(response => response.json() as any)
       .catch(this.handleError);

      
   }

   getBranch(cid: any) {
    this.headertoken();
       return this.http.get(this.baseResUrl+'/userbranchlist' + '/' + cid,{headers: this.head}).map(res => res.json());
     }
   

     getDistributorInfo(comid:any,branchid:any,locname:any,locrefid:any)    {
      this.headertoken();
       return this.http.get(this.getdistinfo + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid ,{headers: this.head}).map(response => response.json());
     }
  
}

