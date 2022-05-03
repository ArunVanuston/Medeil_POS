
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AppComponent } from '../../app.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Stockservice } from './stock.service';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { adddrugService } from 'app/drugmaster/addDrugmaster/addDrugmaster.services';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  providers:[Stockservice,adddrugService]

 
})
export class reportComponent implements OnInit {
  private myForm: FormGroup;

  branchid: any;
  locname: any;
  locrefid: any;
  companyrefid: any;
  status: number=0;

  reportvar;
  reportvar1;
month;
  patname: any;
  months: any;
  batch: any;
  dist: any;
  distributor: any;

  constructor(private formBuilder:FormBuilder, private domSanitizer: DomSanitizer,
              private stockservice:Stockservice,private dateformat: dateFormatPipe,
              private distservice:adddrugService) {

  //   let custname = new FormControl('', Validators.required);
  
  // this.myForm = new FormGroup({
  //   custname: custname});
  }


  ngOnInit() {

    this.myForm = this.formBuilder.group({
       
        from_date: ['', Validators.required],

        to_date: [this.dateformat.transform05(Date.now()), Validators.required],
        custname:['',[]],
        months:['',[]],
        batchname:['',[]],
        dist:['',[]]
     
    });
    this.stockservice.getbatch(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.batch=data
      
      err =>{
console.log("Error in getbatch()")
      }
    });
    this.distservice.getdistributorchannel(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data =>{
      this.dist=data
      
      err =>{
console.log("Error in getbatch()")
      }
    });


    this.branchid=  AppComponent.branchID;
    this.locname=  AppComponent.locRefName1;
    this.locrefid= AppComponent.locrefID1;
    this.companyrefid= AppComponent.companyID;
    this.reportvar= this.myForm.get("from_date").value;
    this.reportvar1= this.myForm.get("to_date").value;
    this.myForm.get("months").value;
    this.distributor =this.myForm.get('dist').value; 
  }
 
  reportshow:boolean;
  reportlink:any="https://secure.medeil.io";
  stockAnalysis(){
    this.reportshow=true;
    let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/stock_analysis/Stock_Analysis.rptdesign&companyrefid="+this.companyrefid+"&branchid="+this.branchid+"&loc_name="+this.locname+"&locrefid="+this.locrefid+"&from_date="+this.reportvar+"&to_date="+this.reportvar1+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
  


    
  consolidatedStock(){
    this.reportshow=true;
    let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/consolidated_stock/consolidated_stock.rptdesign&branchid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  // ====================
  CurrentStock(){
    this.reportshow=true;
    let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/currentstock/currentstock.rptdesign&companyrefid="+this.companyrefid+"&branchid="+this.branchid+"&loc_name="+this.locname+"&locrefid="+this.locrefid+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  StockSearch(){
    this.reportshow=true;
    var rlink ="";
    if(localStorage.getItem("language")==='fr'){
    rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/StockRegister/CompleteStockSearch_fr.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF";
    }else if(localStorage.getItem("language")==='es'){
      rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/StockRegister/CompleteStockSearch_sp.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF";
      }
      else if(localStorage.getItem("language")==='ar'){
        rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/StockRegister/CompleteStockSearch_ar.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF";
        }
        else{
            rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/StockRegister/CompleteStockSearch.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF";
        }

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
  BatchwiseStockSearch(){
    this.reportshow=true;
    let  rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/StockRegister/StockBatchSearch.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&batchno="+this.myForm.get("batchname").value+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
    console.log("report: "+this.reportlink)
  }

  Immovable(){
    this.reportshow=true;
    let  rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/dead_stock/dead_stock.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }


  distimmu(){
   
    this.reportshow=true;
    let  rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/dead_stock/distdead_stock.rptdesign&companyrefid="+this.companyrefid+"&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&distid="+this.distributor+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }


  minimumstock(){
    this.reportshow=true;
    let  rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/stock_analysis/minimumstock.rptdesign&CompanyRefID="+this.companyrefid+"&BranchRefID="+this.branchid+"&LocName="+this.locname+"&LocRefID="+this.locrefid+"&Status=0&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  DamagedProduct(){
    this.reportshow=true;
    let  rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/DamageStock/DamageStockReport.rptdesign&companyrefid="+this.companyrefid+"&Branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

  // ======================
  fastMovingProduct(){
    this.reportshow=true;
    let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Fast Moving Product/Fast Moving Product.rptdesign&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
  

  shortExpiry(){
    this.months = this.myForm.get("months").value;
    this.reportshow=true;
    let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Short Expiry/Short Expiry Report.rptdesign&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&month="+this.months+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

 
 

  slowMovProdList(){
    this.reportshow=true;
    let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Slow Moving Product/Slow Moving Product.rptdesign&branchrefid="+this.branchid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&companyrefid="+this.companyrefid+"&fromdate="+this.reportvar+"&todate="+this.reportvar1+"&status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
  


  outOfStock(){
          this.reportshow=true;
    let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/stock_analysis/outofstock.rptdesign&BranchRefID="+this.branchid+"&LocName="+this.locname+"&LocRefID="+this.locrefid+"&CompanyRefID="+this.companyrefid+"&Status=0&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }


 ABCAnalysis(){
    this.reportshow=true;
    var rlink ="";
    if(localStorage.getItem("language")==='fr'){
 rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/ABC analysis/abc_report_fr.rptdesign&BranchRefID="+this.branchid+"&LocName="+this.locname+"&LocRefID="+this.locrefid+"&CompanyRefID="+this.companyrefid+"&Status=0&__format=PDF"
    }
    else if(localStorage.getItem("language")==='es'){
      rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/ABC analysis/abc_report_sp.rptdesign&BranchRefID="+this.branchid+"&LocName="+this.locname+"&LocRefID="+this.locrefid+"&CompanyRefID="+this.companyrefid+"&Status=0&__format=PDF";
      }
      else if(localStorage.getItem("language")==='ar'){
        rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/ABC analysis/abc_report_ar.rptdesign&BranchRefID="+this.branchid+"&LocName="+this.locname+"&LocRefID="+this.locrefid+"&CompanyRefID="+this.companyrefid+"&Status=0&__format=PDF";
        }
        else{
            rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/ABC analysis/abc_report.rptdesign&BranchRefID="+this.branchid+"&LocName="+this.locname+"&LocRefID="+this.locrefid+"&CompanyRefID="+this.companyrefid+"&Status=0&__format=PDF";
        }
this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
}





  setDateRange(): void {
    // Set date range (today) using the patchValue function
    let date = new Date();
    this.myForm.patchValue({from_date:  {
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
    this.myForm.patchValue({to_date: {
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
}

datefetch(){

    this.reportvar= this.myForm.get("from_date").value;
    this.reportvar1= this.myForm.get("to_date").value;
}
view(){
    this.month=this.myForm.get("months").value;
}
}