import { Injectable } from "@angular/core";
import { Http,Response,Headers } from "@angular/http";
import { environment } from "environments/environment.prod";

@Injectable()
export class ChequeService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private saveURL = this.baseResUrl+'/accounts/saveChequedetails';
  private bankviewURL = this.baseResUrl+'/accounts/getBankaccno';

  constructor(private http: Http) { }
  
   head:any;
   headertoken(){
       this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
       'Content-Type':'application/json'});
     }

     saveCheque(data: string) {
        this.headertoken();
        return this.http.post(this.saveURL, data, { headers: this.head }).map(res => res.json());
      }

      viewBank(cid: any,bid: any, lrefid: any) {
        this.headertoken();
        return this.http.get(this.bankviewURL+'/'+cid+'/'+bid+'/'+lrefid, { headers: this.head }).map(res => res.json());
      }

    //   editBank(id: any) {
    //     this.headertoken();
    //     return this.http.get(this.bankeditURL+'/'+id, { headers: this.head }).map(res => res.json());
    //   }
    }