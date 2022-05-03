import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()

export class adminReportModule  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
   handleError: any;
   headers: any;
   private empUrl = this.baseResUrl+'/empcreateRecord';
   private getCompanies = this.baseResUrl+'/getEmpCompany';
   private getBranches = this.baseResUrl+'/getEmpBranch';
   private getShops = this.baseResUrl+'/getEmpShop';
   private getAllCompanies = this.baseResUrl+'/getAllCompanies';

   constructor(private http: Http) { }
   head:any;
   headertoken(){
       this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
       'Content-Type':'application/json'});
 
     }
   getcompany(): Promise<any> {
       return this.http.get(this.baseResUrl+'/getCompany',{headers: this.head})
       .toPromise()
       .then(response => response.json() as any)
       .catch(this.handleError);

      
   }

   getBranch(cid: any) {
       return this.http.get(this.baseResUrl+'/userbranchlist' + '/' + cid,{headers: this.head}).map(res => res.json());
     }
     getAllCompany() {
       //Get Companies
       return this.http.get(this.getAllCompanies).map(response => response.json());
     }
  
}

