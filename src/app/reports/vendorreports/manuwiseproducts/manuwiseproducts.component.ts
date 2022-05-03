import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { DistributorService } from 'app/regform/distributor/distributorSave/distributor.service';
import { saveDistProdService } from 'app/regform/distwiseproduct/saveDistProd/saveDistProd.service';

import { vendorReportModule } from '../report.services';

@Component({
  selector: 'app-manuwiseproducts',
  templateUrl: './manuwiseproducts.component.html',
  styleUrls: ['./manuwiseproducts.component.css'],
  providers:[vendorReportModule,DistributorService]
})
export class ManuwiseproductsComponent implements OnInit {

  
  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  distid: any;
  selobj;
  private ManuwiseForm: FormGroup;
  distributorId: any;
  mulservList: any;
  manufactid: any;
  constructor(private appcomponent: AppComponent,
              private domSanitizer: DomSanitizer,
              private formbuilder: FormBuilder,
              private distservice: vendorReportModule,
              private manufactservice:DistributorService) { }

  ngOnInit() {
    this.ManuwiseForm = this.formbuilder.group({
      manuid: ['opt1', []]
    });

    //Get Manufacture List
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: AppComponent.locrefID1, locname:AppComponent.locRefName1 };
    this.manufactservice.viewDstPhCompanies(JSON.stringify(frmdata)).subscribe(data => { this.mulservList = data },
    errorCode => console.log(errorCode));
   
   
   
   
    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
  }

  getmanuid() {
    this.manufactid = this.ManuwiseForm.get('manuid').value;
  }


  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  getmanuwiseproduct() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Nmanufaturer_Products/manufacturewise_prosucts.rptdesign&companyid=" + this.companyrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&Manufacturerid=" + this.manufactid + "&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

}
