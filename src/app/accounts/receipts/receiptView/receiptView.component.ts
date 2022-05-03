import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {receiptViewService} from './receiptView.service'  ;
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-receiptView',
  templateUrl: './receiptView.component.html',
  providers: [receiptViewService]
})
export class receiptViewComponent implements OnInit {
   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
  dataall = [];
   selobj ;
  gifFail: boolean=true;
  
    constructor(public translate: TranslateService,private userService: receiptViewService) { translate.setDefaultLang('en'); }
  
    ngOnInit() {
      this.translate.use(localStorage.getItem('language'));
     this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
      this.viewAll() ;
  
    }
  
  
  
     viewAll() {
  
      var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
     
        setTimeout(() => {
          this.userService.viewAll(JSON.stringify(frmdata)).subscribe(data => this.data = data,
            errorCode => console.log(errorCode));       
            this.gifFail=false;
          },3000);
  
  
    }
  
}