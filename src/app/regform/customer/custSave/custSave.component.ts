import { custSaveService } from './custSave.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { CustomValidators } from 'ng2-validation';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import { RightpanelComponent } from '../../../rightpanel/rightpanel.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { CategoryPipe } from 'app/Purchase/purchaseOrderView/purchaseOrderView-list.pipe';

@Component({
  selector: 'app-custSave',
  templateUrl: './custSave.component.html',
  providers: [custSaveService, NotificationsComponent, dateFormatPipe]
})


export class custSaveComponent implements OnInit {
  parentMessage = "sales"
  @ViewChild(RightpanelComponent) child  

   Email  =    "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
   shopregex = "^$|^[A-Za-z0-9]+";
   
  registerForm: FormGroup;
  countries = [];
  states = [];
  cities = [];
  i;
  selobj;
  saveprocess:boolean=false;
  custcat: any;
  saveccdata: { customercategory: any; companyrefid: any; branchrefid: any; locname: any; locrefid: any; };
  constructor(private formBuilder: FormBuilder,private modalService: NgbModal,private route:Router, private dateformat: dateFormatPipe,private router: Router, private userService: custSaveService, private notificationsComponent: NotificationsComponent) { }
 
  ngOnInit() {
    var date = this.dateformat.transformnew(Date.now());
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, cdate: AppComponent.date };
    this.registerForm = this.formBuilder.group({
      ptid: ['', []],
      hospitalid: ['', []],
      patientcode: ['', []],
      patienttitle: ['', []],
      patientfirstname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      patientlastname: ['', [Validators.pattern("[a-zA-Z ]*")]],
      gender: ['', [Validators.required]],
      age:[0,[]],
      maritalstatus: ['', []],
      dob: ['', [Validators.required]],
      patienttype: ['', []],
      address1: ['', [Validators.required]],
      address2: ['', []],
      country: ['opt1', []],
      state: ['opt1', []],
      city: ['opt1', [Validators.required]],
      pincode: ['', []],
      countrycode: ['', []],
      mobile: ['', [Validators.required,]],
      phone: ['', []],
      email: [, [Validators.pattern(this.Email),Validators.required]],
      aadhaarcardno: ['', []],
      language: ['', []],
      description: ['', []],
      ipaddress: ['', []],
      latitude: ['', []],
      longitude: ['', []],
      companyid: ['', []],
      createdby: [this.selobj.userid, []],
      clientcdate: [this.selobj.cdate, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      tinno: [, [Validators.pattern(this.shopregex)]],
      gstno: [, [Validators.pattern(this.shopregex)]],
      vatno: [, [Validators.pattern(this.shopregex)]],
      scitizenflag: [false, []],
      phycapflag: [false, []],
      scitizenno: [{ value: '', disabled: true }, [Validators.pattern(this.shopregex)]],
      phycapno: [{ value: '', disabled: true }, [Validators.pattern(this.shopregex)]],
      productid:[0],
      customercategory:['',[]],
      patientcattypeid:["opt1",[Validators.required]]
    });
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));


this.getcustcat()

    
  }


  years;
  month;
  days;
    calculatedage:any;
    agecalculate(gd1){
      let todate=new Date();
      if(todate) todate= new Date(todate);
      else todate= new Date();
  
      var age= [], fromdate= new Date(gd1),
      y= [todate.getFullYear(), fromdate.getFullYear()],
      ydiff= y[0]-y[1],
      m= [todate.getMonth(), fromdate.getMonth()],
      mdiff= m[0]-m[1],
      d= [todate.getDate(), fromdate.getDate()],
      ddiff= d[0]-d[1];
  
      if(mdiff < 0 || (mdiff=== 0 && ddiff<0))--ydiff;
      if(mdiff<0) mdiff+= 12;
      if(ddiff<0){
          fromdate.setMonth(m[1]+1, 0);
          ddiff= fromdate.getDate()-d[1]+d[0];
          --mdiff;
      }
      if(ydiff> 0) age.push(ydiff+ ' year'+(ydiff> 1? 's ':' '));
      if(mdiff> 0) age.push(mdiff+ ' month'+(mdiff> 1? 's ':''));
      if(ddiff> 0) age.push(ddiff+ ' day'+(ddiff> 1? 's':''));  
      this.calculatedage = age.join('');
      this.registerForm.get('age').setValue(this.calculatedage);
        if(ydiff>=60)
              {
               this.registerForm.get('scitizenflag').setValue(true);
               this.enablecontrol1();
             }
      return age.join('');        
        
    }

        // calculatedage:any;
        //    agecalculate(gd1){
        //      let d1=new Date(gd1);
        //    let d2=new Date();
        //    if(d1>d2){
        //        this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Valid Previous Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        //      this.registerForm.get('dob').setValue('');
        //      this.registerForm.get('age').setValue(0);
        //    }else{
        //      var diff = Math.floor(d2.getTime() - d1.getTime());
        //      var calcdays=1000 * 60 * 60 * 24;
        //      var days=0; var months=0; var years=0;
        //      days = Math.floor(diff/calcdays);
        //      months = Math.floor(days/31);
        //      years = Math.floor(days/365.25);    // Math.floor(months/12);
        //      var message = d2.toDateString();
        //        this.calculatedage=days+ " Days -" + months+ " Months -" + years+ " Years"
        //      this.registerForm.get('age').setValue(days);
        //    if(years>=60){
        //          this.registerForm.get('scitizenflag').setValue(true);
        //          this.enablecontrol1();
        //        }
        //      }
        //    }
  

  seniorvalid(){
    var resval=1;
    let patientfname=this.registerForm.get('patientfirstname').value
    let patientlname=this.registerForm.get('patientlastname').value
    let age=this.registerForm.get('age').value
    let address1=this.registerForm.get('address1').value
    let address2=this.registerForm.get('address2').value
    let seniorflag=this.registerForm.get('scitizenflag').value
    let cattype=this.registerForm.get('patientcattypeid')
    let phyflag=this.registerForm.get('phycapflag').value
    let seniorno=this.registerForm.get('scitizenno').value
    let phyno=this.registerForm.get('phycapno').value
    let tinno=this.registerForm.get('tinno').value
    let vatno=this.registerForm.get('vatno').value
    let mobno=this.registerForm.get('mobile').value
    let phno=this.registerForm.get('phone').value
    let countrycode=this.registerForm.get('country').value
    let statecode=this.registerForm.get('state').value
    let citycode=this.registerForm.get('city').value
    if(patientfname.toString().length>30) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'First Name Maximum 30 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(patientlname.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Last Name Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(age<1) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Age Not be a zero', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if (seniorflag == true && seniorno == '') {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Senior Citizen No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(seniorno != null && seniorno.toString().length>25) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Senior citizen Maximum 25 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(phyflag == true && phyno == '') {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Enter Physcap No', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(phyno !=null && phyno.toString().length>25) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Physical Hadicap Maximum 25 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(tinno != null && tinno.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'TIN No Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(vatno != null && vatno.toString().length>20) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'VAT No Maximum 20 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if((address1.toString().length>200)) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Address1 Limit 200 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if((address2 != null && address2.toString().length>150)) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Address2 Limit 150 Characters', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(countrycode=='opt1'||countrycode==''||countrycode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Country', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(statecode=='opt1'||statecode==''||statecode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(citycode=='opt1'||citycode==''||citycode==null) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select City', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(mobno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Mobile No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }else if(phno != null && phno.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Phone No Maximum Limit 15 Digits', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }
    else if(cattype != null && cattype.toString().length>15) {
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Please select category type', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      resval=0;
    }
    return resval;
  }


  onSubmit() {
    //var answer = confirm("Save data?");
   let valflag=this.seniorvalid();
   
   if(valflag==1){
     this.saveprocess=true;
    this.userService.savePatient(JSON.stringify(this.registerForm.value)).subscribe(data => {
      this.savevalid(data)
      // if(data){
      //   this.opensaveSwal();
      // }
    },errorCode =>{console.log(errorCode);this.saveprocess=false});
      
    }
  
  }

  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      setTimeout(() => {
        this.saveprocess=false;
        this.router.navigate(['/CustomerRegistration/ViewCustomer']);
      }, 2000);
    } else {
      this.saveprocess=false;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
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

  clear() {
    this.ngOnInit();
  }

  enablecontrol1() {
    if (this.registerForm.get('scitizenflag').value == true) {
      this.registerForm.get('scitizenno').enable();
    } else if (this.registerForm.get('scitizenflag').value == false) {
      this.registerForm.get('scitizenno').disable();
    }
  }

  enablecontrol2() {
    if (this.registerForm.get('phycapflag').value == true) {
      this.registerForm.get('phycapno').enable();
    } else if (this.registerForm.get('phycapflag').value == false) {
      this.registerForm.get('phycapno').disable();
      //this.form.get('credentials').at(index).get('label').enable(); form array usage
    }
  }


  
  // ccpop(selvalue, popupname){
  //   if (selvalue == "custcategory") {
  //     // alert(selvalue);
  //     this.openmain(popupname);
  //   }
  //   // else {
  //   //   this.newmodule=false;
  //   // }
  //   alert(popupname)
  // }

  
  // closeResult: string;
  // openmain(popupname) {
  //   this.modalService.open(popupname).result.then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     }, (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  
  custpopup(selvalue, popupname){
    if (selvalue == "custcategory") {
      this.openmain(popupname);
     
    }
    // else {
    //   this.newmodule=false;
    // }
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
  


  getcustcat(){
    this.userService.getcc(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.custcat=data
      Error =>{
        console.log("The Error Occure in Getcc()");
      }
    })
  }
  savecustcat(c){
    // alert(custcate)

    const cctype = this.registerForm.get('customercategory').value;
    this.saveccdata = {customercategory:cctype,companyrefid:parseInt(AppComponent.companyID),branchrefid:parseInt(AppComponent.branchID),locname:parseInt(AppComponent.locRefName1),locrefid:parseInt(AppComponent.locrefID1)};
    this.userService.savecc(JSON.stringify(this.saveccdata)).subscribe(data=>{
    data
       if (data == true) {
      this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Customer Category Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      c('Close click');
this.getcustcat();
    }
  });

}


opensaveSwal() {
  swal({
    title: 'Do you want Redirect to Loyalty Settings?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then(() => {
    // alert("rahja")
    this.route.navigate(['Loyalty/Loyaltypointsettings']);



  }).catch(swal.noop);
}
 
}