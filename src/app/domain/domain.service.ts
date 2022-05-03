import { Domain } from './domain';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class DomainService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private productUrl = this.baseResUrl+'/domainProduct'; 
  private chkproUrl = this.baseResUrl+'/checkExistproduct'; 
  private domainlisturl = this.baseResUrl+'/get-domain-by-country-and-product'

  constructor(private http: Http) {}

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  getdomain(): Promise<any> {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/domainlists',{ headers: this.head })
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  
  savedomain(data: String) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/savedomains', JSON.stringify(data), {headers : this.head}).map(res => res.json());
  }
  
  

  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, { headers: this.head }).map(res=> res.json()); 

  }



  getproduct(id: number) {
    this.headertoken();
     const url = `${this.productUrl}/${id}`;
     return this.http.get(url, { headers: this.head }).map(response => response.json());
  }

  getdomainlist(cid: number,pid: number) {
    this.headertoken();
     const url = `${this.domainlisturl}/${cid}/${pid}`;
     return this.http.get(url, { headers: this.head }).map(response => response.json());
  }
  
  getdomaincountry(): Promise<any> {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/domain-country-dropdown',{ headers: this.head })
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
 
  checkProduct(cid:any,pid:any,dname:any)
  {
    this.headertoken();
    return this.http.get(this.chkproUrl+'/'+cid+'/'+pid+'/'+dname, { headers: this.head }).map(res=>res.json()).catch(this.handleError);;
  }
  private handleError(error: any): Promise<any> {
    console.error('Error', error); 
    return Promise.reject(error.message || error);
  }
}
