import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
import { environment } from 'environments/environment.prod';

@Injectable()
export class editinvoiceService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private distURl = this.baseResUrl+'/getpiDistibutor';
  private distvalURL = this.baseResUrl+'/getpiDistvalues';
  private lisURL = this.baseResUrl+'/getPitablevalues';
  private purTaxURL = this.baseResUrl+"/getPurchasetax";
  private purcMaintanURL = this.baseResUrl+"/updatePurcrecord";
  private purctableURL = this.baseResUrl+"/updatePurctablerecord";
  private getSGQtyURL = this.baseResUrl+'/getPurquantity';
  private getEditURL = this.baseResUrl+'/getEditpurchase';
  private getPmainURL = this.baseResUrl+'/getEditpurchasemaintance';
  private prolist = this.baseResUrl+'/getPibrandlist';
  private poURl = this.baseResUrl+'/purchaseorderlist';
  private decsts = this.baseResUrl+'/getdecimalstatus';
  private prjrnl = this.baseResUrl+'/getPurjrnl';
  private purjourn = this.baseResUrl+"/savePIJournal";
  private hsnlist = this.baseResUrl+'/getHsncode';

  constructor(private http: Http) { }

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

  /*GET EDIT VALUES  */
  getEditpurchase(id: number) {
    this.headertoken();
    return this.http.get(this.getEditURL + '/' + id, {headers: this.head} ).map(resp => resp.json());
  }

  getEditmaintance(id: number) {
    this.headertoken();
    return this.http.get(this.getPmainURL + '/' + id, {headers: this.head}).map(res => res.json());
  }
  //get Distributor Details
  getDistributor(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.distURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head} ).map(response => response.json());
  }

  getDistvalues(distid: number) {
    this.headertoken();
    return this.http.get(this.distvalURL + '/' + distid, {headers: this.head} ).map(res => res.json());
  }

  getBrandlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.lisURL + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head} ).map(res => res.json());
  }
  /*Get Tax inclusive Or Exclusive*/
  getPurchasetax(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.purTaxURL + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, {headers: this.head} ).map(res => res.json());
  }

  getPolist(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.poURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head} ).map(res => res.json());
  }
  /* Create purchase Maintanance  Record */
  getPurcmaintanance(purcData: string) {
    this.headertoken();
    return this.http.post(this.purcMaintanURL, purcData, { headers: this.head }).map((res: Response) => {
      return { "res": res.json() };
    })
      .catch((e: any) => {
        console.log("Status" + e.status);
        return Observable.throw({ "Errors getPurcmaintanance(Service)": e.json() });
      });
  }

  /* Create purchase Invoice  Record */
  getPurcinvoice(purctabData: string) {
    this.headertoken();
    return this.http.post(this.purctableURL, purctabData, { headers: this.head }).map(response =>  response.json() );

  }

  getSBQuantity(id) {
    this.headertoken();
    return this.http.get(this.getSGQtyURL + '/' + id, {headers: this.head} ).map(res => res.json());
  }

  getStore() {
    this.headertoken();
    return this.http.get('/api/getStore', {headers: this.head} ).map(res => res.json());
  }

  getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head} ).map(res => res.json());
  }

  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head} ).map(res => res.json());
  }
  
  getPoedit(pid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getpoidpi' + '/' + pid, {headers: this.head} ).map(res => res.json());
  }
  getDecimalsts(compid: number,brnchid: number,locname:number,locrefid: number){
    this.headertoken();
    return this.http.get(this.decsts + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,{headers: this.head}).map(response => response.json());
  }

  getPurjrnl(compid: number,brnchid: number,locname:number,locrefid: number,invoice: number){
    this.headertoken();
    return this.http.get(this.prjrnl + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid+'/'+invoice,{headers: this.head}).map(response => response.json());
  }

    /* Create purchase Invoice  Record */
    savepurjournal(purctabData: string) {
      this.headertoken();
      this.http.post(this.purjourn, purctabData, { headers: this.head }).map(response => { response.json() })
        .subscribe(
          () => { console.log(purctabData) }
        );
    }

    getHsnlist(){
      this.headertoken();
      return this.http.get(this.hsnlist,{headers: this.head}).map(response => response.json());  
    }
}
