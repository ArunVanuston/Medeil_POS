import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class BellnotifyService {
 
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  baseResUrl2: string = environment.backend.thirdpartyUrl;
  constructor(private http: Http) { }
  head:any;
  headertoken(){
    this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
    'Content-Type':'application/json'});
  }

  getcountry(serobj: string) {
    this.headertoken();
    return this.http.post(this.baseResUrl+'/patient/viewCountry',serobj,{ headers: this.head }).map((res: Response) => res.json()).catch(this.handleError);
    //map(res => res.json()).catch(this.handleError); /api/v1/notification/notify
  }

  SaveNotifyRecord(data: string) {
    return this.http.post(this.baseResUrl2+'/notification/notify',data,{ headers: this.head }).map((res: Response) => res.json());
    //.map((res: Response) => res.json());  //.map(res=>{return res});
    //.catch(this.handleError);
  }

  ViewNotifications(){
    return this.http.get(this.baseResUrl2+'/notification/getAllNotify',{ headers: this.head }).map((res: Response) => res.json());
  }

  ViewClientNotifications(countryid:any,edition:any){
    return this.http.get(this.baseResUrl2+'/notification/getClientNotification/'+countryid+'/'+edition,{ headers: this.head }).map((res: Response) => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
