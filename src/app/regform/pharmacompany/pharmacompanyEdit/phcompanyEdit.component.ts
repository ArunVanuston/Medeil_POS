import { PhcompanyEditService } from './phcompanyEdit.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppComponent } from '../../../app.component';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { TranslateService } from 'ng2-translate';
@Component({
  selector: 'app-phcompanyedit',
  templateUrl: './phcompanyEdit.component.html',
  providers: [PhcompanyEditService, NotificationsComponent, dateFormatPipe]
})
export class PhcompanyEditComponent implements OnInit {


  private sub: any;
  id : number;
  selobj;
  comptypesldItems = [];
  divisionsldItems = [];
  compnytypemulList = [];
  divisionmulList = [];
  comptypeselected = [];
  divselected = [];
  compnytypeSettings = {};
  divisionSettings = {};
  compnytypeList = [];
  divisionList = [];
  pcompnytype = [];
  pdivisiontype = [];
  compnytype = [];
  divisiontype = [];
  addcompnytype;
  adddivision;
  countries = [];
  states = [];
  cities = [];
  registerForm: FormGroup;
  i;
  email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  deviceObj;
  constructor(public translate: TranslateService,private formBuilder: FormBuilder, private router: Router, private appComponent: AppComponent,private dateformat: dateFormatPipe,
    private userService: PhcompanyEditService, private route: ActivatedRoute, private notificationsComponent: NotificationsComponent) { 
      translate.setDefaultLang('en');

    
    }
  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
 
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, 
      locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, 
      companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };


  

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    // pcompanyname: ['', [Validators.required, Validators.pattern("[a-zA-Z 0-9.,- ]*")]],

    //pshortname: ['', [Validators.required, Validators.pattern("[a-zA-Z 0-9.,- ]*")]],

    // pemail: ['', [Validators.pattern(this.email)]],

    this.registerForm = this.formBuilder.group({

      id: ['', []],
      phcompnytype: ['', []],
      phdivision: ['', []],
      pcompanyname: ['', [Validators.required,Validators.pattern("[a-zA-Z ._]*")]],
      pshortname: ['', [Validators.pattern("[a-zA-Z0-9]*")]],
      pcompanytype: ['', []],
      pcompanysubtype: ['', []],
      estdyear: ['', []],
      dlno: ['', [Validators.pattern("[a-zA-Z 0-9]*")]],
      pemail: ['', [Validators.pattern(this.email)]],
      paddress1: ['', []],
      paddress2: ['', []],
      ppincode: ['', []],
      pcountry: ['opt1', []],
      pstate: ['opt1', []],
      pcity: ['opt1', []],
      pcountrycode: ['', []],
      pcontactperson: ['', [Validators.pattern("[a-zA-Z]*")]],
      pdesignationid: ['', [Validators.pattern("[a-zA-Z]*")]],
      pmobileno: ['', [,Validators.pattern("[0-9]*")]],
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
      clientcdate: ['', []],
      clientmdate: ['', []],
      modifiedby: ['', []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      countryoforigin: [, []],
    });




    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var phid = { pcompanyid: this.id }
    this.userService.viewPhCompanyEdit(JSON.stringify(frmdata)).subscribe(data => { this.registerForm.patchValue(data) },
      errorCode => console.log(errorCode));

    setTimeout(() => {
      this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
        errorCode => console.log(errorCode));
      this.userService.getpheditstate(JSON.stringify(phid)).subscribe(data => { this.states = data, this.viewState() },
        errorCode => console.log(errorCode));
      this.userService.getpheditcity(JSON.stringify(phid)).subscribe(data => { this.states = data, this.viewCity() },
        errorCode => console.log(errorCode));
      setTimeout(() => {
        this.userService.viewComptype(JSON.stringify(frmdata)).subscribe(response => { this.compnytypeList = response
          //this.viewComptype() 
        },errorCode => console.log(errorCode));
        this.userService.viewDivision(JSON.stringify(frmdata)).subscribe(response => { this.divisionList = response, this.viewDivision() },
          errorCode => console.log(errorCode));
        // this.userService.viewCustComptype(JSON.stringify(frmdata)).subscribe(response => { this.comptypeselected = response, this.viewCustComptype() },
        //   errorCode => console.log(errorCode));
        this.userService.viewCustDivision(JSON.stringify(frmdata)).subscribe(response => { this.divselected = response, this.viewCustDivision() },
          errorCode => console.log(errorCode));
      }, 1500);
    }, 1300);
   
  
    $(document).ready(function () {
      //  $('#patienttallergies').toggle(
      //   $('#patienttconditions').toggle
    });


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
    let pcompany=this.registerForm.get('pcompanyname').value;
    let country=this.registerForm.get('pcountry').value
    if(pcompany==''|| pcompany==null|| pcompany==undefined){
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
    // if(country=='opt1'||country==''||country==null||country==undefined){
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Country', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }else if(state=='opt1'||state==''||state==null||state==undefined){
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select State', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }else if(city=='opt1'||city==''||city==null||city==undefined){
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select City', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }else if(countryorgin=='opt1'||countryorgin==''||countryorgin==null||countryorgin==undefined){
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select country of Origin', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
  }

  saveprocess:boolean=false;
  onSubmit() {
    //  var answer = confirm("Save data?");
    let valflag=this.manufactvalidate();
    if(valflag){
    this.saveprocess=true;
    this.registerForm.get('clientmdate').setValue(AppComponent.date);
    this.registerForm.get('modifiedby').setValue(AppComponent.userID);
    this.userService.savePhcompany(JSON.stringify(this.registerForm.value)).subscribe(data => { this.savevalid(data)
      //, this.saveCtypeDivision(data) 
    },errorCode => console.log(errorCode));
    }
  }

  saveCtypeDivision(data: any) {
    if(data==1){
      this.compnytype = this.registerForm.get('pcompanytype').value;
      this.divisiontype = this.registerForm.get('pcompanysubtype').value;
      if (this.compnytype != null) {
        this.pcompnytype=[{
          frmint1: this.registerForm.get('id').value, 
          companytypeid: this.compnytype, 
          locrefid: this.selobj.locrefid, 
          locname: this.selobj.locname
        }]
        // for (this.i = 0; this.i < this.compnytype.length; this.i++) {
        //   this.pcompnytype.push({ frmint1: this.registerForm.get('id').value, companytypeid: this.compnytype[this.i].id, locrefid: this.selobj.locrefid, locname: this.selobj.locname });
        // }
      }
      if (this.divisiontype != null) {
        for (this.i = 0; this.i < this.divisiontype.length; this.i++) {
          this.pdivisiontype.push({ frmint1: this.registerForm.get('id').value, pdivisionid: this.divisiontype[this.i].id, locrefid: this.selobj.locrefid, locname: this.selobj.locname });
        }
      }
      //  this.userService.saveComptype(JSON.stringify(this.pcompnytype));
      //   this.userService.saveDivision(JSON.stringify(this.pdivisiontype));
      this.pcompnytype = [];
      this.pdivisiontype = [];
    }
  }

  savevalid(data: any) {
    if (data == 1) {

      // this.justInitiate();
      // this.deviceObj.apiname = "api/dist/updatePhCompany";
      // this.deviceObj.description="Pharmacompany Updated";

      // this.userService.deviceDetails(JSON.stringify(this.deviceObj))
      //   .subscribe(data => { },
      //     errorCode => console.log(errorCode));
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data Updated Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['Manufacturer/ViewManufacturer']);
      }, 2000);
    } else {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  viewState() {
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

  // viewCustComptype() {
  //   for (this.i = 0; this.i < this.comptypeselected.length; this.i++) {
  //     this.comptypesldItems.push({ id: this.comptypeselected[this.i][2], itemName: this.comptypeselected[this.i][1] });
  //   }
  // }
  viewDivision() {
    for (this.i = 0; this.i < this.divisionList.length; this.i++) {
      this.divisionmulList.push({ id: this.divisionList[this.i][0], itemName: this.divisionList[this.i][1] });
    }
  }
 
  viewCustDivision() {
    for (this.i = 0; this.i < this.divselected.length; this.i++) {
      this.divisionsldItems.push({ id: this.divselected[this.i][2], itemName: this.divselected[this.i][1] });
    }
  }

  deletePhCompany() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var answer = confirm("Delete data?");
    if (answer) {
      this.userService.deletePhCompany(JSON.stringify(frmdata)).subscribe(data => { this.router.navigate(['/Manufacturer/ViewManufacturer']) },
        errorCode => console.log(errorCode));
    }
  }

}
