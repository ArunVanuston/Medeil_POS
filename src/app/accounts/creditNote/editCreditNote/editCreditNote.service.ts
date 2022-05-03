import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';
@Injectable()
export class editCreditNoteService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private URL = this.baseResUrl+'/crnote/';
 
  constructor(private http: Http) {  }

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

  saveCreditNote(myObj: string) {
    this.headertoken();
    return this.http
      .post(this.URL + `updateCreditNote`, myObj, { headers: this.head }).map((res: Response) => res.json());
  }

  viewCreditNoteNo(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewCreditNoteNo`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  viewCreditNote(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewCreditNote`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  viewCreditNoteAll(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewCreditNoteAll`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  deleteCreditNote(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `deleteCreditNote`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }

  
}
