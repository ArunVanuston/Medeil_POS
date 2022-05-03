import { Addmodule } from './addmodule';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment.prod';
@Injectable()
export class DataModules {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  private addmoduleUrl = this.baseResUrl+'/addmodule';  // URL to web API  get method
  private productUrl = this.baseResUrl+'/modulesubdomainproduct';
  private domainUrl = this.baseResUrl+'/domainbyid';
  private subdomainUrl = this.baseResUrl+'/subdomainid';
  private modulefolderurl = this.baseResUrl+'/modules-folder-dropdown';
  private moduleurl = this.baseResUrl+'/modules-names-dropdown';
  private subproductUrl = this.baseResUrl+'/productid';
  private sdomainUrl = this.baseResUrl+'/domainname';
  private submdomainUrl = this.baseResUrl+'/subdomainname';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }

    // Get modulesid country
  getmodulescountry(): Promise<any> {
  this.headertoken();
    return this.http.get(this.baseResUrl+'/modulesid',{headers: this.head})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  // get product List
 getproduct(countryname: number) {
  this.headertoken();
     const url = `${this.productUrl}/${countryname}`;
     return this.http.get(url,{headers: this.head}).map(response => response.json());
 }


  // Get all modules
  getModules(): Promise<Addmodule[]> {
    this.headertoken();
    return this.http.get(this.addmoduleUrl,{headers: this.head})
      .toPromise()
      .then(response => response.json() as Addmodule[])
      .catch(this.handleError);
  }

// create module

create(modules: any){
  this.headertoken();
  return this.http.post(this.baseResUrl+'/postaddmodule', modules, {headers: this.head}).map(res=> res.json()); 
}
  

// create sub module
subcreate(submodules: Addmodule): Promise<Addmodule> {     // post method
  this.headertoken();
    return this.http
      .post(this.baseResUrl+'/postaddsubmodule', JSON.stringify(submodules), {headers : this.head})
      .toPromise()
      .then(res => res.json() as Addmodule)
      .catch(this.handleError);
  }



// view module
getviewmodule(): Promise<any> {
  this.headertoken();
    return this.http.get(this.baseResUrl+'/moduledomainlist',{headers: this.head})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

//delete module
delmodule(mid): Promise<any> {
  this.headertoken();
  //return this.http.get(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map(res=> res.json()); 
    return this.http.get(this.baseResUrl+'/delete-module/'+mid,{headers: this.head})
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

  deviceDetails(serobj: any){
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map(res=> res.json()); 
  }

// domain access
  getdomainid(ct1: number,ct2: number) {
    this.headertoken();
    const url = `${this.domainUrl}/${ct1}/${ct2}`;
     return this.http.get(url,{headers: this.head}).map(response => response.json());
  }

// subdomain access
   getsubdomainid(ct1: number,ct2: number,ct3: number) {
    this.headertoken();
   const url = `${this.subdomainUrl}/${ct1}/${ct2}/${ct3}`;
     return this.http.get(url,{headers: this.head}).map(response => response.json());
   }

   //module-folder
   getmodulefolder(ct1: number,ct2: number,ct3: number, ct4:number) {
    this.headertoken();
     const url = `${this.modulefolderurl}/${ct1}/${ct2}/${ct3}/${ct4}`;
     return this.http.get(url,{headers: this.head}).map(response => response.json());
   }


    //module-name
    getmodulename(ct1: number,ct2: number,ct3: number, ct4:number, ct5:any) {
      this.headertoken();
       const url = `${this.moduleurl}/${ct1}/${ct2}/${ct3}/${ct4}/${ct5}`;
       return this.http.get(url,{headers: this.head}).map(response => response.json());
     }
  

  delete(id: number): Promise<void> {
    this.headertoken();
    const url = `${this.addmoduleUrl}/${id}`;
    return this.http.delete(url, {headers: this.head})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
