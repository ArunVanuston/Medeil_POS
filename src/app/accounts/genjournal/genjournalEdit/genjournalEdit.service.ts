import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class genjournalEditService {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private URL = this.baseResUrl+'/genjrnl/';

  constructor(private http: Http) {  }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }


  saveGenJournal(myObj: string) {
    this.headertoken();
    return this.http
      .post(this.URL + `updateGenJournal`, myObj, { headers: this.head }).map((res: Response) => res.json());
  }


  viewDebitNoteNo(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewDebitNoteNo`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  viewGenJournal(serobj: string) {
    this.headertoken();
 return this.http.post(this.URL + `viewGenJournal`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }


  viewGenJournalAll(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewGenJournalAll`, serobj, { headers: this.head } )
      .map((res: Response) => res.json());
  }


  deleteGenJournal(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `deleteGenJournal`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
  }



}
