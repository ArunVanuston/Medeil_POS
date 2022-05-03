
import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../../app.component';
import {slsInvViewService} from './slsInvView.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DomSanitizer } from '@angular/platform-browser'; 
import { TranslateService } from 'ng2-translate'; 
const navigator1 = window.navigator as any;

@Component({
  selector: 'app-slsInvView',
  templateUrl: './slsInvView.component.html',
  providers: [slsInvViewService] 
})

export class slsInvViewComponent implements OnInit {
  public invdata: any; 
  public invdatacopy: any; 
  public invproducts: any; 
  public data: any; 
  public filterQuery: string = ""; 
  totalRec: number;
  page: number = 1;
  size: number = 10;
  sendpage: number;
  pharmacomp = [];
  selobj ;
  searchvalue: any;
  datatable: boolean=true;
  searchdatatable: boolean=false;
  discableflag:boolean=true;
  gifFail:boolean=true;
  rowsOnPage:number=10;
  windowwidth:number=0;
  verticalrank:any;
  formData = {
    title: "",
    text: "",
    url: ""
  };
  files: FileList;

    constructor( public translate: TranslateService,private userService: slsInvViewService,private notificationsComponent: NotificationsComponent,
      private domSanitizer: DomSanitizer,public el: ElementRef) {translate.setDefaultLang('en');}
  
    ngOnInit() {
      this.translate.use(localStorage.getItem('language'));
      this.verticalrank=sessionStorage.getItem('verticalrank');
      this.windowwidth=window.innerWidth;
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1 , countryrefid  :AppComponent.countryID  , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
      this.viewAll() ;
      setTimeout(() => {
        this.gifFail=false;
        this.userService.getadminflag(sessionStorage.getItem('indvuserid')).subscribe(data => {
          if(data[0][0]==1){
            this.discableflag=false;
          }else{
            this.discableflag=true;
          }
         },error => { console.log(error);this.discableflag=true; }); 
      }, 2100);
    }

    viewAll(){
      this.userService.ViewAllSalesInvoice(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid).subscribe(data => {
        this.invdata = data,this.invdatacopy = data},
        errorCode => console.log(errorCode));
    }
   
    sharelink: any = "assets/images/loading.gif";
    shareapi(invoiceid){  
      this.userService.getprintmodel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,4).subscribe(pdata => {
        if (pdata.length!==0) {
          this.sharelink= pdata[0][1]+"&salesrefid="+invoiceid+"&__format=PDF";
        }else{
          this.sharelink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/SalesInvoiceBill_Dot_Right_Barcode/SalesInvoiceBill.rptdesign&salesrefid="+invoiceid+"&__format=PDF";
        }
      }, err => { console.log(err); 
        this.sharelink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/SalesInvoiceBill_Dot_Right_Barcode/SalesInvoiceBill.rptdesign&salesrefid="+invoiceid+"&__format=PDF";
      }); 
      
      setTimeout(() => {
        if (navigator1.share) {
          navigator1
            .share({
              title: 'Medeil Team',
              text: 'Sales Invoice',
              url: this.sharelink
            })
            .then(() => console.log('Successful share'))
            .catch(error => console.log('Error sharing: ', error));
        } else {
          alert('share not supported');
        }
      },1200);
    }
    
    sharefileview:boolean=false;
    shareapi1(invoiceid){  
      this.sharefileview=true;
      this.userService.getprintmodel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,4).subscribe(pdata => {
        if (pdata.length!==0) {
          this.sharelink= pdata[0][1]+"&salesrefid="+invoiceid+"&__format=PDF";
        }else{
          this.sharelink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/SalesInvoiceBill_Dot_Right_Barcode/SalesInvoiceBill.rptdesign&salesrefid="+invoiceid+"&__format=PDF";
        }
      }, err => { console.log(err); 
        this.sharelink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/SalesInvoiceBill_Dot_Right_Barcode/SalesInvoiceBill.rptdesign&salesrefid="+invoiceid+"&__format=PDF";
      }); 
    }

    handleFilesChange(files) {
      this.files = files;
    }

    sendsharefile(){
      const { title, text, url } = this.formData;
      const files = this.files;
      const toBeShared = {
        title,
        text,
        files,
        url
      };
      toBeShared.title='Medeil Team';
      toBeShared.text='Sales Invocie';
      toBeShared.url=this.sharelink;
      if (navigator1.share) {
        if (navigator1["canShare"] && navigator1["canShare"]({ files })) {
          alert(`Your system Support sharing files.`+ toBeShared.files);
          delete toBeShared.url;
        } else {
          alert(`Your system doesn't support sharing files.`+ toBeShared.url);
          delete toBeShared.files;
        }
        navigator1
          .share({
            ...toBeShared
          })
          .then(() => console.log('Successful share'))
          .catch(error => console.log('Error sharing: ', error));
      } else {
        alert('share not supported');
      }       
    }
    
    searchinvvalue(sval){
      if(sval.length>0){
        //===0  starts with (item[14].toLowerCase()).indexOf(sval.toLowerCase() !== -1)||(item[15].toLowerCase()).indexOf(sval.toLowerCase() !== -1)
        let srch = Object.assign([], this.invdatacopy).filter(
        item => ((item[1].toLowerCase()).indexOf(sval.toLowerCase()) !== -1)||((item[2].toLowerCase()).indexOf(sval.toLowerCase()) !== -1)
        ||((item[14].toLowerCase()).indexOf(sval.toLowerCase()) !== -1)||((item[15].toLowerCase()).indexOf(sval.toLowerCase()) !== -1));
        this.invdata=srch;
      }else{
        this.invdata=this.invdatacopy;
      }
    }

    reportlink: any = "assets/images/loading.gif";
    reportshow: boolean = false;
    printenable(invoiceid) {
      this.reportshow=true;
      this.userService.getprintmodel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,4).subscribe(pdata => {
        if (pdata.length!==0) {
          let rlink = pdata[0][1]+"&salesrefid="+invoiceid+"&__format=PDF";
          this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
          //http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/Bill_CashPrint124/Cash_Bill.rptdesign&salesrefid=" 
        }else{
          let rlink ="https://secure.medeil.io/birt/frameset?__report=MedeilReports/SalesInvoiceBill_Dot_Right_Barcode/SalesInvoiceBill.rptdesign&salesrefid="+invoiceid+"&__format=PDF";
          this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
        }
      }, err => { console.log(err); 
        let rlink ="https://secure.medeil.io/birt/frameset?__report=MedeilReports/SalesInvoiceBill_Dot_Right_Barcode/SalesInvoiceBill.rptdesign&salesrefid="+invoiceid+"&__format=PDF";
        this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
      });  
    }
  
    //Pagination Invocie Process Methods
    viewAll1() {
      this.sendpage=this.page-1;
      this.userService.phcompanyView(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));
    }
  
    pagechange(pageno:any){
      this.sendpage=pageno-1;
      this.userService.phcompanyView(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));
    }

    countchange(count: any){
      this.size=count;
      this.userService.phcompanyView(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));
    }

    getsearchvalue(searchValue: any){
      if(searchValue.length>0){
        this.searchvalue=searchValue;
        this.datatable=false;
        this.searchdatatable=true;
        this.page=1;
        this.sendpage=0;
        this.size=10;
        this.data=[];
        this.userService.searchrecord(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid,this.searchvalue,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
          errorCode => console.log(errorCode));
      }else{ 
        this.datatable=true;
        this.searchdatatable=false;
        this.page=1;
        this.size=10;
        this.data=[];
        this.userService.phcompanyView(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
          errorCode => console.log(errorCode));  
      }
    }


    searchpagechange(pageno:any){
      this.sendpage=pageno-1;
      this.userService.searchrecord(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid,this.searchvalue,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));
    }

    searchcountchange(count: any){
      this.size=count;
      this.userService.searchrecord(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid,this.searchvalue,this.sendpage,this.size).subscribe(data => {this.data = data, this.totalRec=data.totalElements},
        errorCode => console.log(errorCode));
    }
  
    productsview:boolean=false;
    viewsalesproducts(id:any){
      let obj={locname  :AppComponent.locRefName1,locrefid  :AppComponent. locrefID1 , frmint1:id};
      this.productsview=true;
      this.userService.ViewSIProducts(obj).subscribe(data =>{
        if(data){
          this.invproducts=data;
        }
      },error => {
          console.log('Error Occured  From DeleteSalesinvoice')
      });
    }

    deletesalesinvoice(id:any) {
      var answer = confirm("Delete data?");
      if (answer) {
      this.userService.deletesi(id).subscribe(data =>{
        if(data){
          this.notificationsComponent.addToast({ title: 'Success MSG', msg:'Deleted Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.ngOnInit();
        }
      },error => {
          console.log('Error Occured  From DeleteSalesinvoice')
      });
      /** Reload The paeg After Delete Invoice
      this.viewPurc.viewPurchase().subscribe(data => { this.data = data },
        error => {
          console.log('Error ocuured On viewPurchase()');
        }
      );**/
      
      }
    }

    reprint(printid,seniorflag,phyflag){
      if(seniorflag==1 || phyflag == 1){
        window.open("http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/RePrintVtaexpt/Bill_Vatexpt.rptdesign&salesrefid=" + printid + "&__format=PDF",'_blank');
      } else{
        window.open("http://3.6.8.66:8080/birt/frameset?__report=MedeilReports/RePrintBill_CashPrint123/Cash_Bill.rptdesign&salesrefid=" + printid + "&__format=PDF",'_blank');
      }
    }

    petdetailsflag:boolean=false;
    petdetails:any;
    getpetdetails(pdetails){
      this.petdetailsflag=true;
      this.petdetails=pdetails;
    }

}