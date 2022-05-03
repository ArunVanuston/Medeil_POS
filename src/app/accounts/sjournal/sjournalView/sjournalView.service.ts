import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class sjournalViewService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  constructor(private http: Http) {  }
  
  private    URL=this.baseResUrl+'/sjournal/';
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
  
  
    viewAll(serobj: string) {
        this.headertoken();
           return this.http.post( this.URL+`viewSjournalAll`, serobj, { headers: this.head })
      .map((res: Response) => res.json());
    }
  

}
