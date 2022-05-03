import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()
export class crmReportService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
   handleError: any;
   headers: any;
  //  private empUrl = this.baseResUrl+'/empcreateRecord';
  //  private getCompanies = this.baseResUrl+'/getEmpCompany';
  //  private getBranches = this.baseResUrl+'/getEmpBranch';
  private getcustinfo = this.baseResUrl+'/getcustinfo';
    constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      }
  //  getcompany(): Promise<any> {
  //      return this.http.get(this.baseResUrl+'/getCompany')
  //      .toPromise()
  //      .then(response => response.json() as any)
  //      .catch(this.handleError);

      
  //  }

  //  getBranch(cid: any) {
  //      return this.http.get(this.baseResUrl+'/userbranchlist' + '/' + cid).map(res => res.json());
  //    }
   
  getCustomerInfo(compid: number, branchid: number, locname: number, locrefid: number)    {
    this.headertoken();
    return this.http.get(this.getcustinfo  + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  
}

