import { DataStocks } from '../stocks.service';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-viewstocks',
  templateUrl: './viewstocks.component.html',
  providers: [NotificationsComponent]
})
export class ViewstocksComponent implements OnInit {
  public data: any;

    //Pagination
    totalRec: number;
    page: number = 1;
    size: number = 10;
    sendpage: number;

    searchindex: any;
    searchvalue: any;
    datatable: boolean=true;
    searchdatatable: boolean=false;
    

  stockForm: FormGroup;
  bindvalue: any;
  @Input() filterQuery;
  drugsearch=true;
  formsearch= false;
  gifFail = true;
  
  constructor(public translate: TranslateService,private service: DataStocks, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) { translate.setDefaultLang('en'); 

    this.stockForm = this.formBuilder.group({

      drugsearch:[,[]],
      formsearch:[,[]]
    });

  }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
    this.stockForm.get('drugsearch').setValue(true);
    this.sendpage=this.page-1;

    //alert(AppComponent.distributorid);
    if (AppComponent.shopID != 0) {
      setTimeout(() => {
      this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID,this.sendpage,this.size).subscribe(data => {
        this.totalRec=data.totalElements,this.pushstocks(data.content)} , err => {
        console.log("Error occured on viewStock()");
      });
      this.gifFail = false;
    },2000);

    } if (AppComponent.warehouseID != 0) {
      setTimeout(() => {
      this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID,this.sendpage,this.size).subscribe(data => {this.data = data,this.totalRec=data.totalElements}, err => {
        console.log("Error occured on viewStock()");
      });
      this.gifFail = false;
    },2000);
    } if (AppComponent.hospitalID != 0) {
      setTimeout(() => {
      this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID,this.sendpage,this.size).subscribe(data => {this.data = data,this.totalRec=data.totalElements}, err => {
        console.log("Error occured on viewStock()");
      });
      this.gifFail = false;
    },2000);
  }
  }


  stocklist=[];
  pushstocks(data){
    this.stocklist=[];
    
    for(let i=0;i<data.length;i++){
      let dt1 = new Date();
      let dt2 = new Date(data[i][11]);
      var expiry;
      if(dt2<dt1){expiry=1}else{expiry=0}
      let days=Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      this.stocklist.push({ prodcode: data[i][19], prodname: data[i][0],dosage: data[i][1],formulation:data[i][2],batch:data[i][3],tabletqty:data[i][8],totqty:data[i][9],
        freeqty:data[i][10],expdate:data[i][11],srp:data[i][12],aqucost:data[i][13],sellprice:data[i][14],margin:data[i][15],margpamd:data[i][16],
        stockid:data[i][17],ageing:data[i][18],days:data[i][20],damageqty:data[i][23],convertdays:days,expiry:expiry
       });
    }
  }

  deleteStock(id: any) {
    if (confirm('Are You sure Want to delete Stock')) {
      this.service.deleteStocks(id).subscribe(data => {
        if (data == 1) {
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Stock Deleted Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.ngOnInit();
        }
      });
    }
  }

  check(event, id: number) {
    if (event.target.checked) {
      this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID,this.sendpage,this.size).subscribe(data => {
        this.totalRec=data.totalElements,this.pushstocks(data.content)} , 
        err => {console.log("Error occured on viewStock()"+err);
      }); 
      if (id == 0) {
        this.stockForm.get('formsearch').setValue(false);
        this.drugsearch=true;
        this.formsearch=false;
        this.filterQuery ="";
      }else if( id == 1) {
        this.stockForm.get('drugsearch').setValue(false);
        this.formsearch=true;
        this.drugsearch=false;
        this.filterQuery ="";
      }
    }
  }


  
    getvalue(getval : any) {
      this.bindvalue = getval.textContent;
      this.filterQuery =this.bindvalue;
      if(this.drugsearch){
        this.getsearchvalue(this.bindvalue,1);
      }else{
        this.getsearchvalue(this.bindvalue,2);
      }
    }

    pagechange(pageno:any){

      this.sendpage=pageno-1;

      if (AppComponent.shopID != 0) {
        setTimeout(() => {
        this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID,this.sendpage,this.size).subscribe(data => {this.pushstocks(data.content),this.totalRec=data.totalElements} , err => {
          console.log("Error occured on viewStock()");
        });
        this.gifFail = false;
      },2000);
  
      } 

      if (AppComponent.warehouseID != 0) {
        setTimeout(() => {
        this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID,this.sendpage,this.size).subscribe(data => {this.data = data,this.totalRec=data.totalElements} , err => {
          console.log("Error occured on viewStock()");
        });
        this.gifFail = false;
      },2000);
  
      } 

      if (AppComponent.hospitalID != 0) {
        setTimeout(() => {
        this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID,this.sendpage,this.size).subscribe(data => {this.data = data,this.totalRec=data.totalElements} , err => {
          console.log("Error occured on viewStock()");
        });
        this.gifFail = false;
      },2000);
  
      } 
    }


    getsearchvalue(searchValue: any,searchIndex: any){
      if(searchValue.length>0){
        this.searchindex=searchIndex;
        this.searchvalue=searchValue;
        this.searchdatatable=true;
        this.page=1;
        this.sendpage=0;
        this.size=10;
        this.data=[];
        this.service.stocksearchrecord(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID,this.searchindex,this.searchvalue,this.sendpage,this.size).subscribe(data => {
          this.totalRec=data.totalElements,this.pushstocks(data.content)
        },
          errorCode => console.log(errorCode));
  
      }
  
      else{
        
        //this.datatable=true;
        this.searchdatatable=false;
        this.page=1;
        this.sendpage=0;
        this.size=10;
        this.data=[];
        this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID,this.sendpage,this.size).subscribe(data => {
          this.totalRec=data.totalElements,this.pushstocks(data.content)} , 
          err => {console.log("Error occured on viewStock()"+err);
        }); 
  
      }
    }

    searchpagechange(pageno:any){

      this.sendpage=pageno-1;

      if (AppComponent.shopID != 0) {
        setTimeout(() => {
        this.service.stocksearchrecord(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID,this.searchindex,this.searchvalue,this.sendpage,this.size).subscribe(data => {this.pushstocks(data.content),this.totalRec=data.totalElements} , err => {
          console.log("Error occured on viewStock()");
        });
        this.gifFail = false;
      },2000);
  
      } 

      if (AppComponent.warehouseID != 0) {
        setTimeout(() => {
        this.service.stocksearchrecord(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID,this.searchindex,this.searchvalue,this.sendpage,this.size).subscribe(data => {this.data = data,this.totalRec=data.totalElements} , err => {
          console.log("Error occured on viewStock()");
        });
        this.gifFail = false;
      },2000);
  
      } 

      if (AppComponent.hospitalID != 0) {
        setTimeout(() => {
        this.service.stocksearchrecord(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID,this.searchindex,this.searchvalue,this.sendpage,this.size).subscribe(data => {this.data = data,this.totalRec=data.totalElements} , err => {
          console.log("Error occured on viewStock()");
        });
        this.gifFail = false;
      },2000);
  
      } 
    }
    
}
