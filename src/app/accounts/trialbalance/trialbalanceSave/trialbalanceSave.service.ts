import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class trialbalanceSaveService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  private URL = this.baseResUrl + '/accounts/';
  private decsts = this.baseResUrl + '/getdecimalstatus';

  constructor(private http: Http) { }

  head: any;
  headertoken() {
    this.head = new Headers({
      'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
      'Content-Type': 'application/json'
    });
  }


  viewTrialBalance(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewTrialBalance`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  getDecimalsts(compid: number, brnchid: number, locname: number, locrefid: number) {
    this.headertoken();
    return this.http.get(this.decsts + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }

}
