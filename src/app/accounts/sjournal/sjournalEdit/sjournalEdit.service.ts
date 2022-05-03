import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';
@Injectable()
export class sjournalEditService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private    URL=this.baseResUrl+'/sjournal/';
  constructor(private http: Http) {  }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
  
         saveSjournal(myObj: string) {
          this.headertoken();
        return this.http
          .post(this.URL+`updateSJournal`, myObj, { headers: this.head }).map((res: Response) => res.json());
            }
            
             viewSjournalNo(serobj: string) {
              this.headertoken();
             return this.http.post( this.URL+`viewSjournalNo`, serobj, { headers: this.head })
            .map((res: Response) => res.json());
               }
              
        
               viewSjournal(serobj: string   ) {
              this.headertoken();
          return this.http.post( this.URL+`viewSjournal`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }
       
              viewSjournalAll(serobj: string) {
                this.headertoken();
                     return this.http.post( this.URL+`viewSjournalAll`, serobj, { headers: this.head })
                .map((res: Response) => res.json());
              }
  
              
              
  deleteSjournal(serobj: string   ) {
             this.headertoken();
          return this.http.post( this.URL+`deleteSjournal`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }
}
