import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { adddrugService } from 'app/drugmaster/addDrugmaster/addDrugmaster.services';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { ProductReportsService } from '../productreports.service';

@Component({
  selector: 'app-subgroupbaseddruglist',
  templateUrl: './subgroupbaseddruglist.component.html',
  styleUrls: ['./subgroupbaseddruglist.component.css'],
  providers: [ProductReportsService, adddrugService, NotificationsComponent]
})
export class SubgroupbaseddruglistComponent implements OnInit {
  ProductReportForm: FormGroup;
  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  months: any;

  selmonth: any;
  vertical: any;
  maingroup: any;
  subgroup1: any;
  subgroup2: any;




  verticallist: any;
  sgp2: any;
  sgp1: any;
  vert: any;
  sgp: any;
  vertic: any;

  constructor(private appcomponent: AppComponent,
    private prodrepservice: ProductReportsService,
    private formbuilder: FormBuilder,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private drugservice: adddrugService,
    private notificationsComponent: NotificationsComponent) { }

  ngOnInit() {

    this.ProductReportForm = this.formbuilder.group({
      verticalid: ['', []],
      maingroupid: ['', []],
      subgroupid1: ['', []],
      subgroupid2: ['', []]

    })


    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;

    this.drugservice.getVerticals(AppComponent.countryID).subscribe(data => { this.verticallist = data },
      err => { console.log('Error Occured On getATC()') });

  }


  getmaingrp(vert: any) {
    this.vertic = vert;
    this.ProductReportForm.get('verticalid').setValue(vert);
    this.drugservice.mainGroup(vert).subscribe(data => this.maingroup = data,
      err => {
        console.log('Error Occured MainGroup');
      });
  }



  getsubgrp1(maingrpid: any) {
    this.sgp = maingrpid;

    this.drugservice.subGroup1(this.ProductReportForm.get('verticalid').value, maingrpid).subscribe(data => this.subgroup1 = data,
      err => {
        console.log('Error Occured Get subgroup 1');
      });

  }


  getsubgrp2(subgrp1id: any) {
    this.sgp1 = subgrp1id;
    this.drugservice.subGroup2(this.ProductReportForm.get('verticalid').value, subgrp1id).subscribe(data => { this.subgroup2 = data },
      err => {
        console.log('Error Occured Get subgroup 2');
      });
  }

  getid(subid2: any) {

    this.sgp2 = subid2;

  }


  datefetch(mvalue) {

    this.selmonth = mvalue;

  }
  valid: boolean = false;
  reportshow: boolean = false;
  reportlink: any = " https://secure.medeil.io";
  grpwiseproduct() {
    this.valid = this.validation();


    if (this.valid == true) {
      this.reportshow = true;
      let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NSubgroupidProduct/subgroup2basedproducutrptdesign.rptdesign&maingrp=" + this.sgp + "&subgrp1=" + this.sgp1 + "&subgrp2=" + this.sgp2 + "&comid=" + this.companyrefid + "&branchid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&__format=PDF"
      this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Select the Mandatory Feild!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  }

  validation() {

    if (this.vertic == '' || this.vertic == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Vertical Name !', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    } else if (this.sgp == '' || this.sgp == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Main Group Name !', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    } else if (this.sgp1 == '' || this.sgp1 == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Sub Group1 Name !', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    } else if (this.sgp2 == '' || this.sgp2 == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Sub Group2 Name !', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

}