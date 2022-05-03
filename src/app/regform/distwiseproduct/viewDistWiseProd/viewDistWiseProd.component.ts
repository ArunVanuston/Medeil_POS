
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { viewDistWiseProdService } from './viewDistWiseProd.service';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { NotificationsComponent } from '../../../notifications/notifications.component';



import { AppComponent } from '../../../app.component';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'app-viewDistWiseProd',
  templateUrl: './viewDistWiseProd.component.html',
  providers: [viewDistWiseProdService, NotificationsComponent]

})
export class viewDistWiseProdComponent implements OnInit {


itemlength=[{},{},{},{},{}]

  registerForm: FormGroup;


  distributors = [];

  distproducts = [];

  i;
  inc = 1;


  selobj;
  gifFail: boolean;
  fixedlength=2;
  constructor(private userService: viewDistWiseProdService, private formBuilder: FormBuilder, config: NgbDropdownConfig, 
    public translate: TranslateService,private notificationsComponent: NotificationsComponent) {
    config.autoClose = false;
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.registerForm = this.formBuilder.group({
      distributor: ['opt1', []],
      autonamenew: [, []],
      distprice:[(0).toFixed(this.fixedlength),[]],
      remarks:['',[]],
      id:['',[]],
      distprod: this.formBuilder.array([])

  });


    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid, companyrefid: this.selobj.companyid };
    this.userService.viewProdDistributors(JSON.stringify(frmdata)).subscribe(data => { this.distributors = data },
      errorCode => console.log(errorCode));

  }

  viewDistProdWhole() {
    const control1 = <FormArray>this.registerForm.controls['distprod'];
    
    control1.controls=[];
    this.gifFail=true;
    var frmdata = { frmint1: this.registerForm.get('distributor').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    setTimeout(() => {
    this.userService.viewDistProdWhole(JSON.stringify(frmdata)).subscribe(data => { this.viewServDistProduct(data) },
      errorCode => console.log(errorCode));
      this.gifFail=false;
    },3500);
  }

  viewServDistProduct(data: any) {

    const control = <FormArray>this.registerForm.controls['distprod'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    var v = 0;
    for (this.i = 0; this.i < data.length; this.i++) {
      v = 0;
      control.insert(0, this.formBuilder.group({
        id: [data[this.i][v++], []],
        distrefid: [data[this.i][v++], []],
        drugprdid: [data[this.i][v++], []],
        masterprice: data[this.i][v++],
        distprice: [parseFloat(data[this.i][v++]).toFixed(this.fixedlength), []],
        productname: [data[this.i][v++], []],
        distname: [data[this.i][v++], []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        distprodno: [data[this.i][1], []],
        remarks: [data[this.i][8], []],
        manufname:[data[this.i][9], []]
      }));
    }

  }

  distflag:boolean=false;
  getdetails(indx){
    this.distflag=true;
    const control = <FormArray>this.registerForm.controls['distprod'];
    let setdata=control.value;
    this.registerForm.get('distprice').setValue(setdata[indx].distprice);
    this.registerForm.get('remarks').setValue(setdata[indx].remarks);
    this.registerForm.get('id').setValue(setdata[indx].id);
  }

  UpdatePrice() {
    let remarks=this.registerForm.get('remarks').value;
    if(remarks.length>100){
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Remarks Not more 100 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      var frmdata={
        id:this.registerForm.get('id').value,
        distprice:parseFloat(this.registerForm.get('distprice').value).toFixed(this.fixedlength),
        remarks:this.registerForm.get('remarks').value
      };
      this.userService.updateprice(frmdata).subscribe(data => {
        if(data==1){
          this.distflag=false;
          this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Updated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.registerForm.get('distributor').setValue('opt1');
          const control = <FormArray>this.registerForm.controls['distprod'];
          control.controls=[];
        }
      },
      errorCode => console.log(errorCode));
    }
  }


}