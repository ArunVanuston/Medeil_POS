import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { daybookSaveService } from './daybookSave.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { TranslateService } from 'ng2-translate'

@Component({
  selector: 'app-daybookSave',
  templateUrl: './daybookSave.component.html',
  providers: [daybookSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class daybookSaveComponent implements OnInit {
  registerForm:FormGroup;
  public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
  selobj;
  gifFail: boolean=true;
  parentMessage = 'sales';
  totdebit: any = 0;
  totcredit: any = 0;
  openbal: any = 0;
  closebal: any = 0;
  constructor(public translate: TranslateService,private userService: daybookSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
    translate.setDefaultLang('en');
    config.autoClose = false;
  }
  ngOnInit() {
  //  var date = this.dateformat.transformnew(Date.now());
    this.translate.use(localStorage.getItem('language'));
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
   
    this.registerForm = this.formBuilder.group({
      date: [this.dateformat.transform05(Date.now()), []],
    
    });
  
    var frmdata = { frmint1: '', frmstr1: this.registerForm.get('date').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.openingbal(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1,this.registerForm.get('date').value).subscribe(data => {
      this.openbal = data;
      this.userService.viewdayBook(JSON.stringify(frmdata)).subscribe(data => { this.data=data; 
        var totaldebit=0;
        var totalcredit=0;
        for(let p=0;p<data.length;p++){
          totaldebit += parseFloat(data[p][2]);
          totalcredit += parseFloat(data[p][3]);
        }
        this.totdebit=totaldebit.toFixed(2);
        this.totcredit=totalcredit.toFixed(2);
        this.closebal = parseFloat(this.openbal) + (this.totcredit-this.totdebit);
        this.gifFail=false; },
        errorCode => console.log(errorCode));
    })
  }
 
  viewdayBook() {
    this.gifFail=true;
    var frmdata = { frmint1: '', frmstr1: this.registerForm.get('date').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    setTimeout(() => {
    this.userService.viewdayBook(JSON.stringify(frmdata)).subscribe(data => { this.data=data;
      
     },
      errorCode => console.log(errorCode));
      this.gifFail=false;
    },3000);
    }


}