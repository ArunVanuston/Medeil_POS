import { Addsubmodulevalues } from '../submodules';
import { DataSubmodules } from '../submodules.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AdminLayoutComponent } from '../../layouts/admin/admin-layout.component';
import { AppComponent } from '../../app.component';

import { Router } from '@angular/router';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { LoginComponent } from 'app/userlogin/login/login.component';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addsubmodules',
  templateUrl: './addsubmodules.component.html',
  providers: [NotificationsComponent, AdminLayoutComponent, dateFormatPipe]
})

export class AddsubmodulesComponent implements OnInit {
  mysubmodules: FormGroup;
  addsubmodule = new Addsubmodulevalues;
  submoduleid: any;         // submodules
  subproduct: any; // product
  subdomain: any; // domain
  submodulesubdomain: any; // subdomain
  submodulemodules: any;
  submodulesubmodules: any;
  modules: Addsubmodulevalues[];
  selectedsubModules: Addsubmodulevalues;
  deviceObj;
  constructor(private dataService: DataSubmodules,private appComponent: AppComponent, private dateformat: dateFormatPipe, private router: Router, private notificationsComponent: NotificationsComponent,
    private location: Location,private modalService: NgbModal) { }

  ngOnInit() {
    let countryid = new FormControl('opt1', Validators.required);
    let productid = new FormControl('opt1', Validators.required);
    let domainrefid = new FormControl('opt1', Validators.required);
    let subdomainrefid = new FormControl('opt1', Validators.required);
    let modulerefid = new FormControl('opt1', Validators.required);
    let submodulename = new FormControl('opt1', Validators.required);
    let submodulecode = new FormControl();
    let url = new FormControl('', Validators.required);
    let status = new FormControl(0, Validators.required);
    let approvalprocess = new FormControl(0, Validators.required);
    let createdby = new FormControl(sessionStorage.getItem("indvuserid"));
    let newsubmodule = new FormControl();
    let icon = new FormControl('', Validators.required);


    this.mysubmodules = new FormGroup({
      countryid: countryid,
      productid: productid,
      domainrefid: domainrefid,
      subdomainrefid: subdomainrefid,
      modulerefid: modulerefid,
      submodulename: submodulename,
      submodulecode: submodulecode,
      url: url,
      status: status,
      approvalprocess: approvalprocess,
      createdby: createdby,
      newsubmodule:newsubmodule,
      icon: icon
    });

    this.getmodulescountry();
  }

   // country in submodules
   getmodulescountry() {
    this.dataService.getmodulescountry().then(submoduleid => this.submoduleid = submoduleid);  // country access
  }

  // get product name by country
  getsubmoduleproduct() {
    this.mysubmodules.get('productid').setValue('opt1');
    this.dataService.getmoduleproductid(this.mysubmodules.get('countryid').value).
      subscribe(subproduct => this.subproduct = subproduct);
  }

    // get domain name by product
    getsubmoduledomain() {
      this.mysubmodules.get('domainrefid').setValue('opt1');
      this.dataService.getmoduledomainid(this.mysubmodules.get('countryid').value,
        this.mysubmodules.get('productid').value).
        subscribe(subdomain => this.subdomain = subdomain);
    }

  // get subdomain name by domain
  getsubmodulesubdomain() {
    this.mysubmodules.get('subdomainrefid').setValue('opt1');
    this.dataService.getsubmodulesubdomain(this.mysubmodules.get('countryid').value,
      this.mysubmodules.get('productid').value,
      this.mysubmodules.get('domainrefid').value).
      subscribe(submodulesubdomain => this.submodulesubdomain = submodulesubdomain);
  }

  // get module name by subdomain
  getsubmodulemodules() {
    this.mysubmodules.get('modulerefid').setValue('opt1');
    this.dataService.getsubmodulemodules(this.mysubmodules.get('countryid').value,
      this.mysubmodules.get('productid').value,
      this.mysubmodules.get('domainrefid').value,
      this.mysubmodules.get('subdomainrefid').value).
      subscribe(submodulemodules => this.submodulemodules = submodulemodules);
  }

   // get module name by subdomain
   getsubmodulesubmodules() {
    this.mysubmodules.get('submodulename').setValue('opt1');
    this.dataService.getsubmodulesubmodules(this.mysubmodules.get('countryid').value,
      this.mysubmodules.get('productid').value,
      this.mysubmodules.get('domainrefid').value,
      this.mysubmodules.get('subdomainrefid').value,this.mysubmodules.get('modulerefid').value).
      subscribe(submodulesubmodules => this.submodulesubmodules = submodulesubmodules);
  }

  //new sub-module Popup
  submodulepopup(selvalue, popupname){
    if (selvalue == "newsubmodulename") {
      this.openmain(popupname);
    }
    else {
      this.newsubmodule=false;
    }
  }

newsubmodule:boolean=false;
SaveNewSubModule(c){
  let newsubmodule=this.mysubmodules.get('newsubmodule').value;
  this.mysubmodules.get('submodulename').setValue(newsubmodule);
  this.newsubmodule=true;
  c('Close click')
}

submodulevalidate(): boolean{
  if(this.mysubmodules.get('countryid').value=="opt1" || this.mysubmodules.get('countryid').value=='')
    {     
     this.notificationsComponent.addToast({title:'Error', msg:'CountryName must Not be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }else if(this.mysubmodules.get('productid').value=="opt1" || this.mysubmodules.get('productid').value=='')
    {    
      this.notificationsComponent.addToast({title:'Error', msg:'ProductName must Not be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }else if(this.mysubmodules.get('domainrefid').value=="opt1" || this.mysubmodules.get('domainrefid').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Domain Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }
    else if(this.mysubmodules.get('subdomainrefid').value=="opt1" || this.mysubmodules.get('subdomainrefid').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Sub-Domain Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }else if(this.mysubmodules.get('modulerefid').value=="opt1" || this.mysubmodules.get('modulerefid').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Module Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }else if(this.mysubmodules.get('submodulename').value=="opt1" || this.mysubmodules.get('submodulename').value=="newsubmodulename" || this.mysubmodules.get('submodulename').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Sub-Module Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }
  return true;
}

  onSubmit() {
    let reflag=this.submodulevalidate();
    if(reflag){
    let submodulecode=this.mysubmodules.get('submodulename').value;  
    let modulecode=this.mysubmodules.get('modulerefid').value;
    let subdomaincode= this.mysubmodules.get('subdomainrefid').value;
    let domaincode= this.mysubmodules.get('domainrefid').value;
    let productcode= this.mysubmodules.get('productid').value;
    let countrycode= this.mysubmodules.get('countryid').value;
    this.mysubmodules.get('submodulecode').setValue(submodulecode.substring(0,3)+"_"+modulecode+"_"+subdomaincode+"_"+domaincode+"_"+productcode+"_"+countrycode);

      this.dataService.subcreate(JSON.stringify(this.mysubmodules.value)).subscribe(data => { 
        if(data){
          this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Sub-Module Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.mysubmodules.reset();
          this.ngOnInit();
        }
  
      },err=>{
        if (err.status == 400) {
          this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Module Already Exists', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
        else{
          this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'Module Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }   
      
      });  
    }
    
  }


  //popup properties
closeResult: string;
openmain(popupname) {
  this.modalService.open(popupname).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


  view(): void {
    this.router.navigate(['SubModule/ViewSubModule']);
  }


  


}
