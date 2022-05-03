import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';


@Injectable()
export class FolderrankService {
  baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;
   

    private  getfolderURL=this.baseResUrl+'/getloginuserlabel';
    private  saverankURL=this.baseResUrl+'/updateusermodulelable';

    constructor(private http: Http) {}

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

      getfolders(id: number) {
        this.headertoken();
        return this.http.get(this.getfolderURL+'/'+id, {headers: this.head} ).map(response => response.json());
      }

      saverank(data) {
        this.headertoken();
        return this.http.post(this.saverankURL, data, {headers: this.head} ).map(response => response.json());
      }

  
}
