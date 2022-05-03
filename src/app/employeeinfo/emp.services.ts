import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class EmployeeService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  handleError: any;
  headers: any;
  //Add Employee
  private createEmp = this.baseResUrl+'/empcreateRecord';
  private imagesave = this.baseResUrl+'/uploademployeephoto';
  private signsave = this.baseResUrl+'/saveemployeesignimage';
  private getCompanies = this.baseResUrl+'/getEmpCompany';
  private getBranches = this.baseResUrl+'/getEmpBranch';
  private getShops = this.baseResUrl+'/getEmpShops';
  private getWarehouses = this.baseResUrl+'/getEmpWareHouses';
  private getHospitals = this.baseResUrl+'/getEmpHospitals';
  private getFirm = this.baseResUrl+'/getEmpFirm';
  private isEmployeeExistUrl = this.baseResUrl+'/isEmployeeExist';


  private editUrl = this.baseResUrl+'/editEmployee';


  //utility
  private getCompanyById = this.baseResUrl+'/getUtilityCompany';
  private getBranchById = this.baseResUrl+"/getUtilityBranch";
  //
  private getusershopurl = this.baseResUrl+'/getusershop';
  private getuserwarehousesurl = this.baseResUrl+'/getuserwarehouse';
  private getuserhospitalurl = this.baseResUrl+'/getuserhospital';
  //Edit Employee

  private updateEmp = this.baseResUrl+'/updateEmployee';
  private getEmpBranchById = this.baseResUrl+'/getEmpBranchById';
  private getEmpCompanyById = this.baseResUrl+'/getEmpCompanyById';
  private getEditEmpFirmByID = this.baseResUrl+'/getEditEmpFirm';
  private getEmpLocname = this.baseResUrl+'/getEmpLocationid';
  private getEmpShopById = this.baseResUrl+'/getEmpShopById';
  private getEmpWareById = this.baseResUrl+'/getEmpWarehouseById';
  private getEmpHospById = this.baseResUrl+'/getEmpHospitalById';
  //private getBranchById = '/api/getBranchById';
  private editBranchUrl = this.baseResUrl+'/geteditBranch';
  private isEmployeeUpdateExistUrl = this.baseResUrl+'/isEmployeeUpdateExist';


  //View Employee

  private viewUrl = this.baseResUrl+'/viewEmployee';
  private viewUrlbyid = this.baseResUrl+'/viewEmployeebyid';
  private deleteUrl = this.baseResUrl+'/deleteEmployee';

  constructor(private http: Http) { }
  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  getCompany() {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getCompanies, { headers: this.head }).map(response => response.json());
  }


  getCompanyByLogin(id: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getCompanyById + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getEmpBranch(id: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getEmpBranchById + '/' + id, { headers: this.head }).map(response => response.json());
  }


  // Get Branch By Company
  getBranche(compid: number) {
    this.headertoken();
    return this.http.get(this.getBranches + '/' + compid, { headers: this.head }).map(response => response.json());
  }

  //
  getUserShop(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getusershopurl + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getUserWareHouse(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getuserwarehousesurl + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getUserHospital(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getuserhospitalurl + '/' + id, { headers: this.head }).map(response => response.json());
  }


  //
  getShop(branchid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getShops + '/' + branchid, { headers: this.head }).map(response => response.json());
  }

  getWareHouse(branchid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getWarehouses + '/' + branchid, { headers: this.head }).map(response => response.json());
  }

  getHospital(branchid: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getHospitals + '/' + branchid, { headers: this.head }).map(response => response.json());
  }

  getEditEmpFirm(id: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getEditEmpFirmByID + '/' + id, { headers: this.head }).map(response => response.json());
  }


  getEmpFirm(loc: number,  locref) {
    //Get States 
    this.headertoken();
    return this.http.get(this.getFirm + '/' + loc + '/' + locref, { headers: this.head }).map(response => response.json());
  }



  isExistEmployee(empname: any) {
    //Get States 
    this.headertoken();
    return this.http.get(this.isEmployeeExistUrl + '/' + empname, { headers: this.head }).map(response => response.json());
  }

  createEmployee(employeecreate: String) {
    this.headertoken();
    return this.http.post(this.createEmp, employeecreate,{ headers: this.head }).map((res: Response) => {
      return { "res": res.json() }
    })
  }

  saveimage(image) {
    let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.post(this.imagesave, image, { headers: imghead }).map((res: Response) => res.json());
  }


  savesignimage(image) {
    let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.post(this.signsave, image, { headers: imghead }).map((res: Response) => res.json() );
  }


  //Employee Edit

  updateEmployee(employeeUpdate: String) {
  this.headertoken();
  return this.http.post(this.updateEmp, employeeUpdate,{ headers: this.head }).map((res: Response) => {
    return { "res": res.json() }
  })
    // this.http.post(this.updateEmp, employeeUpdate, { headers: this.head }).map(response => response.json())
    //   .subscribe(
    //     () => { console.log(employeeUpdate) }
    //   );
  }


  employeeEdit(id: number) {
    this.headertoken();
    return this.http.get(this.editUrl + '/' + id, { headers: this.head })
      .map((res: Response) => res.json());
  }

  getEmpCompany(id: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getEmpCompanyById + '/' + id, { headers: this.head }).map(response => response.json());
  }


  getLocname(id: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getEmpLocname + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getEmpShop(id: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getEmpShopById + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getEmpWare(id: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getEmpWareById + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getEmpHosp(id: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getEmpHospById + '/' + id, { headers: this.head }).map(response => response.json());
  }


  getBranch(id: number) {
    //Get Companies
    this.headertoken();
    return this.http.get(this.getBranches + '/' + id, { headers: this.head }).map(response => response.json());
  }

  isEditExistEmployee(empname: any, empid: number, cmpid: any, brnid: any, locid: number, locrefname: number) {
    //Get States 
    this.headertoken();
    return this.http.get(this.isEmployeeUpdateExistUrl + '/' + empname + '/' + empid + '/' + cmpid + '/' + brnid + '/' + locid + '/' + locrefname,
    { headers: this.head }).map(response => response.json());
  }

  //View Employee
  employeeView() {
    this.headertoken();
    return this.http.get(this.viewUrl,{ headers: this.head }).map(response => response.json());
  }

  employeeViewByID(compid: any, branchid: any, locname: any, locrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/viewEmployee` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }


  employeeDelete(empId: number) {
    this.headertoken();
    return this.http.get(this.deleteUrl + '/' + empId, { headers: this.head }).map(response => response.json());
  }


  savePresImage(serobj: FormData) {
    let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.post(this.createEmp + `saveSIPresImage`, serobj, { headers: imghead })
      .map((res: Response) => res.text());

  }



  getDepartment(companyid, branchrefid, locname, locrefid) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/dropdownDept` + '/' + companyid + '/' + branchrefid + '/' + locname + '/' + locrefid,
    { headers: this.head }).map(response => response.json());
  }


  getSubDepartment(companyid, branchrefid, locname, locrefid, deprefid) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/dropdownsubDept` + '/' + companyid + '/' + branchrefid + '/' + locname + '/' + locrefid + '/' + deprefid,
    { headers: this.head }).map(response => response.json());
  }


  getDivision(companyid, branchrefid, locname, locrefid, deptrefid, subrefid) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/dropdowndivision` + '/' + companyid + '/' + branchrefid + '/' + 
    locname + '/' + locrefid + '/' + deptrefid  + '/' + subrefid,{ headers: this.head }).map(response => response.json());
  }


  getSubDivision(companyid, branchrefid, locname, locrefid, deptrefid, subrefid, divisionrefid) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/dropdownsubdivision` + '/' + companyid + '/' + branchrefid + '/' + locname + '/' + locrefid + '/' + deptrefid + '/' + subrefid + '/' + divisionrefid,
    { headers: this.head }).map(response => response.json());
  }

  isExist(companyid, branchrefid, locname, locrefid, name) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/isExistdept` + '/' + companyid + '/' + branchrefid + '/' + locname + '/' + locrefid + '/' + name, { headers: this.head }).map(response => response.json());

  }

  isExist1(companyid, branchrefid, locname, locrefid, name) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/isExistsubdept` + '/' + companyid + '/' + branchrefid + '/' + locname + '/' + locrefid + '/' + name, { headers: this.head }).map(response => response.json());

  }

  isExist2(companyid, branchrefid, locname, locrefid, name) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/isExistdivision` + '/' + companyid + '/' + branchrefid + '/' + locname + '/' + locrefid + '/' + name, { headers: this.head }).map(response => response.json());

  }

  isExist3(companyid, branchrefid, locname, locrefid, name) {
    this.headertoken();
    return this.http.get(this.baseResUrl+`/isExistsubdivision` + '/' + companyid + '/' + branchrefid + '/' + locname + '/' + locrefid + '/' + name, { headers: this.head }).map(response => response.json());

  }

  saveDepartment(serobj: string) {
    this.headertoken();
    //return this.http.get(this.saveGenericnameURL + '/' + serobj).map(res => res.json());
    return this.http.post(this.baseResUrl+`/CreatedeptRec`, serobj, { headers: this.head }).map((res: Response) => res.json());

  }


  saveSubDepartment(serobj: string) {

    this.headertoken();
    //return this.http.get(this.saveGenericnameURL + '/' + serobj).map(res => res.json());
    return this.http.post(this.baseResUrl+`/CreateSubdeptRec`, serobj, { headers: this.head }).map((res: Response) => res.json());

  }


  saveDivision(serobj: string) {

    this.headertoken();
    //return this.http.get(this.saveGenericnameURL + '/' + serobj).map(res => res.json());
    return this.http.post(this.baseResUrl+`/CreatedivRec`, serobj, { headers: this.head }).map((res: Response) => res.json());

  }



  saveSubDivision(serobj: string) {
    this.headertoken();
    //return this.http.get(this.saveGenericnameURL + '/' + serobj).map(res => res.json());
    return this.http.post(this.baseResUrl+`/CreatesubdivRec`, serobj, { headers: this.head }).map((res: Response) => res.json());

  }





}
