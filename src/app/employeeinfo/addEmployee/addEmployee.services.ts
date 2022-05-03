import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class addEmployeeService{
  handleError: any;
  headers: any;
  private empUrl = 'api/empcreateRecord';
  private getCompanies = 'api/getEmpCompany';
  private getBranches = 'api/getEmpBranch';
  private getShops = 'api/getEmpShop';
  
 // private header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}





  getDepartment(department: number) {
    return this.http.get('api/dept/CreatedeptRec' + '/' + department).map(response => response.json());
  }




   getCompany() {
    //Get Companies
    return this.http.get(this.getCompanies).map(response => response.json());
   }
   getBranche(compid: number) {
    //Get States 
    return this.http.get(this.getBranches + '/' + compid).map(response => response.json());
   }
   
   getShop(branchid: number) {
    //Get States 
    return this.http.get(this.getShops + '/' + branchid).map(response => response.json());
   }
  createEmployee(employeecreate: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.empUrl, employeecreate, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(employeecreate)}
      );
  }




  

}
