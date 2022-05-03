import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment.prod';
@Injectable()
export class addonsService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  payUrl:string=environment.backend.paymentUrl;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }
  head:any;

    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

    searchdrug(data:any){
      this.headertoken();
      return this.http.post(this.baseResUrl+`/slsinv/viewSIProductNames`, data, {headers: this.head}).map((res: Response) => res.json())
        .catch((error: any) => {  return Observable.throw(error.json());
        });
    }

    getemployeelist(userid:any){
      this.headertoken();
      return this.http.get(this.payUrl+'/'+ 'checkemployee'+ '/' + userid, {headers: this.head}).map((res: Response) => res.json())
        .catch((error: any) => {  return Observable.throw(error.json());
        });
    }


  // getTimestamp(userid): Promise<any> {
  //   this.headertoken();
  //   return this.http.get(this.payUrl + '/get-remaining-days/' + userid,{headers: this.head})
  //     .toPromise().then(response => response.json() as any).catch(this.handleError);
  // }

  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map(res=> res.json()); 
  }

 
}
