import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class customersignupService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  paymentUrl: string = environment.backend.paymentUrl;
private otpreq = this.paymentUrl+'/user-otp-request';
private otpverify = this.paymentUrl+'/otpverification';
private genusername = this.paymentUrl+'/generateusername';
private savetril = this.paymentUrl+'/savetrialcustomer';
private emailurl = this.paymentUrl+'/check-existing-customer';
constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    OTPrequest(data: any){
        this.headertoken();
        return this.http.post(this.otpreq, data, { headers: this.head }).map(res=> res.json()); 
    
      }
      generateusername
      OTPverification(data: any){
        this.headertoken();
        return this.http.post(this.otpverify, data, { headers: this.head }).map(res=> res.json()); 
    
      }

      genratepassword(data: any){
        this.headertoken();
        return this.http.post(this.genusername, data, { headers: this.head }).map(res=> res.json()); 
    
      }

      savetrial(data: any){
        this.headertoken();
        return this.http.post(this.savetril, data, { headers: this.head }).map(res=> res.json()); 
      }

      savemanual(data: any){
        this.headertoken();
        return this.http.post(this.paymentUrl+'/save-manual-customer', data, { headers: this.head }).map(res=> res.json()); 
      }

      Emailvalid(data: any){
        this.headertoken();
        return this.http.get(this.emailurl+'/'+data, { headers: this.head }).map(res=> res.json()); 
    
      }
      
      countrycode(country: any){
        this.headertoken();
        return this.http.get(this.paymentUrl+'/get-country-code/'+country, { headers: this.head }).map(res=> res.json()); 
    
      }
}