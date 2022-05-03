import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class AccledgerService  {
 
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 

 
  
  constructor(private http: Http) { }

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }
    
      
         //distributor wise APi's
    getDistributor(compid: number,brnchid: number,locname:number,locrefid: number) {
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getbarqrDistributors'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
        {headers: this.head} ).map(response => response.json());
       }   


         //Customer wise APi's
    getCustomer(compid: number,brnchid: number,locname:number,locrefid: number) {
        this.headertoken();
        return this.http.get(this.baseResUrl+'/accounts/ViewCustlist'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
        {headers: this.head} ).map(response => response.json());
       }   


                //Ledger Details APi's
    getLedger(compid: number,brnchid: number,locname:number,locrefid: number,enddate: string,
      personid: number,status: number, persontype:number) {
        this.headertoken();
        return this.http.get(this.baseResUrl+'/accounts/Viewledgerdetails'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid+
        '/'+enddate+'/'+personid+'/'+status+'/'+persontype,
        {headers: this.head} ).map(response => response.json());
    } 

    getTotalReturnCredit(locrefID1: any, personid: any) {
      this.headertoken();
        return this.http.get(this.baseResUrl+'/accounts/ViewCreditamt/'+locrefID1+'/'+personid,
        {headers: this.head} ).map(response => response.json());
    }

    getTotalReturnDebit(locrefID1: any, personid: any) {
      this.headertoken();
        return this.http.get(this.baseResUrl+'/accounts/ViewDepitamt/'+locrefID1+'/'+personid,
        {headers: this.head} ).map(response => response.json());
    }

}
