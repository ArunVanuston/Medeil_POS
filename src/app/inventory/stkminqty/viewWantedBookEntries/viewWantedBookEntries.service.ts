import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class ViewWantedBookService {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private URL = this.baseResUrl+'/stkmin/';
  private URL1 = this.baseResUrl+'/slsinv/';

  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }


  viewMinWantedStockRecord(serobj: any) {
    this.headertoken();
    return this.http.post(this.URL + `viewStk1MinQtyAll`, serobj, { headers: this.head }).map((res: Response) => res.json()).catch(this.handleError);
  }


  
  viewNewWantedStockRecord(serobj: any) {
   this.headertoken();
    return this.http.post(this.URL1 + `viewStk1NewQtyAll`, serobj, { headers: this.head }).map((res: Response) => res.json()).catch(this.handleError);
  }

}