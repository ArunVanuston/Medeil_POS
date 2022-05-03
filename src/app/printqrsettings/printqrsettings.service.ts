import { Injectable } from '@angular/core';
//import {Http} from '@angular/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class PrintqrSettingService {
    handleError: any;
    baseResUrl: string = environment.backend.baseResUrl;
    private viewsaleslead = this.baseResUrl+'/omnisalesOrderlead';

    constructor(private http: Http) { }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

    //view default forms print
    viewdefaultforms() {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewdefaultprintforms',{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    viewprintsettings(cid:any, bid:any, lname:any, lrefid:any) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/viewprintsettings'+ '/' + cid + '/' + bid + '/' + lname + '/' + lrefid ,{headers: this.head}).map(res => res.json()).catch(this.handleError);
    }

    saveprintsettings(data: String) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/saveprintsettings', data, { headers: this.head }).map(response => response.json());
    }

    saveimagerecord(data: String) {
      this.headertoken();
      return this.http.post(this.baseResUrl+'/saveprintimagerecord', data, { headers: this.head }).map(response => response.json());
    }

    //save print image
    saveimage(image) {
      let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
      return this.http.post(this.baseResUrl+'/saveprintimage', image, { headers: imghead }).map((res: Response) => res.json());
    }

    updateprintimage(imageid,image) {
      let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
      return this.http.post(this.baseResUrl+'/updateprintimage/'+imageid, image, { headers: imghead }).map((res: Response) => res.json());
    }

    //save print image
    viewprintimage(formid,printypeid) {
      this.headertoken();
      return this.http.get(this.baseResUrl+'/printimageview'+ '/'+ formid+ '/' + printypeid, { headers: this.head }).map((res: Response) => res.json());
    }
   
    // device details
    deviceDetails(serobj: any){
        this.headertoken();
        return this.http.post(this.baseResUrl+'/User/saveUserActivity',serobj, {headers: this.head}).map((res:Response)=> res.json()); 
      }

   


}




