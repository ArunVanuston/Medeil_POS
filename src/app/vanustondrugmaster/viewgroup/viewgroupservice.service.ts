import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class ViewgroupserviceService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
  }

  getCountry() {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getCountry', { headers: this.head }).map(response => response.json());
  }

  getVerticals(countryid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/vanuston-vertical-drop-down/'+countryid, { headers: this.head }).map(response => response.json())
  }

  mainGroup(verticalid:any) {
    this.headertoken();
    return this.http.get( this.baseResUrl+'/getmain'+'/'+verticalid,{ headers: this.head }).map(response => response.json());
  }

  subGroup1(verticalid:any, subgroupid1: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsubgroup1' + '/' + verticalid + '/' + subgroupid1,{ headers: this.head }).map(response => response.json());
  }

  subGroup2(verticalid:any, subgroupid2: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getsubgroup2' + '/' + verticalid + '/' + subgroupid2, { headers: this.head }).map(response => response.json());
  }

  UpdateMainGroup(groupvalues:any) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/updatemaingroup', groupvalues, { headers: this.head}).map(response => response.json());
  }

  UpdateSubGroup1(groupvalues:any) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/updatesubgroup1', groupvalues, { headers: this.head}).map(response => response.json());
  }

  UpdateSubGroup2(groupvalues:any) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/updatesubgroup2', groupvalues, { headers: this.head}).map(response => response.json());
  }

}
