import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from "@angular/forms";
import { IOption } from 'ng-select';
import { retry } from 'rxjs/operator/retry';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class editdrugService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  handleError: any;
  private drugUrl = this.baseResUrl+'/drugupdateRecord';
  private countryUrl = this.baseResUrl+'/viewcompanypRecord';
  private genericUrl = this.baseResUrl+'/getGeneric';
  private getManufactureUrl = this.baseResUrl+'/getPharmacompany';
  private genericCombinationUrl = this.baseResUrl+'/getgenericCombination';
  private dosageUrl = this.baseResUrl+'/getDosage';
  private uomUrl = this.baseResUrl+'/getUom';
  private therapeuticUrl = this.baseResUrl+'/getTherapeutic';
  private subtherapeuticUrl = this.baseResUrl+'/getsubTherapeutic';
  private formulationUrl = this.baseResUrl+'/getFormulation';
  private  getDistributorchnURL =  this.baseResUrl+'/getdistinfo';

  private scheduleUrl = this.baseResUrl+'/getSchedule';
  private insuranceUrl = this.baseResUrl+'/getInsurance';
  private vatUrl = this.baseResUrl+'/getVat';
  private gstUrl = this.baseResUrl+'/getGst';
  private cgstUrl = this.baseResUrl+'/getCgst';
  private sgstUrl = this.baseResUrl+'/getSgst';
  private igstUrl = this.baseResUrl+'/getIgst';
  private druginsurUrl = this.baseResUrl+'/savedrugInsurance';

  /** Edit values From view URL**/
  private editValURL = this.baseResUrl+'/getdrugeditval';
  private editSubthreaURL = this.baseResUrl+'/getEditsubthreabetic';
  private geteditInsur = this.baseResUrl+'/getEditinsurance';
  private mainurl = this.baseResUrl+'/getmain';
  private subgroup1Url = this.baseResUrl+'/getsubgroup1';
  private subgroup2Url = this.baseResUrl+'/getsubgroup2';

  private deviceurl=this.baseResUrl+'/User/saveUserActivity';
  

  constructor(private http: Http, private http1: HttpClient) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }


  updateDrug(drugcreate: String) {
    this.headertoken();
    this.http.post(this.drugUrl, drugcreate, { headers: this.head }).map(response => response.json())
      .subscribe(
      () => { console.log(drugcreate) }
      );
  }
  /**Get Edit values From view From **/

  getdrugEditvalues(id: number) {
    this.headertoken();
    return this.http.get(this.editValURL + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getEditsubthreabetic(theraid: number) {
    this.headertoken();
    return this.http.get(this.editSubthreaURL + '/' + theraid, { headers: this.head }).map(response => response.json());
  }


  geteditGeneric1(id: number) {
    this.headertoken();
    return this.http.get(this.geteditGeneric1 + '/' + id, { headers: this.head }).map(response => response.json());
  }


  geteditInsurance(id: number) {
    this.headertoken();
    return this.http.get(this.geteditInsur + '/' + id, { headers: this.head }).map(response => response.json());
  }

  /** Get Edit values From view From**/

  getval() {
    this.headertoken();
    return this.http.get(this.countryUrl, { headers: this.head }).map(response => response.json());
  }

  //Get Generic 
  getGeneric(value: string) {
    this.headertoken();
    return this.http.get(this.genericUrl + '/' + value, { headers: this.head }).map(response => response.json());
  }

  //Get Manufacturer
  getManufacturer(value: string) {
    this.headertoken();
    return this.http.get(this.getManufactureUrl + '/' + value, { headers: this.head }).map(response => response.json());
  }

  //Get GenericCombination
  getgenericCombination() {
    this.headertoken();
    return this.http.get(this.genericCombinationUrl, { headers: this.head }).map(response => response.json());
  }

  //Get Dosage
  getDosage() {
    this.headertoken();
    return this.http.get(this.dosageUrl, { headers: this.head }).map(response => response.json());
  }

  //Get UOM
  getUom() {
    this.headertoken();
    return this.http.get(this.uomUrl, { headers: this.head }).map(response => response.json());
  }

  //Get getTherapeutic
  getTherapeutic() {
    this.headertoken();
    return this.http.get(this.therapeuticUrl, { headers: this.head }).map(response => response.json());
  }

  //Get getsubTherapeutic
  getSubthera(theraid: number) {
    this.headertoken();
    return this.http.get(this.subtherapeuticUrl + '/' + theraid, { headers: this.head }).map(response => response.json());
  }

  //Get Formulation
  getFormulation() {
    this.headertoken();
    return this.http.get(this.formulationUrl, { headers: this.head }).map(response => response.json());
  }


    //Get DistributorChannel
  getDistributorChannel() {
    this.headertoken();
    return this.http.get(this.getDistributorchnURL, { headers: this.head }).map(response => response.json());
  }




  //Get getSchedule
  getSchedule() {
    this.headertoken();
    return this.http.get(this.scheduleUrl,{ headers: this.head }).map(response => response.json());
  }

  //Get Insurance
  getInsurance() {
    this.headertoken();
    return this.http.get(this.insuranceUrl, { headers: this.head }).map(response => response.json());
  }

  //Get vat
  getVat() {
    this.headertoken();
    return this.http.get(this.vatUrl, { headers: this.head }).map(response => response.json());
  }

  //Get Gst
  getGst() {
    this.headertoken();
    return this.http.get(this.gstUrl,{ headers: this.head }).map(response => response.json());
  }

  //Get Sgst
  getSgst() {
    this.headertoken();
    return this.http.get(this.sgstUrl,{ headers: this.head }).map(response => response.json());
  }

  //Get Cgst
  getCgst() {
    this.headertoken();
    return this.http.get(this.cgstUrl,{ headers: this.head }).map(response => response.json());
  }
  //Get Igst
  getIgst() {
    this.headertoken();
    return this.http.get(this.igstUrl,{ headers: this.head }).map(response => response.json());
  }

  insuranceSave(ins: string) {
   this.headertoken();
    this.http.post(this.druginsurUrl, ins, { headers: this.head }).map(response => response.json())
      .subscribe(
      () => { console.log(ins) }
      );
  }


  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);    
    const req = new HttpRequest('POST', this.baseResUrl+'/uploadphoto', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http1.request(req);
  }

  //Edit Drug Methods
  getVerticals(countryid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/vanuston-vertical-drop-down/'+countryid, { headers: this.head }).map(response => response.json())
  }

  geteditManufacture(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditmanufacture' + '/' + id,{ headers: this.head }).map(response => response.json());
  }
     
  geteditFormulation(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditformulation' + '/' + id,{ headers: this.head }).map(response => response.json());
  }


  geteditDistributorChannel(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditDistributorChannel' + '/' + id, { headers: this.head }).map(response => response.json());
  }

  mainGroup(verticalid:any) {
    this.headertoken();
    return this.http.get(this.mainurl+'/'+verticalid,{ headers: this.head }).map(response => response.json());
  }

  subGroup1(verticalid:any, subgroupid1: number) {
    this.headertoken();
    return this.http.get(this.subgroup1Url + '/' + verticalid+ '/' + subgroupid1,{ headers: this.head }).map(response => response.json());
  }

  subGroup2(verticalid:any, subgroupid2: number) {
    this.headertoken();
    return this.http.get(this.subgroup2Url + '/' + verticalid + '/' + subgroupid2, { headers: this.head }).map(response => response.json());
  }

  geteditSchedule(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditschedule' + '/' + id, { headers: this.head }).map(response => response.json());
  }

  geteditVat(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditvat' + '/' + id, { headers: this.head }).map(response => response.json());
  }

  geteditGst(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditgst' + '/' + id, { headers: this.head }).map(response => response.json());
  }
  geteditSgst(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditsgst' + '/' + id, { headers: this.head }).map(response => response.json());
  }
  geteditCgst(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditcgst' + '/' + id, { headers: this.head }).map(response => response.json());
  }
  geteditIgst(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditigst' + '/' + id, { headers: this.head }).map(response => response.json());
  }

  updteDrug(drugcreate: String) {
    this.headertoken();
    return this.http.post(this.drugUrl, drugcreate, { headers: this.head }).map(response => response.json());
  }

  geteditGeneric(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/geteditgeneric' + '/' + id, { headers: this.head }).map(response => response.json());
  }

  
  devicedetails(data){
    this.headertoken
    return this.http
      .post(this.deviceurl, data, { headers: this.head })  .map((res: Response) => res.json());  
    }
}
