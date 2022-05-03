import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from 'environments/environment.prod';

@Injectable()
export class saveDebitNoteService  {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
private url = this.baseResUrl+"/drnote/";

constructor(private http: Http) {  }

head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }

invoicetype(cid:any,bid:any,lname:any,lrefid:any,id:any){
  this.headertoken();
return this.http.get(this.url+'getreturntype'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+id, { headers: this.head }).map(response => response.json());
}


invoicedetails(cid:any,bid:any,lname:any,lrefid:any,invoidid:any,typeid:any){
  this.headertoken();
  return this.http.get(this.url+'gettabledata'+'/'+cid+'/'+bid+'/'+lname+'/'+lrefid+'/'+invoidid+'/'+typeid, { headers: this.head }).map(response => response.json());
  }

  savedebitnote(data: string) {
    this.headertoken();
    return this.http.post(this.url+'savedbnote', data, { headers: this.head }).map(response => response.json())
  }
  

}
