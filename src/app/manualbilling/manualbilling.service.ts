import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class ManualbillingService {
  
  
  baseResUrl: string = environment.backend.baseResUrl;
  payURL: string = environment.backend.paymentUrl;
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
  }

  GetManualCustomers() {
    this.headertoken();
    return this.http.get(this.payURL+'/manual-customer-list',{headers:this.head}).map(res=>res.json());
  }

  GetManualPlanDetails(planid: any) {
   this.headertoken();
   return this.http.get(this.payURL+'/manual-plan-details/'+planid,{headers:this.head}).map(res=>res.json());
  }

  GetManualSalesOrdersList() {
    this.headertoken();
    return this.http.get(this.payURL+'/manual-salesorder-list',{headers:this.head}).map(res=>res.json());
  }

  GetManualSalesOrdersListByID(sordid: any) {
    this.headertoken();
    return this.http.get(this.payURL+'/manual-salesorder-list-byid/'+sordid,{headers:this.head}).map(res=>res.json());
  }

  GetPaidSalesOrderList() {
    this.headertoken();
    return this.http.get(this.payURL+'/paid-salesorder-list',{headers:this.head}).map(res=>res.json());
  }

  UpdateSalesOrderPayStatus(invdetails:any) {
    this.headertoken();
    return this.http.post(this.payURL+'/updatemanualsalesorderpaystatus',invdetails,{headers:this.head}).map(res=>res.json());
  }

  GetManualSalesInvoiceList() {
    this.headertoken();
    return this.http.get(this.payURL+'/manual-salesinvoice-list',{headers:this.head}).map(res=>res.json());
  }

  GetManualSalesInvoiceProducts(orderid: any) {
    this.headertoken();
    return this.http.get(this.payURL+'/manual-salesinvoice-products/'+orderid,{headers:this.head}).map(res=>res.json());
  }

  savesalesorder(value: any) {
    this.headertoken();
    return this.http.post(this.payURL+'/save-manual-customer-order',value,{headers:this.head}).map(res=>res.json());
  }

  //Manual Invoice Services
  searchallpaidcustomers() {
    this.headertoken();
    return this.http.get(this.payURL+'/get-paid-customer-list',{headers:this.head}).map(res=>res.json());
  }

  searchservicecustomers() {
    this.headertoken();
    return this.http.get(this.payURL+'/viewservice-customer-list',{headers:this.head}).map(res=>res.json());
  }

  getadminproducts() {
    this.headertoken();
    return this.http.get(this.payURL+'/get-all-plan-details',{headers:this.head}).map(res=>res.json());
  }

  //Save Service Patients
  saveServicePatient(serobj: string) {
    this.headertoken();
    return this.http.post(this.payURL+`/saveServicePatient`, serobj, {headers: this.head} ) .map(res => res.json());
  }

  getsacsectionlist() {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsectiondetails',{headers:this.head}).map(res=>res.json());
  }

  getsacgrouplist(sectionid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getgroup/'+sectionid,{headers:this.head}).map(res=>res.json());
  }

  getsaclist(sectionid:any,groupid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsac/'+groupid,{headers:this.head}).map(res=>res.json());
  }

  //Save Service Invoice 
  saveServiceInvoice(serobj: string) {
    this.headertoken();
    return this.http.post(this.payURL+`/save-manual-customer-invoice`, serobj, {headers: this.head} ) .map(res => res.json());
  }

}
