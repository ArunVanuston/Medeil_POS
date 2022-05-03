import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { FormGroup } from "@angular/forms";
import { environment } from 'environments/environment.prod';
@Injectable()
export class drugviewService {
  handleError: any;
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
  private drugviewUrl = this.baseResUrl+'/viewDruginfo';
  private drugsearchUrl=this.baseResUrl+'/searchdrugitems';
  private deletecmpUrl = this.baseResUrl+'/deleteDrugdetails';
  private getFileuploadedURL = this.baseResUrl+'/getUploadfiles';

  private deviceurl=this.baseResUrl+'/User/saveUserActivity';
  
  constructor(private http: Http) { }

  head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});
    }

  deletedrug(id: number) {
    this.headertoken();
    return this.http.get(this.deletecmpUrl + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getAlldrugInfo(cid: any) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/viewDruginfoAll' + '/' + cid, { headers: this.head }).map(response => response.json());
  }

  getdrugInfo(cid: any,pageno: any,size:any) {
    this.headertoken();
    return this.http.get(this.drugviewUrl + '/' + cid + '/'+ pageno  + '/' +size, { headers: this.head }).map(response => response.json());
  }

  prodsearchrecord(cid: any,searchindex: any,searchval: any,pageno: any,size:any,) {
    this.headertoken();
    return this.http.get(this.drugsearchUrl +'/'  + cid  + '/' + searchindex  + '/' + searchval  + '/' + pageno  + '/' +size, { headers: this.head }).map(response => response.json());
  }

  //get Upload files this.getFileuploadedURL
  getImage(drugid: number): Observable<any> {
  let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.get(this.baseResUrl+`/get-drug-image` + '/' + drugid, { headers: imghead }).map((response: Response) => {
        return response.json();
      });
  }

  updateDrug(drugdetails) {
    this.headertoken();
    return this.http.post(this.baseResUrl+`/set-image-values`, drugdetails, { headers: this.head }).map(response => response.json());
  }

   //Update Drug Image
  updatedrugimage(image) {
    let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
    return this.http.post(this.baseResUrl+`/update-drug-image`, image, { headers: imghead } ).map((res: Response) => res.json());
  }

  getCustDrugValues(id: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/getCustDrugsID' + '/' + id, { headers: this.head }).map(response => response.json());
  }

  getCombineGenericValues(id: number) {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/viewCombGenericAll' + '/' + id, { headers: this.head }).map(response => response.json());
  }
  
  devicedetails(data){

    this.headertoken();
    return this.http
      .post(this.deviceurl, data, { headers: this.head })  .map((res: Response) => res.json());  
}

}
