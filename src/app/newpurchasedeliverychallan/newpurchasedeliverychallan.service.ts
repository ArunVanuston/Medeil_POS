import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable()
export class NewpurchasedeliverychallanService {
 

    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl;
    private decsts = this.baseResUrl + '/getdecimalstatus';
    constructor(private http: Http) { }
    head: any;
    headertoken() {
        this.head = new Headers({
            'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
            'Content-Type': 'application/json'
        });
    }

    //DesingRaja  New Purchase Delivery Challan
    getpurchaseorder(comid: any, branchid: any, locname: any, locrefid: any) {
        this.headertoken();
        return this.http.get(this.baseResUrl + `/getpono` + '/' + comid + '/' + branchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(Response => Response.json());
    }
    getdist(poid: any) {
        this.headertoken();
        return this.http.get(this.baseResUrl + `/getdistname` + '/' + poid, { headers: this.head }).map(Response => Response.json());

    }

    getpoprod(poid:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+`/getpoproduct` + '/' + poid,{headers:this.head}).map(Response =>Response.json());
    }

    savedcform(data:any){
        this.headertoken();
        return this.http.post(this.baseResUrl+`/savepdc`,data,{headers:this.head}).map(Response =>Response.json());
    }


    saveproduct(serojc:any){
        this.headertoken();
        return this.http.post(this.baseResUrl+`/savepdcproduct`,serojc,{headers:this.head}).map(Response =>Response.json());
    
    }


    //View Purchase Delivery Challan

    viewpdc(comid:any,branchid:any,locname:any,locrefid:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+`/viewpdc`+ '/' + comid + '/' +branchid + '/' + locname +'/'+locrefid,{headers:this.head}).map(Response => Response.json());
    }

    getDecimalsts(compid: number, brnchid: number, locname: number, locrefid: number) {
        this.headertoken();
        return this.http.get(this.decsts + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
      }

      ViewDCProducts(id: any) {
        this.headertoken();
        return this.http.get(this.baseResUrl+`/getDcproducts`+ '/' + id ,{headers:this.head}).map(Response => Response.json());
      }
}