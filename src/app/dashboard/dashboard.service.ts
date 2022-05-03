import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
//import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { DxNumberBoxModule } from 'devextreme-angular';
import { UserloginService } from 'app/userlogin/userlogin.service';
import { environment } from 'environments/environment.prod';

@Injectable()
export class DashboardService {
  
 
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  
  private minstock=this.baseResUrl+'/getminimunstock';
  private getTaskStats=this.baseResUrl+'/getTaskStatusBar';
  private getcust =this.baseResUrl+'/getcustomercount';
  private getprod = this.baseResUrl+'/getproductcount';
  private getstock = this.baseResUrl+'/getstockcount';
  private getsaleinvoice = this.baseResUrl+'/SIDBoard';
  private getoos = this.baseResUrl+'/getoutofstockcount';

  private getshortex = this.baseResUrl+'/getshortexpirycount';
  private expstock = this.baseResUrl+'/getexpirystockcount';
  
  constructor(private http: Http) {  }
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  getSalesDatas(compid: number, branchid: number, locname: number, locrefid: number) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getdashsalesdatas' + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }

  getProductwiseSales(compid: number, branchid: number, locname: number, locrefid: number) {
  this.headertoken();
  return this.http.get(this.baseResUrl+'/getsalesdatasbyproductwise' + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }

  getPurchaseDatas(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getdashpurchasedatas' + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }

  getDistributorwisePurchase(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getdistributorwisepurchasedatas' + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }

  getMinimumQuantity(compid: number, branchid: number, locname: number, locrefid: number) {
    //Get minimum qunatity
    this.headertoken();
    return this.http.get(this.minstock + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  //DesingRaja
  //Customer
  getcustomercount(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.getcust + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  //DesingRaja
  //Product count
  getproductcount(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.getprod + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
//Desingraja   Stock count
  getstockcount(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.getstock + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  //Desingraja   Sales invoice
  getsalesinvoice(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.getsaleinvoice + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  //Desingraja   Out of Stock
  getoutofstock(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.getoos + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  //Desingraja   Short Expiry Stock
  getshortexp(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.getshortex + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  //Desingraja   Out of Stock
  getexpiredstock(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.expstock + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  
  
  getTaskStatusBar(compid: number, branchid: number, locname: number, locrefid: number) {
    //Get minimum qunatity
    this.headertoken();
    return this.http.get(this.getTaskStats + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }


  getPriorityBar(compid: any, branchid: any, locname: any, locrefid: any, empid: number) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/getPriorityBar` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + empid, { headers: this.head }).map(response => response.json());
  }


  salesordertype(compid: number,branchid: number,locname:number,locrefid: DxNumberBoxModule){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsalesordertype'+ '/'+compid+'/'+branchid+'/'+locname+'/'+locrefid,{headers: this.head}).map(response => response.json());
  }

  getABCDatas(compid: number, branchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getdashabcdatas' + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }
  getShopName(shopid:any) {
    //Get getDrugList
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getshopinfo' + '/' + shopid, { headers: this.head }).map(response => response.json());
    // return this.http.get(this.shopinfo+ '/'+ shopid, { headers: this.head }).map((res: Response) => {
    //   return res.json()}).catch(this.handleError)
    //return this.http.get(this.shopinfo+'/'+shopid,{headers: this.head}).map(response => response.json()).catch(this.handleError);
   }

  
}