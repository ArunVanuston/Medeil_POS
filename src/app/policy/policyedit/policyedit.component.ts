import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { slsInvSaveService } from 'app/sales/salesinvoice/multisalesinvoice/multisalesinvoiceservice';
import { PolicyService } from '../policy.service';

@Component({
  selector: 'app-policyedit',
  templateUrl: './policyedit.component.html',
  providers: [ NotificationsComponent,slsInvSaveService,PolicyService]
})
export class PolicyeditComponent implements OnInit {

  private sub: any;

  policyForm: FormGroup;
  selobj;
  id: number;
  salesinvcustomers = [];
  doctorslist = [];
  searcheddrugvalues = [];
  saveprocess:boolean=false;

  constructor(private formBuilder: FormBuilder,private notificationsComponent: NotificationsComponent, private SalesinvService: slsInvSaveService,private router: Router,private policyservice: PolicyService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.selobj = {  locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    this.policyForm = this.formBuilder.group({
      id:['', []],
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

    var   frmdata={ frmint1 : this.id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;

    this.policyservice.viewPolicyEdit(this.id).subscribe(data => this.policyForm.patchValue(data),
    errorCode => console.log(errorCode) );

   

  } 

  onSubmit() {
    // var answer =  confirm("Save data?");
    
    
       this.saveprocess=true;
      
      //  this.insurenceForm.get('modifiedby').setValue(AppComponent.userID);
       this.policyservice.updatePolicy(JSON.stringify(this.policyForm.value)).subscribe(data =>{this.savevalid(data)},
       errorCode => {console.log(errorCode),this.saveprocess=false} );
    
  }

  savevalid(data:any){
    if(data==1){ 
      this.saveprocess=false;
      this.notificationsComponent.addToast({title:'Success', msg:'Data Updated Successfully', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
      setTimeout(() => {
        this.router.navigate(['/Policy/ViewPolicy']);
      }, 2000);
    }else{
      this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 
      this.saveprocess=false;
    }
  }  

}
