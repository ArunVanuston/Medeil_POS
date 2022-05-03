import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment.prod';

@Injectable()
export class DamagestockService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 

  private getinvoice = this.baseResUrl+'/getInvoice';
  private getloctype=this.baseResUrl+'/getLoctype';
  private getlocrefname=this.baseResUrl+'/getLocreference';
  private lisURL = this.baseResUrl+'/getDatablevalues';
  private getautoid=this.baseResUrl+'/getdamageautoinc';
  private getPurchaseinvoice = this.baseResUrl+'/getinvoicedetails';
  private getPiproduct = this.baseResUrl+'/getpiproduct';
  private saveDamages = this.baseResUrl+'/savedamagestockform';
  private updateDamages= this.baseResUrl+'/updateDamage';
  private getBoxqty = this.baseResUrl+'/getBoxqty';
  private getSGQtyURL = this.baseResUrl+'/getqty';
  private shopdamTaxURL = this.baseResUrl+"/getshopDamagetax";
  private hospitaldamTaxURL = this.baseResUrl+"/gethospitalDamagetax";
  private warehousedamTaxURL = this.baseResUrl+"/getwarehouseDamagetax";
  private damagetableURL = this.baseResUrl+"/createDamagetable";
  private damageedittableURL=this.baseResUrl+"/updateDamagetable";
  private viewDamageUrl = this.baseResUrl+"/viewDamage";
  private viewhqDamageUrl = this.baseResUrl+"/viewhqDamage";
  private getEditURL=this.baseResUrl+"/editDamage";
  private getEdittableURL=this.baseResUrl+"/editdamagetable";
  private deletedamageUrl = this.baseResUrl+"/deleteDamage";
  private prolist = this.baseResUrl+'/getsearchproddetails';
  private getHeadqview =this.baseResUrl+'/hqdamageview';
  private getHeadqtableview =this.baseResUrl+'/hqdamagetableview';
  private deviceurl=this.baseResUrl+'/User/saveUserActivity';



  constructor(private http: Http) {  }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  deletedamastock(id: number) {
    this.headertoken();
    return this.http.get(this.deletedamageUrl + '/' + id, { headers: this.head }).map(response => response.json());
  }

  viewDamage(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.viewDamageUrl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, { headers: this.head }).map(response => response.json());
  }

  viewhqDamage(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.viewhqDamageUrl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, { headers: this.head }).map(response => response.json());
  }

  getInvoice(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.getinvoice + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, { headers: this.head }).map(response => response.json());
  }

  getLoctype(): any {
    this.headertoken();
    return this.http.get(this.getloctype, { headers: this.head }).map(response => response.json());
  }

  getlocrefid(locname: any): any {
    this.headertoken();
    return this.http.get(this.getlocrefname + '/' + locname, { headers: this.head }).map(response => response.json());
  }

  getDamageautono(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.getautoid + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, { headers: this.head }).map(response => response.json());
  }

  getBrandlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.lisURL + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, { headers: this.head }).map(res => res.json());
  }

  getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, { headers: this.head }).map(res => res.json());
  }
  

  getpurchaseinvoice(cid: any, bid: any, locrefid: any, locname: any,invoiceid: number) {
    this.headertoken();
    return this.http.get(this.getPurchaseinvoice+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + invoiceid, { headers: this.head }).map(response => response.json());
  }

  getpiproduct(cid: any, bid: any, locrefid: any, locname: any,invoicepro: number) {
    this.headertoken();
    return this.http.get(this.getPiproduct+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + invoicepro, { headers: this.head }).map(response => response.json());
  }


  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  saveDamage(data: String) {
    this.headertoken();
    return this.http.post(this.saveDamages, data, { headers: this.head }).map((res: Response) => {
      return { "res": res.json() };
    });
  }

  saveProducts(data: String): any {

    this.headertoken();
     return this.http.post(this.damagetableURL, data, { headers: this.head }).map((res: Response) => { 
      return { "res": res.json() };
     });
  }

  updateProducts(data: string): any {
    this.headertoken();
    return this.http.post(this.updateDamages, data, { headers: this.head }).map((res: Response) => {
      return { "res": res.json() };
    });
  }

  updatetableProducts(data: String): any {
    this.headertoken();
    this.http.post(this.damageedittableURL, data, { headers: this.head }).map(response => { response.json() })
      .subscribe(
        () => { console.log(data) }
      );
  }

  getboxqty(value: any): any {
    this.headertoken();
    return this.http.get(this.getBoxqty + '/' + value, { headers: this.head }).map(response => response.json());
  }

  getSBQuantity(id: any) {
    this.headertoken();
    return this.http.get(this.getSGQtyURL + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getshopDamagetax(cid: any, bid: any, shopid: any) {
    this.headertoken();
    return this.http.get(this.shopdamTaxURL + '/' + cid + '/' + bid + '/' + shopid, { headers: this.head }).map(res => res.json());
  }

  getshopTaxmaster(cid: any, bid: any, shopid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getshopTaxmaster' + '/' + cid + '/' + bid + '/' + '/' + shopid, { headers: this.head }).map(res => res.json());
  }

  gethospitalDamagetax(cid: any, bid: any, hospitalid: any) {
    this.headertoken();
    return this.http.get(this.hospitaldamTaxURL + '/' + cid + '/' + bid + '/' + hospitalid, { headers: this.head }).map(res => res.json());
  }

  gethospitalTaxmaster(cid: any, bid: any, hospitalid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/gethospitalTaxmaster' + '/' + cid + '/' + bid + '/' + '/' + hospitalid, { headers: this.head }).map(res => res.json());
  }

  getwarehouseDamagetax(cid: any, bid: any, warehouseid: any) {
    this.headertoken();
    return this.http.get(this.warehousedamTaxURL + '/' + cid + '/' + bid + '/' + warehouseid, { headers: this.head }).map(res => res.json());
  }

  getwarehouseTaxmaster(cid: any, bid: any, warehouseid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getwarehouseTaxmaster' + '/' + cid + '/' + bid + '/' + '/' + warehouseid, { headers: this.head }).map(res => res.json());
  }

  getEditdamage(cid: any, bid: any, locrefid: any, locname: any,id: number) {
    this.headertoken();
    return this.http.get(this.getEditURL+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + id, { headers: this.head }).map(resp => resp.json());
  }

  getEditdamagetable(cid: any, bid: any, locrefid: any, locname: any,id: number) {
    this.headertoken();
    return this.http.get(this.getEdittableURL+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + id, { headers: this.head }).map(resp => resp.json());
  } 

  getviewdamage(cid: any, bid: any, locrefid: any, locname: any,id: number): any {
    this.headertoken();
    return this.http.get(this.getHeadqview+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + id, { headers: this.head }).map(resp => resp.json());
  }

  getviewdamagetable(cid: any, bid: any, locrefid: any, locname: any,id: number): any {
    this.headertoken();
    return this.http.get(this.getHeadqtableview+ '/' + cid + '/' + bid + '/' + locrefid + '/' + locname + '/' + id, { headers: this.head }).map(resp => resp.json());
  }


  devicedetails(data){
    this.headertoken();
    return this.http.post( this.deviceurl, data,  { headers: this.head })
    .map((res: Response) => res.json());
  }


  updatedest(sub:String){

    return this.http.post(this.baseResUrl+'/updatedestroy' ,sub,{headers:this.head}).map(Response=>Response.json());

  }
  

}