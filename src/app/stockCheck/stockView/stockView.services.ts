import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class stockViewService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private viewUrl = this.baseResUrl+'/getstockcheckinginfo';
  private superviewurl=this.baseResUrl+"/supergetstockcheckinginfo";
  constructor(private http: Http) {

  }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }

  superAdminViewStock() {
    this.headertoken();
    return this.http.get(this.superviewurl,{headers: this.head}).map(response => response.json());
  }


  viewStock(compid:any, brnchid:any, locname:any, locrefid:any) {
    this.headertoken();
      // alert("comp"+compid+"brnch"+brnchid+"loc"+locname+"locref"+locrefid);
    return this.http.get(this.viewUrl + "/" + compid + "/" + brnchid + "/" + locname+ "/" +locrefid,{headers: this.head}).map(response => response.json());
  }

}
