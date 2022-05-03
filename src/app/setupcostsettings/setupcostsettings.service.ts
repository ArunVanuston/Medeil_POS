import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { environment } from "environments/environment.prod";

@Injectable()
export class SetupcostService {

  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  private fetchcostjrnl = this.baseResUrl + '/fetchsetupcostjrnl';
  private fetchcost = this.baseResUrl + '/fetchsetupcostvalue';
  private setupcostsettings = this.baseResUrl + '/saveSetupcost';
  private setupjournal = this.baseResUrl + '/saveSetupcostJournal';
  constructor(private http: Http) { }
  head;
  headertoken() {
    this.head = new Headers({
      'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
      'Content-Type': 'application/json'
    });
  }

  fetchSetupcost(cmpid: any, brnchid: any, lname: any, lrefid: any) {
    this.headertoken();
    return this.http.get(this.fetchcost + '/' + cmpid + '/' + brnchid + '/' + lname + '/' + lrefid, { headers: this.head }).map((res: Response) => res.json());
  }

  fetchSetupcostjrnl(cmpid: any, brnchid: any, lname: any, lrefid: any) {
    this.headertoken();
    return this.http.get(this.fetchcostjrnl + '/' + cmpid + '/' + brnchid + '/' + lname + '/' + lrefid, { headers: this.head }).map((res: Response) => res.json());
  }

  SaveSetupcost(data) {
    this.headertoken();
    return this.http.post(this.setupcostsettings, data, { headers: this.head }).map((res: Response) => res.json());
  }

  saveSetcostJournal(data: string) {
    this.headertoken();
    return this.http.post(this.setupjournal, data, { headers: this.head }).map((res: Response) => res.json());
  }

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