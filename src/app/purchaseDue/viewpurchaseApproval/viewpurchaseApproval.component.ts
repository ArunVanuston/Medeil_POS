import {Component, OnInit,Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {providers} from 'ng2-toasty';
import {Router} from '@angular/router';
import '../../../assets/echart/echarts-all.js';
import { AppComponent } from 'app/app.component';
import { viewpurchaseApprovalService } from './viewpurchaseApproval.services';
import { TranslateService } from 'ng2-translate';  

@Component({
  selector: 'app-viewpurchaseApproval',
  templateUrl: './viewpurchaseApproval.component.html',
  providers: [viewpurchaseApprovalService]
})
 
export class viewpurchaseApprovalComponent implements OnInit {
  @Input() searchText;
  data:any ;
  public rowsOnPage: number =10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  constructor(public translate: TranslateService,private Service: viewpurchaseApprovalService, private router: Router) {
    translate.setDefaultLang('en');
  }  
  ngOnInit() {   
    this.translate.use(localStorage.getItem('language'));
    this.Service.Viewpurchasedue(AppComponent.companyID,AppComponent.branchID,AppComponent.locRefName1,AppComponent.locrefID1).subscribe(data => {
      this.data = data,
      this.gifFail=false;
    })
  }
  
}