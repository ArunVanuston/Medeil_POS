import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class EditionService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private editionUrl = this.baseResUrl+'/editionlist';
  private domainsUrl = this.baseResUrl+'/editiondomains';
  private subdomainUrl = this.baseResUrl+'/editionsubdomain';
  private editionProURL = this.baseResUrl+'/editionproduct';
  private chkeditionURL = this.baseResUrl+'/checkeditionname';
  private saveURL = this.baseResUrl+'/saveEditiondata';
  private editionNameURL = this.baseResUrl+'/seteditionname';
  private subDomainNameURL = this.baseResUrl+'/setSubdomainname';
  private moduleURL = this.baseResUrl+'/getmodulename';
  private submoduleURL = this.baseResUrl+'/getsubmodulename';
  private saveControlURL = this.baseResUrl+'/saveAssignmodule';
  private editionURL = this.baseResUrl+'/checkEditionid';
  private currency = this.baseResUrl+'/viewcurrency'
  private rolectrl = this.baseResUrl+'/saverolectrl'
  private editionList = this.baseResUrl+'/EditionModules';

  constructor(private http: Http) { }
  //** EDITION DETAIL'S**//

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  getcountry(): any {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/domain-country-dropdown',{ headers: this.head }).map(res => res.json()).catch(this.handleError);
  }

  getProduct(countryid: number) {
    this.headertoken();
    const url = `${this.editionProURL}/${countryid}`;
    return this.http.get(url, { headers: this.head }).map(response => response.json());
  }

  getDomain(cid: any, pid: any) {
    this.headertoken();
    return this.http.get(this.domainsUrl + '/' + cid + '/' + pid, { headers: this.head }).map(response => response.json());
  }

  getCurrency(cid: any) {
    this.headertoken();
    return this.http.get(this.currency + '/' + cid , { headers: this.head }).map(response => response.json());
  }

  getSubdomainid(cid: any, pid: any, did: any) {
    this.headertoken();
    return this.http.get(this.subdomainUrl + '/' + cid + '/' + pid + '/' + did,{ headers: this.head }).map(response => response.json());
  }


  checkExistedition(cid: any, pid: any, did: any, sdid: any, editionName: any, editionVersion: string) {
    this.headertoken();
    return this.http.get(this.chkeditionURL + '/' + cid + '/' + pid + '/' + did + '/' + sdid + '/' + editionName + '/' + editionVersion, { headers: this.head }).map(res => res.json());
  }

  createRecord(data: String): any {
    this.headertoken();
    return this.http.post(this.saveURL, data, { headers: this.head }).map(response => response.json());
  }

  SaveRoleControl(data: String): any {
    this.headertoken();
    return this.http.post(this.rolectrl, data, { headers: this.head }).map(response => response.json());
  }


  getedition(type: any) {
    this.headertoken();
    return this.http.get(this.editionUrl+ '/' + type , { headers: this.head }).map(res => res.json());
  }


  geteditionlist(cid: any,pid: any,did: any,sdid: any,event: any) {
    this.headertoken();
    return this.http.get(this.editionList+ '/' + cid + '/' + pid+ '/' + did+ '/' + sdid+'/'+event, { headers: this.head }).map(res => res.json());
  }


  
  //** EDITION CONTROL MODULE ASSIGN **//
  getEditionname(id: any) {
    this.headertoken();
    return this.http.get(this.editionNameURL + '/' + id,{ headers: this.head }).map(res => res.json());
  }
  getSubdomainname(id: any) {
    this.headertoken();
    return this.http.get(this.subDomainNameURL + '/' + id,{ headers: this.head }).map(res => res.json());
  }

  getLableslist(eid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getlablename/' + eid,{ headers: this.head }).map(res => res.json());
  }

  getModulelist(id: any,label:any) {
    this.headertoken();
    return this.http.get(this.moduleURL + '/' + id +'/'+label,{ headers: this.head }).map(res => res.json());
  }

  getsubModulelist(eid: any, id: any) {
    this.headertoken();
    return this.http.get(this.submoduleURL + '/' + eid + '/' + id,{ headers: this.head }).map(res => res.json());
  }

  getSelectedSubModuleList(eid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getselectedsubmodules/' + eid,{headers: this.head}).map(response => response.json());
  }

  createControl(data: String): any {
    let head = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.saveControlURL+'/', data,{ headers: this.head }).map(response => response.json());
  }


  
  deviceDetails(serobj: any){

   
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});
    
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj,{ headers: this.head }).map(res=> res.json()); 

  }


  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  checkEditionid(id: number) {
    this.headertoken();
    return this.http.get(this.editionURL + '/' + id,{ headers: this.head }).map(res => res.json());
  }
}
