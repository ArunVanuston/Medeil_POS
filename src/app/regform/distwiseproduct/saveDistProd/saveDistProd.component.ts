import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { saveDistProdService } from './saveDistProd.service';
import { NgbDropdownConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import { TranslateService } from 'ng2-translate';
declare var $: any;
@Component({
  selector: 'app-patientedit',
  templateUrl: './saveDistProd.component.html',
  providers: [saveDistProdService, NgbDropdownConfig, dateFormatPipe, NotificationsComponent]
})

export class saveDistProdComponent implements OnInit {
  parentMessage = "sales";
  fixedlength=2;
  closeResult: string;
  fn;
  $: any;
  registerForm: FormGroup;
  distributors = [];
  phcompany = [];
  i;
  autoincr;
  autoval = 0;
  autoinc = 0;
  autodata = [];
  selobj;
  deviceObj;
  saveprocess: boolean = false;
  itemlength = [{}, {}, {}, {}, {}]
  constructor(public translate: TranslateService,private userService: saveDistProdService, private appComponent: AppComponent, private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe,
    private formBuilder: FormBuilder, config: NgbDropdownConfig, private modalService: NgbModal, private router: Router) {
    config.autoClose = false;
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.registerForm = this.formBuilder.group({
      distrefid: ['', [Validators.required]],
      autonamenew: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      date: [this.dateformat.transform05(Date.now()), []],
      phcompanyid: [, []],
      distprod: this.formBuilder.array([
      ]),
      dummy: this.formBuilder.array([
      ]),
    });
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyrefid };
    this.userService.viewProdDistributors(JSON.stringify(frmdata)).subscribe(data => this.distributors = data,
      errorCode => console.log(errorCode));
    this.userService.viewDPPhCompanies(JSON.stringify(frmdata)).subscribe(data => this.phcompany = data,
      err => {
        console.log('Error occured');
      });
    $(document).ready(function () {
    });
  }  //NgOninit Complete

  searchdrugdata(searchvalue){
    if(searchvalue.length>0){
      var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyrefid };
      this.userService.viewDPCustProducts(JSON.stringify(frmdata)).subscribe(data => { 
      this.autodata = data },
      errorCode => console.log(errorCode));
    }else{
      this.autodata=[];
    }
  }

  selecteddrugdata(drugdata){
    var frmdata = { frmint1: drugdata[0], frmint2: this.registerForm.get('distrefid').value, createdby: '', locrefid: this.selobj.locrefid, 
    locname: this.selobj.locname, companyid: this.selobj.companyrefid };
    this.userService.viewDPCustProduct(JSON.stringify(frmdata)).subscribe(data => { 
      this.viewServCustProduct(data) 
    },errorCode => console.log(errorCode));
    this.registerForm.get('autonamenew').setValue('');
    document.getElementById("autoname").focus();
    this.autodata = [];
  }

  // autofocusin() {
  //   this.autoincr = setInterval(() => {
  //     if (this.registerForm.get('autonamenew').value) {
  //       $('#autolist').show();
  //       if (this.autoval == this.registerForm.get('autonamenew').value) {
  //         this.autoinc += 1;
  //       } else {
  //         this.autoinc = 0;
  //       }
  //       this.autoval = this.registerForm.get('autonamenew').value;
  //       if (this.autoinc < 1) {
  //         var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyrefid };
  //         this.userService.viewDPCustProducts(JSON.stringify(frmdata)).subscribe(data => { this.autodata = data },
  //           errorCode => console.log(errorCode));
  //       }
  //     }
  //   }, 610);
  // }
  // autofocusout() {
  //   if (this.registerForm.get('autonamenew').value) {
  //   } else {
  //     $('#autolist').hide();
  //   }
  //   clearInterval(this.autoincr);
  // }
  // autokeyselect(event: KeyboardEvent, articleId: number) {
  //   var autoincrflag: number;
  //   if (event.keyCode == 38) {
  //     var autoincrflag = articleId - 1;
  //     if (autoincrflag == 0) {
  //       $("#autoname").focus();
  //     } else {
  //       $("#autolist li:nth-child(" + autoincrflag + ") input").focus();
  //     }
  //   }
  //   if (event.keyCode == 40) {
  //     var autoincrflag = articleId + 1;
  //     $("#autolist li:nth-child(" + autoincrflag + ") input").focus();
  //   }
  //   if (event.keyCode == 13) {
  //     var drg = this.autodata[articleId - 1][0];
  //     var frmdata = { frmint1: drg, frmint2: this.registerForm.get('distrefid').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyrefid };
  //     this.userService.viewDPCustProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServCustProduct(data) },
  //       errorCode => console.log(errorCode));
  //     $("#autoname").focus();
  //     this.registerForm.get('autonamenew').setValue('');
  //     this.autodata = [];
  //   }
  // }
 

  validatevendor(){
    const control = <FormArray>this.registerForm.controls['distprod'];
    
    let setdata=control.value;
    for(let i=0;i<setdata.length;i++){
      if(setdata[i].distprice<=0||setdata[i].distprice==''||setdata[i].distprice==null){
        this.notificationsComponent.addToast({ title: '', msg: 'Enter'+ (i+1) +'Vendor Price', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return 0;
      }else if(setdata[i].remarks.length>100){
        this.notificationsComponent.addToast({ title: '', msg: 'Remarks '+ (i+1) +' not more 100 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return 0;
      }  
    }
    return 1;
  }

  onSubmit() {
    let valflag=this.validatevendor();
    const control = <FormArray>this.registerForm.controls['distprod'];
    if(control.value<=0){
     alert("Please Select Product")
    }
    else{
    if (valflag == 1) {
      this.saveprocess = true;
      this.userService.saveDistProd(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }
  }
  }

  savevalid(data: any) {
    if (data == 1) {
      this.saveprocess = false;
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  SuccessFully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['/VendorwiseProduct/ViewVendorwiseProduct']);
      }, 1200);
    } else {
      this.saveprocess = false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  
  viewServCustProduct(data: any) {
    const control = <FormArray>this.registerForm.controls['distprod'];
    control.push(this.formBuilder.group({
      distprdid: [, []],
      distrefid: [this.registerForm.get('distrefid').value, []],
      drugprdid: [data[0][0], []],
      masterprice: [data[0][3], []],
      distprice: [(0).toFixed(this.fixedlength), []],
      qty: [data[0][2], []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyrefid, []],
      branchrefid: [this.selobj.branchrefid, []],
      productname: [data[0][1], []],
      calcflag: [0, []],
      selectflag: [true, []],
      creditdays: [, []],
      leadtime: [, []],
      delflag: [false, []],
      remarks: ['', []]
    }));
  }

  viewServProductPhComp(data: any) {
    const control = <FormArray>this.registerForm.controls['distprod'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        distprdid: [, []],
        distrefid: [this.registerForm.get('distrefid').value, []],
       
        drugprdid: [data[this.i][0], []],
        masterprice: [data[this.i][3], []],
        distprice: [(0).toFixed(this.fixedlength), []],
        qty: [data[this.i][2], []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyrefid, []],
        branchrefid: [this.selobj.branchrefid, []],
        productname: [data[this.i][1], []],
        calcflag: [0, []],
        selectflag: [false, []],
        creditdays: [, []],
        leadtime: [, []],
        delflag: [false, []],
        remarks: ['', []]
      }));
    }
  }

  viewProductPhComp() {
    var frmdata = { frmint1: this.registerForm.get('phcompanyid').value, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyrefid };
    this.userService.viewProductPhComp(JSON.stringify(frmdata)).subscribe(data => { this.viewServProductPhComp(data) },
      errorCode => console.log(errorCode));
  }

  removeRow(index) {
    const control = <FormArray>this.registerForm.controls['distprod'];
    control.removeAt(index);
  }
  
  validnew(): Number {
    var valflag = 0;
    return valflag;
  }
  clear() {
    this.ngOnInit();
  }
  clearProd() {
    const control = <FormArray>this.registerForm.controls['distprod'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
  }
}
