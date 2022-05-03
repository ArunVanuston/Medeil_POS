import { Injectable } from '@angular/core';
import { Headers, Http,Response } from '@angular/http';
import { HttpEventType } from '@angular/common/http';
import { environment } from 'environments/environment.prod';

@Injectable()
export class CurrencySettingService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
 
    private getcountryname = this.baseResUrl+'/getCountryname';
    private getcurrencysymbol = this.baseResUrl+'/getcurrencysymbol';
    private getcountry = this.baseResUrl+'/getCountry';
    private getCurrencysy = this.baseResUrl+'/getCurrency';
    private saveCurrency = this.baseResUrl+'/saveCurrencyset';
    private fetchcur = this.baseResUrl+'/fetchcurrencystatus';
    private currencystatus = this.baseResUrl+'/getCurrencyStatus';
    constructor(private http: Http) { }

    head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }


    getCountryname(cn: any, ) {
        this.headertoken();
        return this.http.get(this.getcountryname + '/' + cn, { headers: this.head }).map(response => response.json());
    }

    getCountry() {
        //Get Coutries 
        this.headertoken();
        return this.http.get(this.getcountry).map(response => response.json());
    }

    getCurreny(countryrefid:number){
        this.headertoken();
        return this.http.get(this.getCurrencysy + '/' + countryrefid, { headers: this.head }).map(response => response.json());
    }

    savecurrency(data: string): any {
        this.headertoken();
        return this.http.post(this.saveCurrency, data, { headers: this.head }).map((res: Response) => {
          return { "res": res.json() };
        });
      }

      fetchCurrency(comp:number,branch:number,shop:number){
        this.headertoken();
        return this.http.get(this.fetchcur + '/' + comp+ '/' + branch+ '/' + shop, { headers: this.head }).map(response => response.json());
    }

    getcurrencysts() {
      this.headertoken();
      return this.http.get(this.currencystatus,{headers: this.head}).map(response => response.json());
    }
}