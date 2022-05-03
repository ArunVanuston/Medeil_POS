import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class XreportService {


    constructor(private http: Http) {

    }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      }


    xReadOverview(obj: any) {

        this.headertoken();
        return this.http
            .post(`/api/slsinv/x_read_overview
            `, obj, {headers: this.head}).map((res: Response) => res.json());

    }



    xReadSalesBillsDetails(obj: any) {

      this.headertoken();
        return this.http
            .post(`/api/slsinv/x_read_sales_bills_details`, obj, {headers: this.head}).map((res: Response) => res.json());

    }






}