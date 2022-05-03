
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'app/product/product.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { NotificationsComponent } from '../../notifications/notifications.component';

import {AppComponent} from '../../app.component';
import { LoginComponent } from 'app/userlogin/login/login.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  providers: [NotificationsComponent]
})
export class AddproductComponent implements OnInit {

  productForm: FormGroup;
  country: any;
  productlist:any;

  mulSettings: { maxHeight: number; singleSelection: boolean; text: string; badgeShowLimit: number; classes: string; };
  constructor(private productService: ProductService, private location: Location, private router: Router, private notificationsComponent: NotificationsComponent,
    private modalService: NgbModal) { }

  ngOnInit() {
    const countryid = new FormControl('opt1');
    const productname = new FormControl('opt1', Validators.required);
    const productcode = new FormControl();
    const createdby = new FormControl(sessionStorage.getItem("indvuserid"));

    this.productForm = new FormGroup({
      createdby: createdby,
      countryid: countryid,
      productname: productname,
      productcode: productcode
    });

    this.productService.getcountry().then(country => this.country = country);
  }

  getproductlist(){
    this.productForm.get('productname').setValue('opt1');
    this.productService.getproductlist().then(products => {
      this.productlist = products});
  }

  newproductadd(event, popupname) {
    if (event == 'newproduct') {
      if (this.productForm.get('countryid').value == "opt1" || this.productForm.get('countryid').value == '') {
        this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'COUNTRY NAME IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      }else{
      this.openmain(popupname);
      }
    }
    else {
      return;
    }
  }


  productValidation(): boolean {
    let flag=true;
    let country=this.productForm.get('countryid').value;
    let product=this.productForm.get('productname').value;
    if (country == "opt1" || country == "NOT FOUND") {
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'COUNTRY NAME IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      flag=false;
    }else if ( product == 'opt1' || product == 'newproduct') {
      this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Fill Product Name', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      flag=false;
    } 
    return flag;
  }


  SaveProduct(c) {
    let returnflag = this.productValidation();
    if (returnflag) {
      let countrycode = this.productForm.get('countryid').value;
      let productcode = this.productForm.get('productname').value;
      this.productForm.get('productcode').setValue(productcode+countrycode);
      this.productService.createProduct(JSON.stringify(this.productForm.value)).subscribe(data => { 
        if(data){ 
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'PRODUCT IS SAVED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          c('Close click');
          this.productForm.reset();
          this.ngOnInit();
        }},err => {
          if (err.status == 400) {
            this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Product Already Exists', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            c('Close click');
          }
          else{
            this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'Product Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            c('Close click');
          }          
           
        });
    
    }
  }


  closeResult: string;
  openmain(popupname) {
    this.modalService.open(popupname).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  view(): void {
    this.router.navigateByUrl('/Product/ViewProduct');
  }


}
