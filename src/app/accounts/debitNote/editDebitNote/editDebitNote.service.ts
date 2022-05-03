import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';
@Injectable()

export class editDebitNoteService {
     baseUrl: string = environment.backend.baseURL;
     baseResUrl: string = environment.backend.baseResUrl;
    
     private URL = this.baseResUrl+'/drnote/';
    
     constructor(private http: Http) {  }

     head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

     saveDebitNote(myObj: string) {
          this.headertoken();
          return this.http
               .post(this.URL + `updateDebitNote`, myObj, { headers: this.head }).map((res: Response) => res.json());
     }

     viewDebitNoteNo(serobj: string) {
          this.headertoken();
          return this.http.post(this.URL + `viewDebitNoteNo`, serobj, { headers: this.head })
               .map((res: Response) => res.json());
     }

     viewDebitNote(serobj: string) {
          this.headertoken();
          return this.http.post(this.URL + `viewDebitNote`, serobj, { headers: this.head })
               .map((res: Response) => res.json());
     }

     viewDebitNoteAll(serobj: string) {
          this.headertoken();
          return this.http.post(this.URL + `viewDebitNoteAll`, serobj, { headers: this.head })
               .map((res: Response) => res.json());
     }

     deleteDebitNote(serobj: string) {
          this.headertoken();
          return this.http.post(this.URL + `deleteDebitNote`, serobj, { headers: this.head })
               .map((res: Response) => res.json());
     }

     
}
