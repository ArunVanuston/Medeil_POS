import { Component, OnInit, ViewChild, Input, ElementRef, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../emp.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { window } from 'rxjs/operator/window';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TitleCasePipe } from '@angular/common';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';

const textPattern = "[a-zA-Z ]*";
const textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
const emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
declare var $: any;

@Component({
  selector: 'app-addEmployee',
  templateUrl: './addEmployee.component.html',
  providers: [EmployeeService, NotificationsComponent,TitleCasePipe]
})

export class addEmployeeComponent implements OnInit {
  parentMessage = "purchase";
  $: any;

  public imagePath;
  

  returnValid: any;
  departmentarr = [];
  subdepartmentarr = [];
  divsionarr = [];
  subdivsionarr = [];

  myForm: FormGroup;
  submitted = false;
  companies = [];
  branches = [];
  firms = [];
  flag: boolean = false;
  images: string[][];

  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  selobj: any;
  errors: any;
  @Input() fileExt: string = "JPG, GIF, PNG";
  closeResult: string;
  boolval: boolean;
  boolval1: boolean;
  boolval2: boolean;
  boolval3: boolean;

//Employee Phot declare
  imgURL: any;
  message: string;
  ephoto: File;
  showimage: boolean=false;
  showeyeslash: boolean=false;
  showeye: boolean=true;
  imageresponse: any;

  // Employee Sign Declare
  signimgURL: any;
  signmessage: string;
  signphoto: File;
  signshowimage: boolean=false;
  signshoweyeslash: boolean=false;
  signshoweye: boolean=true;
  signresponse: any;

  constructor(private addEmployee: EmployeeService, private router: Router, formBuilder: FormBuilder,
    private notificationsComponent: NotificationsComponent, private modalService: NgbModal,
    private dateformat: dateFormatPipe,private titlecase:TitleCasePipe) { }

  ngOnInit() {
    let companyid = new FormControl(AppComponent.companyID);
    let branchid = new FormControl(AppComponent.branchID);
    let storerefid = new FormControl();
    //let employeecode = new FormControl();
    let emptitle = new FormControl('opt1',[]);
    let empfirstname = new FormControl('', [Validators.required, Validators.pattern(textPattern)]);
    let emplastname = new FormControl('', Validators.pattern(textPattern));
    let employeemode = new FormControl('opt1',[]);
    let employeetype = new FormControl('opt1',[]);
    let department = new FormControl(0);
    let subdepartment = new FormControl(0);
    let division = new FormControl(0);
    let subdivision = new FormControl(0);
    let desgination = new FormControl('', Validators.pattern(textPattern));
    let joiningdate = new FormControl('', Validators.required);
    let empsalary = new FormControl();
    let dob = new FormControl('', Validators.required);
    let age = new FormControl(0,[]);
    let mobileno = new FormControl('', Validators.required);
    let bloodgroup = new FormControl();
    let allowlogin = new FormControl();
    let gender = new FormControl('',Validators.required);
    let email = new FormControl('', Validators.pattern(emailpattern));
    let compemail = new FormControl();
    let pancard = new FormControl('');
    let status = new FormControl();
    let aadharcard = new FormControl();
    let storerecheckfid = new FormControl();
    let passport = new FormControl();
    let emphoto = new FormControl();
    let warehouserefid = new FormControl();
    let hospitalrefid = new FormControl();
    let locname = new FormControl(AppComponent.locRefName1);
    let locrefid = new FormControl(AppComponent.locrefID1);
    let createdby = new FormControl();
    let clientcdate = new FormControl();
    let departmentname = new FormControl();
    let subdepartmentname = new FormControl();
    let divisionname = new FormControl();
    let subdivisionname = new FormControl();
    let deptrefid = new FormControl();
    let subdeptrefid = new FormControl();
    let divisionid = new FormControl();
    let subdivisionid = new FormControl();
  
    this.myForm = new FormGroup({
      departmentname: departmentname,
      subdepartmentname: subdepartmentname,
      divisionname: divisionname,
      subdivisionname: subdivisionname,
      deptrefid: deptrefid,
      subdeptrefid: subdeptrefid,
      divisionid: divisionid,
      subdivisionid: subdivisionid,
      companyid: companyid,
      branchid: branchid,
      storerefid: storerefid,
     // employeecode: employeecode,
      emptitle: emptitle,
      empfirstname: empfirstname,
      emplastname: emplastname,
      employeemode: employeemode,
      employeetype: employeetype,

      department: department,
      subdepartment: subdepartment,
      division: division,
      subdivision: subdivision,

      desgination: desgination,
      joiningdate: joiningdate,
      empsalary: empsalary,
      dob: dob,
      age: age,
      mobileno: mobileno,
      bloodgroup: bloodgroup,
      allowlogin: allowlogin,
      gender: gender,
      email: email,
      compemail: compemail,
      pancard: pancard,
      aadharcard: aadharcard,
      passport: passport,
      locname: locname,
      locrefid: locrefid,
      createdby: createdby,
      clientcdate: clientcdate,
      emphoto: emphoto
    });


    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

    setTimeout(() => {
      this.getDepartment();
    }, 1800);
  }/* Ng oninit  end*/

  getDepartment() {
    this.addEmployee.getDepartment(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid).subscribe(data => this.departmentarr = data,
        err => {
          console.log('Error Occured Get getDepartment');
        });
  }

  getSubDepartment() {
    this.addEmployee.getSubDepartment(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.myForm.get('department').value).subscribe(data => this.subdepartmentarr = data,
        err => {
          console.log('Error Occured Get getDepartment');
        });
  }

  getDivision() {
    this.addEmployee.getDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.myForm.get('department').value, this.myForm.get('subdepartment').value).subscribe(data => this.divsionarr = data,
        err => {
          console.log('Error Occured Get getDivision');
        });
  }

  getSubDivision() {
    this.addEmployee.getSubDivision(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.myForm.get('department').value, this.myForm.get('subdepartment').value,
      this.myForm.get('division').value).subscribe(data => this.subdivsionarr = data,
        err => {
          console.log('Error Occured Get getSubDivision');
        });
  }

  saveDepartment(c) {
    this.addEmployee.isExist(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname, this.selobj.locrefid, this.myForm.get('departmentname').value).subscribe(data => {
      this.boolval = data
      if (!data) {
        var frmdata = {
          departmentname: this.myForm.get('departmentname').value, companyrefid: this.selobj.companyid,
          branchrefid: this.selobj.branchrefid,
          locname: this.selobj.locname,
          locrefid: this.selobj.locrefid,
          clientcdate: AppComponent.date
        };
        this.addEmployee.saveDepartment(JSON.stringify(frmdata)).subscribe(data => { 
          if(data){
            this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Department Saved Successfully!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            c('Close click'); this.getDepartment();
          }
         },errorCode => console.log(errorCode));
      }
      else {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Department already exist!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })
  }



  saveSubDepartment(c) {
    this.addEmployee.isExist1(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.myForm.get('subdepartmentname').value).subscribe(data => {
        this.boolval1 = data;
        if (!data) {
          var frmdata = {
            deptrefid: this.myForm.get('department').value,
            subdepartmentname: this.myForm.get('subdepartmentname').value,
            companyrefid: this.selobj.companyid,
            branchrefid: this.selobj.branchrefid,
            locname: this.selobj.locname,
            locrefid: this.selobj.locrefid,
            clientcdate: AppComponent.date
          };
          this.addEmployee.saveSubDepartment(JSON.stringify(frmdata)).subscribe(data => {
            if(data){
              this.notificationsComponent.addToast({ title: 'Success Message', msg: ' Sub Department Saved Successfully!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              c('Close click');this.getSubDepartment();
            }  
          },errorCode => console.log(errorCode));
        }else {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Sub Department already exist!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      })
  }

  saveDivision(c) {
    this.addEmployee.isExist2(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname, this.selobj.locrefid, this.myForm.get('divisionname').value).subscribe(data => {
      this.boolval2 = data;
      if (!data) {
        var frmdata = {
          deptrefid: this.myForm.get('department').value,
          subdeptrefid: this.myForm.get('subdepartment').value,
          divisionname: this.myForm.get('divisionname').value,
          companyrefid: this.selobj.companyid,
          branchrefid: this.selobj.branchrefid,
          locname: this.selobj.locname,
          locrefid: this.selobj.locrefid,
          clientcdate: AppComponent.date
        };

        this.addEmployee.saveDivision(JSON.stringify(frmdata)).subscribe(data => { 
          if(data){
            this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Division Saved Successfully!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            c('Close click') };this.getDivision();
          },errorCode => console.log(errorCode));
      }
      else {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Division already exist!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    })
  }

  saveSubDivision(c) {
    this.addEmployee.isExist3(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.myForm.get('subdivisionname').value).subscribe(data => {
        if (!data) {
          var frmdata = {
            deptrefid: this.myForm.get('department').value,
            subdeptrefid: this.myForm.get('subdepartment').value,
            divisionrefid: this.myForm.get('division').value,
            subdivisionname: this.myForm.get('subdivisionname').value,
            companyrefid: this.selobj.companyid,
            branchrefid: this.selobj.branchrefid,
            locname: this.selobj.locname,
            locrefid: this.selobj.locrefid,
            clientcdate: AppComponent.date
          };
          this.addEmployee.saveSubDivision(JSON.stringify(frmdata)).subscribe(data => { 
            if(data){
              this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Sub Division Saved Successfully!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              c('Close click');this.getSubDivision();
            }
           },errorCode => console.log(errorCode));
        }else {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub Division already exist!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }

      })
  }

  seniorvalid(){
    var resval=1;
    let empfname=this.myForm.get('empfirstname').value
    let emplnam=this.myForm.get('emplastname').value
    let mobno=this.myForm.get('mobileno').value
    if(empfname.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First Name Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(emplnam!==null && emplnam.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Last Name Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(mobno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Mobile No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(this.myForm.get('age').value<10) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Employee Age Limit 10', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }
    return resval;
  }

  saveprocess:boolean=false;
  onSubmit() {
      this.submitted = true;
      this.myForm.get('createdby').setValue(sessionStorage.getItem('indvuserid'));
      this.myForm.get('clientcdate').setValue(AppComponent.date);
      let valflag=this.seniorvalid();
      if(valflag==1){
        this.createRecord();
      }
  }

  private createRecord(): void {
    this.saveprocess=true;
    this.myForm.get('deptrefid').setValue(this.myForm.get('department').value);
    this.myForm.get('subdeptrefid').setValue( this.myForm.get('subdepartment').value);
    this.myForm.get('divisionid').setValue(this.myForm.get('division').value);
    this.myForm.get('subdivisionid').setValue(this.myForm.get('subdivision').value);
    this.addEmployee.createEmployee(JSON.stringify(this.myForm.value)).subscribe(
      (result: any) => {
        let re = result.res;
        if (re == true) {
          this.saveprocess=false;
          this.notificationsComponent.addToast({ title: 'Success Message', msg: 'DATA SAVED SuccessFully....', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.saveempimage();
          //this.savesignimage();
          setTimeout(() => {
            this.router.navigate(['/EmployeeRegister/ViewEmployee']);
          },5000); 
        }else{
        this.saveprocess=false;
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' DATA NOT SAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      });
  }

//Employee Image Validation & Preview
empphotoChange(event: any) {
  this.message="";
 // when the load event is fired and the file not empty
 if(event.target.files && event.target.files.length > 0) {
    //Check & Print Type Error Message
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.showimage=false;
      this.message = "Only images are supported.";
       return;
    }
   
   if (event.target.files[0].size < 500000) {
   // Fill file variable with the file content
   this.ephoto = event.target.files[0];
   // Instantiate an object to read the file content
   let reader = new FileReader();
     //To read Encrypted file and send url to display in html
     reader.readAsDataURL(this.ephoto); 
     reader.onload = (_event) => { 
       this.imgURL = reader.result; 
    }
  }else{
    this.message = "Max Image Size 500KB Only & Check File Format";
  }


}

}

  imageshow(){
    this.showimage=true;
    this.showeyeslash=true;
    this.showeye=false;
  }

  hide(){
    this.showimage=false;
    this.showeyeslash=false;
    this.showeye=true;
  }

  reset(){

    //this.myForm.get('emphoto').setValue("");
    (<HTMLInputElement>document.getElementById("imagefile")).value = '';
    this.imgURL = '';
    this.showimage=false;
    this.showeyeslash=false;
    this.showeye=true;
    this.message='';
  }
  /* Employee Image End */



  //Employee Signature Save
  signChange(event: any) {

    this.signmessage="";
  
    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
  
       //Check & Print Type Error Message
       var mimeType = event.target.files[0].type;
       if (mimeType.match(/image\/*/) == null) {
         this.signshowimage=false;
         this.signmessage = "Only images are supported.";
          return;
       }
      
  
      if (event.target.files[0].size < 500000) {
  
      // Fill file variable with the file content
      this.signphoto = event.target.files[0];
  
    
      // Instantiate an object to read the file content
      let reader = new FileReader();
  
        //To read Encrypted file and send url to display in html
        reader.readAsDataURL(this.signphoto); 
        reader.onload = (_event) => { 
          this.signimgURL = reader.result; 
        }
       
    }
  
    else{
      this.signmessage = "Max Image Size 500KB Only & Check File Format";
    }
  
  
  }
   
  }


  
  signshow(){
    this.signshowimage=true;
    this.signshoweyeslash=true;
    this.signshoweye=false;
  }

  signhide(){
    this.signshowimage=false;
    this.signshoweyeslash=false;
    this.signshoweye=true;
  }

  signreset(){

    //this.myForm.get('emphoto').setValue("");
    (<HTMLInputElement>document.getElementById("signfile")).value = '';
    this.signimgURL = '';
    this.signshowimage=false;
    this.signshoweyeslash=false;
    this.signshoweye=true;
    this.signmessage='';
  }

  calculatedage:number=0;
  agecalculate(gd1){
    let d1=new Date(gd1);
    let d2=new Date();
    var diff = d2.getTime() - d1.getTime();
    this.calculatedage=Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    this.myForm.get('age').setValue(this.calculatedage);
    if(this.calculatedage<10){
      this.myForm.get('dob').setValue('');
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Employee Age Limit 10', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  daycalculate(gd1){
    let d1=new Date(gd1);
    let d2=new Date();
    var diff = d2.getTime() - d1.getTime();
    let daydiffer=Math.floor(diff / (1000 * 60 * 60 * 24));
    if(daydiffer<0){
      this.myForm.get('joiningdate').setValue(this.dateformat.transform05(Date.now()));
      this.notificationsComponent.addToast({ title: 'Alert Message', msg: 'Select Correct Joining Date!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
    //this.myForm.get('age').setValue(daydiffer);
  }

  searchwithcodefordept(event, deptmodel) {
    if (event == 'dept') {
      this.myForm.get('departmentname').setValue('');
      this.department(deptmodel);
    }
    else {
      return;
    }
  }


  department(deptmodel) {
    this.modalService.open(deptmodel).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  searchwithcodeforsubdept(event, subdeptmodel) {
    if (event == 'subdept') {
      this.myForm.get('subdepartmentname').setValue('');
      this.subdepartment(subdeptmodel);
    }
    else {
      return;
    }
  }


  subdepartment(subdeptmodel) {
    this.modalService.open(subdeptmodel).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  searchwithcodefordivision(event, divsionmodel) {
    if (event == 'division') {
      this.myForm.get('divisionname').setValue('');
      this.divsion(divsionmodel);
    }
    else {
      return;
    }
  }


  divsion(divsionmodel) {
    this.modalService.open(divsionmodel).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  searchwithcodeforsubdivsion(event, subdivsionmodel) {
    if (event == 'subdivision') {
      this.myForm.get('subdivisionname').setValue('');
      this.subdivsion(subdivsionmodel);
    }
    else {
      return;
    }
  }


  subdivsion(subdivsionmodel) {
    this.modalService.open(subdivsionmodel).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  saveempimage(){
    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.ephoto);
    // Launch post request Service Call
    this.addEmployee.saveimage(body).subscribe( (data) => {
      //Employee image  notification start
      if(data==true){
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & EMPLOYEE IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        this.myForm.reset();
        (<HTMLInputElement>document.getElementById("imagefile")).value = '';
        this.imgURL='';
        this.signimgURL='';
        this.calculatedage=0;
        setTimeout(() => {
          this.ngOnInit();
          //this.router.navigate(['Employee/ViewEmployee']);
          },5000);    
      }
      else{
        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & EMPLOYEE IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
     //Employee image  notification end
    });

    }


 savesignimage(){
  // Instantiate a FormData to store form fields and encode the file
  let body = new FormData();
  // Add file content to prepare the request
  body.append("file", this.signphoto);
  // Launch post request Service Call
  this.addEmployee.savesignimage(body).subscribe( (data) => {
      //SIGN response toast Notification
      if(data==true){
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & EMP SIGN IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        (<HTMLInputElement>document.getElementById("signfile")).value = '';
        this.imgURL='';
        this.signimgURL='';
        this.calculatedage=0;
        setTimeout(() => {
        this.ngOnInit();
        //this.router.navigate(['Employee/ViewEmployee']);
        },5000);  
      }
      else{
        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & EMP SIGN IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
     
  });

  }

  // Popup Modal Open Code


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  opendept(dept) {

    this.modalService.open(dept).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  opensubdept(subdept) {

    this.modalService.open(subdept).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  opendivision(division) {

    this.modalService.open(division).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  opensubdivision(subdivision) {

    this.modalService.open(subdivision).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }




}






