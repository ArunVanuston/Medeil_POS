import {Component, OnInit,ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Domain} from '../domain';
import {DomainService} from '../domain.service';
import {NotificationsComponent }  from  '../../notifications/notifications.component';
import { AppComponent} from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'app/userlogin/login/login.component';
@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  providers:[NotificationsComponent, dateFormatPipe]
}) 
export class AddDomainComponent implements OnInit {
  @ViewChild('domainName') dom: any;
  domainForm: FormGroup;
  country=[];
  product=[];
  domain=[];
  flag:any;
  deviceObj;
  productcode:any;

  constructor(private domainService: DomainService,private router: Router,private notificationsComponent:NotificationsComponent,private appComponent: AppComponent, private dateformat: dateFormatPipe,private modalService: NgbModal) {
   
  }

  ngOnInit() {
    
    const countryid = new FormControl('opt1');
    const productid = new FormControl('opt1');
    const domainname = new FormControl('opt1');
    const domaincode = new FormControl();
    const createdby = new FormControl(sessionStorage.getItem("indvuserid"));
   
    this.domainForm = new FormGroup({
      countryid: countryid,
      domainname: domainname,
      domaincode: domaincode,
      productid: productid,
      createdby: createdby
    });

    this.domainService.getdomaincountry().then(data => this.country = data,
      err=>
      {
        console.log(err);
      });
  
  }

  getproduct() {
    this.domainForm.get('productid').setValue('opt1');
    this.domainService.getproduct(this.domainForm.get('countryid').value).subscribe(data => this.product = data,
    err=>
    {
      console.log(err);
    }
    );
  }

  getdomain() {
    this.domainForm.get('domainname').setValue('opt1');
    this.domainService.getdomainlist(this.domainForm.get('countryid').value,this.domainForm.get('productid').value).subscribe(data => this.domain = data,
    err=>
    {
      console.log(err);
    }
    );
  }
  
    
  searchwithcodeformain(event, popupname) {
    if (event == 'nonemain') {
      if (this.domainForm.get('productid').value == "opt1" || this.domainForm.get('productid').value == '') {
        this.notificationsComponent.addToast({ title: 'Alert MESSAGE', msg: 'Select Country & Product Fields', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'warning' });
      }else{
      this.openmain(popupname);
      }
    }
    else {
      return;
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



  
  public validation():boolean{    
    if(this.domainForm.get('countryid').value=="opt1" || this.domainForm.get('countryid').value=='')
    {     
     this.notificationsComponent.addToast({title:'Error', msg:'CountryName must Not be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }else if(this.domainForm.get('productid').value=="opt1" || this.domainForm.get('productid').value=='')
    {    
      this.notificationsComponent.addToast({title:'Error', msg:'ProductName must Not be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }else if(this.domainForm.get('domainname').value=="opt1" || this.domainForm.get('domainname').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Domain Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }
    
    return true;
  }

  SaveDomain(c){
    this.flag=this.validation();
    if(this.flag==true){      
        let domaincode = this.domainForm.get('domainname').value.substring(0,3);
        let productcode = this.domainForm.get('productid').value;
        let countrycode = this.domainForm.get('countryid').value;
        this.domainForm.get('domaincode').setValue(domaincode+"_"+productcode+"_"+countrycode);
        this.domainService.savedomain(this.domainForm.value).subscribe(data=>{
          if(data){
            this.notificationsComponent.addToast({title:'Sucess', msg:'Domain Saved Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
            c('Close click');
            this.ngOnInit();
            //this.router.navigate(['/Domain/ViewDomain']);    
            }
          },err=>{
            if (err.status == 400) {
              this.notificationsComponent.addToast({ title: 'Alert MSG', msg:'Domain Already Exists', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
              c('Close click');
            }
            else{
              this.notificationsComponent.addToast({ title: 'ERROR MSG', msg:'Domain Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
              c('Close click');
            }   
          
          });           
    }
  }


  viewDomain()
  {
      this.router.navigate(['/Domain/ViewDomain']);    
  }
}
