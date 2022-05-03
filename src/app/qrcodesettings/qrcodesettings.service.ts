import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class QrcodeSettingsService {
    handleError: any;
    baseResUrl: string = environment.backend.baseResUrl;
  
    constructor(private http: Http) { }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

    //view Stcok Qrcode print Api's
    searchstocks(cid:any,bid:any,lname:any,lrefid:any,sval:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/searchstockdata'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+sval,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    searchstocksall(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/searchstockdataall'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    //view Stcok Date wise qrcode print Api's
    datewisestocks(cid:any,bid:any,lname:any,lrefid:any,date:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/datewisestockdata'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatestockQrcode(data: String) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateStockQrcode', data, { headers: this.head }).map(response => response.json());
    }

    viewStockQrcodeimage(stockid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewstockqrcodeimage' + '/' + stockid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }

    //sales Invoice Qrcode Print Api's
    getsalesinvoicedetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewsalesinvoiceno'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatesalesinvoiceQrcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateSalesinvoiceQrcode', data, { headers: this.head }).map(response => response.json());
    }

    viewSalesinvoiceQrcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewsalesinvoiceqrcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }


    //Purchase Invoice Qrcode Print api's
    getpurchaseinvoicedetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewpurchaseinvoiceno'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatepurchaseinvoiceQrcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GeneratePurchaseinvoiceQrcode', data, { headers: this.head }).map(response => response.json());
    }

    viewPurchaseinvoiceQrcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewpurchaseinvoiceqrcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }


    //Deliver Challan Qrcode Print Api's
    getdeliverychallandetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdeliverychallanno'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatedeliverychallanQrcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateDeliverchallanQrcode', data, { headers: this.head }).map(response => response.json());
    }

    viewDeliverychallanQrcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdeliverychallanqrcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }

    //Gate Pass Qrcode Print Api's
    getgatepassdetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewgatepassno'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generategatepassQrcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateGatePassQrcode', data, { headers: this.head }).map(response => response.json());
    }

    viewGatePassQrcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewgatepassqrcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }

    //distributor wise APi's

    getDistributor(compid: number,brnchid: number,locname:number,locrefid: number) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getbarqrDistributors'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
      {headers: this.head} ).map(response => response.json());
     }

    getdistributorinvoice(compid: number,brnchid: number,locname:number,locrefid: number,distid:number) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdistributorpurchaseinvoice'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid+'/'+distid,
      {headers: this.head} ).map(response => response.json());
     }

    getdistributorinvoiceproducts(distinvoiceid:number) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdistributorpurchaseinvoiceproducts'+ '/' + distinvoiceid,{headers: this.head})
      .map(response => response.json());
    }

    generatepurchaseproductQrcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateDistPurchaseProductQrcode', data, { headers: this.head }).map(response => response.json());
    }

    viewDistPurchaseProductQrcodeimage(invoiceproductid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdistpurchaseproductqrcodeimage' + '/' + invoiceproductid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }
    
    //Purchase Order Qrcode Print Api's
    getpurchaseorderdetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewbarpurchaseorderdetails'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatepurchaseorderQrcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GeneratePurchaseOrderQrcode', data, { headers: this.head }).map(response => response.json());
    }

    viewPurchaseOrderQrcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewpurchaseorderqrcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    } 
    
    //Sales Order Qrcode Print Api's
    getsalesorderdetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewbarsalesorderdetails'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatesalesrderQrcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateSalesOrderQrcode', data, { headers: this.head }).map(response => response.json());
    }

    viewSalesOrderQrcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewsalesorderqrcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }



}




