import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs';
import { environment } from "environments/environment.prod";
@Injectable()
export class HsncodeService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private pURl = this.baseResUrl+'/stockproductdata';
  constructor(private http: Http) { }
    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
  
      } 
    getProduct(searchValue: string, cid: any, bid: any, locrefid: any, locname: any) {
      this.headertoken();
      return this.http.get(this.pURl + '/' + searchValue + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname,{headers: this.head}).map(res => res.json());
    }
  getcoutry(){
    this.headertoken();
    return this.http.get(this.baseResUrl+`/getcountry`,{ headers: this.head }).map(Response => Response.json());
  }

  getmdesc(){
    this.headertoken();
    return this.http.get(this.baseResUrl+`/getmdesc`,{ headers: this.head }).map(Response => Response.json());

  }
  getidesc(mdescid:any,countryid:any):Promise<any>{
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getidesc',{ headers: this.head } + '/' + mdescid + '/' +countryid)
    .toPromise().then(Response => Response.json() as any).catch(this.handleError);

  }

  gethsndesc(mdescid:any):Promise<any>{
    this.headertoken();
    return this.http.get(this.baseResUrl+'/gethsndesc' + '/' + mdescid,{ headers: this.head })
    .toPromise().then(Response => Response.json() as any).catch(this.handleError);

  }
  gettaxmaster(cid:any,bid:any,lrefid:any,lname:any){
    this.headertoken();
    return this.http.get(this.baseResUrl+`/getTaxmaster` + '/' +cid + '/' + bid + '/' + lrefid + '/' + lname,{headers: this.head}).map((res: Response) => res.json())
    .catch((error: any) => {  return Observable.throw(error.json());
      });
  }
  savedata(data:any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/savedata',data,{headers:this.head}).
    map(Response=>Response.json())
    .catch(this.handleError);
  }

  updatehsnproduct(data:any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/updatehsnproduct',data,{headers:this.head}).
    map(Response=>Response.json())
  }

  //**************Error*************/
  private handleError(error: any): Promise<any> {
    console.error('Error', error);
    return Promise.reject(error.message || error);
  }




  //**********AddHsnCode********** */

  savemddata(data:String){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/savemddata',data,{headers:this.head}).map(Response=>Response.json()).catch(this.handleError);

}
// (data:String){
//   return this.http.post('api/saveid',data,{headers:this.headers}).map(Response=>Response.json()).catch(this.handleError);

// }
saveid(data:string){
  // alert(data)
  this.headertoken();
  let head =new Headers({ 'Content-Type': 'application/json'});
  return this.http.post(this.baseResUrl+'/save-hsncode', data, {headers: this.head}).map(Response =>Response.json());
}



savechapter(md:String){
  this.headertoken();
  return this.http.post(this.baseResUrl+'/savemd',md,{headers:this.head}).map(Response =>Response.json());
  
}
// isexist(hsn:any){
//   this.headertoken();
//   return this.http.get(this.baseResUrl+'/isexisthsn' + '/' + hsn ,{headers:this.head}).map(Response =>Response.json());
// }

GetAlerts(language){
  let langurl="/assets/alerts/en.json";
  if(language=='fr'){
    langurl="/assets/alerts/fr.json";
  }else if(language=='ar'){
    langurl="/assets/alerts/ar.json";
  }else if(language=='es'){
    langurl="/assets/alerts/es.json";
  }else if(language=='es'){
    langurl="/assets/alerts/es.json";
  }else{
    langurl="/assets/alerts/en.json";
  }
  return this.http.get(langurl).map(res => res.json());
}

}