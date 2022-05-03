import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';


@Injectable()
export class savePaymentService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private getDistributors= this.baseResUrl+'/getPODistributor';
  private URL = this.baseResUrl+'/payment/';
  private URLnew = this.baseResUrl+'/payment';
  private decsts = this.baseResUrl + '/getdecimalstatus';

  constructor(private http: Http) { }

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

  savePayment(myObj: string) {
    this.headertoken();
    return this.http
      .post(this.URL + `savePayment`, myObj, { headers: this.head }).map((res: Response) => res.json());
  }

  saveCashManage(myObj: string) {
    this.headertoken();
    return this.http
      .post(this.baseResUrl+`/cashmanage-save`, myObj, { headers: this.head }).map((res: Response) => res.json());
  }



  viewPurchaseInvoiceNo(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewPurchaseInvoiceNo`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  viewPurchaseInvoice(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewPurchaseInvoice`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  viewVendorPurchaseInvoice(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewVendorPurchaseInvoice`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  viewCustomersalesreturn(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewCustsalesreturn`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  viewSalesReturnNo(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewSalesReturnNo`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  viewSalesReturn(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewSalesReturn`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  viewAccounts(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewPTAccounts`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  viewAccount(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewPTAccount`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  viewAccountsAll(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewPTAccountsAll`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  // getDistributor(searchValue: string,compid: number,brnchid: number,locname:number,locrefid: number) {
  //   //Get Distributor
  //   this.headertoken();
  //   return this.http.get(this.getDistributors+ '/'+searchValue+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid, { headers: this.head }).map(response => response.json());
  //  }

    //Customer wise APi's
    getCustomer(compid: number,brnchid: number,locname:number,locrefid: number) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/accounts/ViewCustlist'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
      {headers: this.head} ).map(response => response.json());
     }  
     
            //distributor wise APi's
    getDistributor(compid: number,brnchid: number,locname:number,locrefid: number) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getbarqrDistributors'+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
      {headers: this.head} ).map(response => response.json());
     } 

     getEmployee(compid: any, branchid: any, locname: any, locrefid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl + `/payment/viewEmplist` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid , { headers: this.head }).map(response => response.json());
    }
    getDecimalsts(compid: number, brnchid: number, locname: number, locrefid: number) {
      this.headertoken();
      return this.http.get(this.decsts + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
    }
}
