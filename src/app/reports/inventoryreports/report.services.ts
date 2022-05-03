import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
@Injectable()

export class stktrnsprodservice  {
    handleError: any;
    headers: any;
    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;
    
  private Stktrns = this.baseResUrl+'/stktrnsfer';

   constructor(private http: Http) { }
   head:any;
   headertoken(){
       this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
       'Content-Type':'application/json'});
 
     }
   //Desing 040419  Inventory Report/StkTrans by Product
   getstocktransfer(cid:any,bid:any,locname:any,locrefid:any){
    this.headertoken();
      return this.http.get(this.baseResUrl+'/stktrnsfer' + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid,{headers: this.head}).map(res => res.json());
   }

   getrequisition(cid:any,bid:any,locname:any,locrefid:any){
    this.headertoken();
     return this.http.get(this.baseResUrl+'/IndentReqNo' + '/' + cid + '/' + bid +'/' + locname + '/' + locrefid,{headers: this.head}).map(res => res.json());
   }
  
}

