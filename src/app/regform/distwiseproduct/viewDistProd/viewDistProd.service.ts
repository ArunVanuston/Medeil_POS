import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';


@Injectable()
export class viewDistProdService {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  
    private    URL=this.baseResUrl+'/distprod/';


    constructor(private http: Http) {}
    head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }
       
  
      viewDistProdAll(serobj: string ) {
        this.headertoken();
             return this.http.post( this.URL+`viewDistProdAll`, serobj, {headers: this.head})
    .map((res: Response) => res.json());
      }


}
