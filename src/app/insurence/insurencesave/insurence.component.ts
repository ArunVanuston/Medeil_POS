import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { custSaveService } from 'app/regform/customer/custSave/custSave.service';
import { RightpanelComponent } from 'app/rightpanel/rightpanel.component';
import { slsInvSaveService } from 'app/sales/salesinvoice/multisalesinvoice/multisalesinvoiceservice';
import { InsurenceService } from '../insurence.service';


@Component({
  selector: 'app-insurence',
  templateUrl: './insurence.component.html',
  providers: [custSaveService, NotificationsComponent,slsInvSaveService,InsurenceService]
})
export class InsurenceComponent implements OnInit {
  parentMessage = "sales"
  @ViewChild(RightpanelComponent) child  
  @ViewChild('drugfocus') drugfocus: ElementRef;
  Email  =    "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  insurenceForm: FormGroup;
  salesinvcustomers = [];
  doctorslist = [];
  searcheddrugvalues = [];
  countries = [];
  states = [];
  cities = [];
  selobj;
  saveprocess:boolean=false;

  constructor( private formBuilder: FormBuilder, private userService: custSaveService, private notificationsComponent: NotificationsComponent, private SalesinvService: slsInvSaveService,private insureservice: InsurenceService,private router: Router,) {  }

  ngOnInit() {
    this.getdoctor();
    this.selobj = {  locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };

    this.insurenceForm = this.formBuilder.group({
      companyid: [this.selobj.companyid, []],
      branchid: [this.selobj.branchrefid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      address1: ['', [Validators.required]],
      address2: ['', []],
      country: ['opt1', []],
      state: ['opt1', []],
      city: ['opt1', []],
      pincode: ['', []],
      mobileno: ['', [Validators.required]],
      emailid: [, [Validators.pattern(this.Email)]],
      phoneno: ['', []],
      companyname: ['', [Validators.required]],
      shortname: ['', []],
      companytype: ['', []],
      irdacode: ['', [Validators.required]],
      insfoundedin: ['', []],
      insheadquarters: ['', [Validators.required]],
      countrycode: ['', []],
      faxno: ['', []],
      website: ['', []],
      insurancepic: ['', []],
      insownername: ['', [Validators.required]],
      status: [0, []],
      doctorrefid: ['0', []],
      patientid: ['', []],
      drugid: ['', []],
      customerrefid: ['', []]
    });

    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));
    
    
  }

    //bind or push All Customers details in select option
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

  //get all doctors List
  getdoctor() {
    let getdoctors = { companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, locname: AppComponent.locRefName1, locrefid: AppComponent.locrefID1 };
    this.SalesinvService.getdoctors(JSON.stringify(getdoctors)).subscribe(data => { this.doctorslist = data },
      error => {
        console.log(error) 
        //this.notificationsComponent.addToast({ title: 'ERROR MSG', msg: error.message, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      });
  }

  viewState() {
    var frmdata = { frmint1: this.insurenceForm.get('country').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewState(JSON.stringify(frmdata)).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));
  }

  viewCity() {
    this.cities = [];
    var frmdata = { frmint1: this.insurenceForm.get('state').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCity(JSON.stringify(frmdata)).subscribe(data => this.cities = data,
      errorCode => console.log(errorCode));
  }

  
  
  seniorvalid(){
    var resval=1;
    let patientid=this.insurenceForm.get('patientid').value
    let companyname=this.insurenceForm.get('companyname').value
    let shortname=this.insurenceForm.get('shortname').value
    let address1=this.insurenceForm.get('address1').value
    let address2=this.insurenceForm.get('address2').value
    let mobno=this.insurenceForm.get('mobileno').value
    let phno=this.insurenceForm.get('phoneno').value
    let countrycode=this.insurenceForm.get('country').value
    let statecode=this.insurenceForm.get('state').value
    let citycode=this.insurenceForm.get('city').value
    if(patientid==''||patientid==null||patientid==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Customer Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(companyname.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Company Name Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(shortname.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Short Name Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if((address1.toString().length>200)) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Address1 Limit 200 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if((address2 != null && address2.toString().length>150)) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Address2 Limit 150 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(countrycode=='opt1'||countrycode==''||countrycode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Country', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(statecode=='opt1'||statecode==''||statecode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(citycode=='opt1'||citycode==''||citycode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select City', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(mobno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Mobile No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(phno != null && phno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Phone No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }
    return resval;
  }

  onSubmit() {
    //var answer = confirm("Save data?");
    let valflag=this.seniorvalid();
    if(valflag==1){
     //this.saveprocess=true;
    this.insureservice.saveinsurance(JSON.stringify(this.insurenceForm.value)).subscribe(data => {
      if (data == 1) {
        this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        setTimeout(() => {
          // this.saveprocess=false;
          this.router.navigate(['/Insurence/ViewInsurence']);
        }, 2000);
      }else {
        //this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      
    },errorCode =>{console.log(errorCode);this.saveprocess=false});
      
  }
  
  }

 

}
