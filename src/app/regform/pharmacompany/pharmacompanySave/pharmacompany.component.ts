import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { PharmacompanyService } from './pharmacompany.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import { TranslateService } from 'ng2-translate';
@Component({
  selector: 'app-pharmacompany',
  templateUrl: './pharmacompany.component.html',
  providers: [PharmacompanyService, NotificationsComponent, dateFormatPipe]
})
export class PharmacompanyComponent implements OnInit {
  parentMessage = "sales";
  email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  closeResult: string;
  model: number[];
  selobj;
  compnytypemulList = [];
  divisionmulList = [];
  selectedItems = [];
  selectedItems1 = [];
  compnytypeSettings = {};
  divisionSettings = {};
  compnytypeList = [];
  divisionList = [];
  pcompnytype:any;
  pdivisiontype = [];
  compnytype = [];
  divisiontype = [];
  countries = [];
  states = [];
  cities = [];
  i;
  deviceObj;
  registerForm: FormGroup;
  constructor(public translate: TranslateService,private formBuilder: FormBuilder, private dateformat: dateFormatPipe,
     private router: Router, private userService: PharmacompanyService, private modalService: NgbModal, 
     private notificationsComponent: NotificationsComponent, private appComponent:AppComponent) { translate.setDefaultLang('en');}

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    var date = this.dateformat.transformnew(Date.now());
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
   
    this.compnytypeSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };
    this.divisionSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select division",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };


    this.registerForm = this.formBuilder.group({
      phid: ['', []],
      pcompanytype: ['opt1', []],
      //  phdivision: ['', []],
      dlno: ['', [Validators.pattern("[a-zA-Z 0-9]*")]],
      phindvdivision: ['', []],
      // pcompanytype: ['', [Validators.required, Validators.pattern("[a-zA-Z 0-9,.-]*")]],
      pshortname: ['', [Validators.pattern("[a-zA-Z0-9]*")]],
      pcompnytype: ['', []],
      pcompanysubtype: ['', []],
      pcompanyname: ['', [Validators.required,Validators.pattern("[a-zA-Z _.]*")]],
      // estdyear: ['', []],
      pemail: ['', [Validators.pattern(this.email)]],
      paddress1: ['', []],
      paddress2: ['', []],
      ppincode: ['', []],
      pcountry: [0, []],
      pstate: [0, []],
      pcity: [0, []],
      pcountrycode: ['', []],
      pcontactperson: ['', [Validators.pattern("[a-zA-Z _.]*")]],
      pdesignationid: ['', [Validators.pattern("[a-zA-Z]*")]],
      pmobileno: ['', [Validators.pattern("[0-9]*")]],
      pphoneno: ['', [Validators.pattern("[0-9]*")]],
      ppanno: ['', []],
      ptinno: ['', []],
      pgstno: ['', []],
      pieccode: ['', []],
      termsandconditions: ['', []],
      pipaddress: ['', []],
      platitude: ['', []],
      plongitude: ['', []],
      pcompanysocialid: ['', []],
      pfacebookid: ['', []],
      ptwitterid: ['', []],
      plinkedinid: ['', []],
      pwebsite: ['', []],
      panno: ['', []],
      paymenttype: ['', []],
      creditdays: ['', []],
      bankname: ['', [Validators.pattern("[a-zA-Z ]*")]],
      bankbranch: ['', [Validators.pattern("[a-zA-Z ]*")]],
      accountnumber: ['', []],
      ifsccode: ['', [Validators.pattern("[a-zA-Z0-9 ]*")]],
      swiftcode: ['', [Validators.pattern("[a-zA-Z0-9 ]*")]],
      misccode: ['', [Validators.pattern("[a-zA-Z0-9 ]*")]],
      ipaddress: ['', []],
      macid: ['', []],
      ostype: ['', []],
      browsertype: ['', []],
      rating: ['', []],
      comments: ['', []],
      clientcdate: [AppComponent.date, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      countryoforigin: [0, []],
    });


    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewComptype(JSON.stringify(frmdata)).subscribe(response => { 
      this.compnytypeList = response    //, this.viewComptype() 
    },errorCode => console.log(errorCode));

    setTimeout(() => {
      this.userService.viewDivision(JSON.stringify(frmdata)).subscribe(response => { this.divisionList = response, this.viewDivision() },
      errorCode => console.log(errorCode));

      this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));
    }, 1200);
   

    $(document).ready(function () {
      //  $('#patienttallergies').toggle(
      //   $('#patienttconditions').toggle
      $('#comtype').click(function () {
        $('#type').show();
        $('#division').hide();
      });
      $('#comdivision').click(function () {
        $('#type').hide();
        $('#division').show();
      });
    });
  }

  manufacturelist:any=[];
  searchmanufacture(sval:any){
    if(sval.length>0){
      this.userService.SearchManufacture(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,sval)
      .subscribe(data => {
        if(data){
          this.manufacturelist = data
        }else{this.manufacturelist.length=0}
        },errorCode => {console.log(errorCode);this.manufacturelist.length=0});
    }else{
      this.manufacturelist.length=0
    }
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

  manufactvalidate(){
    let companyname=this.registerForm.get('pcompanyname').value;
    let country=this.registerForm.get('pcountry').value
    if(companyname==''|| companyname==null|| companyname==undefined){
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Country', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
    }else if(country=='0'||country==''||country==null||country==undefined){
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Country', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
    }
    return true;
    // let country=this.registerForm.get('pcountry').value;
    // let state=this.registerForm.get('pstate').value;
    // let city=this.registerForm.get('pcity').value;
    // let countryorgin=this.registerForm.get('countryoforigin').value;
    //else if(state=='opt1'||state==''||state==null||state==undefined){
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select State', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }else if(city=='opt1'||city==''||city==null||city==undefined){
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select City', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // else if(countryorgin=='opt1'||countryorgin==''||countryorgin==null||countryorgin==undefined){
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select country of Origin', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
  }

  saveprocess:boolean=false;
  onSubmit() {
    // var answer = confirm("Save data?");
    let valflag=this.manufactvalidate();
    if(valflag){
      this.saveprocess=true;
      this.userService.savePhcompany(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveCtypeDivision(data), this.savevalid(data) },
      errorCode => console.log(errorCode));
    }
  }



  saveCtypeDivision(data: any) {

    if (data==1){

    this.compnytype = this.registerForm.get('pcompanytype').value;
    this.divisiontype = this.registerForm.get('pcompanysubtype').value;
    
    if (this.compnytype != null) {
      this.pcompnytype=[{
        frmint1: this.compnytype, 
        locrefid: this.selobj.locrefid, 
        locname: this.selobj.locname
      }]
      // for (this.i = 0; this.i < this.compnytype.length; this.i++) {
      //   this.pcompnytype.push({ frmint1: this.compnytype[this.i].id, 
      //     locrefid: this.selobj.locrefid, locname: this.selobj.locname });
      // }
    }
    if (this.divisiontype != null) {
      for (this.i = 0; this.i < this.divisiontype.length; this.i++) {
        this.pdivisiontype.push({ frmint1: this.divisiontype[this.i].id,
          locrefid: this.selobj.locrefid, locname: this.selobj.locname });
      }
    }
    this.userService.saveComptype(JSON.stringify(this.pcompnytype)).subscribe(data => { },
      errorCode => console.log(errorCode));
    this.userService.saveDivision(JSON.stringify(this.pdivisiontype)).subscribe(data => { },
      errorCode => console.log(errorCode));
    this.pcompnytype = [];
    this.pdivisiontype = [];
   
   
    }
  }

  savevalid(data: any) {
    if (data == 1) {
      this.justInitiate();
      this.deviceObj.apiname = "api/phcompany/savePhCompany";
      this.deviceObj.description="Pharma Company Created";

      this.userService.deviceDetails(JSON.stringify(this.deviceObj))
        .subscribe(data => { },errorCode => console.log(errorCode));
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved Successfully', timeout: 2000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['Manufacturer/ViewManufacturer']);
       }, 5000);
    }else {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not Saved', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  saveIndvComptype(c) {
    let popvalue=this.registerForm.get('phindvdivision').value;
    if(popvalue=='' || popvalue==null || popvalue==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Value', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      var frmdata = { frmint1: '', frmstr1: this.registerForm.get('phindvdivision').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
      // var answer = confirm("Save data?");
      // if (answer) {
      // }
      this.userService.saveIndvComptype(JSON.stringify(frmdata)).subscribe(data => { 
        c('Close click');
        this.compnytypemulList=[];
        this.userService.viewComptype(JSON.stringify(frmdata)).subscribe(response => { 
          this.compnytypeList = response      //, this.viewComptype1() 
        },errorCode => console.log(errorCode)); 
      },errorCode => console.log(errorCode));
    }
  }


  saveIndvDivision(c) {
    let popvalue=this.registerForm.get('phindvdivision').value;
    if(popvalue=='' || popvalue==null || popvalue==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Value', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    }else{
      var frmdata = { frmint1: '', frmstr1: this.registerForm.get('phindvdivision').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
      // var answer = confirm("Save data?");
      // if (answer) {
      // }
      this.userService.saveIndvDivision(JSON.stringify(frmdata)).subscribe(data => { 
        c('Close click');
        this.divisionmulList=[];
        this.userService.viewDivision(JSON.stringify(frmdata)).subscribe(response => { this.divisionList = response, this.viewDivision() },
        errorCode => console.log(errorCode)); },
        errorCode => console.log(errorCode));
    }
  }


  companyDropdown() {
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewComptype(JSON.stringify(frmdata)).subscribe(response => { 
      //this.compnytypeList = response  // this.viewComptype()
     },  errorCode => console.log(errorCode));
  }

  divisionDropdown() {
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewDivision(JSON.stringify(frmdata)).subscribe(response => { this.divisionList = response, this.viewDivision() },
      errorCode => console.log(errorCode));
  }

  viewState() {
    this.registerForm.get('countryoforigin').setValue(this.registerForm.get('pcountry').value);
    var frmdata = { frmint1: this.registerForm.get('pcountry').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewState(JSON.stringify(frmdata)).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));
  }

  viewCity() {
    this.cities = [];
    var frmdata = { frmint1: this.registerForm.get('pstate').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCity(JSON.stringify(frmdata)).subscribe(data => this.cities = data,
      errorCode => console.log(errorCode));
  }

  // viewComptype() {
  //   for (this.i = 0; this.i < this.compnytypeList.length; this.i++) {
  //     this.compnytypemulList.push({ id: this.compnytypeList[this.i][0], itemName: this.compnytypeList[this.i][1] });
  //   }
  // }


  // viewComptype1() {
  //   for (this.i = 0; this.i <= this.compnytypeList.length; this.i++) {
  //     this.compnytypemulList.push({ id: this.compnytypeList[this.i][0], itemName: this.compnytypeList[this.i][1] });
  //   }
  // }

  viewDivision() {
    for (this.i = 0; this.i <= this.divisionList.length; this.i++) {
      this.divisionmulList.push({ id: this.divisionList[this.i][0], itemName: this.divisionList[this.i][1] });
    }
  }

  open(content) {
    this.registerForm.get('phindvdivision').setValue('');
    this.modalService.open(content).result.then((result) => {
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
