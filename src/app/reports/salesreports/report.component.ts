
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { salesreportService } from './report.services';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers: [salesreportService]
})
export class reportComponent implements OnInit {
  parentMessage="sales";
  myForm: FormGroup;
  productinfo = [];
  patientid = [];
  country = [];
  state = [];
  city = [];
  countrycode = [];
  reportvar1;
  reportvar;
  varcity;
  patname: any;
  branchid: any;
  locname: any;
  locrefid: any;
  date: any;
  companyrefid: any;
  status: number = 0;
  phcompany: any;
  vatno: any;
  stype: any;
  sotype = [];
  Manufacturername: any;
  deviceObj: any;


  constructor(private salesservice: salesreportService, private fb: FormBuilder,
    private appComponent: AppComponent, private dateformat: dateFormatPipe, private domSanitizer: DomSanitizer) {
  
  }


  ngOnInit() {

    this.myForm = this.fb.group({
      countryid: ['', []],
      stateid: ['', []],
      city: ['', []],
      countrycode: ['', []],
      from_date: ['', Validators.required],

      Manufacturernameid: ['', []],
      to_date: [this.dateformat.transform05(Date.now()), Validators.required],
      custname: ['', []],
      vat: ['', []],
      sotype: ['', []]


    });
    this.branchid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
    this.companyrefid = AppComponent.companyID;
    this.date = AppComponent.date;
    this.myForm.get('custname').setValue('opt1');
    this.myForm.get('countryid').setValue("0");
    this.myForm.get('stateid').setValue("0");
    this.myForm.get('city').setValue("0");
    this.myForm.get('countrycode').setValue("0");
    this.myForm.get('vat').value;
    this.salesservice.getsotype().subscribe(data => this.sotype = data,
      err => {
        console.log('Error Occured ');
      });

    this.salesservice.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error Occured getCountry()');
      });
    this.reportvar = this.myForm.get("from_date").value;
    this.reportvar1 = this.myForm.get("to_date").value;
    this.salesservice.getCustomerInfo(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => this.patientid = data,
      err => {
        console.log('Error Occured ');
      });


    this.devicedetails();
    this.deviceObj.apiname = "api/slsinv/salesOrderType";
    this.deviceObj.description = "View Sales Reports";

    this.salesservice.viewdevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => { });

  }



  devicedetails() {

    this.deviceObj = {

      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      clientcdate: this.dateformat.transform04(),
      ipaddress: this.appComponent.ipAddress,
      browsertype: this.appComponent.browser,
      ostype: this.appComponent.os,
      osversion: this.appComponent.osversion,
      devicetype: this.appComponent.devicetype,
      description: '',
      apiname: ''

    };

  }


  getCustomer() {
    this.patname = this.myForm.get('custname').value;

  }

  getState() {
    this.salesservice.getStates(this.myForm.get('countryid').value).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });

    this.salesservice.getCountrycode(this.myForm.get('countryid').value).subscribe(data => {
      this.countrycode = data,
        this.myForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Country Code');
      });
  }


  getCity() {
    this.salesservice.getCity(this.myForm.get('stateid').value).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }
  //  cityid(){
  //    this.varcity=this.myForm.get('city').value;

  //  }
  datefetch() {
    this.reportvar = this.myForm.get("from_date").value;
    this.reportvar1 = this.myForm.get("to_date").value;
  }
  getmanufacturer(value: string) {
    this.Manufacturername = [];
    this.salesservice.getManufacturer(value).subscribe(data => {
      this.Manufacturername = [];
      for (let i = 0; i < data.length; i++) {
        this.Manufacturername.push({ value: data[i][0], label: data[i][1] });
      }
    },
      err => {
        console.log('Error Occured Get manufacturer');
      });

  }
  view() {

    this.phcompany = this.myForm.get("Manufacturernameid").value;
    alert(this.myForm.get("Manufacturernameid").value)
    this.vatno = this.myForm.get("vat").value;
    this.stype = this.myForm.get('sotype').value;

    this.varcity = this.myForm.get('city').value;

  }


  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
salesbylocation() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Salesby Location/Salesby Location.rptdesign&companyrefid=" + this.companyrefid + "&branchrefid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&cityid=" + this.varcity + "&status=0&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  vatreport() {
    window.location.href = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Vendor Lead Time/vendorleadtime.rptdesign" + this.companyrefid + "&branchrefid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&fromdate=" + this.reportvar + "&todate=" + "&status=0&__format=PDF";
  }


  slsByCust() {
    this.reportshow = true;
    var rlink ="";
    if(localStorage.getItem("language")==='fr'){
    rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales By Customer/CustomerwiseSale_fr.rptdesign&branchid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&Companyrefid=" + this.companyrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&customerrefid=" + this.patname + "&status=0&__format=PDF";
    }
    else if(localStorage.getItem("language")==='es'){
      rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales By Customer/CustomerwiseSale_sp.rptdesign&branchid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&Companyrefid=" + this.companyrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&customerrefid=" + this.patname + "&status=0&__format=PDF";
      }
      else if(localStorage.getItem("language")==='ar'){
        rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales By Customer/CustomerwiseSale_ar.rptdesign&branchid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&Companyrefid=" + this.companyrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&customerrefid=" + this.patname + "&status=0&__format=PDF";
        }
        else{
            rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales By Customer/CustomerwiseSale.rptdesign&branchid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&Companyrefid=" + this.companyrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&customerrefid=" + this.patname + "&status=0&__format=PDF";
        }
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  detailSalReg() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales Register/DetailedSalesRegister.rptdesign&branchrefid=" + this.branchid + "&locname=" + this.locname + "&locrefid=" + this.locrefid + "&companyrefid=" + this.companyrefid + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  
  toDaySalReg() {


    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales Register/TodaySalesRegister.rptdesign&branchrefid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&companyrefid="+ this.companyrefid +"&billdate="+ this.date +"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  CompleteSalesReturn() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales Return/CompleteSalesReturnList.rptdesign&branchid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&companyrefid="+ this.companyrefid +"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
 
  toDaySalRetList() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales Return/TodaySalesReturnList.rptdesign&branchrefid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&companyrefid="+ this.companyrefid +"&srdate="+this.date+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
  monthlysalesOverview() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Monthly Sales Overview Report/Monthof Shop Sales Report.rptdesign&branchrefid="+this. branchid + "&companyrefid="+ this.companyrefid +"&clientcdate="+this.reportvar+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
    }

  toDaySalOverview() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Today Sales Overview Report/Today Shop SalesReport.rptdesign&branchrefid="+this. branchid + "&companyrefid="+ this.companyrefid +"&clientcdate="+this.reportvar+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  salsOrderType() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Emedsure/sales_order.rptdesign&Branch="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&Company="+ this.companyrefid +"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&type="+this.stype+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  compSalesReport() {
    alert(this.phcompany )
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/medc_sales/mfr_salesbyproduct.rptdesign&Branchid="+this.branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&Companyrefid="+ this.companyrefid +"&Fromdate="+this.reportvar+"&todate="+this.reportvar1+"&PCompanyid="+this.phcompany+"&__format=PDF";
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  salVATRep() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/VAT/vat_sales.rptdesign&BranchRefID="+this. branchid + "&LocName="+this.locname +"&LocRefID=" + this.locrefid +"&CompanyRefID="+ this.companyrefid +"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&UnitVAT="+this.vatno+"&Status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
    "https://secure.medeil.io/birt/frameset?__report=MedeilReports/&BranchRefID={{branchid}}&LocName={{locname}}&LocRefID={{locrefid}}&CompanyRefID={{companyrefid}}&fromdate={{reportvar}}&todate={{reportvar1}}&UnitVAT={{vatno}}&Status=0"
  }

  salRetVATRep() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/VAT/vat_salesreturn.rptdesign&BranchRefID="+this. branchid + "&LocName="+this.locname +"&LocRefID=" + this.locrefid +"&CompanyRefID="+ this.companyrefid +"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&UnitVAT="+this.vatno+"&Status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
    "https://secure.medeil.io/birt/frameset?__report=MedeilReports/VAT/vat_salesreturn.rptdesign&BranchRefID={{branchid}}&LocName={{locname}}&LocRefID={{locrefid}}&CompanyRefID={{companyrefid}}&fromdate={{reportvar}}&todate={{reportvar1}}&UnitVAT={{vatno}}&Status=0"

  }

  dailySalRep() {

    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/DailySalesReport/DailySalesReport.rptdesign&branchrefid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&companyrefid="+ this.companyrefid +"&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
    "https://secure.medeil.io/birt/frameset?__report=MedeilReports/DailySalesReport/DailySalesReport.rptdesign&branchrefid={{branchid}}&locname={{locname}}&locrefid={{locrefid}}&companyrefid={{companyrefid}}"
  }

  weeklySalRep() {

    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/BydateSalesReport/BydateSalesReport.rptdesign&branchrefid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&companyrefid="+ this.companyrefid +"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
    "https://secure.medeil.io/birt/frameset?__report=MedeilReports/BydateSalesReport/BydateSalesReport.rptdesign&branchrefid={{branchid}}&locname={{locname}}&locrefid={{locrefid}}&companyrefid={{companyrefid}}&fromdate={{reportvar}}&todate={{reportvar1}}"

  }

  AccSalesRep() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccumalatedSalesReport/AccumalatedSalesReport.rptdesign&branchrefid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&companyrefid="+ this.companyrefid +"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
    "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccumalatedSalesReport/AccumalatedSalesReport.rptdesign&branchrefid={{branchid}}&locname={{locname}}&locrefid={{locrefid}}&companyrefid={{companyrefid}}&fromdate={{reportvar}}&todate={{reportvar1}}"
  }


  VATExcempt() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Vat_Exempt%20Report/Sales_vat_exempt.rptdesign&Branchrefid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&Companyrefid="+ this.companyrefid +"&FromDate="+this.reportvar+"&Todate="+this.reportvar1+"&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

    "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Vat_Exempt%20Report/Sales_vat_exempt.rptdesign&Branchrefid={{branchid}}&locname={{locname}}&locrefid={{locrefid}}&Companyrefid={{companyrefid}}&FromDate={{reportvar}}&ToDate={{reportvar1}}"

  }

  TransRep() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Transaction%20Report/compelete_transaction_report.rptdesign&Branch refid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&Company refid="+ this.companyrefid +"&Form Date="+this.reportvar+"&To date="+this.reportvar1+"&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

    "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Transaction%20Report/compelete_transaction_report.rptdesign&Branch refid={{branchid}}&locname={{locname}}&locrefid={{locrefid}}&Company refid={{companyrefid}}&From Date={{reportvar}}&To Date={{reportvar1}}"

  }


  salNonPres() {

    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/SOL_NonPrescription/SOL_NonPrescription.rptdesign&Branch refid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&companyrefid="+ this.companyrefid +"&FromDate="+this.reportvar+"&ToDate="+this.reportvar1+"&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

    // https://secure.medeil.io/birt/frameset?__report=MedeilReports/SOL_NonPrescription/SOL_NonPrescription.rptdesign&branchrefid={{branchid}}&locname={{locname}}&locrefid={{locrefid}}&companyrefid={{companyrefid}}}"
  }

  Salescancellation() {
    this.reportshow = true;
    // href="https://secure.medeil.io/birt/frameset?__report=MedeilReports/sales_cancellation/sales_cancellation.rptdesign&branchid={{branchid}}&locname={{locname}}&locrefid={{locrefid}}&companyrefid={{companyrefid}}&from_date={{reportvar}}&to_date={{reportvar1}}&status=0"
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/sales_cancellation/sales_cancellation.rptdesign&branchid="+this. branchid + "&locname="+this.locname +"&locrefid=" + this.locrefid +"&companyrefid="+ this.companyrefid +"&from_date="+this.reportvar+"&to_date="+this.reportvar1+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
}

