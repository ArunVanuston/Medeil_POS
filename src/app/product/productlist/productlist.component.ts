
import {Component, OnInit} from '@angular/core';
import { ProductService } from 'app/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html'
})
export class ProductlistComponent implements OnInit {

  product: any;

  country: any;

  states: any;

  public data=[];
  public rowsOnPage: number =20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


  constructor(private productService: ProductService,private router: Router) {


  }

  getCustomers() {
    this.productService.getproduct().then(product => this.data = product);
  }

  addProduct(){


    
    this.router.navigateByUrl('/Product/AddProduct');
  }
  
  ngOnInit(): void {
    this.getCustomers();
   

  }

 

}
