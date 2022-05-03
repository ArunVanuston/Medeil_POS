import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { environment } from "environments/environment.prod";

@Injectable()
export class paymentoutstandingService {
    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;

    private payoutlist = this.baseResUrl+'/payment/viewpaymentoutstanding';
    constructor(private http: Http) { }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }
  
      Getpaymentout(cid: any,bid: any,lname: any,lrefid: any,date: any){
        this.headertoken();
        return this.http.get(this.payoutlist+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date,{headers:this.head}).map(Response => Response.json())
      }

}