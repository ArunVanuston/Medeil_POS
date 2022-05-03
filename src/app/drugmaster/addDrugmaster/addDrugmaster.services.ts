import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from "@angular/forms";
import { IOption } from 'ng-select';
import { retry } from 'rxjs/operator/retry';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class adddrugService {
  
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private drugUrl = this.baseResUrl+'/drugcreateRecord';
  private countryUrl = this.baseResUrl+'/viewcompanypRecord';
  private genericUrl = this.baseResUrl+'/getGeneric';
  private genericCombinationUrl = this.baseResUrl+'/getgenericCombination';
  private dosageUrl = this.baseResUrl+'/getDosage';
  private uomUrl = this.baseResUrl+'/getUom';
  private therapeuticUrl = this.baseResUrl+'/getTherapeutic';
  private subtherapeuticUrl = this.baseResUrl+'/getsubTherapeutic';
  private formulationUrl = this.baseResUrl+'/getFormulation';
  private getDistributorchnURL =  this.baseResUrl+'/getdistinfo';
  private getManufactureUrl = this.baseResUrl+'/getPharmacompany';

  //private manufactuereDivisionUrl = this.baseResUrl+'/manufacturerdivision';

  private saveManufacturerURL = this.baseResUrl+'/savemanufacturer';

  private saveMaingroupURL = this.baseResUrl+'/savemaingroup';
  private saveSubgroup1URL = this.baseResUrl+'/savesubgroup1';
  private saveSubgroup2URL = this.baseResUrl+'/savesubgroup2';


  private scheduleUrl = this.baseResUrl+'/getSchedule';
  private insuranceUrl = this.baseResUrl+'/getInsurance';
  private vatUrl = this.baseResUrl+'/getVat';
  private gstUrl = this.baseResUrl+'/getGst';
  private cgstUrl = this.baseResUrl+'/getCgst';
  private sgstUrl = this.baseResUrl+'/getSgst';
  private igstUrl = this.baseResUrl+'/getIgst';
  private druginsurUrl = this.baseResUrl+'/savedrugInsurance';
  private getFileuploadedURL = this.baseResUrl+'/getUploadfiles';

  private saveGenericnameURL = this.baseResUrl+'/genericname';

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

    getVerticals(countryid: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/vanuston-vertical-drop-down/'+countryid, { headers: this.head }).map(response => response.json())
    }

    getFieldhide(cid: any, bid: any, shopid: any, locname: any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/getTaxmaster' + '/' + cid + '/' + bid + '/' + shopid + '/' + locname,{ headers: this.head }).map(res => res.json());
    }

  gettaxCountrystate(cid: any, bid: any, lname: any, locrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/gettaxContrystate' + '/' + cid + '/' + bid + '/' + lname + '/' + locrefid,{ headers: this.head }).map(res => res.json());
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

  createDrug(drugcreate: String) {
    this.headertoken();
    return this.http.post(this.drugUrl, drugcreate, { headers: this.head }).map(response => response.json());
  }

  createQCDrug(drugcreate: String) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/create-qc', drugcreate, { headers: this.head }).map(response => response.json());
  }

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
  getgenericCombination(value: string) {
    this.headertoken();
    return this.http.get(this.genericCombinationUrl + '/' + value, { headers: this.head }).map(response => response.json());
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

  getdistributorchannel(cid:any,bid:any,lname:any,lrefid:any){
    this.headertoken();
    return this.http.get(this.getDistributorchnURL+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid, { headers: this.head }).map(response => response.json());
  }


  // Get GetmanufactuereDivision

  // getmanufactuereDivision(mannameid: String) {

  //   return this.http.get(this.manufactuereDivisionUrl + '/' + mannameid).map(response => response.json());

  // }


  //Get getSchedule
  getSchedule() {
    this.headertoken();
    return this.http.get(this.scheduleUrl, { headers: this.head }).map(response => response.json());
  }

  //Get Insurance
  getInsurance() {
    this.headertoken();
    return this.http.get(this.insuranceUrl,{ headers: this.head }).map(response => response.json());
  }

  //Get vat
  getVat() {
    this.headertoken();
    return this.http.get(this.vatUrl, { headers: this.head }).map(response => response.json());
  }

  //Get Gst
  getGst() {
    this.headertoken();
    return this.http.get(this.gstUrl, { headers: this.head }).map(response => response.json());
  }

  //Get Sgst
  getSgst() {
    this.headertoken();
    return this.http.get(this.sgstUrl, { headers: this.head }).map(response => response.json());
  }

  //Get Cgst
  getCgst() {
    this.headertoken();
    return this.http.get(this.cgstUrl, { headers: this.head }).map(response => response.json());
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

  savedrugimage(image) {
    let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.post(this.baseResUrl+`/upload-drug-image`, image, { headers: imghead }).map((res: Response) => res.json());
  }

  //get Upload files 
  getImage(id: number): Observable<any> {
    let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.get(this.getFileuploadedURL + '/' + id,{ headers: imghead })
      .map((response: Response) => {
        return response.json();
      })
  }


  getATC(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getATC' + '/' + id, { headers: this.head }).map(res => res.json());
  }

  saveGenCobination(data: String) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/savecombination', data, { headers: this.head }).map(response => response.json())

  }


  saveGenericname(serobj: string) { 
    this.headertoken();
    //return this.http.get(this.saveGenericnameURL + '/' + serobj,{ headers: this.head }).map(res => res.json());
    return this.http.post(this.saveGenericnameURL, serobj, { headers: this.head })  .map((res: Response) => {
      return res.json()});

  }


  // saveManufacturername(manuobj: string) {

  //   let header = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: header });

  //   return this.http.get(this.saveManufacturerURL + '/' + manuobj).map(res => res.json());

  // }

  saveMaingroup(maingroupobj: string) {
    this.headertoken();
    return this.http.post(this.saveMaingroupURL, maingroupobj, { headers: this.head}).map(response => response.json());

  }


  saveSubgroup1(subgroupobj1: string) {
   this.headertoken();
    return this.http.post(this.saveSubgroup1URL, subgroupobj1, { headers: this.head }).map(response => response.json());
  }


  saveSubgroup2(subgroupobj2: string) {
   this.headertoken();
    return this.http.post(this.saveSubgroup2URL, subgroupobj2, { headers: this.head }).map(response => response.json());
  }

  searchdrug(companyID: any, searchvalue: any) {
    return this.http.get(this.baseResUrl+'/viewSearchDrugmastersAll/' + companyID +'/'+searchvalue, { headers: this.head }).map(res => res.json());
  }

  devicedetails(data){

    this.headertoken();
    return this.http
      .post(this.deviceurl, data, { headers: this.head })  .map((res: Response) => res.json());  
}

}
