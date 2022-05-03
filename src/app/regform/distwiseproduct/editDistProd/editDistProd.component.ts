

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { editDistProdService } from './editDistProd.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from 'ng2-translate'; 


import { NotificationsComponent } from '../../../notifications/notifications.component';


import { DxDataGridComponent } from "devextreme-angular";


import { dateFormatPipe } from '../../../notifications/notifications.datepipe';



import { AppComponent } from '../../../app.component';





declare var $: any;
@Component({
  selector: 'app-patientedit',
  templateUrl: './editDistProd.component.html',
  providers: [editDistProdService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]

})
export class editDistProdComponent {


  registerForm: FormGroup;

  id: number;

  private sub: any;

  i;

  selobj;


  editdata = [];
  deviceObj;

  constructor(public translate: TranslateService,private userService: editDistProdService, private appComponent: AppComponent, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private route: ActivatedRoute, private notificationsComponent: NotificationsComponent) {

    config.autoClose = false;
  }

  ngOnInit() {


    this.translate.use(localStorage.getItem('language'));

    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };




    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });







    this.registerForm = this.formBuilder.group({

      formno: [, []],



      distributor: [, []],

      autonamenew: [, []],

      date: [, []],


      id: [, []],

      invdispflag: [, []],
      distprod: this.formBuilder.array([

      ]),

      dummy: this.formBuilder.array([

      ]),


    });

    this.init();




    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewDistProd(JSON.stringify(frmdata)).subscribe(data => { this.viewServDistProduct(data) },
      errorCode => console.log(errorCode));
    this.userService.viewDistProdAll(JSON.stringify(frmdata)).subscribe(data => { this.editdata = data },
      errorCode => console.log(errorCode));



    $(document).ready(function () {


    });



    if (this.id) {


      this.registerForm.get('invdispflag').setValue(1);
    } else {


      this.registerForm.get('invdispflag').setValue(0);

    }




  }

  justInitiate() {



    this.deviceObj = {
      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      ipaddress: this.appComponent.ipAddress,
      browsertype: this.appComponent.browser,
      ostype: this.appComponent.os,
      osversion: this.appComponent.osversion,
      devicetype: this.appComponent.devicetype,
      apiname: '',
      description: '',
      clientcdate: this.dateformat.transform04()

    };

  }





  onSubmit() {


    var valflag = 0;

    const control = <FormArray>this.registerForm.controls['distprod'];





    var answer = confirm("Save data?");
    this.registerForm.get('clientmdate').setValue(AppComponent.userID);
    this.registerForm.get('modifiedby').setValue(AppComponent.userID);

    if (answer && valflag == 0) {
      this.userService.saveDistProd(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));


    }


  }






  savevalid(data: any) {
    if (data == 1) {



      this.justInitiate();
      this.deviceObj.apiname = "api/dist/updatePhCompany";
      this.deviceObj.description = "Pharmacompany Updated";

      this.userService.deviceDetails(JSON.stringify(this.deviceObj))
        .subscribe(data => { },
          errorCode => console.log(errorCode));




      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clear();

    } else {

      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }



  viewEdit() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewDistProd(JSON.stringify(frmdata)).subscribe(data => { this.viewServDistProduct(data) },
      errorCode => console.log(errorCode));

  }



  viewServDistProduct(data: any) {


    const control = <FormArray>this.registerForm.controls['distprod'];

    var v = 0;


    while (control.length !== 0) {
      control.removeAt(0);
    }

    this.init();


    for (this.i = 0; this.i < data.length; this.i++) {

      v = 2;

      control.insert(0, this.formBuilder.group({


        id: [data[this.i][v++], []],
        distrefid: [data[this.i][v++], []],
        drugprdid: [data[this.i][v++], []],


        masterprice: data[this.i][v++],
        distprice: [data[this.i][v++], []],
        productname: [data[this.i][v++], []],
        distname: [data[this.i][v++], []],
        proddelflag: [data[this.i][v++], []],




        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],

        clientcdate: [data[this.i][v], []],
        clientmdate: [data[this.i][v], []],

        clientcdate1: [data[this.i][v++], []],
        creditdays: [data[this.i][v++], []],
        leadtime: [data[this.i][v++], []],
        distprdlocid: [data[this.i][v++], []],



        distprodno: [data[this.i][0], []],

        calcflag: [0, []],
        delflag: [false, []],





      }));


    }



    this.registerForm.get('formno').setValue(data[0][0]);

    this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][1]));




  }





  deleteDistProd() {


    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.deleteDistProd(JSON.stringify(frmdata)).subscribe(data => { },
      errorCode => console.log(errorCode));


  }







  validnew(): Number {
    var valflag = 0;


    return valflag;

  }





  init() {
    const control = <FormArray>this.registerForm.controls['distprod'];
    var data = [[], [], [], [], [], [], [], []];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({



        distprdid: [, []],
        distrefid: [, []],
        drugprdid: [, []],
        masterprice: [, []],
        distprice: [, []],
        qty: [, []],

        clientcdate: [, []],


        clientcdate1: [, []],
        createdby: [, []],

        clientmdate: [, []],

        modifiedby: [, []],


        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        productname: [, []],


        creditdays: [, []],
        leadtime: [, []],

        proddelflag: [, []],

        distprdlocid: [, []],



















        calcflag: [1, []],
        delflag: [false, []],
      }));


    }

  }

















  clear() {

    this.ngOnInit();
  }








}
