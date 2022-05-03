import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';
@Injectable()
export class receiptSaveService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private    URL=this.baseResUrl+'/receipt/';
  private    URLpt=this.baseResUrl+'/payment/';
  private custURL=this.baseResUrl+'/slsinv/';
  private decsts = this.baseResUrl + '/getdecimalstatus';
  constructor(private http: Http) { }
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
     saveReceipt(myObj: string) {
        this.headertoken();
          return this.http
            .post(this.URL+`saveReceipt`  , myObj, { headers: this.head }).map((res: Response) => res.json());
      }

      saveSalesReceipt(myObj: string) {
        this.headertoken();
          return this.http
            .post(this.baseResUrl+'/slsinv/UpdatePaySIReceipt'  , myObj, { headers: this.head }).map((res: Response) => res.json());
      }

      UpdateCustBalance(data:any) {
        this.headertoken();
        return this.http.post(this.baseResUrl + '/slsinv/updatecustpreviousbal', data , { headers: this.head }).map((res: Response) => res.json())
          .catch((error: any) => {
            return Observable.throw(error.json());
          });
      }

      saveCashManage(myObj: string) {
        this.headertoken();
        return this.http
          .post(this.baseResUrl+`/cashmanage-save`, myObj, { headers: this.head }).map((res: Response) => res.json());
      }
            viewSalesInvoiceNo(serobj: string) {
             this.headertoken();
             return this.http.post( this.URL+`viewSalesInvoiceNo`  , serobj, { headers: this.head })
            .map((res: Response) => res.json());
               }
              
        
               viewSalesInvoice(serobj: string   ) {
               this.headertoken();
          return this.http.post( this.URL+`viewSalesInvoice`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }
              viewCustomerSalesInvoice(serobj: string   ) {
               this.headertoken();
                return this.http.post( this.URL+`viewCustomerSalesInvoice`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }

              getPendingPayLists(data:any) {
                this.headertoken();
                return this.http.post(this.custURL + `getpendingpaylist`, data , { headers: this.head }).map((res: Response) => res.json())
                  .catch((error: any) => {
                    return Observable.throw(error.json());
                  });
              }
              
              viewPurchaseReturnNo(serobj: string) {
             this.headertoken();
             return this.http.post( this.URL+`viewPurchaseReturnNo`, serobj, { headers: this.head })
            .map((res: Response) => res.json());
               }
              
        
               viewPurchaseReturn(serobj: string   ) {
             this.headertoken();
          return this.http.post( this.URL+`viewPurchaseReturn`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }
            viewAccounts(serobj: string) {
              this.headertoken();
             return this.http.post( this.URL+`viewRTAccounts`, serobj, { headers: this.head })
            .map((res: Response) => res.json());
               }
              
        
               viewAccount(serobj: string   ) {
              this.headertoken();
          return this.http.post( this.URL+`viewRTAccount`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }
      viewAccountsAll(serobj: string   ) {
      this.headertoken();
  return this.http.post( this.URLpt+`viewPTAccountsAll`, serobj, { headers: this.head })
           .map((res: Response) => res.json());
      }
      searchallcustomers(data: any) {
        this.headertoken();
        return this.http.post(this.custURL+`viewallcustomer`, data, { headers: this.head }).map((res: Response) => res.json())
        .catch((error: any) => {  return Observable.throw(error.json());
          });
       }

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
