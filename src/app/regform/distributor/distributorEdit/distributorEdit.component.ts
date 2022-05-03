import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DistributorEditService } from './distributorEdit.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { AppComponent } from '../../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { cardToggle } from 'app/shared/card/card-animation';
import { TranslateService } from 'ng2-translate'; 
import swal from 'sweetalert2';
import { timer } from 'd3';

@Component({
  selector: 'app-patientedit',
  templateUrl: './distributorEdit.component.html',
  animations: [cardToggle],
  providers: [DistributorEditService, NotificationsComponent, dateFormatPipe]
})

export class DistributorEditComponent implements OnInit {
  alertmsgs:any;
  cardToggle: string = 'collapsed';
  parentMessage = "sales";
  email = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,4}$";
  registerForm: FormGroup;
  id: number;
  private sub: any;
  allergies = [];
  countries = [];
  states = [];
  cities = [];
  phcompany = [];
  i;
  selobj;
  mulSettings = {};
  mulList = [];
  mulservList = [];
  mulservtype = [];
  multype = [];
  mulselservlist = [];
  mulsellist = [];
  deviceObj;
  saveprocess:boolean=false;
  constructor(public translate: TranslateService,private formBuilder: FormBuilder, private appComponent: AppComponent, private dateformat: dateFormatPipe, private userService: DistributorEditService, private router: Router, private modalService: NgbModal, private route: ActivatedRoute, private notificationsComponent: NotificationsComponent) {translate.setDefaultLang('en'); }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.mulSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select Types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
      id: ['', []],
      distributorname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      dshortname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      dcompnaytype: ['', []],
      dcompnaysubtype: ['', []],
      estdyear: ['', []],
      email: ['', [Validators.email]],
      address1: ['', [Validators.required]],
      address2: ['', []],
      pincode: ['', []],
      country: [0, []],
      state: [0, []],
      city: [0, []],
      countrycode: ['', []],
      contactperson: ['', []],
      designationid: ['', []],
      mobileno: ['', [Validators.required]],
      phoneno: ['', []],
      panno: ['', []],
      tinno: ['', []],
      gstno: ['', []],
      ieccode: ['', []],
      termsandconditions: ['', []],
      dipaddress: ['', []],
      aadharno: ['', []],
      paymenttype: ['', []],
      bankname: ['', []],
      bankbranch: ['', []],
      accountnumber: ['', []],
      ifsccode: ['', []],
      swiftcode: ['', []],
      misccode: ['', []],
      ipaddress: ['', []],
      macid: ['', []],
      ostype: ['', []],
      browsertype: ['', []],
      rating: ['', []],
      comments: ['', []],
      createddate: ['', []],
      clientmdate: ['', []],
      modifiedby: ['', []],
      clientcdate: ['', []],

      modifieddate: ['', []],

      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      status: ['', []],
      distributortypeid: ['', []],
      phcompanyid: [, []],
      phcompany: [, []],
      creditdays: [, []],
      leadtime: [, []]
    });
    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var distid = { distributorid: this.id };
    this.userService.viewDistributorEdit(JSON.stringify(frmdata)).subscribe(data => { this.registerForm.patchValue(data),
    this.registerForm.get('dcompnaytype').setValue(data.distributortypeid) },
      errorCode => console.log(errorCode));
    this.userService.viewDisttype(JSON.stringify(frmdata)).subscribe(response => { this.allergies = response },
      errorCode => console.log(errorCode));
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));
    this.userService.viewDstPhCompanies(JSON.stringify(frmdata)).subscribe(data => { this.mulservList = data, this.viewPharmaCompany() },
      errorCode => console.log(errorCode));
    this.userService.viewDistEditPhCompanies(JSON.stringify(frmdata)).subscribe(data => { this.mulselservlist = data, this.viewEditPharmaCompany() },
      errorCode => console.log(errorCode));
    this.userService.geteditstate(JSON.stringify(distid)).subscribe(data => { this.states = data, this.viewState() },
      errorCode => console.log(errorCode));
    this.userService.geteditcity(JSON.stringify(distid)).subscribe(data => { this.cities = data, this.viewCity() },
      errorCode => console.log(errorCode));
    // this.userService.getdisttype(JSON.stringify(distid)).subscribe(data => { this.allergies = data},
    // errorCode => console.log(errorCode));
    setTimeout(() => {
      let language='en';
      language=localStorage.getItem('language');
      this.userService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
        errorCode => console.log(errorCode));
    }, 1800);
  }

  toggleCard() {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
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

  distvalidate(): boolean{
    let distname=this.registerForm.get('distributorname').value;
    let shortname=this.registerForm.get('dshortname').value;
    let conperson=this.registerForm.get('contactperson').value;
    let designation=this.registerForm.get('designationid').value;
    let country=this.registerForm.get('country').value;
    let state=this.registerForm.get('state').value;
    let city=this.registerForm.get('city').value;
    let address1=this.registerForm.get('address1').value;
    if (distname.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.comapnynamemmaximum30characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (shortname != null && shortname.toString().length>12) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.shortnamemaximum12characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (conperson != null && conperson.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.contactpersonmaximum30characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (designation != null && designation.toString().length>50) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.designationmaximum50characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (address1.toString().length > 200) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.address1maximun200characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (country == 0 ||  country == '' || country == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.selectcountry, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (state == 0 ||  state == '' || state == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.selectstate, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (city == 0 ||  city == '' || city == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.selectcity, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  onSubmit() {
    // var answer = confirm("Save data?");
    let valflag=this.distvalidate();
    if(valflag){
      this.saveprocess=true;
      this.registerForm.get('clientmdate').setValue(AppComponent.date);
      this.registerForm.get('modifiedby').setValue(AppComponent.userID);
      this.userService.saveDistributor(JSON.stringify(this.registerForm.value)).subscribe(data => {
        if(data){
          swal({
            type:'success',
            title:'Saved Successfully',
            showConfirmButton:false,
            timer:1000
          })
        setTimeout(() => {
          this.router.navigate(['/VendorRegistration/ViewVendor']);
        }, 1000);
          
        }
       },
        errorCode => console.log(errorCode));
    }
  }

  savevalid(data: any) {
    if (data == 1) {
      // this.justInitiate();
      // this.deviceObj.apiname = "api/dist/updateDistributor";
      // this.deviceObj.description = "Distributor Edited";
      // this.userService.deviceDetails(JSON.stringify(this.deviceObj))
      //   .subscribe(data => { },
      //     errorCode => console.log(errorCode));
      this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.DataUpdatedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.saveprocess=false;
      setTimeout(() => {
        this.router.navigate(['/VendorRegistration/ViewVendor']);
      }, 2000);
    } else {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  viewState() {
    var frmdata = { frmint1: this.registerForm.get('country').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewState(JSON.stringify(frmdata)).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));
  }

  viewCity() {
    this.cities = [];
    var frmdata = { frmint1: this.registerForm.get('state').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCity(JSON.stringify(frmdata)).subscribe(data => this.cities = data,
      errorCode => console.log(errorCode));
  }

  viewPharmaCompany() {
    for (this.i = 0; this.i < this.mulservList.length; this.i++) {
      this.mulList.push({ id: this.mulservList[this.i][0], itemName: this.mulservList[this.i][1] });
    }
  }

  viewEditPharmaCompany() {
    for (this.i = 0; this.i < this.mulselservlist.length; this.i++) {
      this.mulsellist.push({ id: this.mulselservlist[this.i][0], itemName: this.mulselservlist[this.i][1] });
    }
  }

  saveDistPhcompany(data: any) {
    this.multype = this.registerForm.get('phcompany').value;
    if (this.multype != null) {
      for (this.i = 0; this.i < this.multype.length; this.i++) {
        this.mulservtype.push({ frmint1: this.multype[this.i].id, locrefid: this.selobj.locrefid, locname: this.selobj.locname });
      }
    }
    this.multype = [];
    this.mulservtype = [];
  }
  // deleteDistributor() {
  //   var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
  //   var answer = confirm("Delete data?");
  //   if (answer) {
  //     this.userService.deleteDistributor(JSON.stringify(frmdata)).subscribe(data => { this.router.navigate(['/Distributor/ViewDistributor']) },
  //       errorCode => console.log(errorCode));
  //   }
  // }


}