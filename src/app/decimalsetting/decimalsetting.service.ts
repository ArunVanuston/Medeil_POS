import { Injectable } from "@angular/core";
import { Http,Headers,Response } from "@angular/http";
import { environment } from "environments/environment.prod";

@Injectable()
export class DecimalService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  private decsts = this.baseResUrl+'/getdecimalstatus';
  private savedecisetup = this.baseResUrl+'/saveDecimalset';
    constructor(private http: Http){ }
    head;
    headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    getDecimalsts(compid: number,brnchid: number,locname:number,locrefid: number){
        this.headertoken();
        return this.http.get(this.decsts + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,{headers: this.head}).map(response => response.json());
      }

      savedecimalsetup(data){
        this.headertoken();
        return this.http.post(this.savedecisetup, data,{headers: this.head}).map((res: Response) => {
          return res.json()})
      }
}

