import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class profileService{
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
    private userinfo= this.baseResUrl+'/profileinfo'; //empprofileinfo';
    private imagereceive=this.baseResUrl+'/getsendImage';
    private updateURL=this.baseResUrl+'/updateEmployeeProfile';
    private imagesave = this.baseResUrl+'/updateempimage';
    private deviceurl=this.baseResUrl+'/User/saveUserActivity';

    constructor(private http: Http) {}

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
    }

    getuserinfo(id: any) {
        //Get user info
        this.headertoken();
        return this.http.get(this.userinfo+'/'+id, {headers: this.head}).map(response => response.json());
    }
    
    receiveimage(id: any) {
      //Get userimage
      let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
      return this.http.get(this.imagereceive+'/'+id, {headers: imghead}).map(response => response.json());
     }      

       
    updateinfo(data){
      this.headertoken(); 
      return this.http.post(this.updateURL, data, {headers: this.head} ).map((res: Response) =>
      {return {"res":res.json()}})
    }

    setimagevalues(data){
      this.headertoken(); 
      return this.http.post(this.baseResUrl+'/empimageset-values', data, {headers: this.head} ).map((res: Response) =>res.json());
    }

    updateimage(image) {
      let imghead = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken")});
      return this.http.post(this.imagesave, image, { headers: imghead }).map((res: Response) => res.json());
    }

    devicedetails(data){
      this.headertoken();
     return this.http
       .post(this.deviceurl, data, {headers: this.head} )  .map((res: Response) => res.json());  
    }      

}