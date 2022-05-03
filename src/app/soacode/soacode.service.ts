import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";


@Injectable()
export class SoacodeService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private pURl = this.baseResUrl+'/stockproductdata';
  constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      } 

  //**************Error*************/
  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

  getsection(){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsectiondetails',{headers:this.head}).map(Response =>Response.json());
  }

  getgroup(sectionid:any){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getgroup' + '/' + sectionid,{headers:this.head}).map(Response =>Response.json());
  }

  getsac(groupid:any){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsac' + '/' + groupid, { headers:this.head}).map(Response =>Response.json());
  }

  getsacsubgrp1(sectionid:any,groupid:any,sacid:any){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsacsub1' + '/' + sectionid + '/' + groupid + '/' + sacid , { headers:this.head}).map(Response =>Response.json());
  }

  getsacsubgrp2(sectionid:any,groupid:any,sacid:any,sacsubcode1){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsacsub2' + '/' + sectionid + '/' + groupid + '/' + sacid + '/' + sacsubcode1, { headers:this.head}).map(Response =>Response.json());
  }


  getsecdes(id:any){
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsecdes' + '/' + id,{headers:this.head}).map(Response =>Response.json());
  }

  savesoa(data:any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/savesoa',data,{headers:this.head}).map(Response =>Response.json());
  }

  savesc(data:any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/savesectioncode',data,{headers:this.head}).map(Response=>Response.json());
  }


  savegc(data:any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/savegroupcode',data,{headers:this.head}).map(Response=>Response.json());
 

  }
  savesac(data:any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/savesaccode',data,{headers:this.head}).map(Response=>Response.json());
 

  }

  savesacg1(data:any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/update-saccode-subcode1',data,{headers:this.head}).map(Response=>Response.json());
 

  }

  savesacg2(data:any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/update-saccode-subcode2',data,{headers:this.head}).map(Response=>Response.json());
 

  }

}