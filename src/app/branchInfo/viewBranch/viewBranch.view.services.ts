import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {FormGroup} from "@angular/forms";
import { environment } from 'environments/environment.prod';
@Injectable()
export class branchviewService {
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private viewbranchUrl = this.baseResUrl+'/viewBranchRecord';
  private deletebranchUrl = this.baseResUrl+'/deletebranchRecord';
  
  constructor(private http: Http) {  }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  viewBranch(sendpage: any, size: any) {  
    this.headertoken();
    return this.http.get(this.viewbranchUrl + '/' + sendpage + '/' + size, { headers: this.head }).map(response => response.json());
  }

  deleteBranch(id:number)
  {
    this.headertoken();
    return this.http.get(this.deletebranchUrl+ '/' + id, { headers: this.head }).map(response => response.json());; 
  }
  
}
