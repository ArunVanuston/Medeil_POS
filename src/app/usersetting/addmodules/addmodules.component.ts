import { Addmodule } from '../addmodule';
import { DataModules } from '../modules.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NotificationsComponent }  from  '../../notifications/notifications.component';
import { AdminLayoutComponent } from '../../layouts/admin/admin-layout.component';

import { Router  } from '@angular/router';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { LoginComponent } from 'app/userlogin/login/login.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addmodules',
  templateUrl: './addmodules.component.html',
  providers:[NotificationsComponent,AdminLayoutComponent, dateFormatPipe]

})
export class AddmodulesComponent implements OnInit {
mymodules: FormGroup;

   countrylist:any;
   product: any;
   domain: any;            
   subdomain: any;
   labels:any;
   module:any;
  
  constructor(private dataService: DataModules,private appComponent: AppComponent, private dateformat: dateFormatPipe,  private router: Router,
    private notificationsComponent:NotificationsComponent, private location: Location, private modalService: NgbModal)   { }

  ngOnInit() {
    let countryid = new FormControl('opt1', Validators.required);
    let productid = new FormControl('opt1', Validators.required);
    let domainrefid = new FormControl('opt1', Validators.required );
    let subdomainrefid = new FormControl('opt1', Validators.required);
    let label = new FormControl('opt1', Validators.required);
    let modulename = new FormControl('opt1', Validators.required);
    let modulecode = new FormControl();
    let icon = new FormControl('', Validators.required);
    let status = new FormControl(0, Validators.required);
    let createdby = new FormControl(sessionStorage.getItem("indvuserid"));
    //for new add popup
    let newlabel = new FormControl();
    let newmodule = new FormControl();

    this.mymodules = new FormGroup({
      createdby : createdby,
      countryid: countryid,
      productid: productid,
      domainrefid: domainrefid,
      subdomainrefid: subdomainrefid,
      label: label, 
      modulename: modulename,
      modulecode:modulecode,
      icon: icon,
      status: status,
      newlabel:newlabel,
      newmodule:newmodule
      });

      this.getmodulecountry();
  }

  // modules byid country
  getmodulecountry() {
    this.dataService.getmodulescountry().then(data => this.countrylist = data);
 }


  // product name
  getproduct() {
    this.mymodules.get('productid').setValue('opt1');
    this.dataService.getproduct(this.mymodules.get('countryid').value).
      subscribe(product => this.product = product);
 }

  // domain name
  getdomain() {
   this.mymodules.get('domainrefid').setValue('opt1');
   this.dataService.getdomainid(this.mymodules.get('countryid').value,this.mymodules.get('productid'). value)
   .subscribe(domain => this.domain = domain);
    }

  // subdomain name
  getsubdomain() {
   this.mymodules.get('subdomainrefid').setValue('opt1'); 
   this.dataService.getsubdomainid(this.mymodules.get('countryid').value,this.mymodules.get('productid').value,
     this.mymodules.get('domainrefid').value).subscribe(subdomain => this.subdomain = subdomain);
    }


  getlabelname() {
    this.mymodules.get('label').setValue('opt1');
    this.dataService.getmodulefolder(this.mymodules.get('countryid').value,
    this.mymodules.get('productid').value,
    this.mymodules.get('domainrefid').value, this.mymodules.get('subdomainrefid').value).
    subscribe(data => this.labels = data);
    } 

    
//popup opens
labelpopup(selvalue, popupname){
  if (selvalue == "newlabelname") {
    this.module=[];
    this.mymodules.get('modulename').setValue('opt1');
    this.openmain(popupname);
  }
  else {
    this.newlabel=false;
    this.getmodulename();
  }
}

newlabel:boolean=false;
SaveNewLabel(c){
  let newlabel=this.mymodules.get('newlabel').value;
  this.mymodules.get('label').setValue(newlabel);
  this.newlabel=true;
  c('Close click')
}


  getmodulename() {
      this.mymodules.get('modulename').setValue('opt1');
      this.dataService.getmodulename(this.mymodules.get('countryid').value,
        this.mymodules.get('productid').value,
        this.mymodules.get('domainrefid').value, this.mymodules.get('subdomainrefid').value, this.mymodules.get('label').value).
        subscribe(data => this.module = data);
    }


    
    modulepopup(selvalue, popupname){
      if (selvalue == "newmodulename") {
        this.openmain(popupname);
      }
      else {
        this.newmodule=false;
      }
    }

      
  newmodule:boolean=false;
  SaveNewModule(c){
    let newmodule=this.mymodules.get('newmodule').value;
    this.mymodules.get('modulename').setValue(newmodule);
    this.newmodule=true;
    c('Close click')
  }

modulevalidate(): boolean{
  if(this.mymodules.get('countryid').value=="opt1" || this.mymodules.get('countryid').value=='')
    {     
     this.notificationsComponent.addToast({title:'Error', msg:'CountryName must Not be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }else if(this.mymodules.get('productid').value=="opt1" || this.mymodules.get('productid').value=='')
    {    
      this.notificationsComponent.addToast({title:'Error', msg:'ProductName must Not be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }else if(this.mymodules.get('domainrefid').value=="opt1" || this.mymodules.get('domainrefid').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Domain Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }
    else if(this.mymodules.get('subdomainrefid').value=="opt1" || this.mymodules.get('subdomainrefid').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Sub-Domain Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }else if(this.mymodules.get('label').value=="opt1" || this.mymodules.get('label').value=="newlabelname" || this.mymodules.get('label').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Label Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }else if(this.mymodules.get('modulename').value=="opt1" || this.mymodules.get('modulename').value=="newmodulename" || this.mymodules.get('modulename').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Module Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }
  return true;
}

onSubmit() {
  let reflag=this.modulevalidate();
  if(reflag){
    let modulecode=this.mymodules.get('modulename').value;
    let subdomaincode= this.mymodules.get('subdomainrefid').value;
    let domaincode= this.mymodules.get('domainrefid').value;
    let productcode= this.mymodules.get('productid').value;
    let countrycode= this.mymodules.get('countryid').value;
    this.mymodules.get('modulecode').setValue(modulecode.substring(0,3)+"_"+subdomaincode+"_"+domaincode+"_"+productcode+"_"+countrycode);

    this.dataService.create(JSON.stringify(this.mymodules.value)).subscribe(data => { 
      if(data){
        this.notificationsComponent.addToast({title:'Sucess', msg:'Module Saved Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
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
  
  viewmodule(): void {
    this.router.navigate(['Module/ViewModule']);
   }

}
