import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class slsInvViewService  {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  



  constructor(private http: Http) {}
  
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }   
    private    URL=this.baseResUrl+'/slsinv/';
    private deviceurl=this.baseResUrl+'/User/saveUserActivity';
    private deletesicUrl=this.baseResUrl+'/slsinv/deletesalesinvoiceid';
    private reprints=this.baseResUrl+'/slsinv/rebillprint';

      ViewAllSalesInvoice(cid:any,bid:any,lname:any,lrid: any) {
        this.headertoken();
        return this.http.get(this.URL+`viewSalesInvoiceAll`+"/"+cid+"/"+bid+"/"+lname+"/"+lrid,{headers: this.head}).map(response => response.json());
      }

      ViewSIProducts(data:any) {
        this.headertoken();
        return this.http.post(this.URL+`GetSIProducts`,data,{headers: this.head}).map(response => response.json());
      }

      getprintmodel(cid: any, bid: any, lname: any, lrefid: any, formid: any) {
        return this.http.get(this.baseResUrl + '/viewformsprintmodel' + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid + '/' + formid, { headers: this.head }).map(res => res.json());
      }
      
      getadminflag(userid: any) {
        this.headertoken();
        return this.http.get(this.baseResUrl+`/getempadminflag/`+ userid,{headers:this.head}).map(Response=>Response.json()); 
      }

      phcompanyView(cid:any,bid:any,lname:any,lrid: any,pageno:any,size:any) {
        this.headertoken();
        return this.http.get(this.URL+`viewPagingSalesInvoiceAll`+"/"+cid+"/"+bid+"/"+lname+"/"+lrid+"/"+pageno+"/"+size,{headers: this.head}).map(response => response.json());
      }

      searchrecord(cid:any,bid:any,lname:any,lrid: any,searchValue: any,pageno:any,size:any) {
        this.headertoken();
        return this.http.get(this.URL+`searchallsalesinvoice`+"/"+cid+"/"+bid+"/"+lname+"/"+lrid+"/"+searchValue+"/"+pageno+"/"+size,{headers: this.head}).map(response => response.json());
      }

      
      deletesi(id: number) {
        this.headertoken();
        return this.http.get(this.deletesicUrl + '/' + id,{headers: this.head}).map(response => response.json());
      }
      
    reprint(id:any){
        this.headertoken();
        return this.http.get(this.reprints + '/' + id,{headers: this.head}).map(Response => Response.json());
    }

  viewdevicedetails(data) {
    this.headertoken();
               return this.http.post( this.deviceurl, data, {headers: this.head})
    .map((res: Response) => res.json());
  }



}
