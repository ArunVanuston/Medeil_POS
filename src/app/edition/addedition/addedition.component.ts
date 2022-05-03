import { Component, OnInit, ViewChild } from '@angular/core';
import { EditionService } from '../edition.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { AppComponent } from 'app/app.component';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import { TranslateService } from 'ng2-translate';

const textnumbers = '^[0-9]*$';
const txtnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
@Component({
  selector: 'app-addedition',
  templateUrl: './addedition.component.html',
  styleUrls: ['./addedition.component.css'],
  providers: [NotificationsComponent, EditionService, dateFormatPipe]
})
export class AddeditionComponent implements OnInit {
  @ViewChild('editionName') eName: any;
  editionForm: FormGroup;
  country = [];
  prodcutlist = [];
  domainlist = [];
  subdomainlist = [];
  mymodule: any;
  submodule: any;
  submitted = false;
  deviceObj;
  constructor(private editionService: EditionService, private appComponent: AppComponent, private dateformat: dateFormatPipe, private router: Router,
    private notificationsComponent: NotificationsComponent,private modalService: NgbModal) {
    const countryid = new FormControl();
    const domainrefid = new FormControl();
    const productid = new FormControl();
    const subdomainrefid = new FormControl();
    const editioncode = new FormControl();
    const moduleid = new FormControl();
    const submoduleid = new FormControl();
    const editionname = new FormControl();
    const version = new FormControl('', Validators.pattern(txtnumbers));
    const releasedate = new FormControl();
    const currency = new FormControl();
    const amount = new FormControl();
    //const users = new FormControl('', Validators.pattern(textnumbers));
    const description = new FormControl();
    const clientrole = new FormControl();
    const ranking = new FormControl();
    const newedition = new FormControl();
    

    //  const days = new FormControl('', Validators.pattern(textnumbers));

    const editiontype = new FormControl();
    const status = new FormControl();
    this.editionForm = new FormGroup({
      countryid: countryid,
      domainrefid: domainrefid,
      productid: productid,
      subdomainrefid: subdomainrefid,
      editioncode: editioncode,
      editionname: editionname,
      version: version,
      releasedate: releasedate,
      //days: days,
      currency: currency,
      amount: amount,
      editiontype: editiontype,
      status: status,
      description: description,
      clientrole:clientrole,
      newedition:newedition,
      ranking:ranking
    });

  }


  //alertresponse:any;
  ngOnInit() {
    //TO SET PLACEHOLDER FOR DROPDOWN LIST
    this.editionForm.get('countryid').setValue("opt1");
    this.editionForm.get('domainrefid').setValue("opt1");
    this.editionForm.get('productid').setValue("opt1");
    this.editionForm.get('subdomainrefid').setValue("opt1");
    this.editionForm.get('ranking').setValue("opt1");
    this.editionForm.get('editionname').setValue('opt1');
    this.editionForm.get('status').setValue("0");
    this.editionService.getcountry().subscribe(data => {
      this.country = data,
        err => {
          console.log('Error occured On getcountry()');
        }
    });

    // let deflang=this.translate.getDefaultLang();
    // if(deflang=='en'){
    //   fetch("/assets/i18n/en.json").then(response => {
    //     return response.json();
    //   }).then(data =>{this.alertresponse=data.generalsettings});
    // }else if(deflang=='fr'){
    //   fetch("/assets/i18n/fr.json").then(response => {
    //     return response.json();
    //   }).then(data =>{this.alertresponse=data.generalsettings});
    // }
  }

  amount: number = 0;
  editionlist=[];
  geteditiontype(event) {
    if (event == 0) {
      this.amount = 1;
      this.editionForm.get('editiontype').setValue(0)
      this.editionForm.get('amount').setValue(0);
      this.editionService.geteditionlist(this.editionForm.get('countryid').value, this.editionForm.get('productid').value, this.editionForm.get('domainrefid').value, this.editionForm.get('subdomainrefid').value, event).subscribe(data => this.editionlist = data,
        err => {
          console.log('Error occured On getedition()');
        });
    } else {
      this.amount = 0;
      this.editionForm.get('editiontype').setValue(1)
      this.editionService.geteditionlist(this.editionForm.get('countryid').value, this.editionForm.get('productid').value, this.editionForm.get('domainrefid').value, this.editionForm.get('subdomainrefid').value, event).subscribe(data => this.editionlist = data,
        err => {
          console.log('Error occured On getedition()');
        });
      this.editionForm.get('amount').setValue('');
    }
  }

  //new edition select Popup
  neweditionshow:boolean=false;
  editionselect(selvalue, popupname){
    if (selvalue == "neweditionname") {
      this.openmain(popupname);
    }
    else {
      this.neweditionshow=false;
    }
  }

  //save new Edition
  SaveNewEdition(c){
    let newedition=this.editionForm.get('newedition').value;
    this.editionForm.get('editionname').setValue(newedition);
    this.neweditionshow=true;
    c('Close click')
  }

  getProduct() {
    this.editionService.getProduct(this.editionForm.get('countryid').value).subscribe(data => this.prodcutlist = data,
      err => {
        console.log('Error occured On getProduct()');
      });
  }

  getDomains() {
    this.editionService.getDomain(this.editionForm.get('countryid').value, this.editionForm.get('productid').value).subscribe(data => this.domainlist = data,
      err => {
        console.log('Error occured On getdomain()');
      });
  }

  getCurrency() {
    this.editionService.getCurrency(this.editionForm.get('countryid').value).subscribe(data => this.editionForm.get('currency').setValue(data[0]),
      err => {
        console.log('Error occured On getCurrency()');
      });
  }

  getSubdomain() {
    this.editionService.getSubdomainid(this.editionForm.get('countryid').value, this.editionForm.get('productid').value, this.editionForm.get('domainrefid').value).subscribe(data => {
      this.subdomainlist = data;
      if (data == '' || data == null) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Domain Not Availabe For the Given Domain', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    },
      err => {
        console.log('Error occured On getsubdomain()');
      });
  }

  justInitiate() {
    this.deviceObj = {
      userid: AppComponent.userID,
      companyrefid: AppComponent.companyID,
      branchrefid: AppComponent.branchID,
      locname: AppComponent.locRefName1,
      locrefid: AppComponent.locrefID1,
      ipaddress: this.appComponent.ipAddress,
      browsertype: this.appComponent.browser,
      ostype: this.appComponent.os,
      osversion: this.appComponent.osversion,
      devicetype: this.appComponent.devicetype,
      apiname: '',
      description: '',
      clientcdate: this.dateformat.transform04()

    };

  }

  returnFlag: boolean = false;
  editionValidation(): boolean {        //this.alertresponse.barcode 'Country Select is required..'
    if (this.editionForm.get('countryid').value == 'opt1' || this.editionForm.get('countryid').value == '' || this.editionForm.get('countryid').value == null || this.editionForm.get('countryid').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Country Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('productid').value == 'opt1' || this.editionForm.get('productid').value==''||this.editionForm.get('productid').value==null||this.editionForm.get('productid').value==undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'ProductName Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('domainrefid').value == 'opt1'|| this.editionForm.get('domainrefid').value == ''||this.editionForm.get('domainrefid').value == null||this.editionForm.get('domainrefid').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Domain Name Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('subdomainrefid').value == 'opt1'||this.editionForm.get('subdomainrefid').value == ''||this.editionForm.get('subdomainrefid').value == null||this.editionForm.get('subdomainrefid').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Domain Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('editionname').value == 'opt1' || this.editionForm.get('editionname').value == '' || this.editionForm.get('editionname').value == null || this.editionForm.get('editionname').value==undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Name must Not be Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('version').value == '' || this.editionForm.get('version').value == null || this.editionForm.get('version').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Version Is-required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('releasedate').value == '' || this.editionForm.get('releasedate').value == null || this.editionForm.get('releasedate').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Release Date Is-required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('clientrole').value == '' || this.editionForm.get('clientrole').value == null || this.editionForm.get('clientrole').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Client Role', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('ranking').value == 'opt1' || this.editionForm.get('ranking').value==''||this.editionForm.get('ranking').value==null||this.editionForm.get('ranking').value==undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Ranking Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.editionForm.get('description').value == '' || this.editionForm.get('description').value == null || this.editionForm.get('description').value == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter Description', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // if (this.editionForm.get('days').value == '' || this.editionForm.get('days').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Days Is-required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (true) {
      var str = this.editionForm.get('editionname').value;
      var res = str.substring(0, 3);
      this.editionForm.get('editioncode').setValue(res.toUpperCase());
    }
    return true;
  }

  onSubmit(): any {
    this.submitted = true;
    this.returnFlag = this.editionValidation();
    if (this.returnFlag == true) {
      this.editionService.checkExistedition(this.editionForm.get('countryid').value, this.editionForm.get('productid').value,
        this.editionForm.get('domainrefid').value, this.editionForm.get('subdomainrefid').value,
        this.editionForm.get('editionname').value, this.editionForm.get('version').value).subscribe(data => {
          if (data == 1) {
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Name Already exist', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            this.eName.nativeElement.focus();
          }
          else {
            this.editionService.createRecord(JSON.stringify(this.editionForm.value)).subscribe(data =>
              {
                if(data){
                  this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Edition Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                  this.ngOnInit();
                }else{
                  this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
                }
              },err => {
              this.justInitiate();
              this.deviceObj.apiname = "api/saveEditiondata";
              this.deviceObj.description = "Edition Created";

              this.editionService.deviceDetails(JSON.stringify(this.deviceObj))
                .subscribe(data => { },
                  errorCode => console.log(errorCode));
                  console.log('Error On Domain createRecord()')
            });
            this.editionForm.reset();
            this.country = [];
            this.prodcutlist = [];
            this.domainlist = [];
            this.subdomainlist = [];
          }
        },err => {
            console.log('Error occured On checkExistedition()');
          })
    }
  }


  view(): void {
    this.router.navigate(['Edition/ViewEdition']);
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

}


