import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class planService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  paymentUrl: string = environment.backend.paymentUrl;

private editionList = this.baseResUrl+'/EditionModules';
private editiondata = this.baseResUrl+'/EditionDetails';
private planList = this.paymentUrl+'/gettrialplan';
private planid = this.paymentUrl+'/getPlanid';


  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    geteditionlist(cid: any,pid: any,did: any,sdid: any,event: any) {
        this.headertoken();
        return this.http.get(this.editionList+ '/' + cid + '/' + pid+ '/' + did+ '/' + sdid+'/'+event, { headers: this.head }).map(res => res.json());
      }

      geteditionDetails(eid: any) {
        this.headertoken();
        return this.http.get(this.editiondata+ '/' + eid, { headers: this.head }).map(res => res.json());
      }

      getplandetails(etype:any) {
        this.headertoken();
        return this.http.get(this.planList+'/'+etype, { headers: this.head }).map(res => res.json());
      }

      saverazorplan(serobj: any){
        this.headertoken();
        return this.http.post(this.paymentUrl+'/Razorpayplancreation', serobj, { headers: this.head }).map(res=> res.json()); 
    
      }
      getplan(cId:any,edition:any,plantype:any){
        return this.http.get(this.planid+ '/' + cId+'/'+edition+'/'+plantype).map(res => res.json())
      }
      
      saveplan(serobj: any){
        this.headertoken();
        return this.http.post(this.paymentUrl+'/saveplan', serobj, { headers: this.head }).map(res=> res.json()); 
      }
}