
import { EmployeeService } from '../emp.services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';

const textPattern = "[a-zA-Z ]*";
const textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
const pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  declare var $:any;

@Component({
  selector: 'app-employeeEdit',
  templateUrl: './editEmployee.component.html',
  providers: [EmployeeService, NotificationsComponent]
})
export class editEmployeeComponent implements OnInit {
  parentMessage = "sales";
  employeeEdit: FormGroup;
  $:any;
  private empValue: any;
  id: number;
  locname:  number;
  countries: any;
  submitted = false;
  states = [];
  flag: boolean = false;
  departmentarr = [];
  subdepartmentarr = [];
  divsionarr = [];
  subdivsionarr = [];
  //Employee Phot declare
  imgURL: any="assets/images/noimage.png";
  message: string;
  ephoto: File;
  showimage: boolean=false;
  showeyeslash: boolean=false;
  showeye: boolean=true;
  imageresponse: any;

  // Employee Sign Declare
  signimgURL: any="assets/images/noimage.png";
  signmessage: string;
  signphoto: File;
  signshowimage: boolean=false;
  signshoweyeslash: boolean=false;
  signshoweye: boolean=true;
  signresponse: any;
  selobj:any;

  constructor(private employeeServices: EmployeeService, private route: ActivatedRoute, private router: Router, private notificationsComponent: NotificationsComponent) {
    let id = new FormControl();
    let companyid = new FormControl();
    let branchid = new FormControl();
    let shopid = new FormControl();
    let employeecode = new FormControl();
    let emptitle = new FormControl('Mrs',[]);
    let empfirstname = new FormControl('',[Validators.required,Validators.pattern(textPattern)]);
    let emplastname = new FormControl('',Validators.pattern(textPattern));
    let employeemode = new FormControl('opt1',[]);
    let employeetype = new FormControl('opt1',[]);
    let department = new FormControl('', Validators.pattern(textPattern));
    let division = new FormControl('', );
    let desgination = new FormControl('', Validators.pattern(textPattern));
    let joiningdate = new FormControl('', Validators.required);
    let empsalary = new FormControl();
    let dob = new FormControl('', Validators.required);
    let age = new FormControl();
    let mobileno=new FormControl('',Validators.required);
    let bloodgroup = new FormControl('',[]);
    let allowlogin = new FormControl();
    let gender = new FormControl();
    let email = new FormControl('', Validators.pattern(pattern));
    let compemail = new FormControl('',Validators.pattern(pattern));
    let pancard = new FormControl('', );
    let status = new FormControl();
    let aadharcard = new FormControl('', Validators.pattern(textnumbers));
    let passport = new FormControl();
    let emphoto = new FormControl();
    let warehouserefid = new FormControl();
    let hospitalrefid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    let modifiedby = new FormControl();
    let clientmdate = new FormControl();
    let deptrefid = new FormControl(0);
    let subdeptrefid = new FormControl(0);
    let divisionid = new FormControl(0);
    let subdivisionid = new FormControl(0);

    this.employeeEdit = new FormGroup({
      id: id,
      companyid: companyid,
      branchid: branchid,
      shopid: shopid,
      employeecode: employeecode,
      emptitle: emptitle,
      empfirstname: empfirstname,
      emplastname: emplastname,
      employeemode: employeemode,
      employeetype: employeetype,
      department: department,
      division: division,
      desgination: desgination,
      joiningdate: joiningdate,
      deptrefid: deptrefid,
      subdeptrefid: subdeptrefid,
      divisionid: divisionid,
      subdivisionid: subdivisionid,
      empsalary: empsalary,
      dob: dob,
      age: age,
      mobileno:mobileno,
      bloodgroup: bloodgroup,
      allowlogin: allowlogin,
      gender: gender,
      email: email,
      compemail: compemail,
      pancard: pancard,
      aadharcard: aadharcard,
      passport: passport,
      emphoto:emphoto,
      locname: locname,
      locrefid: locrefid,
      modifiedby: modifiedby,
      clientmdate: clientmdate
    });
  }

  
  ngOnInit() {
    this.empValue = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };
    setTimeout(() => {
      this.employeeServices.employeeEdit(this.id).subscribe(data => { this.employeeEdit.patchValue(data) },
      err => {
        console.log('Error occured in shop edit ');
      });
      this.getDepartment();

      setTimeout(() => {
        this.getSubDepartment();
        this.getDivision();
        this.getSubDivision();
      },1800);
    }, 1000);
    
  }  /* Ng Oninit End */

  getDepartment() {
    this.employeeServices.getDepartment(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid).subscribe(data => this.departmentarr = data,
        err => {
          console.log('Error Occured Get getDepartment');
        });
  }

  getSubDepartment() {
    this.employeeServices.getSubDepartment(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.employeeEdit.get('deptrefid').value).subscribe(data => this.subdepartmentarr = data,
        err => {
          console.log('Error Occured Get getDepartment');
        });
  }

  getDivision() {
    this.employeeServices.getDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.employeeEdit.get('deptrefid').value, this.employeeEdit.get('subdeptrefid').value).subscribe(data => this.divsionarr = data,
        err => {
          console.log('Error Occured Get getDivision');
        });
  }

  getSubDivision() {
    this.employeeServices.getSubDivision(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.employeeEdit.get('deptrefid').value, this.employeeEdit.get('subdeptrefid').value,
      this.employeeEdit.get('divisionid').value).subscribe(data => this.subdivsionarr = data,
        err => {
          console.log('Error Occured Get getSubDivision');
        });
  }

  seniorvalid(){
    var resval=1;
    let empfname=this.employeeEdit.get('empfirstname').value
    let emplnam=this.employeeEdit.get('emplastname').value
    let mobno=this.employeeEdit.get('mobileno').value
    if(empfname.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First Name Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(emplnam.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Last Name Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(mobno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Mobile No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(this.employeeEdit.get('age').value<10) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Employee Age Limit 10', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }
    return resval;
  }
  
    saveprocess:boolean=false;
    onSubmit() {
      let valflag=this.seniorvalid();
      if(valflag==1){
        this.updateEmployee();
      }
    }
  
    private updateEmployee(): void {
      this.saveprocess=true;
      this.employeeEdit.get('modifiedby').setValue(AppComponent.userID);
      this.employeeEdit.get('clientmdate').setValue(AppComponent.date);
      this.employeeServices.updateEmployee(JSON.stringify(this.employeeEdit.value)).subscribe(
        (result: any) => {let re = result.res;
          if (result) {
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA UPDATED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
            this.updateempimage();
            //this.updateempsignimage();
            setTimeout(() => {
              this.router.navigate(['EmployeeRegister/ViewEmployee']);
              }, 3000);
          }else{
            this.saveprocess=false;
            this.notificationsComponent.addToast({ title: 'Error Message', msg: ' DATA NOT Updated....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }
        });
    }
  
     //calculatedage:number=0;
    agecalculate(gd1){
      let d1=new Date(gd1);
      let d2=new Date();
      var diff = d2.getTime() - d1.getTime();
      let calage=Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      this.employeeEdit.get('age').setValue(calage);
      if(calage<10){
        this.employeeEdit.get('dob').setValue('');
        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Employee Age Limit 10', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
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

 }

 else{
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
    this.imgURL = 'assets/images/noimage.png';
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
    this.signimgURL = 'assets/images/noimage.png';
    this.signshowimage=false;
    this.signshoweyeslash=false;
    this.signshoweye=true;
    this.signmessage='';
  }
 
 
  updateempimage(){
    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.ephoto);
   
    // Launch post request Service Call
    this.employeeServices.saveimage(body).subscribe( (data) => {
    
      //Employee image  notification start
      if(data==true){
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & EMPLOYEE IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        this.employeeEdit.reset();
        (<HTMLInputElement>document.getElementById("imagefile")).value = '';
        this.imgURL='assets/images/noimage.png';
        this.signimgURL='assets/images/noimage.png';
        setTimeout(() => {
          this.ngOnInit();
          this.router.navigate(['Employee/ViewEmployee']);
          },2500);    
      }
      else{
        this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & EMPLOYEE IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      }
     //Employee image  notification end
    });

    }

    updateempsignimage(){

      // Instantiate a FormData to store form fields and encode the file
      let body = new FormData();
      // Add file content to prepare the request
      body.append("file", this.signphoto);
    
      // Launch post request Service Call
      this.employeeServices.savesignimage(body).subscribe( (data) => {
          //SIGN response toast Notification
          if(data==true){
            this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & EMP SIGN IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
            (<HTMLInputElement>document.getElementById("signfile")).value = '';
            this.imgURL='assets/images/noimage.png';
            this.signimgURL='assets/images/noimage.png';
            setTimeout(() => {
            this.ngOnInit();
            this.router.navigate(['Employee/ViewEmployee']);
            },2500);  
          }
          else{
            this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & EMP SIGN IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
          }
         
      });
    
      }    


}

 // if (AppComponent.usertype == "\"SuperAdmin\" ") {               
    //   this.employeeServices.getCompany().subscribe(data => this.companies = data,
    //     err => {
    //       console.log('Error Occured ');
    //     });
    // } else {              
    //   this.employeeServices.getCompanyByLogin(AppComponent.companyID).subscribe(data => this.companies = data,
    //     err => {
    //       console.log('Error Occured ');
    //     });
    // }

