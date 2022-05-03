import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-narcoticdruglist',
  templateUrl: './narcoticdruglist.component.html',
  styleUrls: ['./narcoticdruglist.component.css']
})
export class NarcoticdruglistComponent implements OnInit {
  
 
    companyrefid: any;
    branchrefid: any;
    locname: any;
    locrefid: any;
    months: any;
    
    selmonth: any;
    constructor(private appcomponent:AppComponent,
       
                private formbuilder:FormBuilder,
                private router:Router,
                private domSanitizer:DomSanitizer) { }
  
    ngOnInit() {
     
  
      this.companyrefid = AppComponent.companyID;
      this.branchrefid = AppComponent.branchID;
      this.locname = AppComponent.locRefName1;
      this.locrefid = AppComponent.locrefID1;
    }
  
  
    datefetch(mvalue) {
  
      this.selmonth = mvalue;
     
  }
  
    reportshow:boolean=false;
  reportlink:any=" https://secure.medeil.io";
  hazardousprod(){
   
    this.reportshow=true;
    let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/NNarcoticdrugs/Narcotic_drugs.rptdesign&comid="+this.companyrefid+"&branchid="+this.branchrefid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&__format=PDF"
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  
    
  }
  
  }
  