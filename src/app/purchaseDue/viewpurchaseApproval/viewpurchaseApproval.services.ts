import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class viewpurchaseApprovalService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private viewpurdue = this.baseResUrl+'/getpurchaseduedetails';
  constructor(private http: Http) {

  }

  
  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

      Viewpurchasedue(cid: any, bid: any, lname: any, lrefid: any){
        this.headertoken()
         return this.http.get(this.viewpurdue+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers:this.head}).map(response => response.json());
      }
}
