import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class editEmployeeService {


private editUrl='api/editEmployee';
private empUrl='api/updateEmployee';
private getCompanies = 'api/getEmpCompany';
private getBranches = 'api/getEmpBranch';
private getShops = 'api/getEmpShop';

private getEmpCompanyById = 'api/getEmpCompanyById';
private getEmpBranchById = 'api/getEmpBranchById';
private getEmpShopById = 'api/getEmpShopById';
private getBranchById = 'api/getBranchById';
private editBranchUrl = 'api/geteditBranch';

  constructor(private http: Http) {}

 


 updateEmployee(employeeUpdate: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.empUrl, employeeUpdate, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(employeeUpdate)}
      );
  }


  employeeEdit(id: number) {
    return this.http.get(this.editUrl + '/' + id)
      .map((res: Response) => res.json());
  }
  
  getEmpCompany(id: number) {
    //Get Companies
    return this.http.get(this.getEmpCompanyById+'/'+id).map(response => response.json());
  }

  getEmpBranch(id: number) {
    //Get Companies
    return this.http.get(this.getEmpBranchById+'/'+id).map(response => response.json());
  }
  getEmpShop(id: number) {
    //Get Companies
    return this.http.get(this.getEmpShopById+'/'+id).map(response => response.json());
  }

  getCompany() {
    //Get Companies
    return this.http.get(this.getCompanies).map(response => response.json());
  }
  getBranch(id: number) {
    //Get Companies
    return this.http.get(this.getBranches+'/'+id).map(response => response.json());
  }
  getShop(id: number) {
    //Get Companies
    return this.http.get(this.getShops+'/'+id).map(response => response.json());
  }
  

  countryView() {
    return this.http.get(`http://localhost:4200/spring-boot/viewCountry`)
      .map((res: Response) => res.json());
  }

  stateView(articleId: string) {
    return this.http.get(`http://localhost:4200/spring-boot/viewState` + '/' + articleId)
      .map((res: Response) => res.json());
  }




}
