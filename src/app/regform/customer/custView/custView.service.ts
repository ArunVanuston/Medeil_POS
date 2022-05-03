import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class custViewService  {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;


  constructor(private http: Http) {}
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
    
      private    URL=this.baseResUrl+'/patient/';
  
  
  
    patientView(serobj: string) {
      this.headertoken();
           return this.http.post( this.URL+`viewPatients`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
    ViewAllRefillCustomers(cid: any, bid: any, lname: any, lrefid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/patient/Viewallrefillcustomers'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers:this.head}).map(Response => Response.json())
    }

    GetRefillAlerts(cid: any,bid: any,lname: any,lrefid: any){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/patient/refillalerts'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers:this.head}).map(Response => Response.json())
    }
  
    patientDelete(serobj: string) {
      this.headertoken();
           return this.http.post( this.URL+`deletePatient`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
  
  
    save(serobj: string) {
      this.headertoken();
           return this.http.post(`http://localhost:8081/api/paytm/saveSales79`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
    }
  
  
  
  


}
