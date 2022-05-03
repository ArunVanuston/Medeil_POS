import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {brancheditService} from './editBranch.services';
import {providers} from 'ng2-toasty';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsComponent} from '../../notifications/notifications.component';
import { AppComponent } from 'app/app.component';


@Component({
  selector: 'app-editBranch',
  templateUrl: './editBranch.component.html',
 // styleUrls: ['./editBranch.component.css'],
  providers: [brancheditService,NotificationsComponent]
})

export class brancheditComponent implements OnInit {
  parentMessage = "sales";
  compId: number;
  id: number;
  private branchValue: any;
  branchForm: FormGroup;
  submitted = false;
  companies = [];
  productinfo = [];
  countries = [];
  domain = [];
  subdomain = [];
  edition = [];
  states = [];
  cities = [];
  ccode = [];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private branchinfo: brancheditService, private route: ActivatedRoute,private router: Router,private notificationsComponent: NotificationsComponent ) {
    let id=new FormControl();
    let companyrefid = new FormControl('', Validators.required);
    let branchname = new FormControl('', Validators.required);
    let shortname = new FormControl();    
    let contactperson = new FormControl();
    let desgination = new FormControl();
    let gstno = new FormControl();
    let tinno = new FormControl();
    let cstno = new FormControl();
    let panno = new FormControl();
    let mobileno = new FormControl('', Validators.required);
    let address1 = new FormControl('', Validators.required);
    let address2 = new FormControl();
    let state = new FormControl();
    let country = new FormControl();
    let city = new FormControl();
    let pincode = new FormControl();
    let phoneno = new FormControl();
    let email = new FormControl('', [Validators.pattern(this.emailPattern)]);
    let productrefid = new FormControl();
    let domainrefid = new FormControl();
    let subdomainrefid = new FormControl();
    let editionrefid = new FormControl();
    let username = new FormControl();
    let password = new FormControl();
    let countrycode = new FormControl();


    let modifiedby = new FormControl();
    let clientmdate =new FormControl();

    let clientcdate = new FormControl();
    let createdby = new FormControl();



    this.branchForm = new FormGroup({
      id:id,
      companyrefid :companyrefid,
      branchname: branchname,
      shortname: shortname,
      contactperson: contactperson,
      desgination: desgination,
      gstno: gstno,
      tinno: tinno,
      cstno: cstno,
      panno: panno,
      mobileno: mobileno,
      address1: address1,
      address2: address2,
      state: state,
      country: country,
      city: city,
      pincode: pincode,
      phoneno: phoneno,
      email: email,
      countrycode: countrycode,

      
 clientcdate: clientcdate,
 createdby:createdby,
      modifiedby: modifiedby,
      clientmdate:clientmdate
    });

  } 

  ngOnInit() {

    this.branchValue = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    //alert(AppComponent.userID);
    this.branchForm.get('modifiedby').setValue(AppComponent.userID);

    this.branchForm.get('clientmdate').setValue(AppComponent.date);

    //alert("cleintdte"+this.branchForm.get('clientmdate').value);

     this.branchinfo.getCompany().subscribe(data => this.companies = data,        
      err => {
        console.log('Error Occured ');
      });
    
    this.branchinfo.brancheditservice(this.id).subscribe(data => this.branchForm.patchValue(data),
      err => {
        console.log('Error occured in Company edit ');
      });
    
    
      this.branchinfo.comppeditservice(this.id).subscribe(data => this.companies=data,
      err => {
        console.log('Error occured in Company edit ');
      });
     

    //get Country
    this.branchinfo.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured ');
      });
    

    // Get Edit State 
      this.branchinfo.getEditStates(this.id).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });
    
     // Get Edit State 
      this.branchinfo.getEditCities(this.id).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get States');
      });
    

    //Get Country Code    
    this.branchinfo.getCcode(this.id).subscribe(data => this.ccode = data,
      err => {
        console.log('Error Occured Get Country Code');
      });

     

  }
  
  getCompany(){
    
    this.branchinfo.getCompany().subscribe(data => this.companies = data,
        
      err => {
        console.log('Error Occured ');
      });
  }

  getState() {
    //Get States 
    this.branchinfo.getStates(this.branchForm.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });

    //Get Country Code
    this.branchinfo.getCountrycode(this.branchForm.get('country').value).subscribe(data => this.ccode = data,
      err => {
        console.log('Error Occured Country Code');
      });
  }
  getCity(){
    //Get City
     this.branchinfo.getCities(this.branchForm.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get States');
      });

  }

  private branchValidation(): boolean {
    let branch=this.branchForm.get('branchname').value;
    let short=this.branchForm.get('shortname').value;
    let conperson=this.branchForm.get('contactperson').value;
    let designation=this.branchForm.get('desgination').value;
    let mobno=this.branchForm.get('mobileno').value;
    let address1=this.branchForm.get('address1').value;
    let address2=this.branchForm.get('address2').value;
    if (this.branchForm.get('companyrefid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COMPANY IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (branch.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'First Name Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (short.toString().length>12) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'First Name Maximum 12 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (conperson.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Contact Person Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (designation.toString().length>50) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Designation Maximum 50 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (mobno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Mobile No Maximum 15 Digits', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (address1.toString().length>200) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Address1 Maximum 200 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (address2 != null && address2.toString().length>150) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'Address2 Maximum 150 Characters', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (this.branchForm.get('country').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COUNTRY  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (this.branchForm.get('state').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'STATE  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }else if (this.branchForm.get('city').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'CITY  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }

    return true;
  }

  flag:boolean=false;
  onSubmit() {
    this.submitted = true;
    this.flag = this.branchValidation();
    if (this.flag == true) {
      this.branchinfo.isExistBranch(this.branchForm.get('branchname').value,this.branchForm.get('id').value,AppComponent.companyID).subscribe(data => {     
        if (data == true) {   
         // alert("already exist");   
          this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'BRANCH NAME IS ALREADY EXIST', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        }else{
         // alert("already exist123");
          this.updaterecord();
        }
      });
    }
    // window.location.href = '/branchInfo/viewBranch'; 
   
  }

  private updaterecord(): void {

    this.branchForm.get('clientmdate').setValue(AppComponent.date);
    this.branchForm.get('modifiedby').setValue(AppComponent.userID);

    //alert(JSON.stringify(this.branchForm.value));
    this.branchinfo.updateBranchRecord(JSON.stringify(this.branchForm.value));     
    this.notificationsComponent.addToast({title:'SUCESS MESSAGE', msg:'DATA UPDATED SUCESSFULLY.', timeout: 5000, theme:'default', position:'bottom-right', type:'success'});
    setTimeout(() => {
      this.router.navigate(['Registration/ViewBranchRegistration']);
    }, 2000);
  }
   


}
