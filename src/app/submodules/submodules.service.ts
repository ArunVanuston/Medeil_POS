import { Addsubmodulevalues } from './submodules';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class DataSubmodules {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  addsubmoduleUrl = this.baseResUrl+'/addsubmodule';
  // product url
  submoduleproductUrl = this.baseResUrl+'/domainlistsub'; // product
  submoduledomainUrl = this.baseResUrl+'/domainnamesub'; // domain
  submodulesubdomainUrl = this.baseResUrl+'/subdomainname'; // subdomain
  viewsubmoduleUrl = this.baseResUrl+'/submoduleslist'; // view
  submodulemodulesUrl = this.baseResUrl+'/submodulesname';
  submodulesubmodulesUrl = this.baseResUrl+'/submodules-names-dropdown';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }

  subcreate(value: string) {
  this.headertoken();
    return this.http.post(this.baseResUrl+'/postsubmodule', value, {headers: this.head}).map((res: Response) => res.json());
  }


  deviceDetails(serobj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/User/saveUserActivity', serobj, {headers: this.head}).map(res => res.json());

  }

  // sub module get
  getsubModules(): Promise<Addsubmodulevalues[]> {
    this.headertoken();
    return this.http.get(this.addsubmoduleUrl,{headers: this.head})
      .toPromise()
      .then(response => response.json() as Addsubmodulevalues[])
      .catch(this.handleError);
  }
  // view sub modules
  getviewModules() {
    this.headertoken();
    return this.http.get(this.viewsubmoduleUrl,{headers: this.head})
      .map(response => response.json());
  }

  //delet sub Module
   delsubmodules(submid) {
    this.headertoken();
    return this.http.get(this.baseResUrl+"/delete-submodule/"+submid,{headers: this.head})
      .map(response => response.json());
  }

  // sub module country
  getmodulescountry(): Promise<any> {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/submoduleid',{headers: this.head})  // country access for submodules
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  // sub module product
  getmoduleproductid(productname: number) {
    this.headertoken();

    const url = `${this.submoduleproductUrl}/${productname}`;
    return this.http.get(url,{headers: this.head}).map(response => response.json());
  }
  // sub module domain
  getmoduledomainid(ct1: number, ct2: number) {
    this.headertoken();

    const url = `${this.submoduledomainUrl}/${ct1}/${ct2}`;
    return this.http.get(url,{headers: this.head}).map(response => response.json());
  }
  // sub module subdomain
  getsubmodulesubdomain(ct1: number, ct2: number, ct3: number) {

    this.headertoken();
    const url = `${this.submodulesubdomainUrl}/${ct1}/${ct2}/${ct3}`;
    return this.http.get(url,{headers: this.head}).map(response => response.json());
  }
  // modules by subdomain
  getsubmodulemodules(ct1: number, ct2: number, ct3: number, ct4: number) {
    this.headertoken();
    const url = `${this.submodulemodulesUrl}/${ct1}/${ct2}/${ct3}/${ct4}`;
    return this.http.get(url,{headers: this.head}).map(response => response.json());
  }

  getsubmodulesubmodules(ct1: number, ct2: number, ct3: number, ct4: number, ct5:number) {
    this.headertoken();
    const url = `${this.submodulesubmodulesUrl}/${ct1}/${ct2}/${ct3}/${ct4}/${ct5}`;
    return this.http.get(url,{headers: this.head}).map(response => response.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
