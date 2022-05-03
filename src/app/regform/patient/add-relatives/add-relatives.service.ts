import { Injectable } from '@angular/core';
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment.prod';


@Injectable()
    export class AddrealtivesService{

      baseUrl: string = environment.backend.baseURL;
      baseResUrl: string = environment.backend.baseResUrl;
      
        private getcust=this.baseResUrl+'/patient/getcustdetails';
        private contact=this.baseResUrl+'/patient/custcontact';
        private save=this.baseResUrl+'/patient/savePrelatives';
        private savedetail =this.baseResUrl+'/patient/saverelativesdetail';

constructor(private http:Http){}

head:any;
  headertoken(){
      this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
      'Content-Type':'application/json'});

    }


  getcustomers(comrefid:any,branchrefid:any,locname:any,locrefid:any){
    this.headertoken();
    return this.http.get(this.getcust + '/' + comrefid + '/' + branchrefid + '/' + locname + '/' + locrefid,{headers: this.head}).map(Response => Response.json());
    }

    getcontact(cont:any){
      this.headertoken();
      return this.http.get(this.contact + '/' + cont,{headers: this.head}).map(Response=>Response.json());
    }
    savepatientdet(data:any){
      this.headertoken();
     return this.http.post(this.save, data,{headers: this.head}).map(Response=>Response.json());

    }

    saverelatives(data:any){
      this.headertoken();
     return this.http.post(this.savedetail, data,{headers: this.head}).map(Response=>Response.json());

    }

    }
