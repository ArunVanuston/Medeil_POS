import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()
export class salesChallanServices {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private distvalURL = this.baseResUrl+'/getpiDistvalues';
  private lisURL = this.baseResUrl+'/getPitablevalues';
  private purTaxURL = this.baseResUrl+"/getPurchasetax";
  private deliveryChallanURL = this.baseResUrl+"/saveDeliveryChallan";
  private deliveryChallanProductURL = this.baseResUrl+"/saveDeliveryProducts";
  private getSGQtyURL = this.baseResUrl+'/getPurquantity1';
  private poURl = this.baseResUrl+'/purchaseorderlist';
  private potableURl = this.baseResUrl+'/purchaseordertable';
  private prolist = this.baseResUrl+'/getPibrandlist';
  private getStockTransfer = this.baseResUrl+'/getsalesinvoiceproduct';
  private getShops = this.baseResUrl+'/getEmpShops';
  private getWarehouses = this.baseResUrl+'/getEmpWareHouses';
  private getHospitals = this.baseResUrl+'/getEmpHospitals';
  private getusershopurl = this.baseResUrl+'/getDeliveryShopUrl';
  private getuserwarehousesurl = this.baseResUrl+'/getuserwarehouse';
  private getuserhospitalurl = this.baseResUrl+'/getuserhospital';
  private getSuperStockNoURL = this.baseResUrl+'/getsuperadminsalesno';
  private getStockNoURL = this.baseResUrl+'/getsalesno';
  private getAutonIncrement = this.baseResUrl+'/getSalesDelveryAutoIncrements';
  private deviceurl=this.baseResUrl+'/User/saveUserActivity';
  private getsi=this.baseResUrl+'/getsalesinno';


  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }


  getShopInformation(cid: any, bid: any, locnme: any, locrfid: any) {


    this.headertoken();
    return this.http.get(this.baseResUrl+`/getshop1` + '/' + cid + '/' + bid + '/' + locnme + '/' + locrfid,{headers: this.head}).map(response => response.json());

  }

  getShop(branchid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getShops + '/' + branchid,{headers: this.head}).map(response => response.json());
  }

  getWareHouse(branchid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getWarehouses + '/' + branchid,{headers: this.head}).map(response => response.json());
  }

  getHospital(branchid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getHospitals + '/' + branchid,{headers: this.head}).map(response => response.json());
  }

  getUserShop(compid: any, locname: any) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getusershopurl + '/' + compid + '/' + locname,{headers: this.head}).map(response => response.json());
  }

  getUserWareHouse(compid: any, locname: any) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getuserwarehousesurl + '/' + compid + '/' + locname,{headers: this.head}).map(response => response.json());
  }

  getUserHospital(compid: any, locname: any) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getuserhospitalurl + '/' + compid + '/' + locname,{headers: this.head}).map(response => response.json());
  }



  getSuperStockNo(searchValue: string) {
    this.headertoken();
    return this.http.get(this.getSuperStockNoURL + '/' + searchValue,{headers: this.head}).map(res => res.json());
  }



  getStockNo(searchValue: string, compid: number, brnchid: number, locname: number, locrefid: number) {
    //Get Distributor
    this.headertoken();
    return this.http.get(this.getStockNoURL + '/' + searchValue + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid,{headers: this.head}).map(response => response.json());
  }



  // getAutoIncr(compid:any,branchid:any,locname:any,locrefid:any) {


  //   alert("compid"+compid+"branch"+branchid+"locname"+locname+"locrefid"+locrefid);
  //   //Get getAutoIncrement
  //   return this.http.get(this.getAutonIncrement+'/'+compid+'/'+branchid+'/'+locname+'/'+locrefid).map(response =>response.json());
  //  }


  //get Distributor Details
  /* getTransfer(cid: any, bid: any, locrefid: any, locname: any) {
     return this.http.get(this.distURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(response => response.json());
   }*/

  getDistvalues(distid: number) {
    this.headertoken();
    return this.http.get(this.distvalURL + '/' + distid,{headers: this.head}).map(res => res.json());
  }

  getBrandlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.lisURL + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
  }
  /*Get Tax inclusive Or Exclusive*/
  getPurchasetax(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.purTaxURL + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
  }

  getProductlist(val: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.prolist + '/' + val + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
  }
  /* Create purchase Maintanance  Record */
  getDeliveryChallan(purcData: string) {
    this.headertoken();
    return this.http.post(this.deliveryChallanURL, purcData, { headers: this.head }).map(res => res.json());
  }

  /* Create purchase Invoice  Record */
  getDeliveryChallanProduct(purctabData: string) {
    this.headertoken();
    return this.http.post(this.deliveryChallanProductURL, purctabData, { headers: this.head }).map(res => res.json());
  }

  getSBQuantity(id) {
    this.headertoken();
    return this.http.get(this.getSGQtyURL + '/' + id, { headers: this.head }).map(res => res.json());
  }

  getPolist(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.poURl + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
  }

  getStockTransferProduct(pid: number) {
    this.headertoken();
    return this.http.get(this.getStockTransfer + '/' + pid,{headers: this.head}).map(res => res.json());
  }

  getTaxmaster(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getTaxmaster' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
  }

  getLocalstore() {
    //Get Coutries 
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getMain',{headers: this.head}).map(response => response.json());
  }


  //Edit Delivery challan

  getEditDeliveryProduct(compid: any, branchid: any, locname: any, locrefid: any, id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getEditDeliveryProduct' + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + id,{headers: this.head}).map(res => res.json());
  }


  getEditDeliveryChallan(compid: any, branchid: any, locname: any, locrefid: any, id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getEditDeliveryChallan' + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + id,{headers: this.head}).map(res => res.json());
  }

  getEditShop(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditshopid' + '/' + id,{headers: this.head}).map(response => response.json());
  }

  getEditWareHouse(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditwarehouseid' + '/' + id,{headers: this.head}).map(response => response.json());
  }

  getEditHospital(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getedithospitalid' + '/' + id,{headers: this.head}).map(response => response.json());
  }


adddevicedetails(data){

  this.headertoken();

  return this.http
    .post(this.deviceurl, data, {headers: this.head})  .map((res: Response) => res.json());

}
getsalesiv(sino:any){
  this.headertoken();
  return this.http.get(this.getsi + '/' + sino,{headers: this.head}).map(Response => Response.json());
}

getslinid(compid: any, branchid: any, locname: any, locrefid: any){

  this.headertoken();
  return this.http.get(this.baseResUrl+'/getslinno' + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid ,{headers: this.head}).map(res => res.json());


}

getcustname(siid:any){
  this.headertoken();
  return this.http.get(this.baseResUrl+'/getcustname' + '/' + siid,{headers: this.head}).map(Response => Response.json());
}


}