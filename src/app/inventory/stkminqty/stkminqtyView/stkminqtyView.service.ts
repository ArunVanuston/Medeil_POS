import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class stkminqtyViewService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
    private    URL=this.baseResUrl+'/stkmin/';
    private URL1 =this.baseResUrl+'/slsinv/';
    private deviceurl=this.baseResUrl+'/User/saveUserActivity';


  constructor(private http: Http) {}

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

    viewStkMinQtyAll(serobj: string) {
     
        this.headertoken();
        return this.http
          .post(this.URL+`viewStkMinQtyAll`, serobj, { headers: this.head } ).map((res: Response) => res.json());
      }




      viewStkNewQtyAll(serobj:string){
        this.headertoken();
            return this.http
              .post(this.URL1+`viewStkNewQtyAll`, serobj, { headers: this.head } ).map((res: Response) => res.json());
          }


      viewdevicedetails(data){

       this.headertoken();
        return this.http
          .post(this.deviceurl, data, { headers: this.head } )  .map((res: Response) => res.json());
      }





      }






