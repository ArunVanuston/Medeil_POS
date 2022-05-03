import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class purchaseOrderService {
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private getCompanies = this.baseResUrl + '/getPOrderCompany';
  private getBranches = this.baseResUrl + '/getPOrderBranch';
  private getPOWarehouses = this.baseResUrl + '/getPOrderWareHouse';
  private getPOHospitals = this.baseResUrl + '/getPOrderHospitals';
  private getShops = this.baseResUrl + '/getPOrderShop';
  private getDistributors = this.baseResUrl + '/getbarqrDistributors';   //'/getPODistributor';
  private getSuperDistributors = this.baseResUrl + '/getSuperAdminPODistributor';
  private getSuperDrugUrl = this.baseResUrl + '/getsuperdrugval';
  private getDrugUrl = this.baseResUrl + '/getdrugval';
  private getDrugInfo = this.baseResUrl + '/getDruginfo';
  private getSuperDistributorProducts = this.baseResUrl + '/getSuperDistributorProducts';
  private getDistributorProducts = this.baseResUrl + '/getDistributorProducts';
  private getAutonIncrement = this.baseResUrl + '/getPOAutoIncrements';
  private purchaseOrderUrl = this.baseResUrl + '/createPurchaseOrder';
  private purchaseOrderProductUrl = this.baseResUrl + '/createPurchaseOrderProduct';
  private pURl = this.baseResUrl + '/stockproductdata';
  private getbarcodeurl = this.baseResUrl + '/barcodeurl';
  private distSession = this.baseResUrl + '/distsessionurl';
  private loadsession = this.baseResUrl + '/loadsesssionurl';
  private uom = this.baseResUrl + '/getuom';
  private getSGQtyURL = this.baseResUrl + '/getPurquantity';
  private minqty = this.baseResUrl + '/getminimumqty';
  private newqty = this.baseResUrl + '/getnewpro';
  private savenewpro = this.baseResUrl + '/slsinv/savenewcustprod';
  private decsts = this.baseResUrl + '/getdecimalstatus';
  private zerostk = this.baseResUrl + '/getZerostkproduct';
  constructor(private http: Http) { }

  head: any;
  headertoken() {
    this.head = new Headers({
      'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
      'Content-Type': 'application/json'
    });
  }


  PurchaseOrderEmailDistributor(did: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + '/PurchaseOrderEmailDistributor' + '/' + did, { headers: this.head }).map(res => res.json());
  }



  getSuperDist(searchValue: string) {
    this.headertoken();
    return this.http.get(this.getSuperDistributors + '/' + searchValue, { headers: this.head }).map(res => res.json());
  }


  getDistributor(compid: number, brnchid: number, locname: number, locrefid: number) {
    //Get Distributor
    this.headertoken();
    return this.http.get(this.getDistributors + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid,
      { headers: this.head }).map(response => response.json());
  }


  getBarcodeProduct(barcode: string) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getbarcodeurl + '/' + barcode, { headers: this.head }).map(response => response.json());
  }

  getSuperDrugs(searchValue: string) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getSuperDrugUrl + '/' + searchValue, { headers: this.head }).map(response => response.json());
  }

  getDrugs(searchValue: string, compid: number, brnchid: number, locname: number, locrefid: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getDrugUrl + '/' + searchValue + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid,
      { headers: this.head }).map(response => response.json());
  }

  getAutoIncr() {
    //Get getAutoIncrement
    this.headertoken();
    return this.http.get(this.getAutonIncrement, { headers: this.head }).map(response => response.json());
  }

  getSuperAdminDistributor() {
    //Get Distributor
    this.headertoken();
    return this.http.get(this.getSuperDistributors, { headers: this.head }).map(response => response.json());
  }

  getSessHosp(cid: number, bid: any) {
    this.headertoken();
    return this.http.get(this.distSession + '/' + cid + '/' + bid, { headers: this.head }).map(res => res.json());
  }


  getPurcSessionshop(pid: any, distid) {
    this.headertoken();
    return this.http.get(this.getSuperDistributorProducts + '/' + pid + '/' + distid, { headers: this.head }).map(res => res.json());
  }


  getDrugsData(id: number, cid: any, bid: any, lname: any, lrefid: any, vendorid: any) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getDrugInfo + '/' + id + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + vendorid, { headers: this.head }).map(response => response.json());
  }


  getSuperDistributorProduct(distID: number) {
    //Get getDrugList
    this.headertoken();
    return this.http.get(this.getSuperDistributorProducts + '/' + distID, { headers: this.head }).map(response => response.json());
  }

  getProduct(searchValue: string, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.pURl + '/' + searchValue + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,
      { headers: this.head }).map(res => res.json());
  }


  getDistributorProduct(compid: number, brnchid: number, locname: number, locrefid: number, distID: number) {
    //Get getDrugList
    this.headertoken();
    return this.http.get(this.getDistributorProducts + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid + '/' + distID).map(response => response.json());
  }

  createPurchaseOrder(purchaseorder: string) {
    this.headertoken();
    return this.http.post(this.purchaseOrderUrl, purchaseorder, { headers: this.head }).map((res: Response) => {
      return { "res": res.json() }
    })
  }

  createPurchaseOrderProduct(data: string) {
    this.headertoken();
    return this.http.post(this.purchaseOrderProductUrl, data, { headers: this.head }).map((res: Response) => {
      return { "res": res.json() }
    })
  }


  deviceDetails(serobj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + '/User/saveUserActivity', serobj, { headers: this.head }).map((res: Response) => res.json());

  }


  sendMailPurchaseOrder(serobj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + '/saveUserActivity1', serobj, { headers: this.head }).map((res: Response) => res.json());

  }

  getSBQuantity(id) {
    this.headertoken();
    return this.http.get(this.getSGQtyURL + '/' + id, { headers: this.head }).map(res => res.json());
  }

  getuom(compid: number, brnchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.uom + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }

  getminimumqty(compid: number, brnchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.minqty + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }

  getnewquantity(compid: number, brnchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.newqty + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }
  saveNewProduct(data) {
    this.headertoken();
    return this.http.post(this.savenewpro, data, { headers: this.head }).map((res: Response) => res.json())
      .catch((error: any) => {
        return Observable.throw(error.json());
      });
  }

  getDecimalsts(compid: number, brnchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.decsts + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }

  getzerostockqty(compid: any, brnchid: any, locname: any, locrefid: any) {
    this.headertoken();
    return this.http.get(this.zerostk + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }

  generatepurchaseorderbarcode(data: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/GeneratePurchaseOrderBarcode', data, { headers: this.head }).map(response => response.json());
  }

  getprintmodel(cid: any, bid: any, lname: any, lrefid: any, formid: any) {
    return this.http.get(this.baseResUrl + '/viewformsprintmodel' + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + formid, { headers: this.head }).map(res => res.json());
  }

  getpurchaseordercount(cid: any, bid: any, lname: any, lrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + '/getpurchaseordercount' + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid, { headers: this.head }).map(res => res.json());
  }
  
}
