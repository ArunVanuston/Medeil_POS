import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class PolicyService {
  
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  paymentUrl:string=  environment.backend.paymentUrl
  constructor(private http: Http) {}

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
  }

  savepolicy(serobj: string) { 
    this.headertoken();
    return this.http.post(this.paymentUrl+`/savePolicy`, serobj, {headers: this.head} ).map((res: Response) => res.json());
  }

  policyView(cid: any,bid:any,lname:any,lrefid:any) {
    this.headertoken();
    return this.http.get(this.paymentUrl+'/getPolicyDetailsByUser/'+cid+'/'+bid+'/'+lname+'/'+lrefid, {headers: this.head} ).map((res: Response) => res.json());
  }

  viewPolicyEdit(policyid){ 
    this.headertoken();
    return this.http.get(this.paymentUrl+'/getPolicyDetails/'+policyid, {headers: this.head} ).map((res: Response) => res.json());
  } 

  updatePolicy(serobj: string) {
    this.headertoken();
    return this.http.post(this.paymentUrl+`/updatePolicy`, serobj, {headers: this.head}).map((res: Response) => res.json());
  }


}
