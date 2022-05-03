import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';


@Injectable()
export class ModulerankService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
    private  getfolderURL=this.baseResUrl+'/getModulelabels';
    private  getmoduleURL=this.baseResUrl+'/selectmodulenames';
    private  saverankURL=this.baseResUrl+'/updateuserlabelmoduleranking';

    constructor(private http: Http) {}
    
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

      getfolders(data) {
        this.headertoken();
        return this.http.post(this.getfolderURL,data, {headers: this.head} ).map(response => response.json());
       
      }

      getmodules(id, foldername) {
        this.headertoken();
        return this.http.get(this.getmoduleURL + '/' + id +  '/' + foldername, {headers: this.head} ).map(response => response.json());
      }

      saverank(data) {
        this.headertoken();
        return this.http.post(this.saverankURL, data, {headers: this.head} ).map(response => response.json());
        
      }

  
}
