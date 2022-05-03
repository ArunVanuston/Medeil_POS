import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class DataStocks {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private pURl = this.baseResUrl+'/stockproductdata';
  private proURL = this.baseResUrl+'/getStockdosage';
  private formURL = this.baseResUrl+'/getStockformulation';
  private vatUrl = this.baseResUrl+'/getVat';
  private gstUrl = this.baseResUrl+'/getGst';
  private cgstUrl = this.baseResUrl+'/getCgst';
  private sgstUrl = this.baseResUrl+'/getSgst';
  private igstUrl = this.baseResUrl+'/getIgst';
  private utgstUrl = this.baseResUrl+'/getutgst';
  private saveURL = this.baseResUrl+'/saveStockdata';
  private viewUrl = this.baseResUrl+'/viewstockdata';
  private searchstockurl = this.baseResUrl+'/searchstockdata';
  private edURL = this.baseResUrl+'/editstockdata';
  private UpURL = this.baseResUrl+'/updateStockdata';
  private delURL = this.baseResUrl+'/deletestockdata';
  
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
  getProduct(searchValue: string, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.pURl + '/' + searchValue + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
  }
 
 //Get Fieldhide value 
  getFieldhide(cid: any, bid: any, shopid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getTaxmaster/' + cid + '/' + bid + '/' + shopid + '/' + locname,{headers: this.head}).map(res => res.json());
  }
 
  gettaxCountrystate(cid: any, bid: any, lname: any, locrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/gettaxContrystate' + '/' + cid + '/' + bid + '/' + lname + '/' + locrefid,{ headers: this.head }).map(res => res.json());
  }
  
  getDosagevalues(id: any) {
    this.headertoken();
    return this.http.get(this.proURL + '/' + id,{headers: this.head}).map(res => res.json());
  }
  getFormulvalues(id: any) {
    this.headertoken();
    return this.http.get(this.formURL + '/' + id,{headers: this.head}).map(res => res.json());
  }
  getVat() {
    this.headertoken();
    return this.http.get(this.vatUrl,{headers: this.head}).map(response => response.json());
  }

  getGst() {
    this.headertoken();
    return this.http.get(this.gstUrl,{headers: this.head}).map(response => response.json());
  }

  getSgst() {
    this.headertoken();
    return this.http.get(this.sgstUrl,{headers: this.head}).map(response => response.json());
  }

  getCgst() {
    this.headertoken();
    return this.http.get(this.cgstUrl,{headers: this.head}).map(response => response.json());
  }

  getIgst() {
    this.headertoken();
    return this.http.get(this.igstUrl,{headers: this.head}).map(response => response.json());
  }
  getUtgst() {
    this.headertoken();
    return this.http.get(this.utgstUrl,{headers: this.head}).map(response => response.json());
  }

  createStock(data: String) {
    this.headertoken();
    return this.http.post(this.saveURL, data, { headers: this.head }).map(res => res.json()).catch(this.handleError);
  }

  deviceDetails(serobj: any){

   
    this.headertoken();
    return this.http.post('api/User/saveUserActivity', serobj, {headers: this.head}).map(res=> res.json()); 

  }
  
  viewStock(cid: any, bid: any, locrefid: any, locname: any,page:any,size:any) {
    this.headertoken();
    return this.http.get(this.viewUrl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname+'/'+page+'/'+size,{headers: this.head}).map(
      res => res.json()).catch(this.handleError);
  }

  stocksearchrecord(cid: any, bid: any, locrefid: any, locname: any,sindex:any,svalue:any,page:any,size:any) {
    this.headertoken();
    return this.http.get(this.searchstockurl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname+'/'+sindex+"/"+svalue+"/"+page+'/'+size,{headers: this.head}).map(
      res => res.json()).catch(this.handleError);
  }
  
  updateStock(data: String) {
    this.headertoken();
    return this.http.post(this.UpURL, data, { headers: this.head }).map(res => res.json()).catch(this.handleError);
  }
  editStock(id: any) {
    this.headertoken();
    return this.http.get(this.edURL + '/' + id,{headers: this.head}).map(response => response.json());
  }

  GetStockDrugName(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getstockdrugname' + '/' + id,{headers: this.head}).map(response => response.json());
  }
  
  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }
  //**********************//
  editDosage(id: any) {
    this.headertoken();
    return this.http.get('api/editstockdosage' + '/' + id,{headers: this.head}).map(res => res.json());
  }
  editFormulation(id: any) {
    this.headertoken();
    return this.http.get('api/editstockformulation' + '/' + id,{headers: this.head}).map(res => res.json());
  }
  editSgst(id: any) {
    this.headertoken();
    return this.http.get('api/editstocksgst' + '/' + id,{headers: this.head}).map(res => res.json());
  }
  editCgst(id: any) {
    this.headertoken();
    return this.http.get('api/editstockcgst' + '/' + id,{headers: this.head}).map(res => res.json());
  }
  editIgst(id: any) {
    this.headertoken();
    return this.http.get('api/editstockigst' + '/' + id,{headers: this.head}).map(res => res.json());
  }
  editUtgst(id: any) {
    this.headertoken();
    return this.http.get('api/editstockutgst' + '/' + id,{headers: this.head}).map(res => res.json());
  }
  editGst(id: any) {
    this.headertoken();
    return this.http.get('api/editstockgst' + '/' + id,{headers: this.head}).map(res => res.json());
  }
  editVat(id: any) {
    this.headertoken();
    return this.http.get('api/editstockvat' + '/' + id,{headers: this.head}).map(res => res.json());
  }
  //DELETE STOCK//
  deleteStocks(id: any) {
    this.headertoken();
    return this.http.get(this.delURL + '/' + id,{headers: this.head}).map(res => res.json());
  }
}
