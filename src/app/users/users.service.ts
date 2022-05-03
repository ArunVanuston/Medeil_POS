import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class UsersService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  payUrl:string=environment.backend.paymentUrl;

  private compURL = this.baseResUrl+'/companylist';
  private userURL = this.baseResUrl+'/userCData';
  private roleURL = this.baseResUrl+'/roleComplist';
  private conURL = this.baseResUrl+'/getuserCountry';
  private proURL = this.baseResUrl+'/getuserProduct';
  private domURL = this.baseResUrl+'/getuserDomain';
  private sdomURL = this.baseResUrl+'/getusersubDomain';
  private ediURL = this.baseResUrl+'/getuserEdition';
  private empURl = this.baseResUrl+'/userEmployeelist';
  private saveURL = this.baseResUrl+'/saveUsers';
  private logURL = this.baseResUrl+'/saveuserlogin';
  private uURL = this.baseResUrl+'/moduleUserlist';
  private modURL = this.baseResUrl+'/usermodulelist';
  private submodURL = this.baseResUrl+'/usersubmodulelist';
  private saveMURL = this.baseResUrl+'/saveusermodule';
  private saveSMURL = this.baseResUrl+'/saveusersubmodule';
  private userbURL = this.baseResUrl+'/userbranchlist';
  private SaveBURL = this.baseResUrl+'/saveuserbranch';
  private userSURL = this.baseResUrl+'/usershoplist';
  private saveSURL = this.baseResUrl+'/saveusershop';
  private userWURL = this.baseResUrl+'/userwarehouselist';
  private userHURL = this.baseResUrl+'/userhospitallist';
  private saveWURL = this.baseResUrl+'/saveuserwarehouse';
  private saveHURL = this.baseResUrl+'/saveuserhospital';
  private delRoleURL = this.baseResUrl+'/deleteAssignuser';
  private disturl = this.baseResUrl+'/getdistinfo';
  //View User Data
  private usURL = this.baseResUrl+'/viewuserdata';
  private umURL = this.baseResUrl+'/viewuserModuledata';
  private uaURL = this.baseResUrl+'/viewuserAccessdata';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }
  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

  getUserlist(userid: any): Promise<any> {
        this.headertoken();
        return this.http.get(this.payUrl+'/'+'viewuserdetails' + '/' + userid,{headers: this.head})
          .toPromise()
          .then(response => response.json() as any)
          .catch(this.handleError);
    }
  
  getemployeelist(userid: any): Promise<any> {
    this.headertoken();
    return this.http.get(this.payUrl + '/'+ 'checkemployee'+ '/' + userid,{headers: this.head})
      .toPromise().then(response => response.json() as any).catch(this.handleError);
  }

  getRoleIDExist(roleid: any): Promise<any> {
    this.headertoken();
    return this.http.get(this.payUrl + '/check-roleid-exist/'+ roleid,{headers: this.head})
      .toPromise().then(response => response.json() as any).catch(this.handleError);
  }

  EmailexistValid(email: any): Promise<any> {
    this.headertoken();
    return this.http.get(this.payUrl + '/check-existing-customer/'+ email,{headers: this.head})
      .toPromise().then(response => response.json() as any).catch(this.handleError);
  }

  getEditionID(roleid: any,index:any): Promise<any> {
    this.headertoken();
    return this.http.get(this.payUrl + '/'+ 'get-roleid-editionid'+ '/' + roleid + '/' + index,{headers: this.head})
      .toPromise().then(response => response.json() as any).catch(this.handleError);
  }

  getTimestamp(userid): Promise<any> {
    this.headertoken();
    return this.http.get(this.payUrl + '/get-remaining-days/' + userid,{headers: this.head})
      .toPromise().then(response => response.json() as any).catch(this.handleError);
  }

  getRoles(userid): Promise<any> {
    this.headertoken();
    return this.http.get(this.payUrl + '/getclientrole/' + userid,{headers: this.head})
      .toPromise().then(response => response.json() as any).catch(this.handleError);
  }

  createUserCheck(data: String) {
    this.headertoken();
    return this.http.post(this.payUrl+ '/createnewusercountcheck', data, { headers: this.head })
    .map((res: Response) =>{ return res.json()}).catch(this.handleError);
  }
  
  createUser(data: String) {
    this.headertoken();
    return this.http.post(this.payUrl+ '/createnewuser', data, { headers: this.head })
    .map((res: Response) =>{ return res.json()}).catch(this.handleError);
  }

  createLogin(data: String) {
    this.headertoken();
    return this.http.post(this.logURL, data, { headers: this.head }).map(res => res.json());
  }

  deviceDetails(serobj: any){
    this.headertoken();
  
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map(res=> res.json()); 

  }

  getCompanylist(): Promise<any> {
    this.headertoken();
    return this.http.get(this.payUrl+'/'+'viewuserdetails',{headers: this.head})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
 
  getModule(id: number) {
    this.headertoken();
    return this.http.get(this.modURL + '/' + id,{headers: this.head}).map(res => res.json());
}
  
 
  getSubmodule(mid: any,uid :any): Promise<any> {
    this.headertoken();
    return this.http.get(this.submodURL + '/' + mid + '/' + uid,{headers: this.head})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  addModule(data:any) {
    this.headertoken();
    return this.http.post(this.saveMURL, data, { headers: this.head }).map(response => response.json()).catch(this.handleError);
  }
  addSubmodule(data: String) {
    this.headertoken();
    return this.http.post(this.saveSMURL, data, { headers: this.head }).map(response => response.json()).catch(this.handleError);
  }
  //********************************************** */
  getBranch(id: number) {
    this.headertoken();
    return this.http.get(this.userbURL + '/' + id,{headers: this.head}).map(response => response.json());
  }
  addBranch(data: String) {
    this.headertoken();
    return this.http.post(this.SaveBURL, data, { headers: this.head }).map(res => res.json()).catch(this.handleError);
  }
  getStore(id: any) {
    this.headertoken();
    return this.http.get(this.userSURL + '/' + id,{headers: this.head}).map(response => response.json());
  }
  addStore(data: String) {
    this.headertoken();
    return this.http.post(this.saveSURL, data, { headers: this.head }).map(res => res.json()).catch(this.handleError);
  }
  getWarehouse(id: any) {
    this.headertoken();
    return this.http.get(this.userWURL + '/' + id,{headers: this.head}).map(response => response.json());
  }
  addWarehouse(data: String) {
    this.headertoken();
    return this.http
      .post(this.saveWURL, data, { headers: this.head }).map(res => res.json()).catch(this.handleError);
  }
  getHospital(id: any) {
    this.headertoken();
    return this.http.get(this.userHURL + '/' + id,{headers: this.head}).map(response => response.json());
  }
  addHospital(data: String) {
    this.headertoken();
    return this.http
      .post(this.saveHURL, data, { headers: this.head })
      .map(response => response.json())
      .catch(this.handleError);
  }

 
  viewUserDatas(compid:any) {
    this.headertoken();
    return this.http.get(this.payUrl + '/viewuserdatas/' + compid,{headers: this.head} ).map(response => response.json());
  }
  
  viewModuleUser() {
    this.headertoken();
    return this.http.get(this.umURL,{headers: this.head}).map(response => response.json());
  }
  viewAccessUser(value: string) {   
    this.headertoken();
    return this.http.get(this.uaURL + '/' + value,{headers: this.head}).map(response => response.json());
  }
  deleteRow(id: any) {
    this.headertoken();
    return this.http.get(this.delRoleURL + '/' + id,{headers: this.head}).map(res => res.json());
  }
  //********************************************** */
  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }

    //distributor information
    Distinfo(cid: any){
      this.headertoken();
      return this.http.get(this.disturl + '/' + cid,{headers: this.head}).map(response => response.json());
      
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
