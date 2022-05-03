import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { environment } from "environments/environment.prod";
import { Observable } from "rxjs";

@Injectable()
export class practiceService {
    baseUrl: string = environment.backend.baseURL;
    baseResUrl: string = environment.backend.baseResUrl
    private URL = this.baseResUrl + '/slsinv/';
    constructor(private http: Http) { }

    head: any;
    headertoken() {
        this.head = new Headers({
            'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
            'Content-Type': 'application/json'
        });
    }
    getdoctors(data: any) {
        this.headertoken();
        return this.http.post(this.URL + `viewSIDoctors`, data, { headers: this.head }).map((res: Response) => res.json())
            .catch((error: any) => {
                return Observable.throw(error.json());
            });
    }

    //Customer wise APi's
    getCustomer(compid: number, brnchid: number, locname: number, locrefid: number) {
        this.headertoken();
        return this.http.get(this.baseResUrl + '/accounts/ViewCustlist' + '/' + compid + '/' + brnchid + '/' + locname + '/' + locrefid,
            { headers: this.head }).map(response => response.json());
    }

    searchdrug(data: any) {  // for drug product search
        this.headertoken();
        return this.http.post(this.baseResUrl + `/slsinv/viewSIProductNames`, data, { headers: this.head }).map((res: Response) => res.json())
            .catch((error: any) => {
                return Observable.throw(error.json());
            });
    }

    savePracticemgmt(data: any){
        this.headertoken(); 
        return this.http.post(this.baseResUrl+'/createPracticemgmt',data,{headers: this.head}).map((res: Response) => res.json());
    }

    savePracticemgmtprod(data: any){
        this.headertoken(); 
        return this.http.post(this.baseResUrl+'/createPracticemgmtprod',data,{headers: this.head}).map((res: Response) => res.json());
    }

    // View Practise Desingraja
    getpractise(comid:any,branchid:any,locname:any,locrefid:any){
        this.headertoken();
        return this.http.get(this.baseResUrl +'/Viewpractise' + '/' +comid + '/' +branchid + '/' + locname + '/' + locrefid,{headers:this.head}).map(Response=>Response.json());
    }

    deletepractise(id:any,comid:any,locrefid:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/deletepractise' + '/' + id + '/' + comid + '/' + locrefid,{headers:this.head}).map(Response=>Response.json());
    }
    
    //Edit Practise Management Raja

    getpractisemng(id:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getpractisemng' + '/' + id,{headers:this.head}).map(Response=>Response.json());
    }

    getpractisemngproduct(id:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/getpractisemngprod' + '/' + id,{headers:this.head}).map(Response=>Response.json());
    }

    delproduct(id:any,prodid:any){
        this.headertoken();
        return this.http.get(this.baseResUrl+'/deleteproduct' + '/' + id + '/' + prodid,{headers:this.head}).map(Response => Response.json());
    }

    saveeditform(data:any){
        this.headertoken();
        return this.http.post(this.baseResUrl+'/updatepractse',data,{headers:this.head}).map(Response=>Response.json());
    }

    updatepresproduct(data:any){
        this.headertoken();
        return this.http.post(this.baseResUrl+'/updatepractseprod',data,{headers:this.head}).map(Response=>Response.json());
    }


}
