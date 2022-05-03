import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class adminService{

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  baseResUrl2: string = environment.backend.thirdpartyUrl;
  baseResUrl3: string = environment.backend.paymentUrl;
  
    private shopinfo= this.baseResUrl+'/getshopinfo';
    private userinfo= this.baseResUrl+'/empprofileinfo';
    private imagereceive=this.baseResUrl+'/getsendImage';
    private updateURL=this.baseResUrl+'/updateEmployeeProfile';
    private taxsettings = this.baseResUrl+'/savetaxsetting';
    private setupstatus = this.baseResUrl+'/getsetupstatus';
    private deviceurl=this.baseResUrl+'/User/saveUserActivity';
    private sessionurl=this.baseResUrl+'/userses/saveUsertime';
    private posttokenapi = this.baseUrl+'/token';
    private getState = this.baseResUrl+'/getState';
    private currencystatus = this.baseResUrl+'/getCurrencyStatus';
    private savecurrsetup = this.baseResUrl+'/saveCurrencyset';
    private savedecisetup = this.baseResUrl+'/saveDecimalset';
    private setupcostsettings = this.baseResUrl+'/saveSetupcost';
    private payoutlist = this.baseResUrl+'/payment/viewpaymentoutstanding';
    private setupjournal = this.baseResUrl + '/saveSetupcostJournal';
    
    public accesstoken = {
      "access_token" :"NA",
      "refresh_token" :"NA"
    };
    public refreshtoken = {
     "refresh_token" :"NA"
    };
    constructor(private http: Http) { }
    heads = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic VVNFUl9DTElFTlRfQVBQOnBhc3N3b3Jk'
    });
    private handleError(error: any) { 
      let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return Observable.throw(error.json());
    }
    head;
    headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
    userauthentication(body: any) {
      return this.http.post(this.posttokenapi, body, { headers: this.heads }).map((res: Response) => {
        return res.json(),this.accesstoken = res.json()}).catch(this.handleError)
    }
    public getIPAddress()
    {
        //Get IP Address
      return this.http.get("http://api.ipify.org/?format=json").map(response => response.json());
      
    }
    getStates(countryid: number) {
      //Get States 
      this.headertoken();
      return this.http.get(this.getState + '/' + countryid,{headers: this.head}).map(response => response.json());
    }

    getShopName(shopid:any) {
        //Get getDrugList
        this.headertoken();
        return this.http.get(this.shopinfo+ '/'+ shopid, { headers: this.head }).map((res: Response) => {
          return res.json()}).catch(this.handleError)
        //return this.http.get(this.shopinfo+'/'+shopid,{headers: this.head}).map(response => response.json()).catch(this.handleError);
       }
    
       getuserlogintime(id: number) {
        //Get user info
        this.headertoken();
        return this.http.get(this.baseResUrl+'/last-visit-and-login-history'+'/'+id,{headers: this.head}).map(response => response.json());
       }

    getuserinfo(id: number) {
        //Get user info
        this.headertoken();
        return this.http.get(this.userinfo+'/'+id,{headers: this.head}).map(response => response.json());
       }
    
       receiveimage(id: number) {
        //Get userimage
        let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
        return this.http.get(this.imagereceive+'/'+id,{headers: imghead}).map(response => response.json());
       }

       updateinfo(data){
        this.headertoken();
         return this.http.post(this.updateURL, data, {headers: this.head}).map((res: Response) =>
         {return {"res":res.json()}})
         
       }

       devicedetails(data){
        this.headertoken();
        return this.http
          .post(this.deviceurl, data,{headers: this.head})  .map((res: Response) => res.json());  

       }

       Savetaxsettings(data){
        this.headertoken();
        return this.http.post(this.taxsettings, data,{headers: this.head})  .map((res: Response) => res.json());  
       }

       SaveSetupcost(data){
        this.headertoken();
        return this.http.post(this.setupcostsettings, data,{headers: this.head})  .map((res: Response) => res.json());  
       }

       saveSetcostJournal(data: string) {
        this.headertoken();
        return this.http.post(this.setupjournal, data, { headers: this.head }).map((res: Response) => res.json());
      }

       getSetupstatus(cid: number,bid: number,lname: number,lrefid: number) {
        this.headertoken();
        return this.http.get(this.setupstatus+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers: this.head}).map(response => response.json());
       }
       sessiondetails(data){
        this.headertoken();
        return this.http
          .post(this.sessionurl, data,{headers: this.head})  .map((res: Response) => res.json());  

       }

       getcurrencysts() {
        this.headertoken();
        return this.http.get(this.currencystatus,{headers: this.head}).map(response => response.json());
      }

      saveCurrencysetup(data) {
        this.headertoken();
        return this.http.post(this.savecurrsetup, data,{headers: this.head}).map((res: Response) => {
          return res.json()})

      }

      savedecimalsetup(data){
        this.headertoken();
        return this.http.post(this.savedecisetup, data,{headers: this.head}).map((res: Response) => {
          return res.json()})
      }


      Getpaymentout(cid: any,bid: any,lname: any,lrefid: any,date: any){
        this.headertoken();
        return this.http.get(this.payoutlist+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date,{headers:this.head}).map(Response => Response.json())
      }

      GetAllCreditAlerts(cid: any,bid: any,lname: any,lrefid: any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/payment/GetAllCreditAlerts'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers:this.head}).map(Response => Response.json());
        //return this.http.post( this.URL+`deleteReceipt`, serobj, { headers: this.head }).map((res: Response) => res.json());

      }

      GetRefillAlerts(cid: any,bid: any,lname: any,lrefid: any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/patient/refillalerts'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid,{headers:this.head}).map(Response => Response.json())
      }

      ViewClientNotifications(countryid:any,edition:any){
        return this.http.get(this.baseResUrl2+'/notification/getClientNotification/'+countryid+'/'+edition,{ headers: this.head }).map((res: Response) => res.json());
      }

      ViewClientRemainDays(suserid:any){
        return this.http.get(this.baseResUrl3+'/get-remaining-days/'+suserid,{ headers: this.head }).map((res: Response) => res.json());
      }

}