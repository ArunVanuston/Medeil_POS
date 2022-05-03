import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()
export class addinvoiceService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private distURl = this.baseResUrl+'/getpiDistibutor';
  private distvalURL = this.baseResUrl+'/getpiDistvalues';
  private lisURL = this.baseResUrl+'/getPitablevalues';
  private purTaxURL = this.baseResUrl+"/getPurchasetax";
  private purcMaintanURL = this.baseResUrl+"/createPurcrecord";
  private purctableURL = this.baseResUrl+"/createPurctablerecord";
  private purjourn = this.baseResUrl+"/savePIJournal";
  private getSGQtyURL = this.baseResUrl+'/getPurquantity';
  private poURl = this.baseResUrl+'/purchaseorderlist';
  private potableURl = this.baseResUrl+'/purchaseordertable';
  private prolist = this.baseResUrl+'/getPibrandlist';
  private podist = this.baseResUrl+'/getPOdist';
  private decsts = this.baseResUrl+'/getdecimalstatus';
  private distdc = this.baseResUrl+'/getDistDc';
  private distdcpros = this.baseResUrl+'/getDistDcpro';
  private hsnlist = this.baseResUrl+'/getHsncode';
  private saveinvjr = this.baseResUrl+'/savePAJournal';
  constructor(private http: Http) { }

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

  //get Distributor Details
  getDistributor(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.distURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname, {headers: this.head} ).map(response => response.json());
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
    return this.http.get(this.purTaxURL + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head}  ).map(res => res.json());
  }

  getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head}  ).map(res => res.json());
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
    return this.http.post(this.purctableURL, purctabData, { headers: this.head }).map(response =>  response.json() )
  }



  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}  ).map((res:Response)=> res.json()); 
  }


  getSBQuantity(id) {
    this.headertoken();
    return this.http.get(this.getSGQtyURL + '/' + id, {headers: this.head}  ).map(res => res.json());
  }

  getPolist(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.poURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head}  ).map(res => res.json());
  }

  getPotablelist(pid: number) {
    this.headertoken();
    return this.http.get(this.potableURl + '/' + pid, {headers: this.head} ).map(res => res.json());
  }

  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head} ).map(res => res.json());
  }

  getLocalstore() {
    //Get Coutries 
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getMain', {headers: this.head} ).map(response => response.json());
  }

  /*   Purchase invoice Autoincrement  */
  autoIcrement(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/purchaseIncrement' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
    {headers: this.head} ).map(res => res.json());
  }

  getposistributor(pid: number) {
    this.headertoken();
    return this.http.get(this.podist + '/' + pid, {headers: this.head} ).map(res => res.json());
  }

  /* Create purchase Invoice  Record */
  savepurjournal(purctabData: string) {
    this.headertoken();
    this.http.post(this.purjourn, purctabData, { headers: this.head }).map(response => { response.json() })
      .subscribe(
        () => { console.log(purctabData) }
      );
  }

  savePayment(myObj: string) {
    this.headertoken();
    return this.http
      .post(this.baseResUrl + '/payment/savePaymentsingle', myObj, { headers: this.head }).map((res: Response) => res.json());
  }

  getDecimalsts(compid: number,brnchid: number,locname:number,locrefid: number){
    this.headertoken();
    return this.http.get(this.decsts + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,{headers: this.head}).map(response => response.json());
  }

  getDistDc(compid: number,brnchid: number,locname:number,locrefid: number,poid: number){
    this.headertoken();
    return this.http.get(this.distdc + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid+'/'+poid,{headers: this.head}).map(response => response.json());
  }

  getDcproducts(compid: number,brnchid: number,locname:number,locrefid: number,poid: number,dcrefid: number){
    this.headertoken();
    return this.http.get(this.distdcpros + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid+'/'+poid+'/'+dcrefid,{headers: this.head}).map(response => response.json());  
  }

  getHsnlist(){
    this.headertoken();
    return this.http.get(this.hsnlist,{headers: this.head}).map(response => response.json());  
  }

  Saveinvjrnl(data: string): any {
    this.headertoken();
        this.http.post(this.saveinvjr, data, { headers: this.head }).map(response => { response.json() })
     .subscribe(
       () => { console.log(data) }
     );
  }
}