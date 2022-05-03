
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { stkexpViewService } from './stkexpView.service'  ;
import { AppComponent } from '../../../app.component';
import { TranslateService } from 'ng2-translate';  
@Component({
  selector: 'app-stkexpView',
  templateUrl: './stkexpView.component.html',
  providers: [stkexpViewService]
})
export class stkexpViewComponent implements OnInit {
  public data: any;
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean = true;
    dataall = [];
  
    selobj ;


    constructor(public translate: TranslateService,private userService: stkexpViewService) {translate.setDefaultLang('en');}
  
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