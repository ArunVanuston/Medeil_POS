import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpEventType } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class TaxsettingsService {
    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;

    private getcountry = this.baseResUrl+'/getCountry';
    private getCompany = this.baseResUrl+'/getcompanytax';
    private getBranch = this.baseResUrl+'/getbranchtax';
    private getShopname = this.baseResUrl+'/getshoptax';
    private getWarehouse = this.baseResUrl+'/getwarehousetax';
    private getHospital = this.baseResUrl+'/gethospitaltax';
    private saveGstflag = this.baseResUrl+'/savetaxationtype';//not in use
    private saveTaxsetting = this.baseResUrl+'/savetax';//taxtype
    private save=this.baseResUrl+'/savetaxvalue';//taxpercentage
    //private saveTaxsetting=this.baseResUrl+'/savetaxsetting';
    private gettaxtype=this.baseResUrl+'/gettaxtypetsetting';
    private taxsettings = this.baseResUrl+'/savetaxsetting';
    private getState = this.baseResUrl+'/getState';
    private fetchtax = this.baseResUrl+'/fetchtaxsettings';

    constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      }
    getCountry() {
        this.headertoken();
        //Get Coutries 
        return this.http.get(this.getcountry,{headers: this.head}).map(response => response.json());
    }
    getcompany(countryid: number) {
        this.headertoken();
        //Get Company 
        return this.http.get(this.getCompany + '/' + countryid,{headers: this.head}).map(response => response.json());

    }

    gettaxtypes(companyid: number): any {
        this.headertoken();
        return this.http.get(this.gettaxtype + '/' + companyid,{headers: this.head}).map(response => response.json());
    }

    getbranch(companyid: number) {
        this.headertoken();
        return this.http.get(this.getBranch + '/' + companyid,{headers: this.head}).map(response => response.json());
    }
    getshopname(branchid: number) {
        this.headertoken();
        return this.http.get(this.getShopname + '/' + branchid,{headers: this.head}).map(response => response.json());
    }
    getwarehouse(branchid: number) {
        this.headertoken();
        return this.http.get(this.getWarehouse + '/' + branchid,{headers: this.head}).map(response => response.json());
    }
    gethospital(branchid: number) {
        this.headertoken();
        return this.http.get(this.getHospital + '/' + branchid,{headers: this.head}).map(response => response.json());
    }

    getrequest() {

        alert(HttpEventType)
    }

    savegstflag(data: String) {
        this.headertoken();
        return this.http.post(this.saveGstflag, data, { headers: this.head }).map(response => response.json()).catch(this.handleError);
    }
//addtaxtype
    savetaxtype(data: String) {
        this.headertoken();
        return this.http.post(this.saveTaxsetting, data, { headers: this.head }).map(response => response.json()).catch(this.handleError);
    }
//addtaxsettings
    savetax(data: string): any {
        // alert('Inside Services savetax')
        // alert(data)
       // return this.http.post(this.save, data, { headers: header }).map(response => response.json()).catch(this.handleError);
       this.headertoken();
        return this.http.post(this.save, data, { headers: this.head }).map((res: Response) => {
            return { "res": res.json() };
      });
    }



    deviceDetails(serobj: any){

        this.headertoken();
        return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map((res:Response)=> res.json()); 
    
      }
    

      getStates(countryid: number) {
        //Get States 
        this.headertoken();
        return this.http.get(this.getState + '/' + countryid,{headers: this.head}).map(response => response.json());
      }

      Savetaxsettings(data){
        this.headertoken();
        return this.http.post(this.taxsettings, data,{headers: this.head})  .map((res: Response) => res.json());  
       }

       fetchTaxsettings(companyid: number,branchid: number,lname: number,lrefid: number) {
        this.headertoken();
        return this.http.get(this.fetchtax + '/' + companyid+ '/' + branchid+ '/' + lname+ '/' + lrefid,{headers: this.head}).map((res:Response)=> res.json());
    }

    private handleError(error: any): Promise<any> {
        console.error('Error', error);
        return Promise.reject(error.message || error);
    }
}