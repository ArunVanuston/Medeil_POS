import { Injectable } from "@angular/core";
import { Http, Headers, Response, } from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from "environments/environment.prod";








@Injectable()
export class EmployeeTrackingServices {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  constructor(private http: Http) {


  }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }

  // getTaskStatus(serobj:any){

  //   let header = new Headers({'Content-Type': 'application/json'});
  //   let {headers: this.head} = new Request{headers: this.head}({headers: header});
  //       return this.http
  //         .post(this.baseResUrl+`/User/TaskStatus`, serobj, {headers: this.head}).map((res: Response) => res.json());       

  //       }


  getTaskStatus(cid: any, bid: any, locname: any, locid: any, TaskStatus:any) {

    this.headertoken();

    return this.http.get(this.baseResUrl+`/User/TaskStatus` + '/' + cid + '/' + bid + '/' + locname + '/' + locid +'/'+TaskStatus,{headers: this.head}).map((res: Response) => res.json());


  }




  viewEmployeeTracking(serobj: any) {
this.headertoken();
   return this.http
      .post(this.baseResUrl+`/User/EmployeeTracking`, serobj, {headers: this.head}).map((res: Response) => res.json());





  }


}