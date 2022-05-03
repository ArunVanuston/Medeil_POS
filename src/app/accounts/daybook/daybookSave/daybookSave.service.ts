import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class daybookSaveService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  private URL = this.baseResUrl + '/accounts/';


  constructor(private http: Http) { }

  head: any;
  headertoken() {
    this.head = new Headers({
      'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
      'Content-Type': 'application/json'
    });
  }

  viewdayBook(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewdayBook`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  openingbal(cid: any, bid: any, lname: any, lrefid: any, date: any) {
    this.headertoken();
    return this.http.get(this.URL + 'Openingbal'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+date, { headers: this.head })
      .map((res: Response) => res.json());
  }


}
