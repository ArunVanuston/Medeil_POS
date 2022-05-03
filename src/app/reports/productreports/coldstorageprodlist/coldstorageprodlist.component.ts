import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';


@Component({
  selector: 'app-coldstorageprodlist',
  templateUrl: './coldstorageprodlist.component.html',
  styleUrls: ['./coldstorageprodlist.component.css']
})
export class ColdstorageprodlistComponent implements OnInit {

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
coldstorageprod(){
 
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/Ncoldstorageprod/coldstorageprod.rptdesign&comid="+this.companyrefid+"&branchid="+this.branchrefid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

  
}

}
