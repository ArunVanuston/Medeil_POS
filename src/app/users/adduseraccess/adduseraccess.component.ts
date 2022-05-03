import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adduseraccess',
  templateUrl: './adduseraccess.component.html',
  styleUrls: ['./adduseraccess.component.css'],
  providers: [NotificationsComponent]
})
export class AdduseraccessComponent implements OnInit {
  alertmsgs:any;
  userAccessForm: FormGroup;
  i;
  companylist = [];
  userlist: any;
  branchlist: any;
  saveBranchs = [];
  shoplist = [];
  saveShops = [];
  warehouselist: any;
  saveWarehouses = [];
  hospitallist: any;
  saveHospitals = [];
  //Validation Flag's
  public branchFlag: boolean = false;
  public shopFlag: boolean = false;
  public warehouseFlag: boolean = false;
  public hospitalFlag: boolean = false;
  constructor(private userService: UsersService, private notificationsComponent: NotificationsComponent,
    private fb: FormBuilder, private route: Router) {
    this.userAccessForm = this.fb.group({
      suserrefid: [, []],
      companyid: [, []],
      branchrefid: [, []],
      storerefid: [, []],
      warehouserefid: [, []],
      hospitalrefid: [, []]
    });
  }
  ngOnInit() {
    //TO SET DROP DOWN PLACE HOLDER
    this.userAccessForm.get('suserrefid').setValue('opt1');
    this.userAccessForm.get('companyid').setValue('opt1');
    this.userService.getCompanylist().then(data => { this.companylist = data });
    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.userService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }
  getUser() {
    this.userAccessForm.get("branchrefid").setValue('');
    this.userService.getUserlist(this.userAccessForm.get('companyid').value).then(data => {
      this.userlist = data;
      if (data == null || data == '') {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.usernotavailable, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }
  //Get Values in List For User Access**//
  getuserBranch() {
    this.userService.getBranch(this.userAccessForm.get('companyid').value).subscribe(data => this.branchlist = data, err => {
      console.log('Error Occured On getbranch()')
    });
  }
  getuserShop() {
    this.userService.getStore(this.userAccessForm.get('suserrefid').value).subscribe(data => this.shoplist = data,
      err => {
        console.log('Error Occured On getStore()');
      }
    );
  }

  getuserWarehouse() {
    this.userService.getWarehouse(this.userAccessForm.get('suserrefid').value).subscribe(data => this.warehouselist = data, err => {
      console.log('Error Occured On getuserWarehouse()');
    }
    );
  }
  getuserHospital() {
    this.userService.getHospital(this.userAccessForm.get('suserrefid').value).subscribe(data => this.hospitallist = data, err => {
      console.log('Error Occured On gethospital()');
    }
    );
  }

  //** Save For User Access**//
  saveBranch() {
    this.branchFlag = this.branchValidation();
    if (this.branchFlag == true) {
      let branchId: any = this.userAccessForm.get("branchrefid").value;
      let userid: any = this.userAccessForm.get("suserrefid").value;
      for (this.i = 0; this.i < branchId.length; this.i++) {
        this.saveBranchs.push({ suserrefid: userid, branchrefid: this.userAccessForm.get("branchrefid").value });
      }
      this.userService.addBranch(JSON.stringify(this.saveBranchs)).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.userlist = [];
          this.branchlist = [];
          this.saveBranchs = [];
          this.userAccessForm.reset();
          this.ngOnInit();
        }
      });
    }
  }

  saveShop() {
    this.shopFlag = this.shopValidation();
    if (this.shopFlag == true) {
      let storeID: any = this.userAccessForm.get("storerefid").value;
      let userid: any = this.userAccessForm.get("suserrefid").value;
      for (this.i = 0; this.i < storeID.length; this.i++) {
        this.saveShops.push({ suserrefid: userid, storerefid: storeID[this.i] });
      }
      this.userService.addStore(JSON.stringify(this.saveShops)).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.userlist = [];
          this.shoplist = [];
          this.saveShops = [];
          this.userAccessForm.reset();
          this.ngOnInit();
        }
      });
    }
  }

  saveWarehouse() {
    this.warehouseFlag = this.warehouseValidation();
    if (this.warehouseFlag == true) {
      let warehouseID: any = this.userAccessForm.get("warehouserefid").value;
      let userid: any = this.userAccessForm.get("suserrefid").value;
      for (this.i = 0; this.i < warehouseID.length; this.i++) {
        this.saveWarehouses.push({ suserrefid: userid, warehouserefid: warehouseID[this.i] });
      }
      this.userService.addWarehouse(JSON.stringify(this.saveWarehouses)).subscribe(data => {
        if (data = true) {
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.userlist = [];
          this.warehouselist = [];
          this.saveWarehouses = [];
          this.userAccessForm.reset();
          this.ngOnInit();
        }
      });
    }
  }
  saveHospital() {
    this.hospitalFlag = this.hospitalValidation();
    if (this.hospitalFlag == true) {
      let hospID: any = this.userAccessForm.get("hospitalrefid").value;
      let userid: any = this.userAccessForm.get("suserrefid").value;
      for (this.i = 0; this.i < hospID.length; this.i++) {
        this.saveHospitals.push({ suserrefid: userid, hospitalrefid: hospID[this.i] });
      }
      this.userService.addHospital(JSON.stringify(this.saveHospitals)).subscribe(data => {
        if (data = true) {
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.userlist = [];
          this.hospitallist = [];
          this.saveHospitals = [];
          this.userAccessForm.reset();
          this.ngOnInit();
        }
      });
    }
  }
  //** Validation For User Access**//
  branchValidation(): boolean {
    if (this.userAccessForm.get('companyid').value == 'opt1' || this.userAccessForm.get('companyid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.companynamerequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userAccessForm.get('suserrefid').value == 'opt1' || this.userAccessForm.get('suserrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.usernamerequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userAccessForm.get('branchrefid').value == 'noData' || this.userAccessForm.get('branchrefid').value == 'opt1' || this.userAccessForm.get('branchrefid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.branchrequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  shopValidation(): boolean {
    if (this.userAccessForm.get('companyid').value == 'opt1' || this.userAccessForm.get('companyid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.companynamerequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userAccessForm.get('suserrefid').value == 'opt1' || this.userAccessForm.get('suserrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.usernamerequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userAccessForm.get('storerefid').value == null || this.userAccessForm.get('storerefid').value == 'noData' || this.userAccessForm.get('storerefid').value == 'opt1' || this.userAccessForm.get('storerefid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.shoprequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }
  warehouseValidation(): boolean {
    if (this.userAccessForm.get('companyid').value == 'opt1' || this.userAccessForm.get('companyid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.companynamerequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userAccessForm.get('suserrefid').value == 'opt1' || this.userAccessForm.get('suserrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.usernamerequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userAccessForm.get('warehouserefid').value == null || this.userAccessForm.get('warehouserefid').value == 'noData' || this.userAccessForm.get('warehouserefid').value == 'opt1' || this.userAccessForm.get('warehouserefid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.warehouserequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  hospitalValidation(): boolean {
    if (this.userAccessForm.get('companyid').value == 'opt1' || this.userAccessForm.get('companyid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.companynamerequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userAccessForm.get('suserrefid').value == 'opt1' || this.userAccessForm.get('suserrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.usernamerequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userAccessForm.get('hospitalrefid').value == null || this.userAccessForm.get('hospitalrefid').value == 'noData' || this.userAccessForm.get('hospitalrefid').value == 'opt1' || this.userAccessForm.get('hospitalrefid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: this.alertmsgs.users.warehouserequired, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  viewAccess(value: string) {
    this.route.navigate(['User/userviewaccess', value]);
  }
}