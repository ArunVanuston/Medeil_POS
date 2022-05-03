import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {slsRetViewService} from './slsRetView.service'  ;
import { AppComponent } from '../../../app.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';

@Component({
  selector: 'app-slsRetView',
  templateUrl: './slsRetView.component.html',
  providers: [slsRetViewService]
})
export class slsRetViewComponent implements OnInit {
  parentMessage="sales";
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
  pharmacomp = [];
  selobj ;
  gifFail: boolean=true;
  constructor(private userService: slsRetViewService,private notificationsComponent: NotificationsComponent) {}
  
    ngOnInit() {
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
      this.viewAll() ;
    }
  

    viewAll() {
      var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      setTimeout(() => {
        this.userService.GetAllSalesreturns(JSON.stringify(frmdata)  ).subscribe(data => {this.setvalues(data)},
        errorCode => console.log(errorCode));
        this.gifFail=false;
      },3000);
    }

    data=[];
    datacopy=[];
    setvalues(data){
      this.data=[];
      this.datacopy=[];
      for(let i=0;i<data.length;i++){
        this.data.push({
          returnid:data[i][0],
          returnno:data[i][1],
          returndate:data[i][2],
          totalprod:data[i][4],
          taxamt:parseFloat(data[i][5]).toFixed(2),
          totaltaxamt:parseFloat(data[i][6]).toFixed(2),
          grandtotal:parseFloat(data[i][7]).toFixed(2),
          sinvoiceno:data[i][8],
          pname:data[i][9],
          pmobile:data[i][10],
          pemail:data[i][11],
          returnstatus:data[i][14]
        })
      }
      this.datacopy=this.data;
    }

    productdetails=[];
    productdetailsflag:boolean=false;
    getproductdetails(returnid:any){
      this.productdetailsflag=true;
      var   frmdata={ frmint1 :returnid ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.ReturnProductsView(JSON.stringify(frmdata)).subscribe(data => {
        if(data){
          this.productdetails=[];
          this.productdetails=data;
        }
      },errorCode => console.log(errorCode));
    }

    deletesalesreturn(id:any){
      var answer = confirm("Delete data?");
      if (answer) {
      var frmdata={ frmint1 :id ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname } ;
      this.userService.DeleteSalesReturn(frmdata).subscribe(data =>{
        if(data){
          this.notificationsComponent.addToast({ title: 'Success MSG', msg:'Deleted Successfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.ngOnInit();
        }
      },error => {
          console.log('Error Occured  From DeleteSalesinvoice')
      });
      }
    }

    //search customers
    searchreturns(event:any){
      if(event.length>0){
        //===0  starts with
        let srch = Object.assign([], this.datacopy).filter(
        item => ((item.returnno.toLowerCase()).indexOf(event.toLowerCase()) !== -1)||((item.pname.toLowerCase()).indexOf(event.toLowerCase()) !== -1)
        ||((item.pmobile.toLowerCase()).indexOf(event.toLowerCase()) !== -1));
        this.data=srch;
      }else{
        this.data=this.datacopy;
      }
    }
  

}