import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable()
export class DrugQCService {

    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;
  
    constructor(private http: Http) { }
    head: any;
    headertoken() {
        this.head = new Headers({
            'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
            'Content-Type': 'application/json'
        });
    }

    //DesingRaja  New Purchase Delivery Challan
    
    getdrugqclist(){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getAllQcList',{headers:this.head}).map(Response =>Response.json());
      }



    getDrugqcValues(drug:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getSelectedQc'+ '/' + drug,{headers:this.head}).map(Response =>Response.json());
    }

    appstatus(proid:any,status:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/updateQc' + '/' + proid + '/' + status,{headers:this.head}).map(Response =>Response.json());
    }

}


