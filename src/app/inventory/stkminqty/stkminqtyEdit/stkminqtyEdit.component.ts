import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { stkminqtyEditService } from './stkminqtyEdit.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-stkminqtyEdit',
  templateUrl: './stkminqtyEdit.component.html',
  providers: [stkminqtyEditService, NotificationsComponent, dateFormatPipe]
})
export class stkminqtyEditComponent implements OnInit {
  alertmsgs:any;
  vflag: number;

  registerForm: FormGroup;
  id: number;
  private sub: any;
  selobj;
  i;
  editdata = [];
  constructor(private userService: stkminqtyEditService, private formBuilder: FormBuilder, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private route: ActivatedRoute) { }




  ngOnInit() {



    this.vflag = 0;

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname:
        AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID,
      branchrefid: AppComponent.branchID
    };

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });




    this.registerForm = this.formBuilder.group({
      formno: ['', []],
      minstockflag: ['', []],
      date: [this.dateformat.transform05(Date.now()), []],
      id: ['', []],
      invdispflag: ['', []],
      stkminqty: this.formBuilder.array([
      ]),
      stkminqty1: this.formBuilder.array([

      ])


    });



    // var frmdata = { nproductid: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    // this.userService.viewStkMinQtyAll(JSON.stringify(frmdata)).subscribe(data => {
    //   this.editdata = data
    // },
    //   errorCode => console.log(errorCode));





    // this.userService.viewStkMinQty(JSON.stringify(frmdata)).subscribe(data => { this.viewServStkMinQty(data) },
    //   errorCode => console.log(errorCode));








    this.init();
    this.init1();






    if (this.id) {
      this.registerForm.get('invdispflag').setValue(1);
    } else {
      this.registerForm.get('invdispflag').setValue(0);
    }
    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.userService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  } // ngOnInit end






  onSubmit() {


    if (this.registerForm.get('minstockflag').value == 1) {

      const control = <FormArray>this.registerForm.controls['stkminqty'];
      let setData = control.value;


      let arr = [];
      let selected = 0;



      for (let i = 0; i < setData.length; i++) {
        if (setData[i].drugproductid) {
          selected = selected + 1;
          arr.push(setData[i]);

        }
      }

      if (selected == 0) {
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.datanotempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return;
      }


      // this.userService.updateMinProduct(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveValid(data) },
      // errorcode => console.log(errorcode));




      this.userService.updateMinProduct(JSON.stringify(arr)).subscribe(data => { this.saveValid(data) },
        errorcode => console.log(errorcode));

    }


    else if (this.registerForm.get('minstockflag').value == 2) {

      const control1 = <FormArray>this.registerForm.controls['stkminqty1'];
      let setData1 = control1.value;



      let selected1 = 0;
      let arr1 = [];

      for (let i = 0; i < setData1.length; i++) {
        if (setData1[i].newproductname) {
          selected1 = selected1 + 1;
          arr1.push(setData1[i]);


        }
      }

      if (selected1 == 0) {
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.datanotempty, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return;
      }

      // this.userService.updateNewProduct(JSON.stringify(this.registerForm.value)).subscribe(data => {  },
      // errorcode => console.log(errorcode));
      //arr1.push(this.registerForm.get('id').value);
      this.userService.updateNewProduct(JSON.stringify(arr1)).subscribe(data => { this.saveData(data) },
        errorcode => console.log(errorcode));



      this.ngOnInit();
    }

  }




  saveData(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    }

    else {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  }







  saveValid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    }

    else {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.inevtory.pleasetickdata, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
this.ngOnInit();

  }

  viewProd() {

    const control = <FormArray>this.registerForm.controls['stkminqty'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init();

    this.editdata = [];
    //this.registerForm.get('date').setValue('');
    if (this.registerForm.get('minstockflag').value == 1) {
      this.vflag = 0;
      this.selobj = {
        userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1,
        countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID
      };
      var frmdata = {
        nproductid: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid,
        branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid
      };
      this.userService.viewStkMinQtyAll(JSON.stringify(frmdata)).subscribe(data => {
        this.editdata = data
      },
        errorCode => console.log(errorCode));
      // this.userService.viewStkMinQty(JSON.stringify(frmdata)).subscribe(data => { this.viewServStkMinQty(data) },
      //   errorCode => console.log(errorCode));
      // this.viewEdit();
    }

    else if (this.registerForm.get('minstockflag').value == 2) {

      const control = <FormArray>this.registerForm.controls['stkminqty'];
      while (control.length !== 0) {
        control.removeAt(0);
      }
      this.init1();

      this.editdata = [];
      
      //this.registerForm.get('date').setValue('');

      this.vflag = 1;
      this.selobj = {
        userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1,
        countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID
      };
      var frmdata1 = { nproductid: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid, branchrefid: this.selobj.branchrefid };
      this.userService.viewStkMinQtyAll1(JSON.stringify(frmdata1)).subscribe(data => {
        this.editdata = data
      },
        errorCode => console.log(errorCode));
      //this.viewEdit1();
    }
  }


  viewEdit() {

    if (this.registerForm.get('minstockflag').value == 1) {
      var frmdata = { stkminid: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
      branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid };
      this.userService.viewStkMinQty(JSON.stringify(frmdata)).subscribe(data => { this.viewServStkMinQty(data) },
        errorCode => console.log(errorCode));
    }

    else if (this.registerForm.get('minstockflag').value == 2) {
      var frmdata1 = {
        newprodno: this.registerForm.get('id').value, frmstr1: '', createdby: '',
        locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid, branchrefid: this.selobj.branchrefid
      };
      this.userService.newprview(JSON.stringify(frmdata1)).subscribe(data => { this.viewServMinimumProdNew(data) },
        errorCode => console.log(errorCode));
    }
  }








  viewEdit1() {
    var frmdata = { nproductid: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.newprview(JSON.stringify(frmdata)).subscribe(data => { this.viewServMinimumProdNew(data) },
      errorCode => console.log(errorCode));
  }











  viewServStkMinQty(data: any) {
    var i = 0;
    const control = <FormArray>this.registerForm.controls['stkminqty'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init();
    for (this.i = 0; this.i < data.length; this.i++) {
      i = 3;
      control.insert(0, this.formBuilder.group({
        stkminno: [data [this.i][0],[]],
        id: [data[this.i][i++], []],
        stkminid: [data[this.i][i++], []],
        drugproductid: [data[this.i][i++], []],
        batchrefid: [data[this.i][i++], []],
        receivedqty: [data[this.i][i++], []],
        minqty: [data[this.i][i++], []],
        clientcdate: [data[this.i][i], []],
        clientcdate1: [data[this.i][i++], []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drugname: [data[this.i][2], []],
        ageingtime: [data[this.i][14], []],
        selectflag: [0, []],
        calcflag: [0, []],
        remarks: [data[this.i][15], []],
        qty: [data[this.i][16], []],
      }));
    }
    this.registerForm.get('formno').setValue(data[0][0]);
    this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][1]));
  }
  init() {
    const control = <FormArray>this.registerForm.controls['stkminqty'];
    var data = [[], [], [], [], [], [], [], []];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({

        stkminno:['', []],
        stkminautoid: ['', []],
        stkminid: ['', []],
        drugproductid: ['', []],
        batchrefid: ['', []],
        receivedqty: ['', []],
        minqty: ['', []],
        clientcdate: ['', []],
        clientcdate1: ['', []],
        createdby: ['', []],
        locrefid: ['', []],
        locname: ['', []],
        drugname: ['', []],
        ageingtime: ['', []],
        selectflag: ['', []],
        calcflag: [1, []],
        remarks: ['', []],
        qty: ['', []]
      }));
    }
  }








  viewServMinimumProdNew(data: any) {
    const control = <FormArray>this.registerForm.controls['stkminqty1'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init1();




    for (this.i = 0; this.i < data.length; this.i++) {


      control.insert(0, this.formBuilder.group({
        //stkminautoid: [, []],

        stkminid: ['', []],
        //drugproductid: [0, []],
        batchrefid: ['', []],
        reqqty: [data[this.i][1], []],

        // minqty: [data[this.i][], []],

        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        newproductname: [data[this.i][0], []],
        //selectflag1: [false, []],
        calcflag: [0, []],
        //ageingtime: [0, []],
        remarks: [data[this.i][2], []],
        nproductid: [data[this.i][3], []],
        newprodno: [data[this.i][4], []],
        qty: ['', []],
        //gridcolor1: [data[this.i][4], []],
        //nprefid: [data[this.i][0], []]

      }));
    }
  }







  init1() {
    const control = <FormArray>this.registerForm.controls['stkminqty1'];
    var data = [[], [], [], [], [], [], [], []];

    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({
        //stkminautoid: [, []],
        stkminid: ['', []],
        // drugproductid: [, []],
        batchrefid: ['', []],
        reqqty: ['', []],
        // minqty: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        newproductname: ['', []],
        //selectflag1: [false, []],
        calcflag: ['', []],

        //ageingtime: [, []],


        remarks: ['', []],
        qty: ['', []],

        // gridcolor1: [, []],
        nproductid: ['', []],
        newprodno: ['', []]
      }));
    }
  }
















}