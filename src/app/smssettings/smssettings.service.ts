import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()

export class smsService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  constructor(private http: Http) {}
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
    private URL=this.baseResUrl+'/';  
    private deviceurl=this.baseResUrl+'/User/saveUserActivity';
    
  
    smsenabledisable(cid: any) {
      this.headertoken();
      return this.http.get(this.URL+'twilio/view-enable-status' + '/' + cid,{headers: this.head}).map(res => res.json());
    }

    viewsmsdefaultforms() {
      this.headertoken();
      return this.http.get(this.URL+'twilio/view-sms-default-forms',{headers: this.head}).map(res => res.json());
    }
      
    savesmsaccount(smsdata){
      this.headertoken();
       return this.http.post(this.URL+`twilio/save-twilio-sms-account`, smsdata, {headers: this.head}).map((res: Response) => res.json())
        .catch((error: any) => {  return Observable.throw(error.json());
        });
     }

     viewcompanysmslog(cid: any) {
      this.headertoken();
      return this.http.get(this.URL+'twilio/view-sms-logs-companywise' + '/' + cid,{headers: this.head}).map(res => res.json());
    }

     getbranchlist(cid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/userbranchlist' + '/' + cid,{headers: this.head}).map(res => res.json());
    }

    getshoplist(cid: any,bid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getshopname1' + '/' + cid + '/' + bid,{headers: this.head}).map(res => res.json());
    }

    viewshopsmslog(cid: any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.URL+'twilio/view-sms-logs-shopwise' + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid,{headers: this.head}).map(res => res.json());
    }

    savesmsenabledisable(smsdata){
      this.headertoken();
    return this.http.post(this.URL+`twilio/save-enable-or-disable-sms`, smsdata, {headers: this.head}).map((res: Response) => res.json())
      .catch((error: any) => {  return Observable.throw(error.json());
      });
   }

   createsmsenabledisable(smsdata){
    this.headertoken();
  return this.http.post(this.URL+`twilio/createdefaultsmssettings`, smsdata, {headers: this.head}).map((res: Response) => res.json())
    .catch((error: any) => {  return Observable.throw(error.json());
    });
  }
   // /api/twilio/get-alltime-sms-pie-chart-formwise/{companyrefid
   getsmschartvalues(cid: any) {
     this.headertoken();
    return this.http.get(this.URL+'twilio/get-alltime-sms-pie-chart-formwise' + '/' + cid,{headers: this.head}).map(res => res.json());
  }
           
}










