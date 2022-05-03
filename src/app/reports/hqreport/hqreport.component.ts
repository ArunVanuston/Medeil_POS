
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppComponent } from '../../app.component';
import { hqReportServices } from './hqreport.service';




@Component({
  selector: 'app-hqreport',
  templateUrl: './hqreport.component.html',
  providers: [hqReportServices]
})
export class HqreportComponent implements OnInit {
  private myForm: FormGroup;
  companyrefid = [];
  branchrefid = [];
  shopid = [];
  branchref;
  companyref;
  patientid = [];
  reportvar;
  reportvar1;
  patname: any;
  branchid: any;
  locname: any;
  locrefid: any;
  companyid: any;
  status: number = 0;
  stranferno: number;
  rackno: any;
  shelfno: any;
  indentno: any;
  stransno;
  indtno;
  pi_date;
  batch_no;
  pi_no;
  distributorId = [];
  dname;
  productinfo = [];
  date: any;
  phcompany: any;
  country = [];
  state = [];
  city = [];
  countrycode = [];
  shoplist = [];
  distlist = [];
  varcity;
  varshop;
  shopvar;
  distvar;
  constructor(private hqservice: hqReportServices, private formBuilder: FormBuilder) { }


  getBranch() {
    this.hqservice.getBranch(this.myForm.get('company').value).subscribe(data => this.branchrefid = data, err => {
      console.log('Error occured On getBranch()');
    })
  }

  getShop() {
    {
      this.hqservice.getShopName(this.myForm.get('branchname').value).subscribe(data => this.shopid = data, err => {
        console.log('Error occured On getShop()');
      })
    }


  }


  ngOnInit() {
    this.myForm = this.formBuilder.group({
      from_date: ['', Validators.required],
      to_date: ['', Validators.required],
      custname: ['', []],
      indentno: ['', Validators.required],
      stranferno: ['', Validators.required],
      rack: ['', []],
      shelf: ['', Validators.required],
      pidate: ['', Validators.required],
      batchno: ['', Validators.required],
      pino: ['', Validators.required],
      distname: ['', []],
      countryid: ['', []],
      stateid: ['', []],
      city: ['', []],
      countrycode: ['', []],
      company: ['', []],
      branchname: ['', []],
      shop: ['', []],
      shopwise: ['', []],
      pcompany: ['', Validators.required],
      distributor: ['', []]
    });

    //this.companyrefid= AppComponent.companyID;
    this.branchid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
    this.companyid = AppComponent.companyID;
    this.myForm.get('branchname').setValue('opt1');
    this.myForm.get('company').setValue('opt1');
    // this.myForm.get('shop').setValue('opt1');
    // this.myForm.get("from_date").value;
    // this.myForm.get("to_date").value;
    this.myForm.get('distname').setValue('opt1');
    this.myForm.get('custname').setValue('opt1');
    this.myForm.get('countryid').setValue("0");
    this.myForm.get('stateid').setValue("0");
    this.myForm.get('city').setValue("0");
    this.myForm.get('countrycode').setValue("0");
    this.hqservice.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error Occured getCountry()');
      });
    this.hqservice.getDistributorInfo().subscribe(data => this.distributorId = data,
      err => {
        console.log('Error Occured ');
      });
    this.hqservice.getAllCompany().subscribe(data => this.companyrefid = data,
      err => {
        console.log('Error Occured ');
      });

    this.myForm.get('custname').setValue('opt1');
    this.hqservice.getCustomerInfo().subscribe(data => this.patientid = data,
      err => {
        console.log('Error Occured ');

      });

    this.hqservice.getshop(this.companyid, 16).subscribe(data => this.shoplist = data,
      err => {
        console.log('Error Occured Get shop');
      });
    this.shopvar = this.myForm.get('shop').value;
    this.hqservice.getdist(this.companyid, 15).subscribe(data => this.distlist = data,
      err => {
        console.log('Error Occured Get shop');
      });
    this.distvar = this.myForm.get('distributor').value;
  }

  setDateRange(): void {
    // Set date range (today) using the patchValue function
    let date = new Date();
    this.myForm.patchValue({
      from_date: {
        beginDate: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        },
        // endDate: {
        //     year: date.getFullYear(),
        //     month: date.getMonth() + 1,
        //     day: date.getDate()
        // }
      }
    });
    let date2 = new Date();
    this.myForm.patchValue({
      to_date: {
        // beginDate: {
        //     year: date2.getFullYear(),
        //     month: date2.getMonth() + 1,
        //     day: date2.getDate()
        // },
        endDate: {
          year: date2.getFullYear(),
          month: date2.getMonth() + 1,
          day: date2.getDate()
        }
      }
    });
  }

  getCustomer() {
    this.patname = this.myForm.get('custname').value;

  }

  getState() {
    this.hqservice.getStates(this.myForm.get('countryid').value).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });

    this.hqservice.getCountrycode(this.myForm.get('countryid').value).subscribe(data => {
      this.countrycode = data,
        this.myForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Country Code');
      });
  }

  getCity() {
    this.hqservice.getCity(this.myForm.get('stateid').value).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  cityid() {
    this.varcity = this.myForm.get('city').value;

  }

  getDistributor() {
    this.dname = this.myForm.get("distname").value;
  }

  view() {

    this.branchref = this.myForm.get("branchname").value;
    this.companyref = this.myForm.get("company").value;
    this.varshop = this.myForm.get("shop").value;
    this.shopvar = this.myForm.get('shopwise').value;
    this.distvar = this.myForm.get('distributor').value;
  }

  datefetch() {
    this.reportvar = this.myForm.get("from_date").value;
    this.reportvar1 = this.myForm.get("to_date").value;

  }

}



