import { Injectable } from "@angular/core";
import { Http,Headers } from "@angular/http";
import { environment } from "environments/environment.prod";

@Injectable()
export class finacialsetting{
    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;

    private saveFinac = this.baseResUrl+'/saveFinacialyr';

    constructor(private http:Http){}
    head;
    headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    saveFinacialyear(data){
      this.headertoken();
      return this.http.post(this.saveFinac,data,{headers:this.head}).map(res => res.json())
    }

}
