import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { purchaseReportModule } from '../purchasereports/report.services';

@Component({
  selector: 'app-vatreports',
  templateUrl: './vatreports.component.html',
  styleUrls: ['./vatreports.component.css'],
  providers:[purchaseReportModule]
})
export class VatreportsComponent implements OnInit {
  parentMessage="sales";
  private VatForm: FormGroup;
  branchid: any;
  locname: any;
  locrefid: any;
  companyrefid: any;
  status: number=0;
  country = [];
  state = [];
  city = [];
  countrycode = [];
  varcity;
  reportvar;
  reportvar1;
  pi_date;
  batch_no;
  pi_no;
  distributorId = [];
  dname;
  polist = [];
  varpro:any;
  characters =[];
  charact = [];
  date: any;
  vatno: any;
  batchname:any;
  varbatch:any;
  pinumber= [];
  constructor(private formBuilder: FormBuilder,
              private vatservice: purchaseReportModule, 
              private dateformat: dateFormatPipe,
              private notification:NotificationsComponent, 
              private domSanitizer: DomSanitizer,
              private appComponent:AppComponent) {}
 
  ngOnInit() {
    this.VatForm = this.formBuilder.group({
     
     from_date: ['', Validators.required],
     to_date: [this.dateformat.transform05(Date.now()), Validators.required],
     pidate:  [this.dateformat.transform05(Date.now()),Validators.required],
     batchno:['', Validators.required],
     pino:['', Validators.required],
     countryid: ['', []],
     stateid: ['', []],
     city: ['', []],
     countrycode: ['', []],
     distname: ['',[] ],
     productid: ['', []],
     vat:['',[]],
     batchid: ['',[]]
 
  });
 
   
    this.branchid=  AppComponent.branchID;
    this.locname=  AppComponent.locRefName1;
    this.locrefid= AppComponent.locrefID1;
    this.companyrefid= AppComponent.companyID;
    //this.date= AppComponent.date;
    this.date = this.dateformat.transform05(Date.now());
    this.reportvar= this.VatForm.get("from_date").value;
    this.reportvar1= this.VatForm.get("to_date").value;
    this.batch_no=this.VatForm.get("batchno").value;
    this.pi_no=this.VatForm.get("pino").value;
    this.VatForm.get('distname').setValue('opt1');
    this.VatForm.get('countryid').setValue("0");
    this.VatForm.get('stateid').setValue("0");
    this.VatForm.get('city').setValue("0");
    this.VatForm.get('countrycode').setValue("0");
    this.VatForm.get('productid').setValue("0");
    this.VatForm.get('vat').value;
    
    this.vatservice.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error Occured getCountry()');
      });
      this.vatservice.getpurchaseinvoice(AppComponent.companyID , AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {this.pinumber=data, err => {
       console.log('Error Occured getPinvoice()');
     }});
     
 
      this.vatservice.getProductlist(this.companyrefid, this.branchid, AppComponent.shopID,  this.locrefid,  this.locname).subscribe(data => this.polist = data,
         err => {
           console.log('Error Occured On getProductlist()');
         }
       );
 
 
 this.vatservice.getDistributorInfo(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => { this.distributorId = data },
 err => {
      console.log('Error Occured ');
  });
 }
  getDistributor() {
   this.dname=this.VatForm.get("distname").value;
  }
  setDateRange(): void {
    // Set date range (today) using the patchValue function
    let date = new Date();
    this.VatForm.patchValue({from_date:  {
        beginDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        },
        endDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }});
    let date2 = new Date();
    this.VatForm.patchValue({to_date: {
      beginDate: {
          year: date2.getFullYear(),
          month: date2.getMonth() + 1,
          day: date2.getDate()
      },
      endDate: {
          year: date2.getFullYear(),
          month: date2.getMonth() + 1,
          day: date2.getDate()
      }
  }});
 
  let date3 = new Date();
  this.VatForm.patchValue({pidate:  {
      beginDate: {
          year: date3.getFullYear(),
          month: date3.getMonth() + 1,
          day: date3.getDate()
      },
      endDate: {
          year: date3.getFullYear(),
          month: date3.getMonth() + 1,
          day: date3.getDate()
      }
  }});
 
 }
 getProduct(val: string) {
   this.vatservice.getProductlist(val,AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
      this.characters = [];     
      for (let i = 0; i < data.length; i++) {
        this.characters.push({ value: data[i][0], label: data[i][1] });
 
      }
    });
 
  }
 
 getProValues(){
 this.varpro=this.VatForm.get('productid').value;
 }
 
 
 getBatch(val2: string) {
   this.vatservice.getbatchnamelist(val2,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.charact = [];     
      for (let i = 0; i < data.length; i++) {
        this.charact.push({ value: data[i][1], label: data[i][1] });
      }
    });
  }
 
 getBatchValues(){
  this.batch_no=this.VatForm.get('batchid').value;
 }
 
 
 getPinvoice(){
 
   this.pi_no = this.VatForm.get('pino').value;
 
 }
 
 getState() {
     this.vatservice.getStates(this.VatForm.get('countryid').value).subscribe(data => this.state = data,
       err => {
         console.log('Error Occured Get States');
       });
  
     this.vatservice.getCountrycode(this.VatForm.get('countryid').value).subscribe(data => {
       this.countrycode = data,
         this.VatForm.get('countrycode').setValue(data.toString());
     },
       err => {
         console.log('Error Occured Country Code');
       });
   }
  
  
   getCity() {
  this.vatservice.getCity(this.VatForm.get('stateid').value).subscribe(data => this.city = data,
       err => {
         console.log('Error Occured Get City');
       });
   }
   cityid(){
     this.varcity=this.VatForm.get('city').value;
  
   }
 
   datefetch(){
     this.pi_date= this.VatForm.get("pidate").value;
     this.reportvar= this.VatForm.get("from_date").value;
     this.reportvar1= this.VatForm.get("to_date").value;
    
   }
   view(){
   this.pi_no=this.VatForm.get("pino").value;
   // this.batch_no=this.myForm.get("batchno").value;
   this.vatno=this.VatForm.get("vat").value;
   }
   validation(): boolean {
    
     if (this.VatForm.get('vat').value == '' || this.VatForm.get('vat').value == null) {
       this.notification.addToast({ title: 'Error Message', msg: 'Select Vat Value..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
       return false;
     }
     if (this.VatForm.get('from_date').value == '' || this.VatForm.get('from_date').value == null) {
      this.notification.addToast({ title: 'Error Message', msg: 'Select from Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
  
    
     return true;
   }
   validation1(): boolean {
    
 
    if (this.VatForm.get('from_date').value == '' || this.VatForm.get('from_date').value == null) {
     this.notification.addToast({ title: 'Error Message', msg: 'Select from Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
     return false;
   }
 
   
    return true;
  }

 
 
   //Iframe Methods
   flag:boolean=false;
 reportshow:boolean;
 reportlink1:any="https://secure.medeil.io";
 
 
 purchasevat(){
  this.flag=this.validation();
  if(this.flag){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Purchase_VatReports/PercentagewisepVatReport.rptdesign&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&vat="+this.vatno+"&status=0&__format=PDF";
   this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
}
 purchasereturnvat(){
   this.flag=this.validation();
   if(this.flag){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/VatReport/Individual%20PRVat%20Report.rptdesign&Branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&vat="+this.vatno+"&status=0&__format=PDF";
   this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
}

DistwiseVatReport(){
  this.flag=this.validation1();
  if(this.flag){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Purchase_VatReports/DistributorwisepVatReport.rptdesign&branchreid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF";
   this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
}

purchasevatwithProduct(){
  this.flag=this.validation1();
  if(this.flag){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Purchase_VatReports/DistributorwisepVatReport.rptdesign&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF";
   this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
}
custsalesinvoice(){
  this.flag=this.validation1();
  if(this.flag){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales_Vatreports/CustomerWiseVatReport.rptdesign&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF";
   this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
}

percensales(){
  this.flag=this.validation();
  if(this.flag){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales_Vatreports\PercentageWiseVatReport.rptdesign&branchrefid="+this.branchid+"&locnname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&vat="+this.vatno+"&__format=PDF";
   this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
}
 

prodwisesales(){
  this.flag=this.validation1();
  if(this.flag){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales_Vatreports/ProductWiseVatReport.rptdesign&branchreid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF";
   this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
}

salesreturnvat(){
  this.flag=this.validation1();
  if(this.flag){
   this.reportshow=true;
   let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales_Vatreports/SalesreturnWiseVatRepor.rptdesign&branchreid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF";
   this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
 }
}
todaysalesreturn(){
  this.flag=this.validation1();
  if(this.flag){
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Sales_Vatreports/TodaySalesreturnWiseVatReport.rptdesign&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&__format=PDF";
  this.reportlink1 = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
}

}



 }
 
 

