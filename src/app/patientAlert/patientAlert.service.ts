import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class patientAlertService {
    handleError: any;
    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;
    private getCompanies = this.baseResUrl+'/getpatientcompany';
    private getBranches = this.baseResUrl+'/getpatientbranch';
    private getShops = this.baseResUrl+'/getpatientshop';
    private getWarehouses = this.baseResUrl+'/getpatientwarehouse';
    private getHospitals = this.baseResUrl+'/getpatienthospital';
    private getCompanyPatients = this.baseResUrl+'/getcompanypatient';
    private getBranchPatients = this.baseResUrl+'/getbranchpatient';
    private getFirmPatients = this.baseResUrl+'/getfirmpatient';
    private getPatientInfomation = this.baseResUrl+'/getpatientinfo';
    private sendmailurl = this.baseResUrl+'/sendmessagebymail';
    private msgUrl = this.baseResUrl+'/savePatient';
    // private header = new Headers({'Content-Type': 'application/json'});

    private viewUrlByAdmin = this.baseResUrl+'/viewpatientalert';
    private viewUrl = this.baseResUrl+'/viewpatientalert';
    private deleteUrl = this.baseResUrl+'/deletePatientAlert';
    
    constructor(private http: Http) { }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

    //Get Companies
    getCompany() {
        this.headertoken();
        return this.http.get(this.getCompanies, {headers: this.head} ).map(response => response.json());
    }

    //Get Branch By CompanyID 
    getBranche(compid: number) {
        this.headertoken();
        return this.http.get(this.getBranches + '/' + compid, {headers: this.head} ).map(response => response.json());
    }

    //Get Shop By BranchID 
    getShop(branchid: number) {
        this.headertoken();
        return this.http.get(this.getShops + '/' + branchid, {headers: this.head} ).map(response => response.json());
    }


    //Get Warehouse By BranchID 
    getWareHouse(branchid: number) {
        this.headertoken();
        return this.http.get(this.getWarehouses + '/' + branchid, {headers: this.head} ).map(response => response.json());
    }


    //Get Hospital By BranchID 
    getHospital(branchid: number) {
        this.headertoken();
        return this.http.get(this.getHospitals + '/' + branchid, {headers: this.head} ).map(response => response.json());
    }

    //Get Patient By CompanyID 
    getCompanyPatient(compid: number) {
        this.headertoken();
        return this.http.get(this.getCompanyPatients + '/' + compid, {headers: this.head} ).map(response => response.json());
    }

    //Get Patient By BranchID 
    getBranchPatient(compid: number, brnchid) {
        this.headertoken();
        return this.http.get(this.getBranchPatients + '/' + compid + '/' + brnchid, {headers: this.head} ).map(response => response.json());
    }


    //Get Patient By ShopID Or WarehouseID or HospitalID 
    getFirmPatient(compid: number, brnchid: number, locid: number) {
        this.headertoken();
        return this.http.get(this.getFirmPatients + '/' + compid + '/' + brnchid + '/' + locid, {headers: this.head} ).map(response => response.json());
    }

    getPatientInfo(pid: number) {
        //Get States 
        this.headertoken();
        return this.http.get(this.getPatientInfomation + '/' + pid, {headers: this.head} ).map(response => response.json());
    }

    sendMessageByMail(mailid: String, message: String) {
        //Get States 
        this.headertoken();
        return this.http.get(this.sendmailurl + '/' + mailid + '/' + message, {headers: this.head} ).map(response => response.json());
    }

    createMessage(employeecreate: String) {
       this.headertoken();
       return  this.http.post(this.msgUrl, employeecreate, { headers: this.head }).map(response => response.json());
        
    }


    deviceDetails(serobj: any){
        this.headertoken();
        return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head} ).map((res:Response)=> res.json()); 
    
      }

    patientAlertViewByAdmin() {
        this.headertoken();
        return this.http.get(this.viewUrl, {headers: this.head} ).map(response => response.json());
    }

    patientAlertView(comp: number, brnch: number, loc: number, locref: number) {
        this.headertoken();
        return this.http.get(this.viewUrl + '/' + comp + '/' + brnch + '/' + loc + '/' + locref, {headers: this.head} ).map(response => response.json());
    }

    employeeDelete(empId: number) {
        this.headertoken();
        return this.http.get(this.deleteUrl + '/' + empId, {headers: this.head} ).map(response => response.json());
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




