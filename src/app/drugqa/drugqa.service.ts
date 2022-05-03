import {Injectable } from '@angular/core';
import {Http , Headers } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()

export class DrugQaService {
    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;

    constructor(private http:Http){}
    head: any;
    headertoken() {
        this.head = new Headers({
            'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
            'Content-Type': 'application/json'
        });
    }

   
    
    
    getdrugqalist(){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getAllQaList',{headers:this.head}).map(Response =>Response.json());
      }



    getDrugqaValues(drug:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getSelectedQa'+ '/' + drug,{headers:this.head}).map(Response =>Response.json());
    }

    appstatus(proid:any,status:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/updateQa' + '/' + proid + '/' + status,{headers:this.head}).map(Response =>Response.json());
    }

    

         
}
