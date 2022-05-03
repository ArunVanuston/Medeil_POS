import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { shopeditService } from './editShop.services';
import { providers } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  /**@Author Ajith Kumar**/
  selector: 'app-editShop',
  templateUrl: './editShop.component.html',
  styleUrls: ['./editShop.component.css'],
  providers: [shopeditService, NotificationsComponent,dateFormatPipe]
})

export class shopeditComponent implements OnInit {
  alertmsgs:any;
  parentMessage = "sales";
  myForm: FormGroup;
  submitted = false;
  shopid: number;
  private shValue: any;
  countries = [];
  states = [];
  cities = [];
  states1 = [];
  cities1 = [];
  companyrefid1 = [];
  branchrefid1 = [];
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  deviceObj;
  uploadmessage: string;
  empshowimage: boolean = true;
  empphoto: any;
  empimgURL: string | ArrayBuffer;
  logoshoweyeslash: boolean = false;
  logoshoweye: boolean = true;

  constructor(private shopedit: shopeditService,private sanitizer: DomSanitizer,  private appComponent: AppComponent, private dateformat: dateFormatPipe, private route: ActivatedRoute, private router: Router, private notificationsComponent: NotificationsComponent) {
    let id = new FormControl();
    let companyid = new FormControl();
    let branchid = new FormControl();
    let shopname = new FormControl('',[Validators.required,Validators.pattern(this.textPattern)]);
    let ownername = new FormControl('',[Validators.required,Validators.pattern(this.textPattern)]);
    let license = new FormControl('',[Validators.required]);
    let dlNumber = new FormControl();
    let gst = new FormControl();
    let tin = new FormControl('',[Validators.required]);
    let cstNumber = new FormControl();
    let pan = new FormControl();
    let registrationNumber = new FormControl('',[Validators.required]);
    let address1 = new FormControl('',[Validators.required]);
    let address2 = new FormControl();
    let state = new FormControl(0);
    let country = new FormControl(0);
    let city = new FormControl(0);
    let pincode = new FormControl('',[Validators.required]);
    let mobileno = new FormControl('', [Validators.pattern(this.textnumbers)]);
    let email = new FormControl('', [Validators.pattern(this.emailPattern)]);
    let pharmaName = new FormControl();
    let pharmastate = new FormControl();
    let pharmacountry = new FormControl();
    let pharmapincode = new FormControl();
    let pharma_phonenumber = new FormControl('', [Validators.pattern(this.textnumbers)]);
    let pharma_email = new FormControl('', [Validators.pattern(this.emailPattern)]);
    let pharmacity = new FormControl();
    let registerflag = new FormControl();
    let companyrefid = new FormControl();
    let branchrefid = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();
    let modifiedby = new FormControl();
    let clientmdate = new FormControl();
    let bankname = new FormControl();
    let branchname = new FormControl();
    let ifsccode = new FormControl();
    let accountno = new FormControl();
    let accounttype = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    this.myForm = new FormGroup({
      id: id,
      companyid: companyid,
      branchid: branchid,
      shopname: shopname,
      ownername: ownername,
      license_holder: license,
      dlno: dlNumber,
      gstno: gst,
      tinno: tin,
      cstno: cstNumber,
      panno: pan,
      phar_registration_no: registrationNumber,
      address1: address1,
      address2:address2,
      state: state,
      country: country,
      city: city,
      pincode: pincode,
      mobileno: mobileno,
      emailid: email,
      pharmacistname: pharmaName,
      phar_state: pharmastate,
      phar_country: pharmacountry,
      phar_pincode: pharmapincode,
      phar_contactno1: pharma_phonenumber,
      phar_emailid: pharma_email,
      phar_city: pharmacity,
      registerflag: registerflag,
      companyrefid: companyrefid,
      branchrefid: branchrefid,
      clientcdate: clientcdate,
      createdby: createdby,
      clientmdate: clientmdate,
      modifiedby: modifiedby,
      locname: locname,
      locrefid: locrefid,
      bankname:bankname,
      branchname:branchname,
      ifsccode:ifsccode,
      accountno:accountno,
      accounttype:accounttype
    });
  }





  shoplogo: any = '';
  private readonly imageType: any = 'data:image/*;base64,';
  ngOnInit() {

    this.shValue = this.route.params.subscribe(params => {
      
      //this.shoplogo = +params['logo'];
    });
this.shopid = AppComponent.locrefID1;
    this.shopedit.shopeditservice(AppComponent.locrefID1).subscribe(data => 
      {
        this.shoplogo =this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.imageurl)
        
        this.myForm.patchValue(data.imagevalues)
      },
      err => {
        console.log('Error occured in shop edit ');
      });


    //get Country
    this.shopedit.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured Get Country');
      });
    //Get Company
    this.shopedit.getAllCompany().subscribe(data => this.companyrefid1 = data,
      err => {
        console.log('Error Occured ');
      });
    //Get Edit State
    this.shopedit.geteditStates(this.shopid).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      }
  );
      
    //Get edit City    
    this.shopedit.geteditCity(this.shopid).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });
    //Get Edit PharmaState
    this.shopedit.geteditStates1(this.shopid).subscribe(data => this.states1 = data,
      err => {
        console.log('Error Occured Get States1');
      }
      );
    //Get edit PharmaCity    
    this.shopedit.geteditCity1(this.shopid).subscribe(data => this.cities1 = data,
      err => {
        console.log('Error Occured Get City1');
      });
    //get company
    // this.shopedit.geteditCompany(this.shopid).subscribe(data => this.companyrefid1 = data,
    //   err => {
    //     console.log('Error Occured Get company');
    //   });
    //Get branch   
    this.shopedit.geteditBranch(this.shopid).subscribe(data => this.branchrefid1 = data,
      err => {
        console.log('Error Occured Get branch');
      });
      setTimeout(() => {
        let language='en';
        language=localStorage.getItem('language');
        this.shopedit.GetAlerts(language).subscribe(data => this.alertmsgs = data,
          errorCode => console.log(errorCode));
      }, 1800);

  }
  public returnFlag: boolean = false;
  onSubmit() {
    this.submitted = true;
    this.updateShoprecord();
//this.router.navigate(['./ViewRegistration/ViewShopInformation'])
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

  private updateShoprecord(): void {
    this.returnFlag = this.shopValidation();
    if (this.returnFlag == true) {
      this.myForm.get('clientcdate').setValue(AppComponent.date);
      this.myForm.get('createdby').setValue(AppComponent.userID);
      this.myForm.get('clientmdate').setValue(AppComponent.date);
      this.myForm.get('modifiedby').setValue(AppComponent.userID);
      this.myForm.get('companyrefid').setValue(AppComponent.companyID);
      this.myForm.get('branchrefid').setValue(AppComponent.branchID);
      this.myForm.get('locname').setValue(AppComponent.locRefName1);
      this.myForm.get('locrefid').setValue(AppComponent.locrefID1);
      this.shopedit.updateShoprecord(JSON.stringify(this.myForm.value)).subscribe(data =>{
        if(data){
          this.saveshopimage();
          this.justInitiate();
          this.deviceObj.apiname = "api/updateshopRecord";
          this.deviceObj.description = "Shop Updated";
          this.shopedit.deviceDetails(JSON.stringify(this.deviceObj));
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: this.alertmsgs.common.dataupdatedsuccesfully, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
       }
    
      });
    }
  
  }
  getState() {
    //Get States 
    this.shopedit.getStates(this.myForm.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      }
      );
  }
  getState1() {
    //Get States 
    this.shopedit.getStates(this.myForm.get('phar_country').value).subscribe(data => this.states1 = data,
      err => {
        console.log('Error Occured Get States');
      });
  }
  getCity() {
    //Get City 
    this.shopedit.getCity(this.myForm.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });
  }
  getCity1() {
    //Get City 
    this.shopedit.getCity(this.myForm.get('phar_state').value).subscribe(data => this.cities1 = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  getBranch() {
    this.shopedit.getBranch(this.myForm.get('companyid').value).subscribe(data => this.branchrefid1 = data, err => {
      console.log('Error occured On getBranch()');
    })
  }

  shopValidation(): boolean {
    let shname=this.myForm.get('shopname').value;
    let address1=this.myForm.get('address1').value;
    let address2=this.myForm.get('address2').value;
    let mobno=this.myForm.get('mobileno').value;
    if (this.myForm.get('shopname').value == '' || this.myForm.get('shopname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopname, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (shname.toString().length > 30) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.shopnamemaximum30charcaters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.myForm.get('ownername').value == '' || this.myForm.get('ownername').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourownername, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.myForm.get('tinno').value == '' || this.myForm.get('tinno').value == null  && address2.toString().length > 15) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.tinomaximum16characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.myForm.get('address1').value == '' || this.myForm.get('address1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopemailaddress, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (address1.toString().length > 200) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.address1maximum200characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (address2 != null && address2.toString().length > 150) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.address2maximum150characters, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.myForm.get('country').value == '0' || this.myForm.get('country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopcountry, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.myForm.get('state').value == '0' || this.myForm.get('state').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopstate, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.myForm.get('city').value == '0' || this.myForm.get('city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopcity, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.myForm.get('mobileno').value == '' || this.myForm.get('mobileno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourshopmobilenumber, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (mobno.toString().length > 15) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.phonenumberonly15digits, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }else if (this.myForm.get('emailid').value == '' || this.myForm.get('emailid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: this.alertmsgs.shop.enteryourpharmaemailaddress, timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // if (this.myForm.get('pharmacistname').value == '' || this.myForm.get('pharmacistname').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharmacist Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.myForm.get('phar_country').value == '0' || this.myForm.get('phar_country').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma Coutry', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.myForm.get('phar_state').value == '0' || this.myForm.get('phar_state').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.myForm.get('phar_city').value == '0' || this.myForm.get('phar_city').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.myForm.get('phar_contactno1').value == '' || this.myForm.get('phar_contactno1').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma Mobile Number', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.myForm.get('phar_emailid').value == '' || this.myForm.get('phar_emailid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma Email-Address', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
     // if (this.myForm.get('companyid').value == '' || this.myForm.get('companyid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Company Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }

    // if (this.myForm.get('branchid').value == '' || this.myForm.get('branchid').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Branch Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
     // if (this.myForm.get('license_holder').value == '' || this.myForm.get('license_holder').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your License Holder name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.myForm.get('dlno').value == '' || this.myForm.get('dlno').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Drug License Number', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    // if (this.myForm.get('gstno').value == '' || this.myForm.get('gstno').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Goods and ServiceTax', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    return true;
  }


  empimgupload(event: any) {

    this.uploadmessage="";
  
    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
  
       //Check & Print Type Error Message
       var mimeType = event.target.files[0].type;
       if (mimeType.match(/image\/*/) == null) {
         this.empshowimage=false;
         this.uploadmessage = "Only images are supported.";
          return;
       }
      
  
      if (event.target.files[0].size < 500000) {
  
      // Fill file variable with the file content
      this.empphoto = event.target.files[0];
  
    
      // Instantiate an object to read the file content
      let reader = new FileReader();
  
        //To read Encrypted file and send url to display in html
        reader.readAsDataURL(this.empphoto); 
        reader.onload = (_event) => { 
          this.empimgURL = reader.result; 
          this.shoplogo = '';
        }
       
    }
  
    else{
      this.uploadmessage = "Max Image Size 500KB Only & Check File Format";
    }
  
  
  }
   
  }
  logoshow(){
    this.empshowimage=true;
    this.logoshoweyeslash=true;
    this.logoshoweye=false;
  }

  logohide(){
    this.empshowimage=false;
    this.logoshoweyeslash=false;
    this.logoshoweye=true;
  }

  logoreset(){

    //this.myForm.get('emphoto').setValue("");
    (<HTMLInputElement>document.getElementById("empimgfile")).value = '';
    this.empimgURL = '';
    this.empshowimage=false;
    this.logoshoweyeslash=false;
    this.logoshoweye=true;
    this.uploadmessage='';
  }
  saveshopimage(){

    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.empphoto);
  
    // Launch post request Service Call
    this.shopedit.saveimage(body).subscribe( (data) => {
        //SIGN response toast Notification
        if(data==true){
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: this.alertmsgs.shop.shoplogosavedsuccessfully, timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          (<HTMLInputElement>document.getElementById("empimgfile")).value = '';
          //this.imgURL='';
          this.empimgURL='';
          setTimeout(() => {
          this.ngOnInit();
          //this.router.navigate(['Employee/ViewEmployee']);
          },5000);  
        }
        else{
          this.notificationsComponent.addToast({ title: 'Warning Message', msg: this.alertmsgs.shop.dataonlysavedempsignimageunsaved, timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
        }
       
    });
  
    }
}
