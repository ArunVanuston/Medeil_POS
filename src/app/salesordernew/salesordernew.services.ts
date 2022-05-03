import { Injectable } from '@angular/core';
import { Http, Response, Headers,  } from '@angular/http';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class salesOrderServicenew {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
  private    URL=this.baseResUrl+'/indreq/';
  private deviceurl=this.baseResUrl+'/User/saveUserActivity';

  
  constructor(private http: Http) {
    
   }
   head:any;
   headertoken(){
       this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
       'Content-Type':'application/json'});
 
     }
  autoIcrement(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/salesOrderIncrement' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
  }
  
  searchProduct(value: any, cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/searchSalesorderproduct' + '/' + value + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json()).catch(this.handleError);
  }

  searchdrug(data: any) {  // for drug product search
    this.headertoken();
    return this.http.post(this.baseResUrl+`/slsinv/viewSIProductNames`, data, {headers: this.head}).map((res: Response) => res.json())
      .catch((error: any) => {  return Observable.throw(error.json());
        });
    }
    
  patientList(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/salesorderCustomerlist' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json()).catch(this.handleError);
  }
  getsalesProdcut(productID: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsalesProduct' + '/' + productID,{headers: this.head}).map(res => res.json()).catch(this.handleError);
  }

  //saveSalesorder
  createSalesorder(data: any) {
   
    this.headertoken();
      return this.http.post(this.baseResUrl+'/saveSalesorder', data,{headers: this.head}).map(response => response.json());
  }
  
  createSaleRecord(data: String) {
    this.headertoken();
        return this.http.post(this.baseResUrl+'/saveSalesorderRecord', data, { headers: this.head }).map(response => response.json());
  }


  deviceDetails(serobj: any){

   
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj,{headers: this.head}).map(res=> res.json()); 

  }

  viewSalesorder(cid: any, bid: any, locrefid: any, locname: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getallSalesorderview' + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json()).catch(this.handleError);
  }
  
  viewSalesorderRecord(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsalesorderview' + '/' + id,{headers: this.head}).map(res => res.json()).catch(this.handleError);
  }

  /** EDIT SALES ORDER **/

  editSalesdata(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/editSalesorderdata' + '/' + id,{headers: this.head}).map(res => res.json());
  }

  
  cancelSalesdata(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/deletesalesOrder' + '/' + id,{headers: this.head}).map(res => res.json());
  }


  editSalesOrderRecord(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/editSalesorderRecord' + '/' + id,{headers: this.head}).map(res => res.json());
  }

  updateSalesorder(data: String) {
    this.headertoken();
        return this.http.post(this.baseResUrl+'/updateSalesorder', data, { headers: this.head }).map(response => response.json());
  }
  updateSaleRecord(data: String) {
    this.headertoken();
        return this.http.post(this.baseResUrl+'/updateSalesorderRecord', data, { headers: this.head }).map(response => response.json());
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }



  getsotype(){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/salesOrderType',{headers: this.head}).map(response => response.json());
  }

  
  
  viewWareHouse(  serobj: string ) {
      
    this.headertoken();

           return this.http.post( this.URL+`viewWareHouse`, serobj,{headers: this.head})
.map((res: Response) => res.json());
}



viewshopinformation(serobj: string   ) {

     
  this.headertoken();

    
           return this.http.post( this.URL+`viewshopinformation`, serobj,{headers: this.head})
.map((res: Response) => res.json());
}

viewHospital(serobj: string ) {

  this.headertoken();
    return this.http.post( this.URL+`viewHospital`, serobj,{headers: this.head})
.map((res: Response) => res.json());
}


devicedetails(data){
  this.headertoken();
   return this.http.post(this.deviceurl, data, { headers: this.head }).map(response => response.json());

}

saveNewProduct(data) {
  this.headertoken();
  return this.http.post(this.URL + `savenewprod`, data, { headers: this.head }).map((res: Response) => res.json())
    .catch((error: any) => {
      return Observable.throw(error.json());
    });
}

  
}
