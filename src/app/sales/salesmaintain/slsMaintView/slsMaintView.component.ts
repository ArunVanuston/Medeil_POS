
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import { slsMaintViewService } from './slsMaintView.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-slsMaintView',
  templateUrl: './slsMaintView.component.html',
 providers: [slsMaintViewService]
 
})
export class slsMaintViewComponent implements OnInit {
  public invdata: any; 
  public invdatacopy: any; 
  public invproducts: any; 
  public data: any; 
  public filterQuery: string = ""; 
  totalRec: number;
  page: number = 1;
  size: number = 10;
  sendpage: number;
  selobj ;
  searchvalue: any;
  datatable: boolean=true;
  searchdatatable: boolean=false;
  discableflag:boolean=true;
  gifFail:boolean=true;
  rowsOnPage:number=10;
  constructor(private userService: slsMaintViewService ,private formBuilder: FormBuilder ) {}
  
    ngOnInit() {
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
      this.userService.viewQuotateInvoiceAll(this.selobj.companyid,this.selobj.branchrefid,this.selobj.locname,this.selobj.locrefid).subscribe(data => {
        this.invdata = data,this.invdatacopy = data},
        errorCode => console.log(errorCode));
      setTimeout(() => {
        this.gifFail=false;
      }, 2100);

    }

    productsview:boolean=false;
    viewQuotateproducts(id:any){
      this.productsview=true;
      this.userService.ViewQIProducts(id).subscribe(data =>{
        if(data){
          this.invproducts=data;
        }
      },error => {
          console.log('Error Occured  From DeleteSalesinvoice')
      });
    }

    searchinvvalue(sval){
      if(sval.length>0){
        //===0  starts with (item[14].toLowerCase()).indexOf(sval.toLowerCase() !== -1)||(item[15].toLowerCase()).indexOf(sval.toLowerCase() !== -1)
        let srch = Object.assign([], this.invdatacopy).filter(
        item => ((item[1].toLowerCase()).indexOf(sval.toLowerCase()) !== -1)||((item[12].toLowerCase()).indexOf(sval.toLowerCase()) !== -1)
        ||((item[13].toLowerCase()).indexOf(sval.toLowerCase()) !== -1));
        this.invdata=srch;
      }else{
        this.invdata=this.invdatacopy;
      }
    }

  

}