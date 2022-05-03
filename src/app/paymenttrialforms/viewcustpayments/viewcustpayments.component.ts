import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { PaymentTrialService } from '../paymenttrialforms.service';
import * as html2canvas from 'assets/html2canvas';
import  jsPDF from 'jspdf';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-viewcustpayments',
  templateUrl: './viewcustpayments.component.html',
  providers:[NotificationsComponent]
})
export class ViewcustpaymentsComponent implements OnInit {
  @ViewChild('screen1') screen1;
  @ViewChild('screen2') screen2;
  rowsOnPage:number=10;
  custpayForm:FormGroup;
  paymentlists=[];
  paymentlistscopy=[];
  accountid:any;
  subscriptionid:any;
  planid:any;
  customerid:any;
  constructor(private paytrialservice:PaymentTrialService,private fb: FormBuilder,private notificationsComponent: NotificationsComponent) { }

  ngOnInit() { 
    this.custpayForm = this.fb.group({
      from_date: ['', []],
      to_date:['',[]],
    });
  }

  datefetch(id,fetchdate){
    let date1 = new Date();
    let date2 = new Date(fetchdate);
    if(date2>date1){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Previous Date!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      if(id==1){
        this.custpayForm.get('from_date').setValue('');
      }else if(id==2){
        this.custpayForm.get('to_date').setValue('');
      }
    }
  }

  payvalidate(){
    let fromdate=this.custpayForm.get('from_date').value;
    let todate=this.custpayForm.get('to_date').value; 
    if(fromdate==''||fromdate==null||fromdate==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select From Date!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(todate==''||todate==null||todate==undefined){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select To Date!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      return false;
    }else if(new Date(fromdate)>new Date(todate)){
      this.notificationsComponent.addToast({ title: 'Alert MSG', msg: 'Select Valid Date!..', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
      this.custpayForm.get('from_date').setValue('');
      this.custpayForm.get('to_date').setValue('');
      return false;
    }
    return true;
  }

  fetchpayments(){
    let fromdate=this.custpayForm.get('from_date').value;
    let todate=this.custpayForm.get('to_date').value;
    let valflag=this.payvalidate();
    if(valflag){  //
    this.paytrialservice.ViewCustPayments(sessionStorage.getItem('indvuserid'),fromdate,todate).subscribe(data => {
      this.paymentlists=data, this.paymentlistscopy=data },error => { console.log(error) 
      });
    }
  }

  payrecord:any=[];
  cartlists:any=[];
  paymentdetails:boolean=false;
  cartpaydetails:boolean=false;
  carttotal:number=0;carttax:number=0;
  sendpaydetails(data:any){
    var qty; var taxamount;qty=1;
    if(AppComponent.countryID==291){
      taxamount=(parseFloat(data[5])*18)/100;
    }else{
      taxamount=0;
    }
    this.payrecord={
      description:data[0],
      date:data[1].split(' ')[0],
      amount:data[5],
      taxamount:taxamount,
      qty:qty,
      disc:'',
      shname:data[8],
      name:data[9],
      mobile:data[10],
      email:data[11],
      address:data[12],
      gst:data[13],
      invid:data[14]
    } 
    if((data[0]).toLowerCase()=='cart items'){
      this.cartpaydetails=true;
      this.paymentdetails=false;
      this.paytrialservice.ViewCartDetails(sessionStorage.getItem('indvuserid'),data[1].split(' ')[0]).subscribe(cartdata => {
        if(cartdata){
          this.cartlists=[];
          for(let k=0;k<cartdata.length;k++){
            this.carttotal+=parseInt(cartdata[k][0])*parseFloat(cartdata[k][1]);
            this.carttax+=parseFloat(cartdata[k][2]);
            this.cartlists.push({
              qty:cartdata[k][0],
              amount:cartdata[k][1],
              taxamount:cartdata[k][2],
              description:cartdata[k][3],
              disc:'',
            });
          }
        }
      },error => { console.log(error) });
    }else{
      this.paymentdetails=true;
      this.cartpaydetails=false;
    }
  }

  public downloadImage(index){  
    //var data = document.getElementById('contentToConvert');
    var screen=this.screen1.nativeElement;
    if(index==2){
      screen=this.screen2.nativeElement;
    }else{
      screen=this.screen1.nativeElement;
    }
    html2canvas(screen).then(canvas => {  
      // Few necessary setting options  
      // var imgWidth = 1250;   
      // var imgHeight = 350   //canvas.height * imgWidth / canvas.width;  
      // var heightLeft = imgHeight;  
      // var pageHeight = 295;    
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', [350,225]); // A4 size page of PDF [400,180]
      //var doc = new jsPDF(); 
      var position = 41;  
      pdf.addImage(contentDataURL, 'PNG',8, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
      var file3 =pdf.output('blob') //new Blob([pdf.output('blob')], {type: 'application/pdf'});
     // this.capturedImage = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file3));
      //this.updatedrugimage(pdf.output('blob'));
    });  
  }


}
