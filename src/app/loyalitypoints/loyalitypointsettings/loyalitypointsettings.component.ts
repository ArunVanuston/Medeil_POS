import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { loyalitysettingsService } from '../loyalitypoints.service';
import { stringify } from 'querystring';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

@Component({
  selector: 'app-loyalitypointsettings',
  templateUrl: './loyalitypointsettings.component.html',
  styleUrls: ['./loyalitypointsettings.component.css'],
  providers: [NotificationsComponent, loyalitysettingsService]
})
export class LoyalitypointsettingsComponent implements OnInit {
  parentMessage='sales';
  ltypeid: any;
  flag: boolean;
  flag1: boolean;
  spendvalue: any;
  equilantloyality: any;
  currencylogo: any;
  logo:any;

  constructor(private formbuilder: FormBuilder, private router: Router, private appcomponent: AppComponent,
    private notification: NotificationsComponent, private loyalityservice: loyalitysettingsService, private dateformat: dateFormatPipe) { }
  LoyalityForm: FormGroup;
  ngOnInit() {
    this.LoyalityForm = this.formbuilder.group({
      // loyality_typeid : ['',[]],
      loyality_type: ['', []],
      price_equivalentto_points: ['', []],
      equivalent_points: ['', []],
      from_date: ['', []],
      to_date: ['', []],
      minimum_points: ['', []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locarefid: [AppComponent.locrefID1, []],
      exp_status: [0, []],
      clientcdate: [this.dateformat.transform04(), []],
      // min_gift_point:['',[]],
      // gift_code : ['',[]],
      // gift_product_name : ['',[]],
      // gift_Product_qty : ['',[]],
      // product_value : ['',[]],
      // remarks : ['',[]],
      lproduct: this.formbuilder.array([]),
    });

  
    // this.initloyaltyarray();
    // const control = <FormArray>this.LoyalityForm.controls['lproduct'];
    // control.controls = [];
    // control.push(this.initloyaltyarray());

  }

  getvalue() {
    this.spendvalue = (this.LoyalityForm.get('price_equivalentto_points').value).toFixed(2);
    this.equilantloyality = (this.LoyalityForm.get('equivalent_points').value).toFixed(2);
  }
getcurrency(){
  this.loyalityservice.getcurrencylogo(AppComponent.countryID).subscribe(data=>{this.currencylogo=data,this.logo=data[0][2]});
}

  // onSubmit(){
  //   this.flag = this.validation() ;

  //   if(this.selectedLink == 'Points'){

  //       if(this.flag == true){

  //             this.loyalityservice.savedata(JSON.stringify(this.LoyalityForm.value)).subscribe(data =>{data
  //         if(data >= 0){
  //           this.notification.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

  //                     }
  //         else{
  //           this.notification.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

  //                   }});
  //                   this.ngOnInit();
  //              }

  //   } 
  //     else if(this.selectedLink == 'Gift'){

  //       this.loyalityservice.savedata(JSON.stringify(this.LoyalityForm.value)).subscribe(data =>{this.ltypeid =data
  //       if(data >= 0){
  //         const control = <FormArray>this.LoyalityForm.controls['lproduct'];
  //         let ltid = control.value;
  //         for(let i =0 ; i < ltid.length;i++){
  //           ltid[i].loyality_typeid = data;
  //         }

  //         this.savegiftproduct();
  //       }});
  //     this.ngOnInit();
  //     }
  //   }
  saveprocess: boolean = false;
  onSubmit() {
    this.flag = this.validation();

    if (this.flag == true) {
      this.saveprocess = true;
      this.loyalityservice.savedata(JSON.stringify(this.LoyalityForm.value)).subscribe(data => {
        data
        if (data >= 0) {
          this.notification.addToast({ title: 'Success', msg: 'Data Saved Successfully  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.saveprocess = false;
        }
        else {
          this.notification.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

        }
      });
      this.ngOnInit();
    }

  }

  // savegiftproduct(){
  //   const control = <FormArray>this.LoyalityForm.controls['lproduct'];

  //   // let sourcedata = control.value;

  //     this.loyalityservice.savegiftprod(JSON.stringify(control.value)).subscribe(data =>{data

  //       if(data == true){
  //         this.notification.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

  //       }
  //       else{
  //         this.notification.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

  //       }
  //     });

  // }


  // private selectedLink: string="Points";        

  //     setradio(e: string): void   
  //   {  

  //         this.selectedLink = e;  

  //   }  

  //     isSelected(name: string): boolean   
  //   {  

  //         if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
  //             return false;  
  //   }  

  //         return (this.selectedLink === name); // if current radio button is selected, return true, else return false  

  //   }

  //   //loyalty product arrays initialize
  //   initloyaltyarray() {
  //     return this.formbuilder.group({
  //       loyality_typeid:[this.ltypeid,[]],
  //       min_gift_point: ['', []],
  //       gift_code: ['', []],
  //       gift_product_name: ['', []],
  //       gift_Product_qty: ['', []],
  //       product_value: ['', []],
  //       remarks: ['', []],
  //       status:[0,[]],
  //       /*Login Details */
  //       companyrefid : [AppComponent.companyID,[]],
  //       branchrefid : [AppComponent.branchID,[]],
  //       locname : [AppComponent.locRefName1,[]],
  //       locrefid : [AppComponent.locrefID1,[]],
  //       clientcdate: [this.dateformat.transform04(), []],
  //     });
  //   }

  //   insertnewloyaltyrow() {
  //     this.initloyaltyarray();
  //     const control = <FormArray>this.LoyalityForm.controls['lproduct'];
  //     control.push(this.initloyaltyarray());
  //   }

  //   removenewloyaltyrow(indexid){
  //     const control = <FormArray>this.LoyalityForm.controls['lproduct'];
  //     control.removeAt(indexid);
  //   }

  validation(): boolean {

    // if (this.LoyalityForm.get('loyality_type').value == '' || this.LoyalityForm.get('loyality_type').value == null) {
    //   this.notification.addToast({ title: 'Error Message', msg: 'Enter Loyality Scheme Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (this.LoyalityForm.get('minimum_points').value == '' || this.LoyalityForm.get('minimum_points').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Enter Minimum Loyality..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.LoyalityForm.get('from_date').value == '' || this.LoyalityForm.get('from_date').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Select Validate From..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.LoyalityForm.get('to_date').value == '' || this.LoyalityForm.get('to_date').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Select Validate todate..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.LoyalityForm.get('price_equivalentto_points').value == '' || this.LoyalityForm.get('price_equivalentto_points').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Please Enter Price..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.LoyalityForm.get('equivalent_points').value == null || this.LoyalityForm.get('equivalent_points').value == '') {
      this.notification.addToast({ title: 'Error Message', msg: 'Please Enter Points..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    return true;
  }

  // validation1(): boolean {
  //   const control = <FormArray>this.LoyalityForm.controls['lproduct']; 
  //   let setdata= control.value;
  //   alert(setdata.min_gift_point);
  //   if (this.LoyalityForm.get('loyality_type').value == 'opt1' || this.LoyalityForm.get('loyality_type').value == null) {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Enter Loyality Scheme Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   if (this.LoyalityForm.get('price_equivalentto_points').value == 'opt1' || this.LoyalityForm.get('price_equivalentto_points').value == null) {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Please Enter Price..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   if (this.LoyalityForm.get('equivalent_points').value == null || this.LoyalityForm.get('equivalent_points').value == " ") {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Please Enter Points..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   if (setdata.min_gift_point == 'opt1' || this.LoyalityForm.get('min_gift_point').value == null) {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Enter Minimun Gift Points..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   if (this.LoyalityForm.get('gift_product_name').value == 'opt1' || this.LoyalityForm.get('gift_product_name').value == null) {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Please Enter Gift Product Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   if (this.LoyalityForm.get('gift_Product_qty').value == null || this.LoyalityForm.get('gift_Product_qty').value == " ") {
  //     this.notification.addToast({ title: 'Error Message', msg: 'Please Enter Gift Product Qty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //     return false;
  //   }
  //   alert("********************")
  //   return true;
  // }



}
