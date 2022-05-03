import { Injectable } from "@angular/core";
import { Http, Headers, Response, } from "@angular/http";
import 'rxjs/add/operator/map';
import { environment } from "environments/environment.prod";








@Injectable()
export class ViewUserAuditServices {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

    constructor(private http:Http){


    }



    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      }

    viewUserAudit(serobj:any){
          this.headertoken();
          return this.http
              .post(this.baseResUrl+`/User/userAudit`, serobj, {headers: this.head}).map((res: Response) => res.json());
         
         
         
         
         
            }


}