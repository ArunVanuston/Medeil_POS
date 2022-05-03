import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class genjournalSaveService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private URL = this.baseResUrl+'/genjrnl/';
  
    private URLnew = this.baseResUrl+'/payment/';
    private decsts = this.baseResUrl + '/getdecimalstatus';
  
    constructor(private http: Http) { }
  
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }
  
    saveGenJournal(myObj: string) {
      this.headertoken();
      return this.http
        .post(this.URL + `saveGenJournal`, myObj, { headers: this.head }).map((res: Response) => res.json());
    }
  
  

    viewAccountsAll(serobj: string) {
      this.headertoken();
      return this.http.post(this.URLnew + `viewPTAccountsAll`, serobj, { headers: this.head })
        .map((res: Response) => res.json());
    }
  
  //Customer wise APi's
  getCustomer(compid: number,brnchid: number,locname:number,locrefid: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/accounts/ViewCustlist'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
    {headers: this.head} ).map(response => response.json());
   }  
   
          //distributor wise APi's
  getDistributor(compid: number,brnchid: number,locname:number,locrefid: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getbarqrDistributors'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
    {headers: this.head} ).map(response => response.json());
   } 

   getEmployee(compid: any, branchid: any, locname: any, locrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/payment/viewEmplist` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid , { headers: this.head }).map(response => response.json());
  }
  getDecimalsts(compid: number, brnchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.decsts + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }


}
