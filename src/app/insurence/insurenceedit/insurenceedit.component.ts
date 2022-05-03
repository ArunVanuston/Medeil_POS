import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { custEditService } from 'app/regform/customer/custEdit/custEdit.service';
import { custSaveService } from 'app/regform/customer/custSave/custSave.service';
import { RightpanelComponent } from 'app/rightpanel/rightpanel.component';
import { slsInvSaveService } from 'app/sales/salesinvoice/multisalesinvoice/multisalesinvoiceservice';

import { InsurenceService } from '../insurence.service';

@Component({
  selector: 'app-insurenceedit',
  templateUrl: './insurenceedit.component.html',
  providers: [custSaveService, NotificationsComponent,custEditService,InsurenceService]
})
export class InsurenceeditComponent implements OnInit {

  parentMessage = "sales"
  private sub: any;

  
  @ViewChild(RightpanelComponent) child  

  Email  =    "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  insurenceForm: FormGroup;
  salesinvcustomers = [];
  doctorslist = [];
  searcheddrugvalues = [];
  countries = [];
  states = [];
  cities = [];
  id: number;
  selobj;
  saveprocess:boolean=false;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute  , private notificationsComponent: NotificationsComponent, private userService: custEditService,private insureservice: InsurenceService,private router: Router ) { }

  ngOnInit() { 
    
    this.selobj = {  locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });
  

    this.insurenceForm = this.formBuilder.group({
      id:['', []],
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

    var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;

    this.insureservice.viewInsurenceEdit(this.id).subscribe(data => this.insurenceForm.patchValue(data),
    errorCode => console.log(errorCode) );


    setTimeout(() => {
      this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => {
        this.countries = data,
        setTimeout(() => {
          this.viewState();
        }, 1200);
      }, errorCode => console.log(errorCode)  );
       
        // this.userService.getcustcityedit(JSON.stringify(custedit)).subscribe(data =>{ this.cities = data, this.viewCity()},
        // errorCode => console.log(errorCode)  ); 
        
        // this.userService.getcuststateedit(JSON.stringify(custedit)).subscribe(data =>{ this.states = data, this.viewState()},
        // errorCode => console.log(errorCode)  );
    }, 1800);


  }


  viewState() {
    var   frmdata={ frmint1 : this.insurenceForm.get('country').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
    this.userService.viewState( JSON.stringify(frmdata) ).subscribe(data => {
      this.states = data;
      setTimeout(() => {
        this.viewCity();
      }, 1200);
    },errorCode => console.log(errorCode));
  }      
       
  viewCity(){
    this.cities=[];
    var   frmdata={ frmint1 :  this.insurenceForm.get('state').value  ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
    this.userService.viewCity(  JSON.stringify(frmdata)   ).subscribe(data => this.cities = data,
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
    // var answer =  confirm("Save data?");
    
     let valflag=this.seniorvalid();
     if(valflag==1){
       this.saveprocess=true;
      
      //  this.insurenceForm.get('modifiedby').setValue(AppComponent.userID);
       this.insureservice.updateInsurence(JSON.stringify(this.insurenceForm.value)).subscribe(data =>{this.savevalid(data)},
       errorCode => {console.log(errorCode),this.saveprocess=false} );
     }
  }
       
  savevalid(data:any){
    if(data==1){ 
      this.saveprocess=false;
      this.notificationsComponent.addToast({title:'Success', msg:'Data Updated Successfully', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
      setTimeout(() => {
        this.router.navigate(['/Insurence/ViewInsurence']);
      }, 2000);
    }else{
      this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
      this.saveprocess=false;
    }
  }   
       

}
