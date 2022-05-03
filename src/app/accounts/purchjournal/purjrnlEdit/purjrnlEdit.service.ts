import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class purjrnlEditService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private    URL=this.baseResUrl+'/purcjrnl/';

  constructor(private http: Http) { }
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
  
  
      savePurJrnlNo(myObj: string) {
        this.headertoken();
        return this.http
          .post( this.URL+`updatePrcJournal` , myObj, { headers: this.head }).map((res: Response) => res.json());
      }



      


             viewPurJrnlNo(serobj: string) {
              this.headertoken();
             return this.http.post( this.URL+`viewPurJrnlNo`  ,   serobj, { headers: this.head })
            .map((res: Response) => res.json());
               }
              
        
               viewPurJrnl(serobj: string   ) {
              this.headertoken();
          return this.http.post( this.URL+`viewPurJrnl`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }

       


              viewPurJrnlAll(serobj: string) {
                this.headertoken();
                     return this.http.post( this.URL+`viewPurJrnlAll`, serobj, { headers: this.head })
                .map((res: Response) => res.json());
              }
  

               deletePurJrnl(serobj: string   ) {
              this.headertoken();
          return this.http.post( this.URL+`deletePurJrnl`, serobj, { headers: this.head })
                   .map((res: Response) => res.json());
              }



}
