import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { viewPRService } from './viewPR.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-patientedit',
  templateUrl: './viewPR.component.html',
  providers: [viewPRService, NgbDropdownConfig]
})
export class viewPRComponent {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  datall = [];
  selobj;
  gifFail: boolean=true;
  constructor(private userService: viewPRService) { }
  ngOnInit() {
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.viewAll();
  }
  viewAll() {
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
   
    setTimeout(() => {
    this.userService.viewPurchReturnNo(JSON.stringify(frmdata)).subscribe(data => { this.data = data },
      errorCode => console.log(errorCode));
      this.gifFail=false;
    },500);

  }
}
