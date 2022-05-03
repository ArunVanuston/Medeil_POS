import {SubdomainService} from '../subdomain.service';
import {Component, OnInit,ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {NotificationsComponent }  from  '../../notifications/notifications.component';
import { AdminLayoutComponent } from '../../layouts/admin/admin-layout.component';
import {dateFormatPipe }  from  '../../notifications/notifications.datepipe';
import {AppComponent} from '../../app.component';
import { LoginComponent } from 'app/userlogin/login/login.component';

@Component({
  selector: 'app-addsubdomain',
  templateUrl: './addsubdomain.component.html',
  providers:[NotificationsComponent,AdminLayoutComponent,dateFormatPipe]
})
 
export class AddsubdomainComponent implements OnInit {
  @ViewChild('subdomainName') subDom: any;
  subDomainForm: FormGroup;
  country=[];
  subdomain=[];
  productname=[];
  domainname=[];
  deviceObj;
  constructor(private domainService: SubdomainService, private router: Router,private notificationsComponent:NotificationsComponent,
    private adminLayoutComponent:AdminLayoutComponent,private dateformatPipe:dateFormatPipe, private appComponent:AppComponent, 
    private dateformat: dateFormatPipe) {  }

  ngOnInit() {
    const countryid = new FormControl('opt1');
    const domainrefid = new FormControl('opt1');
    const productid = new FormControl('opt1');
    const subdomainname = new FormControl('opt1'); 
    const subdomaincode = new FormControl();   
    const status = new FormControl(0);
    const createdby = new FormControl(sessionStorage.getItem("indvuserid"));


    this.subDomainForm = new FormGroup({
      createdby : createdby,
      countryid: countryid,
      domainrefid: domainrefid,    
      productid: productid,
      subdomainname: subdomainname,
      subdomaincode :subdomaincode,
      status: status
    });
    this.getCountry();
  }

  getCountry() {
    this.domainService.getdomaincountry().then(data => this.country = data);
  }


  getproduct() {
    this.subDomainForm.get('productid').setValue('opt1');
    this.domainService.getproduct(this.subDomainForm.get('countryid').value).subscribe(data => this.productname = data,
    err=>
    {
    console.log("Error Occur On getproduct()");
  });
}
  

  getdomain() {
    this.subDomainForm.get('domainrefid').setValue('opt1');
    this.domainService.getdomain(this.subDomainForm.get('productid').value).subscribe(data => {this.domainname = data},
      err=>
      {
      console.log("Error Occur On getproduct()");
    });
  }

  
  getsubdomain() {
    this.subDomainForm.get('subdomainname').setValue('opt1');
    this.domainService.getsubdomain().subscribe(data => this.subdomain = data,
      err=>
      {
      console.log("Error Occur On getproduct()");
    });
  }

  
subDomainValidation():boolean{  
  if(this.subDomainForm.get('countryid').value=="opt1" || this.subDomainForm.get('countryid').value==null)
  { 
    this.notificationsComponent.addToast({title:'Error Message', msg:'Please Select Your Country..', timeout: 5000, theme:'default', position:'top-right',type:'error'});
    return false;
  }else if(this.subDomainForm.get('productid').value=="opt1" || this.subDomainForm.get('productid').value==null)
  { 
    this.notificationsComponent.addToast({title:'Error Message', msg:'Please Select Your ProdutnName..', timeout: 5000, theme:'default', position:'top-right',type:'error'});
    return false;
  }else if(this.subDomainForm.get('domainrefid').value=="opt1" || this.subDomainForm.get('domainrefid').value==null)
  { 
    this.notificationsComponent.addToast({title:'Error Message', msg:'Please Select Your DomainName..', timeout: 5000, theme:'default', position:'top-right',type:'error'});
    return false;
  }else if(this.subDomainForm.get('subdomainname').value=="opt1" || this.subDomainForm.get('subdomainname').value==null)
  { 
    this.notificationsComponent.addToast({title:'Error Message', msg:'Please Select Your SubDomainName..', timeout: 5000, theme:'default', position:'top-right',type:'error'});
    return false;
  }

  return true;
}

onSubmit():any { 
  let reFlag=this.subDomainValidation();
  if(reFlag){
    let subdomaincode= this.subDomainForm.get('subdomainname').value;
    let domaincode= this.subDomainForm.get('domainrefid').value;
    let productcode= this.subDomainForm.get('productid').value;
    let countrycode= this.subDomainForm.get('countryid').value;
    // fro ref domain index value get
    let domainindex = this.domainname.findIndex(p => p[0] == domaincode);
    let domainindexvalue=this.domainname[domainindex][1];
  
    this.subDomainForm.get('subdomainname').setValue(domainindexvalue+" "+subdomaincode);
    this.subDomainForm.get('subdomaincode').setValue(subdomaincode.substring(0,3)+"_"+domaincode+"_"+productcode+"_"+countrycode);
    this.domainService.saveSubdomain(this.subDomainForm.value).subscribe(data=>{
      if(data){
        this.notificationsComponent.addToast({title:'Sucess', msg:'Sub-Domain Saved Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
        this.ngOnInit();
      }
    },err=>{
      console.log('Error Occured On createSubdomain()');
      if (err.status == 400) {
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Sub-Domain Already Exists', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        this.subDomainForm.reset();
        this.ngOnInit();
      }
      else{
        this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'Sub-Domain Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }   
    });
    
  }
}



viewSubDomain(): void{
  this.router.navigate(['SubDomain/ViewSubDomain']);
}

}

