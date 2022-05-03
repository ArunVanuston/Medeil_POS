import { Injectable } from "@angular/core";
import { Http,Response,Headers } from "@angular/http";
import { environment } from "environments/environment.prod";

@Injectable()
export class BankService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private banksaveURL = this.baseResUrl+'/accounts/saveBankdetails';
  private bankviewURL = this.baseResUrl+'/accounts/ViewBanklist';
  private bankeditURL = this.baseResUrl+'/accounts/bankid';

  constructor(private http: Http) { }
  
   head:any;
   headertoken(){
       this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
       'Content-Type':'application/json'});
     }

     saveBank(data: string) {
        this.headertoken();
        return this.http.post(this.banksaveURL, data, { headers: this.head }).map(res => res.json());
      }

      viewBank(cid: any,bid: any, lname: any, lrefid: any) {
        this.headertoken();
        return this.http.get(this.bankviewURL+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid, { headers: this.head }).map(res => res.json());
      }

      editBank(id: any) {
        this.headertoken();
        return this.http.get(this.bankeditURL+'/'+id, { headers: this.head }).map(res => res.json());
      }

      savePayment(myObj: string) {
        this.headertoken();
        return this.http
          .post(this.baseResUrl + '/payment/savebankdeposit', myObj, { headers: this.head }).map((res: Response) => res.json());
      }
               //distributor wise APi's
    getDistributor(compid: number,brnchid: number,locname:number,locrefid: number) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getbarqrDistributors'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
      {headers: this.head} ).map(response => response.json());
     } 
    }