import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-commongstreport',
  templateUrl: './commongstreport.component.html',
  styleUrls: ['./commongstreport.component.css']
})
export class CommongstreportComponent implements OnInit {
  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  private CommonGstRepForm:FormGroup;
  gmonth: any;
  constructor(private appcomponent: AppComponent,
              private domSanitizer: DomSanitizer,
              private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.CommonGstRepForm = this.formbuilder.group({
      month:['',[]]
    })
  
    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
  }

  getmonth(){
    this.gmonth = this.CommonGstRepForm.get('month').value;

  }

  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  getcommongst() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NPurchase_Common_Gst/PurchaseInv_CommonGst_.rptdesign&companyresif=" + this.companyrefid + "&branchrefid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid +"&month="+this.gmonth+"&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  getcommongstprod() {
    
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/NCommon_GSTR2_Product/Common_GSTR2_Product.rptdesign&companyrefid=" + this.companyrefid + "&branchid=" + this.branchrefid + "&locname=" + this.locname + "&locrefid=" + this.locrefid +"&month="+this.gmonth+"&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
}
