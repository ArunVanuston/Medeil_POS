
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';



import {sdummyViewService } from './sdummyView.service' ;

import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-sdummyView',
  templateUrl: './sdummyView.component.html',
 

  providers: [sdummyViewService  ]
})
export class sdummyViewComponent implements OnInit {




   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";

  
  pharmacomp = [];

  images;
  
    selobj ;
    constructor(private userService: sdummyViewService) {}
  
    ngOnInit() {
  
  
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

     
      this.viewAll() ;

      this.images=[];
  
    }
  
  
  
      viewAll() {
  
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.phcompanyView(JSON.stringify(frmdata)).subscribe(data => this.data = data,
        errorCode => console.log(errorCode));
  
  
   
    }
  


}