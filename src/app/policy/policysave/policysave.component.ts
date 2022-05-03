import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { slsInvSaveService } from 'app/sales/salesinvoice/multisalesinvoice/multisalesinvoiceservice';
import { Router } from '@angular/router';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-policysave',
  templateUrl: './policysave.component.html',
  providers: [ NotificationsComponent,slsInvSaveService,PolicyService]
})
export class PolicysaveComponent implements OnInit {

  policyForm: FormGroup;
  selobj;
  salesinvcustomers = [];
  doctorslist = [];
  searcheddrugvalues = [];
  saveprocess:boolean=false;

  constructor(private formBuilder: FormBuilder,private notificationsComponent: NotificationsComponent, private SalesinvService: slsInvSaveService,private router: Router,private policyservice: PolicyService,) { } 

  ngOnInit() {
    this.getdoctor();
    this.selobj = {  locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };

    this.policyForm = this.formBuilder.group({
      companyid: [this.selobj.companyid, []],
      branchid: [this.selobj.branchrefid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      policytypename: ['', []],
      policyamount: ['', []],
      policyvalidity: ['', []],
      companyname: ['', [Validators.required]],
      shortname: ['', []],
      companytype: ['', []],
      irdacode: ['', [Validators.required]],
      doctorrefid: ['0', []],
      patientid: ['', []],
      drugid: ['', []],
      customerrefid: ['', []],
      policytype: ['', []],
      policy: ['', []]
    });
  }

  pushallcustomers(data) {
    this.salesinvcustomers = [];
    for (let i = 0; i < data.length; i++) {
      this.salesinvcustomers.push({ value: data[i][0], label: data[i][1] });
    }

  }



searchallcustomers(searchvalue: any) {
  let searchallcustomers = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, searchvalue };
  this.SalesinvService.searchallcustomers(JSON.stringify(searchallcustomers)).subscribe(data => { this.pushallcustomers(data) },
    error => {
      console.log(error)
      this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    });

}

pushalldrugs(drugdata){
  this.searcheddrugvalues = [];
  for (let i = 0; i < drugdata.length; i++) {
    this.searcheddrugvalues.push({ value: drugdata[i][1], label: drugdata[i][0] });
  }
}

searchdrug(searchvalue: any) {
  let searchdrugdata = { companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid, locname: this.selobj.locname, locrefid: this.selobj.locrefid, searchvalue, searchid:1};
      this.SalesinvService.searchdrug(JSON.stringify(searchdrugdata)).subscribe(data => { 
        if (data.length > 0) {
          this.pushalldrugs(data)
          //this.searcheddrugvalues = data;
        } else {
          this.searcheddrugvalues.length = 0;
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'No Match Products', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          //this.drugfocus.nativeElement.value = "";
        }
      },
        error => { console.log(error); });
}

getdoctor() {
  let getdoctors = { companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1 };
  this.SalesinvService.getdoctors(JSON.stringify(getdoctors)).subscribe(data => { this.doctorslist = data },
    error => {
      console.log(error) 
      //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    });
}

onSubmit() {
  //var answer = confirm("Save data?");

   //this.saveprocess=true;
  this.policyservice.savepolicy(JSON.stringify(this.policyForm.value)).subscribe(data => {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        // this.saveprocess=false;
        this.router.navigate(['/Policy/ViewPolicy']);
      }, 2000);
    }else {
      //this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
    
  },errorCode =>{console.log(errorCode);this.saveprocess=false});
    


}

}
