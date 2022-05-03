import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class purchaseOrderEditService{
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private getCompanies = this.baseResUrl+'/getPOrderCompany';
  private editPurchaseOrder = this.baseResUrl+'/getporderedit';
  private getBranches = this.baseResUrl+'/getPOrderBranch';
  private getPOWarehouses = this.baseResUrl+'/getPOrderWareHouse';
  private getPOHospitals = this.baseResUrl+'/getPOrderHospitals';
  private getShops = this.baseResUrl+'/getPOrderShop';
  private getDistributorsedit= this.baseResUrl+'/getPODistributoredit';
  private getSuperDrugUrl= this.baseResUrl+'/getsuperdrugval';
  private getDrugUrl= this.baseResUrl+'/getdrugval';
  private getDrugInfo= this.baseResUrl+'/getDruginfo';
  private getDistributors= this.baseResUrl+'/getPODistributor';
  private getSuperDistributors= this.baseResUrl+'/getSuperAdminPODistributor';
  private getDistributorProducts= this.baseResUrl+'/getDistributorProducts';
  private getAutonIncrement= this.baseResUrl+'/getAutoIncrements';
  private purchaseOrderUrl=this.baseResUrl+'/updatePurchaseOrder';
  private purchaseOrderProductUrl=this.baseResUrl+'/updatePurchaseOrderProduct';
  private getPurchaseOrders=this.baseResUrl+'/getPurchaseOrdersedit';
  private getEmpCompanyById = this.baseResUrl+'/getEmpCompanyById';
  private getEmpBranchById = this.baseResUrl+'/getEmpBranchById';
  private getSuperDistributorProducts= this.baseResUrl+'/getSuperDistributorProducts';
  private getbarcodeurl =this.baseResUrl+'/barcodeurl';
  private uom = this.baseResUrl+'/getuom';
  private decsts = this.baseResUrl+'/getdecimalstatus';
  private getSGQtyURL = this.baseResUrl+'/getPurquantity';
  
  constructor(private http: Http) {}

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }


  getSuperDist(searchValue: string) {
    this.headertoken();
    return this.http.get(this.getSuperDistributors + '/' + searchValue, {headers: this.head} ).map(res => res.json());
  }


  getDistributor(searchValue: string,compid: number,brnchid: number,locname:number,locrefid: number) {
    //Get Distributor
    this.headertoken();
    return this.http.get(this.getDistributors+ '/'+searchValue+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
    {headers: this.head} ).map(response => response.json());
   }


   getCompany() {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getCompanies, {headers: this.head} ).map(response => response.json());
   }

   editPurchseOrder(compid:number,brnchid:number,loc:number,locref:number,poid: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.editPurchaseOrder+'/'+compid+'/'+brnchid+'/'+loc+'/'+locref+'/'+poid,
    {headers: this.head} ).map(response => response.json());
   }

   getAutoIncr() {
    //Get getAutoIncrement
    this.headertoken();
    return this.http.get(this.getAutonIncrement, {headers: this.head} ).map(response =>response.json());
   }

   getSuperAdminDistributor() {
    //Get Distributor
    this.headertoken();
    return this.http.get(this.getSuperDistributors, {headers: this.head} ).map(response => response.json());
   }


   getBarcodeProduct(barcode: string) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getbarcodeurl+'/'+barcode, {headers: this.head} ).map(response => response.json());
   }

  
   getDistributorEdit(poid: number) {
    //Get Distributor
    this.headertoken();
    return this.http.get(this.getDistributorsedit+'/'+poid, {headers: this.head} ).map(response => response.json());
   }

   getSuperDrugs(searchValue: string) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getSuperDrugUrl+'/'+searchValue, {headers: this.head} ).map(response => response.json());
   }
  
   getDrugs(searchValue: string,compid: number,brnchid: number,locname:number,locrefid: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getDrugUrl+'/'+searchValue+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
    {headers: this.head} ).map(response => response.json());
   }

   getSBQuantity(id) {
    this.headertoken();
    return this.http.get(this.getSGQtyURL + '/' + id,{headers: this.head}).map(res => res.json());
  }
  
   getDrugsData(id: number, compid: number,brnchid: number,locname:number,locrefid: number,vendorid: number) {
    //Get Companies
    this.headertoken();
   return this.http.get(this.getDrugInfo+ '/' +id + '/' + compid+'/'+brnchid+'/'+locname+'/'+locrefid+'/'+vendorid, {headers: this.head} ).map(response => response.json());
   }

   getPurchaseOrderProductedit(compid:number,brnchid:number,loc:number,locref:number,POID: number) {
    //Get getDrugList
    this.headertoken();
    return this.http.get(this.getPurchaseOrders+'/'+compid+'/'+brnchid+'/'+loc+'/'+locref+'/'+ POID,
    {headers: this.head} ).map(response => response.json());
   }

   getSuperDistributorProduct(distID: number) {
    //Get getDrugList
    this.headertoken();
    return this.http.get(this.getSuperDistributorProducts+ '/'+distID, {headers: this.head} ).map(response => response.json());
   }


   getDistributorProduct(compid: number,brnchid: number,locname:number,locrefid: number,distID: number) {
    //Get getDrugList
    this.headertoken();
    return this.http.get(this.getDistributorProducts+ '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid+'/'+ distID,
    {headers: this.head} ).map(response => response.json());
   }

    updatePurchaseOrder(purchaseorder:string){
      this.headertoken();
      return this.http.post(this.purchaseOrderUrl, purchaseorder, {headers: this.head}).map((res:Response)=>{
        return {"res":res.json()}
      })         
    }

   updatePurchaseOrderProduct(data:string){
   this.headertoken();
   return this.http.post(this.purchaseOrderProductUrl, data, {headers: this.head}).map((res:Response)=>{
      return {"res":res.json()}
    })         
  }

  getBranche1(id: number) {   
    this.headertoken(); 
    return this.http.get(this.baseResUrl+'/getBran' + '/' + id, {headers: this.head} ).map(response => response.json());
   }

   getuom(compid: number,brnchid: number,locname:number,locrefid: number){
     this.headertoken();
    return this.http.get(this.uom + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,
    {headers: this.head} ).map(response => response.json());
  }

  getDecimalsts(compid: number,brnchid: number,locname:number,locrefid: number){
    this.headertoken();
    return this.http.get(this.decsts + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid,{headers: this.head}).map(response => response.json());
  }
}
