import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class slsInvSaveService {
  
  
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  payurl: string = environment.backend.paymentUrl;
  constructor(private http: Http) { }
  head: any;
  headertoken() {
    this.head = new Headers({
      'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
      'Content-Type': 'application/json'
    });

  }
  private URL = this.baseResUrl + '/slsinv/';
  private deviceurl = this.baseResUrl + '/User/saveUserActivity';



  // getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
  //   return this.http.get(this.baseResUrl+'/getTaxmaster' + '/' + cid + '/' + bid + '/' +  locrefid + '/' + locname).map(res => res.json());
  // }

  SaveSalesInvoice(invoicedata) {
    this.headertoken();
    return this.http.post(this.URL + `saveSalesInvoice`, invoicedata, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  smsenable(cid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + '/twilio/get-enable-status-salesinvoice' + '/' + cid, { headers: this.head }).map(res => res.json());
  }

  emailenable(cid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + '/get-emailenable-status-salesinvoice' + '/' + cid, { headers: this.head }).map(res => res.json());
  }

  getsmsacdetails(cid: any) {
    return this.http.get(this.baseResUrl + '/twilio/get-sms-account-details' + '/' + cid, { headers: this.head }).map(res => res.json());
  }

  sendsms(sacid: any, atoken: any, senderno: any, recno: any, smsmsg: any, cid: any, bid: any, lname: any, lrefid: any, cdate: any, smsprovideid: any, formid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + '/twilio/send-twilio-sms' + '/' + sacid + '/' + atoken + '/' + senderno + '/' + recno +
      '/' + smsmsg + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + cdate + '/' + smsprovideid + '/' + formid, { headers: this.head }).map(res => res.json());
  }

  generatesalesinvoicebarcode(data: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/GenerateSalesinvoiceBarcode', data, { headers: this.head }).map(response => response.json());
  }

  getprintmodel(cid: any, bid: any, lname: any, lrefid: any, formid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + '/viewformsprintmodel' + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + formid, { headers: this.head }).map(res => res.json());
  }

  getsinvoicecount(cid: any, bid: any, lname: any, lrefid: any) {
    this.headertoken();
    return this.http.get(this.URL + 'getsalesinvoicecount' + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid, { headers: this.head }).map(res => res.json());
  }

  sendMailAttachment(invoicedata) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/sendMailAttachment`, invoicedata, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  searchdrug(data: any) {  // for drug product search
    this.headertoken();
    return this.http.post(this.URL + `viewSIProductNames`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  searchgeneric(data: any) {  //for drug generic search
    this.headertoken();
    return this.http.post(this.URL + `viewSIProductNames`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }


  searchdrugbybarcode(data: any) {  // for drug product search use barcode
    this.headertoken();
    return this.http.post(this.URL + `viewProductNamesBarcode`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //for all customers of letters type
  searchallcustomers(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewallcustomer`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  searchallpaidcustomers() {
    this.headertoken();
    return this.http.get(this.payurl+'/get-paid-customer-list',{headers:this.head}).map(res=>res.json());
  }

  getadminproducts() {
    this.headertoken();
    return this.http.get(this.payurl+'/get-all-plan-details',{headers:this.head}).map(res=>res.json());
  }
  

  //for only select customers info
  invcustomerinfo(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewparticularcustomer`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //View Custimer Type

  getadminflag(userid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getempadminflag/` + userid, { headers: this.head }).map(Response => Response.json());
  }

  getcustype(comid: any, branchid: any, locname: any, locrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getcustomtype` + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(Response => Response.json());
  }

  getdoctors(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewSIDoctors`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getproductdetails(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewSIProductName`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getAllSalesOrders(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewAllSalesorders`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  SearchSalesOrdersCustomers(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewSalesOrderCustomer`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //for only select customers info in Sorder
  sordercustomerinfo(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `soparticularcustomer`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getconvertsalescustomer(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `convertsalesidcustomer`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getCustSalesOrders(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewCustSalesorders`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getSalesOrderProd(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewSalesOrderProd`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getRefillProd(data: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewRefillProd`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  saveNewProduct(data) {
    this.headertoken();
    return this.http.post(this.URL + `savenewprod`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }


  //Cash Manage
  saveCashManage(cashmanage: string) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/cashmanage-save`, cashmanage, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //Accounts
  saveSISalesJournal(sijournal: string) {
    this.headertoken();
    return this.http.post(this.URL + `saveSISalesJournal`, sijournal, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }


  saveSIReceipt(sireceipt: string) {
    this.headertoken();
    return this.http.post(this.URL + `saveSIReceipt`, sireceipt, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  saveCreditNote(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `invoicesaveCreditNote`, serobj, { headers: this.head }).map((res: Response) => res.json());
  }


  getatc(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getATC` + '/' + id, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getsubstitutedrug(drugid: any, cid: any, bid: any, lname: any, lrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/get-substitute-drug` + '/' + drugid + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  gettaxmaster(cid: any, bid: any, lrefid: any, lname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getTaxmaster` + '/' + cid + '/' + bid + '/' + lrefid + '/' + lname, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  viewShop(cid: any, bid:any,locname:any,locrefid:any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/viewshopRecord/' + cid + '/' + bid + '/' +locname + '/' + locrefid,{headers: this.head}).map((res: Response) => {
      return res.json()});
  }

  //fixed rouud off
  getfixedroudoff(cid: any, bid: any, lname: any, lrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getdecimalstatus` + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //Loyalty Points
  getCustLoyaltyDetails(cusid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getCustLoyaltyPoints` + '/' + cusid, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getShopLoyaltyDetails(cid: any, bid: any, lname: any, lrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getviewpointscheme/` + cid + '/' + bid + '/' + lname + '/' + lrefid, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getGiftCardDetails(giftcode) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getgiftcarddetails/` + giftcode, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  // Hold Sales Invoice
  HoldSalesInvoice(invoicedata) {
    this.headertoken();
    return this.http.post(this.URL + `holdsalesinvoice`, invoicedata, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  HoldSalesInvoiceProducts(invoicedata) {
    this.headertoken();
    return this.http.post(this.URL + `holdsalesproducts`, invoicedata, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getHoldBills(cid: any, bid: any, lname: any, lrefid: any) {
    this.headertoken();
    return this.http.get(this.URL + `viewholdbills` + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getHoldBillsDetails(id) {
    this.headertoken();
    return this.http.get(this.URL + `getholdbilldetails/` + id, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getHoldBillsProdDetails(id) {
    this.headertoken();
    return this.http.get(this.URL + `getholdbillproddetails/` + id, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //Pending Credits DUe Pay
  getPendingPayLists(data:any) {
    this.headertoken();
    return this.http.post(this.URL + `getpendingpaylist`, data , { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  UpdateCustBalance(data:any) {
    this.headertoken();
    return this.http.post(this.URL + `updatecustpreviousbal`, data , { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getSReturnPayLists(serobj:any) {
    this.headertoken();
    this.headertoken();
    return this.http.post(this.baseResUrl+'/payment/viewCustsalesreturn', serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  savePayment(myObj: string) {
    this.headertoken();
    return this.http
      .post(this.baseResUrl+'/payment/savePayment', myObj, { headers: this.head }).map((res: Response) => res.json());
  }

  //  /receipt/saveReceipt
  saveReceipt(myObj: string) {
    this.headertoken();
      return this.http
        .post(this.baseResUrl+'/slsinv/UpdatePaySIReceipt'  , myObj, { headers: this.head }).map((res: Response) => res.json());
  }

  getPrevRefillLists(id) {
    this.headertoken();
    return this.http.get(this.URL + `getPrevRefillDatas/` + id, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  SaveQuotateInvoice(invoicedata) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/paitentsavePerformainvoice`, invoicedata, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  SaveQuotateInvoiceproduct(invoicedata) {
    this.headertoken();  // saveSalesInvoice
    return this.http.post(this.baseResUrl + `/paitentsavePerformaproduct`, invoicedata, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  //Manual Invocie
  GetManualInvoiceCustInfo(custcountryid: any) {
    this.headertoken();
    return this.http.get(this.payurl + `/GetManualInvoiceCustInfo/` + custcountryid, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  saveprescription(data: any)  {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/ehrMasterSave`, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  SavePrescfile(image) {
    let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.post(this.baseResUrl+`/ehrMasterDocumentSave`, image, { headers: imghead } ).map((res: Response) => res.json());
  }


}


