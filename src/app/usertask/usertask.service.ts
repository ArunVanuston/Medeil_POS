import { Injectable } from "@angular/core";
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Alert } from "selenium-webdriver";
import { environment } from "environments/environment.prod";


@Injectable()
export class Usertaskservice {



  reviewPeriod(compid: any, branchid: any, locname: any, locrefid: any, period: string) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/reviewPeriod` + '/' + compid + '/'
      + branchid + '/' + locname + '/' + locrefid + '/' + period, { headers: this.head }).map(response => response.json());

  }



  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;

  constructor(private http: Http) { }
  head: any;
  headertoken() {
    this.head = new Headers({
      'Authorization': 'bearer' + sessionStorage.getItem("acctoken"),
      'Content-Type': 'application/json'
    });

  }
  // private taskUrl = 'api/saveTaskAssignment';

  saveGroupTaskAssignment(obj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/saveGroupTaskAssignment`,
      obj, { headers: this.head }).map(response => response.json());

  }


  saveTaskAssignment(obj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/saveTaskAssignment`,
      obj, { headers: this.head }).map(response => response.json());

  }

  saveToDoList(obj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/saveToDoList`,
      obj, { headers: this.head }).map(response => response.json());

  }

  saveSubTask(saveSubTaskArr: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/saveSubTask`,
      saveSubTaskArr, { headers: this.head }).map(response => response.json());

  }

  updateViewIndividualTask(obj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/updateViewIndividualTask`,
      obj, { headers: this.head }).map(response => response.json());

  }



  getData(selobj: string) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/getData`,
      selobj, { headers: this.head }).map(response => response.json());
  }



  deleteAll(deleteAllObj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/deleteAll`,
      deleteAllObj, { headers: this.head }).map(response => response.json());

  }


  deleteOne(deleteOneObj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/deleteOne`,
      deleteOneObj, { headers: this.head }).map(response => response.json());

  }



  getTaskTitle(getTaskTitle: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/getTaskTitle`,
      getTaskTitle, { headers: this.head }).map(response => response.json());
  }



  getEmployeeDrop(getEmployeeDrop: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/getEmployeeDrop`,
      getEmployeeDrop, { headers: this.head }).map(response => response.json());

  }






  // viewUsertask(cid:any, bid:any, lname:any, lrefid:any){

  //     return this.http.get(this.viewhqDamageUrl + '/' + cid + '/' + bid + '/' + lname + '/' + lrefid).map(response => response.json());

  // }



  deviceDetails(serobj: any) {
    this.headertoken();

    return this.http.post('api/User/saveUserActivity', serobj, { headers: this.head }).map(res => res.json());

  }


  getEmpInfo(compid: any, branchid: any, locname: any, locrefid: any, taskId: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/getEmpInfo` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + taskId, { headers: this.head }).map(response => response.json());
  }





  getTaskType(compid: any, branchid: any, locname: any, locrefid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/taskType` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }

  getDept(compid: any, branchid: any, locname: any, locrefid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/dropdownDept` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }


  getTaskPriority(compid: any, branchid: any, locname: any, locrefid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/getTaskPriority` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }

  getTaskStatus(compid: any, branchid: any, locname: any, locrefid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/getTaskStatus` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }


  getTaskCount(compid: any, branchid: any, locname: any, locrefid: any, empid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/getTaskCount` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + empid, { headers: this.head }).map(response => response.json());
  }

  getPriority(compid: any, branchid: any, locname: any, locrefid: any, empid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/getPriority` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + empid, { headers: this.head }).map(response => response.json());
  }

  getEmployee(compid: any, branchid: any, locname: any, locrefid: any, deptrefid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/dropdownemployee` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + deptrefid, { headers: this.head }).map(response => response.json());
  }

  getSubDept(compid: any, branchid: any, locname: any, locrefid: any, depid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/dropdownsubDept` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + depid, { headers: this.head }).map(response => response.json());
  }

  getDivision(compid: any, branchid: any, locname: any, locrefid: any, depid: any, subdeptid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/dropdowndivision` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + depid + '/' + subdeptid, { headers: this.head }).map(response => response.json());
  }
  getSubDivision(compid: any, branchid: any, locname: any, locrefid: any, depid: any, subdeptid: any, divisionid: any) {
    this.headertoken();
    //Get Coutries 
    return this.http.get(this.baseResUrl + `/dropdownsubdivision` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + depid + '/' + subdeptid + '/' + divisionid, { headers: this.head }).map(response => response.json());
  }

  getAssignEmployee(compid: any, branchid: any, locname: any, locrefid: any, subdivisionid: any) {
    this.headertoken();
    //Get getAssignEmployee 
    return this.http.get(this.baseResUrl + `/getAssignEmployee` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + subdivisionid, { headers: this.head }).map(response => response.json());
  }


  getTableValues(obj: any) {


    this.headertoken();
    return this.http.post(this.baseResUrl + `/getTableValues`, obj, { headers: this.head }).map(res => res.json());
  }


  getAssignedBy(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getAssignedBy` + '/' + id, { headers: this.head }).map(res => res.json());

  }



  getAssignedTo(id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getAssignedTo` + '/' + id, { headers: this.head }).map(res => res.json());

  }


  viewUserTask(obj: any) {
    this.headertoken();
    return this.http
      .post(this.baseResUrl + `/viewUserTask`, obj, { headers: this.head }).map((res: Response) => res.json());
  }


  ViewTaskPerformance(obj: string) {
    this.headertoken();
    return this.http
      .post(this.baseResUrl + `/ViewTaskPerformance`, obj, { headers: this.head }).map((res: Response) => res.json());

  }

  viewAssignedTask(obj: any) {
    this.headertoken();
    return this.http
      .post(this.baseResUrl + `/viewAssignedTask`, obj, { headers: this.head }).map((res: Response) => res.json());
  }




  viewPendingTask(obj: any) {
    this.headertoken();
    return this.http
      .post(this.baseResUrl + `/viewPendingTask`, obj, { headers: this.head }).map((res: Response) => res.json());
  }






  getTaskValues(compid: any, branchid: any, locname: any, locrefid: any, id: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getTaskValues` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid + '/' + id, { headers: this.head }).map(response => response.json());
  }


  getTaskComment(compid: any, branchid: any, locname: any, locrefid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl + `/getTaskComment` + '/' + compid + '/' + branchid + '/' + locname + '/' + locrefid, { headers: this.head }).map(response => response.json());
  }


  saveFile(image) {
    let imghead = new Headers({ 'Authorization': 'bearer' + sessionStorage.getItem("acctoken") });
    return this.http.post(this.baseResUrl + `/savetaskdocument`, image, { headers: imghead }).map((res: Response) => res.json());
  }

  saveUserTaskComment(obj: any) {
    this.headertoken();

    return this.http
      .post(this.baseResUrl + `/saveUserTaskComment`, obj, { headers: this.head }).map((res: Response) => res.json());


  }


  saveEmpEvaluation(obj: any) {
    this.headertoken();
    return this.http.post(this.baseResUrl + `/saveEmpEvaluation`,
      obj, { headers: this.head }).map(response => response.json());

  }


}







