import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class challanViewService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;


  options  ;

    private viewURL= this.baseResUrl+'/viewdeliverychallan';
    private deviceurl='api/User/saveUserActivity';


  constructor(private http: Http) {}
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
  
    viewDeliveryChallan(comp:any,brnch:any,locname:any,locrefid:any) {
      this.headertoken();
           return this.http.get(this.viewURL+'/'+comp+'/'+brnch+'/'+locname+'/'+locrefid,{headers: this.head}).map((res: Response) => res.json());
    }


    viewdevicedetails(data){
      this.headertoken();
      let header = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: header});
    
      return this.http
        .post(this.deviceurl, data, options)  .map((res: Response) => res.json());
    
    }
  
}
