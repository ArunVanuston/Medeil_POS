import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class PaymentTrialService {
   
    handleError: any;
    baseResUrl: string = environment.backend.paymentUrl;
 
    constructor(private http: Http) { }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }
     
    ViewAllPayments(){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewallrazorpay-payment-status',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    ViewCustPayments(userid,startdate,enddate){
      this.headertoken();
      return this.http.get(this.baseResUrl+'/customer-individual-payment/'+userid+'/'+startdate+'/'+enddate,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getAllTrialPaidCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getAllTrialPaidCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getFreeEditionCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getFreeEditionCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getAllTrialCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getAllTrialCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getBronzeTrialCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getBronzeTrialCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getSilverTrialCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getSilverTrialCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getGoldTrialCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getGoldTrialCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getPlatinumTrialCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getPlatinumTrialCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    //Paid Edition Customers
    getAllEditionCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getAllEditionCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getBronzeEditionCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getBronzeEditionCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getSilverEditionCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getSilverEditionCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getGoldEditionCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getGoldEditionCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    getPlatinumEditionCustomers() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getPlatinumEditionCustomers',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    ViewCartDetails(userid: any, date: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/customer-individual-cart-item-payment/'+userid+'/'+date,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }
   

}




