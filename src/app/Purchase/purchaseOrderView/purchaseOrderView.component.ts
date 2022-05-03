import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {purchaseOrderViewService} from './purchaseOrderView.services';
import { Router } from '@angular/router'
import { error } from 'selenium-webdriver';
import { AppComponent } from '../../app.component'
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { DomSanitizer } from '@angular/platform-browser'; 
import { TranslateService } from 'ng2-translate'; 
const navigator1 = window.navigator as any;
@Component({
  selector: 'Purchase Order',
  templateUrl: './purchaseOrderView.component.html',
  styleUrls: ['./purchaseOrderView.component.css'],
  providers: [purchaseOrderViewService,  NotificationsComponent]
})
export class purchaseOrderViewComponent implements OnInit {
 
  public data=[];
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  purchaseOrder :any= [];  
  purchaseOrders: FormGroup;
  deviceObj;
  gifFail: boolean=true;
  windowwidth:number=0;
 
  
  constructor(public translate: TranslateService,private poservices: purchaseOrderViewService,   private dateformat: dateFormatPipe,private route: Router, 
    private formBuilder:FormBuilder,private notificationsComponent: NotificationsComponent, 
    private app:AppComponent,  private domSanitizer: DomSanitizer) {      translate.setDefaultLang('en');        
    this.purchaseOrders = this.formBuilder.group({
      companyid: ['', []],
      branchid: ['', []],
      locname: ['', []],
      locref: ['', []],
    }); 
  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.windowwidth=window.innerWidth;
    this.purchaseOrders.get('companyid').setValue(AppComponent.companyID);
    this.purchaseOrders.get('branchid').setValue(AppComponent.branchID);
    this.purchaseOrders.get('locname').setValue(AppComponent.locrefID);

    if (AppComponent.shopID != 0) {
      this.purchaseOrders.get('locref').setValue(AppComponent.shopID);
    }

    if (AppComponent.warehouseID != 0) {
      this.purchaseOrders.get('locref').setValue(AppComponent.warehouseID);
    }

    if (AppComponent.hospitalID != 0) {
      this.purchaseOrders.get('locref').setValue(AppComponent.hospitalID);
    }
   
    setTimeout(() => {
    this.poservices.viewPurchaseOrders(AppComponent.companyID,AppComponent.branchID,AppComponent.locrefID,this.purchaseOrders.get('locref').value).subscribe(data =>{this.data = data},
    err =>{
      console.log('Error Occured Get States');
    });

    this.gifFail=false;
    
  },3000);

  }

  reportlink: any = "assets/images/loading.gif";
  reportshow: boolean = false;
  reprint(invoiceid){
    this.reportshow=true;
    this.poservices.getprintmodel(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, 1).subscribe(pdata => {
      if (pdata.length !== 0) {
        let rlink = pdata[0][1]+"&porefid="+ invoiceid +"&__format=PDF";
        this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
        //http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/Bill_CashPrint124/Cash_Bill.rptdesign&salesrefid=" 
      } else {
        let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Bill_PurchaseOrder.rptdesign&porefid="+ invoiceid +"&__format=PDF";
        this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
      }
    }, err => {
      console.log(err);
      let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Bill_PurchaseOrder.rptdesign&porefid="+ invoiceid +"&__format=PDF";
      this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

    });
  }
 

  PurchaseOrderDelete(id:number) {
    var answer = confirm("Delete data?");
    if (answer) {
      this.poservices.PurchaseOrderDelete(id).subscribe(data=>{     
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Deleted Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.ngOnInit();              
      });
    }
  }


  sharelink: any = "assets/images/loading.gif";
  shareapi(invoiceid){  
    this.poservices.getprintmodel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,1).subscribe(pdata => {
      if (pdata.length!==0) {
        this.sharelink= pdata[0][1] +"&porefid=" + invoiceid +"&__format=PDF";
      }else{
        this.sharelink= "https://secure.medeil.io/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Bill_PurchaseOrder.rptdesign&porefid=" + invoiceid +"&__format=PDF";
      }
    }, err => { console.log(err); 
      "https://secure.medeil.io/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Bill_PurchaseOrder.rptdesign&porefid=" + invoiceid +"&__format=PDF";
    }); 
    
    setTimeout(() => {
      if (navigator1.share) {
        navigator1
          .share({
            title: 'Medeil Team',
            text: 'Purchase Order',
            url: this.sharelink
          })
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing: ', error));
      } else {
        alert('share not supported');
      }
    },1200);
  }  




}


