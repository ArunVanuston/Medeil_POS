import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class DistributorViewService {


  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  

  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }


  private URL = this.baseResUrl+'/dist/';



  patientView(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `viewDistributors`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
  }


  patientDelete(serobj: string) {
    this.headertoken();
    return this.http.post(this.URL + `deleteDistributor`, serobj, {headers: this.head})
      .map((res: Response) => res.json());
  }

  deleteDistributor(serobj: string) {
    this.headertoken();
                       return this.http.post( this.URL+`deleteDistributor`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
      }
    

}
