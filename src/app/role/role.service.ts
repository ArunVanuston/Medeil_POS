import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class RoleService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  basePayUrl: string = environment.backend.paymentUrl;
  
  private getRollURL = this.baseResUrl+'/getRoleList';
  private existURL = this.baseResUrl+'/isExistrole';
  private roleURL = this.baseResUrl+'/saveRole';
  private rNameURL = this.baseResUrl+'/getRolename';
  private moURL = this.baseResUrl+'/roleModulelist';
  private submoduleurl = this.baseResUrl+'/roleSubmoduleList';
  private ctrlURL = this.baseResUrl+'/ctrldata';
  private isExURL = this.baseResUrl+'/isRoleExist';
  private asRoleURL = this.baseResUrl+'/viewAssignRole';
  private delRoleURL = this.baseResUrl+'/deleteAssignRole';

  constructor(private http: Http) { }
  head:any;
   headertoken(){
       this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
       'Content-Type':'application/json'});
    }

  getUserdetails(userid:any) {
    this.headertoken();
    return this.http.get(this.basePayUrl+ '/viewuserdetails/' + userid,{headers: this.head} ).map(response => response.json());
  }

  isRoleExist(roleID: any, moduleID: any) {
    this.headertoken();
    return this.http.get(this.isExURL + '/' + roleID + '/' + moduleID,{headers: this.head}).map(res => res.json());
  }

  createCtrlRole(data: String) {
    this.headertoken();
    return this.http.post(this.ctrlURL, data, { headers: this.head }).map(response => response.json());
  }

  isExist(cid: any, name: any) {
    this.headertoken();
    return this.http.get(this.existURL + '/' + cid + '/' + name,{headers: this.head}).map(res => res.json());
  }

  createRole(data: String) {
    this.headertoken();
    return this.http.post(this.basePayUrl+ '/create-user-role', data, { headers: this.head }).map(response => response.json()).catch(this.handleError);
  }

  deviceDetails(serobj: any){
    this.headertoken();
   return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map(res=> res.json()); 
  }
  getRoleName(roleid: any) {
    this.headertoken();
    return this.http.get(this.rNameURL + '/' + roleid,{headers: this.head}).map(res => res.text());
  }

  getRole(userid:any) {
    this.headertoken();
    return this.http.get(this.basePayUrl+ '/getclientrole/'+ userid,{headers: this.head}).map(response => response.json());
  }

  getMapRole(userid:any) {
    this.headertoken();
    return this.http.get(this.basePayUrl+ '/role-assign-details/'+ userid,{headers: this.head}).map(response => response.json());
  }

  getRoleEditionID(roleid: any,roleindx:any) {
    this.headertoken();
    return this.http.get(this.basePayUrl + '/get-roleid-editionid/' + roleid + '/' + roleindx,{headers: this.head}).map(res => res.json());
  }

  RoleStatusChange(roleid: any,statusid:any) {
    this.headertoken();
    return this.http.get(this.basePayUrl + '/active-inactive-role-id/' +  roleid + '/' + statusid, {headers: this.head}).map(res => res.json());
  }

  DeleteRoleModules(edid:any,roleid: any,moduleid:any) {
    this.headertoken();
    return this.http.get(this.basePayUrl + '/delete-clientadmin-module/' + edid + '/' + roleid + '/' + moduleid, {headers: this.head}).map(res => res.json());
  }

  getSelectedModuleList(roleid: any): Promise<any> {
    this.headertoken();
    return this.http.get(this.basePayUrl+ '/getrolewiseclientmodule/' + roleid,{headers: this.head}).toPromise()
      .then(response => response.json() as any).catch(this.handleError);
  }

  getSelectedSubModuleList(roleid: any) {
    this.headertoken();
    return this.http.get(this.basePayUrl+ '/getrolewiseclientsubmodule/' + roleid,{headers: this.head}).map(response => response.json());
  }

  getLabelList(userid: any): Promise<any> {
    this.headertoken();
    return this.http.get(this.basePayUrl+ '/role-assign-getlabelname/' + userid,{headers: this.head}).toPromise()
      .then(response => response.json() as any).catch(this.handleError);
  }

  getModuleList(userid: any, lname:AnalyserNode): Promise<any> {
    this.headertoken();
    return this.http.get(this.basePayUrl+ '/getclientmodule/' + userid + '/' + lname, {headers: this.head}).toPromise()
      .then(response => response.json() as any).catch(this.handleError);
  }

  getSubModuleList(userid: any, moduleid:any) {
    this.headertoken();
    return this.http.get(this.basePayUrl+ '/getclientsubmodule/' + userid + '/'+ moduleid,{headers: this.head}).map(response => response.json());
  }

  AssignRoleModules(modules:any) {
    this.headertoken();
    return this.http.post(this.basePayUrl+ '/clientadmin-assign-role-module',modules,{headers: this.head})
    .map((res: Response) => { return res.json()}).catch(this.handleError)
    // .map(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

  getRoles(id: any) {
    this.headertoken();
    return this.http.get(this.asRoleURL + '/' + id,{headers: this.head}).map(res => res.json());
  }

  deleteRow(id: any) {
    this.headertoken();
    return this.http.get(this.delRoleURL + '/' + id,{headers: this.head}).map(res => res.json());
  }
  GetAlerts(language){
    let langurl="/assets/alerts/en.json";
    if(language=='fr'){
      langurl="/assets/alerts/fr.json";
    }else if(language=='ar'){
      langurl="/assets/alerts/ar.json";
    }else if(language=='es'){
      langurl="/assets/alerts/es.json";
    }else if(language=='es'){
      langurl="/assets/alerts/es.json";
    }else{
      langurl="/assets/alerts/en.json";
    }
    return this.http.get(langurl).map(res => res.json());
  }
  
}
