import { Subdomain } from './subdomain';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()

export class SubdomainService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private domainUrl = this.baseResUrl+'/getdomains'; 
  private subDomainurl=this.baseResUrl+'/subdomainproduct';
  private chksubDomainurl=this.baseResUrl+'/checkSubdomainproduct';
  private saveSubdoURL=this.baseResUrl+'/saveSubdomain';
  private domainlistUrl = this.baseResUrl+'/subDomainlist'; 

  constructor(private http: Http) {}
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }
  
  private handleError(error: any): Promise<any> {
      console.error('Error', error); 
      return Promise.reject(error.message || error);
  }

  getSubdomainlist() {
    this.headertoken();
    return this.http.get(this.domainlistUrl,{headers: this.head}).map(res=>res.json());
  }
  

  saveSubdomain(data: any): any {
    this.headertoken();
    return this.http.post(this.saveSubdoURL, JSON.stringify(data), {headers : this.head}).map(res=>res.json());    
  }
 

  deviceDetails(serobj: any){

    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map(res=> res.json()); 

  }

  
    getdomaincountry(): Promise<any> {
      this.headertoken();
    return this.http.get(this.baseResUrl+'/domain-country-dropdown',{headers: this.head})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  
  getsubdomain() {
    this.headertoken();
     //const url = `${this.subDomainurl}/${id}`;
     return this.http.get(this.baseResUrl+'/subdomain-dropdown',{headers: this.head}).map(response => response.json());
  }
  
  
  getproduct(id: number) {
    this.headertoken();
     const url = `${this.subDomainurl}/${id}`;
     return this.http.get(url,{headers: this.head}).map(response => response.json());
  }
  
  getdomain(countryid: number) {
    this.headertoken();
     const url = `${this.domainUrl}/${countryid}`;
     return this.http.get(url,{headers: this.head}).map(response => response.json());
  }
 
 


  
}
