import { Injectable } from "@angular/core";
import { Http, Response , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "environments/environment.prod";

@Injectable()

export class ProductService {
  baseUrl: string = environment.backend.baseURL;
  baseResUrl: string = environment.backend.baseResUrl;
  // URL to web API
  private productUrl = this.baseResUrl+'/saveproduct';
  private isExist=this.baseResUrl+'/productexist';

  constructor(private http: Http) {}

  head:any;
    headertoken(){
        this.head = new Headers({ 'Authorization': 'bearer'+ sessionStorage.getItem("acctoken"),
        'Content-Type':'application/json'});
      }
 
  getproduct(): Promise<any> {
    this.headertoken();
    return this.http.get(this.baseResUrl+'/product', {headers: this.head} )
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  

  createProduct(product: String) {
    this.headertoken();
    return this.http.post(this.productUrl, product, {headers: this.head}).map((res: Response) => res.json());
  }

  
    getcountry(): Promise<any> {
      this.headertoken();
    return this.http.get(this.baseResUrl+'/getCountry', {headers: this.head} )
      .toPromise().then(response => response.json() as any)
      .catch(this.handleError);
    }

    getproductlist(): Promise<any> {
      this.headertoken();
    return this.http.get(this.baseResUrl+'/product-dropdown', {headers: this.head} )
      .toPromise().then(response => response.json() as any)
      .catch(this.handleError);
    }

   isExistProduct(cid:number,pname:String){
     this.headertoken();
    return this.http.get(this.isExist + '/' + cid+'/'+pname, {headers: this.head} ).map(response => response.json());
   }
 
 
  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}
