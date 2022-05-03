import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-selectedmemberships',
  templateUrl: './selectedmemberships.component.html',
  styleUrls: ['./selectedmemberships.component.css']
})
export class SelectedmembershipsComponent implements OnInit {
  companyrefid: any;
  branchrefid: any;
  locname: any;
  locrefid: any;
  months: any;
  Memform:FormGroup;
  selmonth: any;
  reportvar: any;
  reportvar1: any;
  constructor(private appcomponent:AppComponent,
     
              private formbuilder:FormBuilder,
              private router:Router,
              private domSanitizer:DomSanitizer) { }

  ngOnInit() {
    this.Memform = this.formbuilder.group({
      from_date: ['', Validators.required],  
      to_date: ['', Validators.required]
    })

    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
  }

  datefetch() {
    this.reportvar = this.Memform.get("from_date").value;
    this.reportvar1 = this.Memform.get("to_date").value;
  }
  reportshow:boolean=false;
reportlink:any=" https://secure.medeil.io";
membership(){
 
  this.reportshow=true;
  let rlink="https://secure.medeil.io/birt/frameset?__report=MedeilReports/NMembership/custmembership.rptdesign&comid="+this.companyrefid+"&branchid="+this.branchrefid+"&locname="+this.locname+"&locrefid="+this.locrefid+"&from="+this.reportvar+"&to="+this.reportvar1+"&__format=PDF"
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);

  
}

}
