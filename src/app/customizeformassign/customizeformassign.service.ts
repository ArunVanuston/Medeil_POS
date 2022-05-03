import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class CustomizeformassignService {
  
 
  payurl: string = environment.backend.paymentUrl;
  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
  }

  getcustomers() {
    this.headertoken();
    return this.http.get(this.payurl+'/get-paid-customer-list',{headers:this.head}).map(res=>res.json());
  }

  getcustomizelabels() {
    this.headertoken();
    return this.http.get(this.payurl+'/customized-label-name',{headers:this.head}).map(res=>res.json());
  }

  SaveCustomizeForms(data: any) {
    this.headertoken();
    return this.http.post(this.payurl+'/client-customized-form-assign', data, { headers: this.head }).map(response => response.json());
  }

  getcustomizeformcustomers() {
    this.headertoken();
    return this.http.get(this.payurl+'/view-customized-customer-list',{headers:this.head}).map(res=>res.json());
  }

}
