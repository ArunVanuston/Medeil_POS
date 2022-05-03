import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DistributorService } from './distributor.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import { cardToggle } from 'app/shared/card/card-animation';
import { TranslateService } from 'ng2-translate'; 
import swal from 'sweetalert2';
@Component({
  selector: 'app-patientedit',
  templateUrl: './distributor.component.html',
  animations: [cardToggle],
  providers: [DistributorService, NotificationsComponent, dateFormatPipe],
})

export class DistributorComponent implements OnInit {
  alertmsgs:any;
  parentMessage = "sales";
  emailPattern =  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  shopregex = "^$|^[A-Za-z0-9]+";
  deviceObj;
  closeResult: string;
  model: number[];
  disttypes = [];
  countries = [];
  states = [];
  cities = [];
  phcompany = [];
  dupi = [];
  i;
  selobj;
  registerForm: FormGroup;
  mulSettings = {};
  mulList = [];
  mulservList = [];
  mulservtype = [];
  multype = [];
  saveprocess: boolean=false;
  cardToggle: string = 'collapsed';
  distp: any=[];
  distl: any=[];

  constructor(public translate: TranslateService,private formBuilder: FormBuilder, private router: Router, 
    private dateformat: dateFormatPipe, private userService: DistributorService, 
    private modalService: NgbModal, private notificationsComponent: NotificationsComponent, private appComponent:AppComponent ) {  translate.setDefaultLang('en');}
    
    toggleCard() {
      this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
     
    }
  
    ngOnInit() {
      this.translate.use(localStorage.getItem('language'));
    this.mulSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select Types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };

    var date = this.dateformat.transformnew(Date.now());
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, 
      countryrefid: AppComponent.countryID,  companyid: AppComponent.companyID, 
      branchrefid: AppComponent.branchID,cdate: AppComponent.date };
    
    this.registerForm = this.formBuilder.group({

      indvdisttype: [, []],
      distid: ['', []],
      distributorname: ['', [Validators.required, Validators.pattern("[a-zA-Z 0-9 ]*"), ]], 
      // CustomValidators.rangeLength([5, 20])
      dshortname: ['', [Validators.pattern("[a-zA-Z 0-9]*")]],
      dcompnaytype: ['', []],
      dcompnaysubtype: ['', []],
      estdyear: ['', []],
      email: ['', [Validators.pattern(this.emailPattern)]],
      address1: ['', [Validators.required]],
      address2: ['', []],
      pincode: ['', []],
      country: [0, []],
      state: [0, []],
      city: [0, []],
      countrycode: ['', []],
      contactperson: ['', [Validators.pattern("[a-zA-Z ]*")]],
      designationid: ['', [Validators.pattern("[a-zA-Z ]*")]],
      mobileno: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      phoneno: ['', [Validators.pattern("^[0-9]*$")]],
      panno: ['', []],
      tinno: ['', [Validators.pattern(this.shopregex)]],
      gstno: ['', []],
      ieccode: ['', []],
      termsandconditions: ['', []],
      dipaddress: ['', []],
      aadharno: ['', []],
      paymenttype: ['', []],
      creditdays: ['', []],
      bankname: ['', [Validators.pattern("[a-zA-Z ]*")]],
      bankbranch: ['', [Validators.pattern("[a-zA-Z ]*")]],
      accountnumber: ['', []],
      ifsccode: ['', [Validators.pattern("[a-zA-Z 0-9]*")]],
      swiftcode: ['', [Validators.pattern("[a-zA-Z 0-9]*")]],
      misccode: ['', []],
      
      ipaddress: ['', []],
      macid: ['', []],
      ostype: ['', []],
      browsertype: ['', []],
      rating: ['', []],
      comments: ['', []],
      createddate: ['', []],
      modifiedby: ['', []],
      modifieddate: ['', []],
      clientcdate: [this.selobj.cdate, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      status: [0, []],
      distributortypeid: ['opt1', []],
      phcompanyid: [, []],
      phcompany: [, [Validators.required]],
      leadtime: [, []]
    });
    
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
   
    this.userService.viewDistType(JSON.stringify(frmdata)).subscribe(data => { this.disttypes = data},
      errorCode => console.log(errorCode));

    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));

    this.userService.viewDstPhCompanies(JSON.stringify(frmdata)).subscribe(data => { this.mulservList = data,this.viewPharmaCompany() },
      errorCode => console.log(errorCode));
      console.log(this.mulservList)
    // $(document).ready(function () {
    //   setInterval("yourAjaxCall()", 1000);
    //   function yourAjaxCall() {
    //   }
    // });
    

      setTimeout(() => {
        let language='en';
        language=localStorage.getItem('language');
        this.userService.GetAlerts(language).subscribe(data => this.alertmsgs = data,
          errorCode => console.log(errorCode));
      }, 1800);
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

    };}

    get f(){
      return this.registerForm.controls;
    }

    maxMobLength() {
      let mobileno = this.registerForm.get('mobileno').value;
      console.log(mobileno.length + " " + this.registerForm.get('mobileno').value + " " + mobileno);
      if (parseInt(mobileno.length) > 14 && parseInt(mobileno.length) < 16) {
        if (mobileno.length == 15)
          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.youcantypeonly15numbers, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }

    maxPhnLength(){
      let phoneno = this.registerForm.get('phoneno').value;
      console.log(phoneno.length + " " + this.registerForm.get('phoneno').value + " " + phoneno);
      if (parseInt(phoneno.length) > 14 && parseInt(phoneno.length) < 16) {
        if (phoneno.length == 15)
          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.youcantypeonly15numbers, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
  
    maxPinCodeLength(){
      let pincode = this.registerForm.get('pincode').value;
      console.log(pincode.length + " " + this.registerForm.get('pincode').value + " " + pincode);
      if (parseInt(pincode.length) > 9 && parseInt(pincode.length) < 11) {
        if (pincode.length == 10)
          this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.youcantypeonly10numbers, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }

  viewPharmaCompany() {
    for (this.i = 0; this.i < this.mulservList.length; this.i++) {
      this.mulList.push({ id: this.mulservList[this.i][0], itemName: this.mulservList[this.i][1] });
    }

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
    let tinno=this.registerForm.get('tinno').value;
    if (distname.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.comapnynamemmaximum30characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (shortname != null && shortname.toString().length>12) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.shortnamemaximum12characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (conperson != null && conperson.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.contactpersonmaximum30characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (designation != null && designation.toString().length>30) {
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
    }else if(tinno != null && tinno.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: this.alertmsgs.distributor.tinnomaximum20characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  //onSubmit() {
  //  var answer = confirm("Save data?");
    //  let valflag=this.distvalidate();
     // if(valflag){
     //   this.registerForm.get('clientcdate').setValue(AppComponent.date);
     //   this.saveprocess=true;
     //   this.userService.saveDistributor(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveDistPhcompany(data), this.savevalid(data) },
     //     errorCode => console.log(errorCode));
     // }
  //}
  onSubmit(){
    swal({
      title:'Are you want to save?',
      type:'info',
      showCancelButton:true,
      confirmButtonColor:'#5aa02c',
      cancelButtonColor:'#d33',
      confirmButtonText:'Save'
     
    }).then((result=>{
      let valflag=this.distvalidate();
      if(valflag){
        this.registerForm.get('clientcdate').setValue(AppComponent.date);
        this.saveprocess=true;
        this.userService.saveDistributor(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveDistPhcompany(data)
          if(data){
            swal({
              type:'success',
              title:'Saved Successfully',
              showConfirmButton:false,
              timer:1000
            })
        setTimeout(()=>{
          this.router.navigate(['VendorRegistration/ViewVendor'])
        },1000)
           }

        },
          errorCode => console.log(errorCode));
      }
    }))
  }
  
  getadddistributortype(event, contentadddis) {
    if (event == 'addditributor') {
      this.open(contentadddis);
    }
    else {
      return;
    }
  }

  saveDistPhcompany(data: any) {
    this.multype = this.registerForm.get('phcompany').value;
    if (this.multype != null) {
      for (this.i = 0; this.i < this.multype.length; this.i++) {
        this.mulservtype.push({ frmint1: this.multype[this.i].id, locrefid: this.selobj.locrefid,
           locname: this.selobj.locname });
      }
    }
    if (data == 1) {
      this.userService.saveDistPhcompany(JSON.stringify(this.mulservtype)).subscribe(data => {  //this.savevalid(data) 
      },errorCode => console.log(errorCode));
    }
    this.multype = [];
    this.mulservtype = [];
  }
  
  
  // savevalid(data: any) {
  //   if (data == 1) {

  //     // this.justInitiate();
  //     // this.deviceObj.apiname = "api/dist/saveDistributor";
  //     // this.deviceObj.description="Distributor Created";

  //     // this.userService.deviceDetails(JSON.stringify(this.deviceObj))
  //     //   .subscribe(data => { },
  //     //     errorCode => console.log(errorCode));
  //     this.notificationsComponent.addToast({ title: 'Success', msg: this.alertmsgs.common.datasavedsuccessfully, timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
  //     this.saveprocess=false;
  //     setTimeout(() => {
  //       this.router.navigate(['/VendorRegistration/ViewVendor']);
  //     }, 2000);
  //   } else {
  //     this.saveprocess=false;
  //     this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  //   }
  // }

  saveIndvDistType1(c) {
    c('Close click')
    if(this.registerForm.get('indvdisttype').value == null || this.registerForm.get('indvdisttype').value == ''){
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.common.datanotsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
     
    }
    else{
    var frmdata = { frmint1: '', frmstr1: this.registerForm.get('indvdisttype').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
   
      this.userService.saveIndvDistType1(JSON.stringify(frmdata)).subscribe(data => { c('Close click'),  this.userService.viewDistType(JSON.stringify(frmdata)).subscribe(data => { this.disttypes = data },
        errorCode => console.log(errorCode)); },
        errorCode => console.log(errorCode));
     
  
  }}

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

  open(contentadddis) {
    this.modalService.open(contentadddis).result.then((result) => {
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

  searchdist(dist:any){
    if(dist.length){
      this.userService.searchdist(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,dist).subscribe(data =>{
        if(data){
          this.distp =data;
        }else{
          this.distp.length=0;
        }
      },err=>{console.log(err)});
    }else{
      this.distp.length=0;
    }
  }


  
  maxcreditLength(){
    let creditd = this.registerForm.get('pincode').value;
    console.log(creditd.length + " " + this.registerForm.get('creditdays').value + " " + creditd);
    if (parseInt(creditd.length) > 1 && parseInt(creditd.length) < 4) {
      if (creditd.length == 10)
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.youcantypeonly4numbers, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  maxleadLength(){
    let lead = this.registerForm.get('pincode').value;
    console.log(lead.length + " " + this.registerForm.get('leadtime').value + " " + lead);
    if (parseInt(lead.length) > 1 && parseInt(lead.length) < 4) {
      if (lead.length == 10)
        this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.distributor.youcantypeonly4numbers, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
}