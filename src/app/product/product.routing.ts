import { Routes } from "@angular/router";
import { AddproductComponent } from "app/product/addproduct/addproduct.component";
import { ProductlistComponent } from "app/product/productlist/productlist.component";

export const ProductRoutes: Routes = [
       
    
    {
        path: '',
       
        children: [
            {               
                path: 'AddProduct',
                component: AddproductComponent,
                data: {
                    breadcrumb: 'Add Product'                    
                }
               
                },
               {
                 path: 'ViewProduct',
                 component: ProductlistComponent,
                 data: {
                    breadcrumb: 'View Product'                    
                }

             }
        
        
        ]}]