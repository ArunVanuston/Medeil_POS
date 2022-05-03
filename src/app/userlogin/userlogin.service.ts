import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';


@Injectable()
export class UserloginService {
  baseResUrl2: string = environment.medauthbackend.baseResUrl2;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private loginurl = this.baseResUrl+'/loginModule';
  private labelURl = this.baseResUrl+'/getModulelabel';
  private userURl = this.baseResUrl+'/checkExistuser';
  private compURl = this.baseResUrl+'/getusercomp';
  private posttokenapi = this.baseUrl+'/token';
  private authorities = this.baseResUrl+'/getAuthorities'
  private deviceurl = this.baseResUrl+'/User/saveUserActivity';
  head;

public accesstoken = {
  "access_token" :"NA",
  "refresh_token" :"NA"
};
public refreshtoken = {
 "refresh_token" :"NA"
};
  static acctoken: any;
  constructor(private http: Http,private http1: HttpClient) { 
  
    }
  heads = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic VVNFUl9DTElFTlRfQVBQOnBhc3N3b3Jk'
        });

        private handleError(error: any) { 
          let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
          return Observable.throw(error.json());
        }

  userauthentication(body: any) {
    return this.http.post(this.posttokenapi, body, { headers: this.heads }).map((res: Response) => {
      return res.json(),this.accesstoken = res.json()}).catch(this.handleError)
  }
 
  accountlock(usernname: any){
      return this.http.get(this.baseResUrl2+'/user-attempts-count' + '/' + usernname).map((res: Response) => {
        return res.json()});
    
  }

  mobileidentification(usernname: any){
    return this.http.get(this.baseResUrl2+'/user-mobile-number-identification' + '/' + usernname).map((res: Response) => {
      return res.json()});
  
}

  getAuthorities(body: any) {
   // this.head = new HttpHeaders().set('Authorization','Bearer '+this.token.access_token).set('Content-Type','application/json')
   if(this.refreshtoken.refresh_token == "NA"){
    sessionStorage.getItem("acctoken");
    this.head = new Headers({ 'Authorization': 'bearer'+sessionStorage.getItem("acctoken"),
    'Content-Type':'application/json'});
   }else{
    sessionStorage.setItem("acctoken",this.accesstoken.access_token);
    this.head = new Headers({ 'Authorization': 'bearer'+sessionStorage.getItem("acctoken"),
    'Content-Type':'application/json'});
   }
   
    return this.http.post(this.authorities, body, { headers: this.head }).map((res: Response) => {
      return res.json(),this.refreshtoken = res.json()})
  }

    getlogin(uname: string, upass: string, company: any): Observable < any > {
     
      return this.http.post(this.loginurl, { username: uname, password: upass, companyid: company }, { headers: this.head }).map(response => response.json());
    }

    getmoduleLabel(uname: string, upass: string, company: any): Observable < any > {
      return this.http.post(this.labelURl, { username: uname, password: upass, companyid: company }, { headers: this.head }).map(response => response.json());
    }


    // isExists(uname: string, upass: string, company: any): Observable < any > {
    //   return this.http.post(this.userURl, { username: uname, password: upass, companyid: company }, { headers: this.head }).map(response => response.json());
    // }

    getComplist() {
      return this.http.get(this.compURl).map(res => res.json());
    }

    //CHOOSE SECTION
    getBranch(cid: any, uid: any):Observable<any> {
  //   this.head = new HttpHeaders({ 'Content-Type':'application/json', 'Authorization': 'bearer'+this.token.access_token});
  return this.http.get(this.baseResUrl+'/getloginBranchlist'+ '/' + cid + '/' + uid,{headers:this.head}).map((res: Response) => {
    return res.json()});
    }

    getShop(cid: any, bid: any, uid: any) {
      return this.http.get(this.baseResUrl+'/getloginShoplist' + '/' + cid + '/' + bid + '/' + uid,{headers: this.head}).map(res => res.json());
    }
    getHospital(cid: any, bid: any, uid: any) {
      return this.http.get(this.baseResUrl+'/getloginHospitallist' + '/' + cid + '/' + bid + '/' + uid,{headers: this.head}).map(res => res.json());
    }
    getWarehouse(cid: any, bid: any, uid: any) {
      return this.http.get(this.baseResUrl+'/getloginWarehouselist' + '/' + cid + '/' + bid + '/' + uid,{headers: this.head}).map(res => res.json());
    }

    getLocalStore(data: String) {
      return this.http.post(this.baseResUrl+'/getLocalStorage', data, { headers: this.head }).map(res => res.json());
    }

    updateMinqty(cid: any, bid: any, lname: any,lrefid){
      sessionStorage.setItem("acctoken",this.accesstoken.access_token);
      this.head = new Headers({ 'Authorization': 'bearer'+sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
      return this.http.get(this.baseResUrl+'/updateminimumqty'+ '/' + cid + '/' + bid + '/' + lname+ '/' + lrefid,{headers: this.head}).map(res => res.json());
    }

    devicedetails(data){

      let header = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: header });

      return this.http
        .post(this.deviceurl, data, options).map((res: Response) => res.json());

    }


  }
