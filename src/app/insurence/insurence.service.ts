import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class InsurenceService {
  
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  paymentUrl:string=  environment.backend.paymentUrl
  constructor(private http: Http) {}

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
  }

  saveinsurance(serobj: string) {
    this.headertoken();
    return this.http.post(this.paymentUrl+`/saveInsurance`, serobj, {headers: this.head} ).map((res: Response) => res.json());
  }

 insuranceView(cid: any,bid:any,lname:any,lrefid:any) {
    this.headertoken();
    return this.http.get(this.paymentUrl+'/getInsuranceDetailsByUser/'+cid+'/'+bid+'/'+lname+'/'+lrefid, {headers: this.head} ).map((res: Response) => res.json());
  }

  viewInsurenceEdit(insuranceid){ 
    this.headertoken();
    return this.http.get(this.paymentUrl+'/getInsuranceDetails/'+insuranceid, {headers: this.head} ).map((res: Response) => res.json());
  }
  
  updateInsurence(serobj: string) {
    this.headertoken();
    return this.http.post(this.paymentUrl+`/updateInsurance`, serobj, {headers: this.head}).map((res: Response) => res.json());
  }

}
