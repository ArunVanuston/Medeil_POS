import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
import { environment } from 'environments/environment.prod';
@Injectable()
export class shopviewService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  handleError: any;
  private viewshopUrl = this.baseResUrl+'/viewshopRecord';
  private deleteshopUrl = this.baseResUrl+'/deleteshopRecord';
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }

  viewShop(cid: any, bid:any,locname:any,locrefid:any) {
    this.headertoken();
    return this.http.get(this.viewshopUrl + '/' + cid + '/' + bid + '/' +locname + '/' + locrefid,{headers: this.head}).map((res: Response) => {
      return res.json()});
  }

  deleteShop(id: number) {
    this.headertoken();
    return this.http.get(this.deleteshopUrl + '/' + id,{headers: this.head}).map(response => response.json());
  }

}
