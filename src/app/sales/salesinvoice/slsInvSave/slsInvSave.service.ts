import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class slsInvSaveService {

  constructor(private http: Http) { }

  baseResUrl: string = environment.backend.baseResUrl;
  private URL = this.baseResUrl + '/slsinv/';
  private deviceurl = this.baseResUrl + '/User/saveUserActivity';

  ngOnInit() { }

  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.baseResUrl + '/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }

  SaveSalesInvoice(invoicedata) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `saveSalesInvoice`, invoicedata, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  smsenable(cid: any) {
    return this.http.get(this.baseResUrl + '/twilio/get-enable-status-salesinvoice' + '/' + cid).map(res => res.json());
  }

  getsmsacdetails(cid: any) {
    return this.http.get(this.baseResUrl + '/twilio/get-sms-account-details' + '/' + cid).map(res => res.json());
  }

  sendsms(sacid: any, atoken: any, senderno: any, recno: any, smsmsg: any, cid: any, bid: any, lname: any, lrefid: any, cdate: any, smsprovideid: any, formid: any) {
    return this.http.get(this.baseResUrl + '/twilio/send-twilio-sms' + '/' + sacid + '/' + atoken + '/' + senderno + '/' + recno +
      '/' + smsmsg + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + cdate + '/' + smsprovideid + '/' + formid).map(res => res.json());
  }

  sendMailAttachment(invoicedata) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(`api/sendMailAttachment`, invoicedata, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  searchdrug(data: any) {  // for drug product search
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSIProductNames`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  searchgeneric(data: any) {  //for drug generic search
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSIProductNames`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //for all customers of letters type
  searchallcustomers(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewallcustomer`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }


  //for only select customers info
  invcustomerinfo(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewparticularcustomer`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getdoctors(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSIDoctors`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getproductdetails(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSIProductName`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getAllSalesOrders(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewAllSalesorders`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  SearchSalesOrdersCustomers(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSalesOrderCustomer`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //for only select customers info in Sorder
  sordercustomerinfo(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `soparticularcustomer`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getconvertsalescustomer(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `convertsalesidcustomer`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getCustSalesOrders(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewCustSalesorders`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getSalesOrderProd(data: any) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `viewSalesOrderProd`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  saveNewProduct(data) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `savenewprod`, data, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }


  //Accounts

  saveSISalesJournal(sijournal: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `saveSISalesJournal`, sijournal, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }


  saveSIReceipt(sireceipt: string) {
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(this.URL + `saveSIReceipt`, sireceipt, options).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }


  getatc(id: any) {

    return this.http.get(`api/getATC` + '/' + id).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getsubstitutedrug(drugid: any, cid: any, bid: any, lname: any, lrefid: any) {
    return this.http.get(`api/get-substitute-drug` + '/' + drugid + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  

}










