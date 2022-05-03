import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class BarcodeSettingsService {
    handleError: any;
    baseResUrl: string = environment.backend.baseResUrl;
  
    constructor(private http: Http) { }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

    //view Stcok Barcode print Api's
    searchstocks(cid:any,bid:any,lname:any,lrefid:any,sval:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/searchstockdata'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+sval,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }


    searchstocksall(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/searchstockdataall'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }
  //view Stcok Date wise Barcode print Api's
  datewisestocks(cid:any,bid:any,lname:any,lrefid:any,date:any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/datewisestockdata'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date,{headers: this.head}).map(res => res.json()).catch(this.handleError);
  }
    generatestockbarcode(data: String) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateStockBarcode', data, { headers: this.head }).map(response => response.json());
    }

    viewStockBarcodeimage(stockid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewstockbarcodeimage' + '/' + stockid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }

    //sales Invoice barcode Print Api's
    getsalesinvoicedetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewsalesinvoiceno'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatesalesinvoicebarcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateSalesinvoiceBarcode', data, { headers: this.head }).map(response => response.json());
    }

    viewSalesinvoiceBarcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewsalesinvoicebarcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }


    //Purchase Invoice barcode Print api's
    getpurchaseinvoicedetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewpurchaseinvoiceno'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatepurchaseinvoicebarcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GeneratePurchaseinvoiceBarcode', data, { headers: this.head }).map(response => response.json());
    }

    viewPurchaseinvoiceBarcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewpurchaseinvoicebarcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }


    //Deliver Challan barcode Print Api's
    getdeliverychallandetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdeliverychallanno'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatedeliverychallanbarcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateDeliverchallanBarcode', data, { headers: this.head }).map(response => response.json());
    }

    viewDeliverychallanBarcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdeliverychallanbarcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    } 

    //GatePAss barcode Print Api's
    getgatepassdetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewgatepassno'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generategatepassbarcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateGatePassBarcode', data, { headers: this.head }).map(response => response.json());
    }

    viewGatepassBarcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewgatepassbarcodeimage' + '/' + invoiceid,{headers: this.head})
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

    generatepurchaseproductbarcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateDistPurchaseProductBarcode', data, { headers: this.head }).map(response => response.json());
    }

    viewDistPurchaseProductBarcodeimage(invoiceproductid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdistpurchaseproductbarcodeimage' + '/' + invoiceproductid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    }

    //purchase barcode Print Api's
    getpurchaseorderdetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewbarpurchaseorderdetails'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatepurchaseorderbarcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GeneratePurchaseOrderBarcode', data, { headers: this.head }).map(response => response.json());
    }

    viewPurchaseorderBarcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewpurchaseorderbarcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    } 
     //purchase barcode Print Api's
    getsalesorderdetails(cid:any,bid:any,lname:any,lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewbarsalesorderdetails'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    generatesalesorderbarcode(data: any) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/GenerateSalesOrderBarcode', data, { headers: this.head }).map(response => response.json());
    }

    viewSalesorderBarcodeimage(invoiceid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewsalesorderbarcodeimage' + '/' + invoiceid,{headers: this.head})
      .map(res => res.json()).catch(this.handleError);
    } 


}




