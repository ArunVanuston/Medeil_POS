import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { UserroleService } from '../userrole.service';

@Component({
  selector: 'app-userreports',
  templateUrl: './userreports.component.html',
  styleUrls: ['./userreports.component.css'],
  providers:[UserroleService]
})
export class UserreportsComponent implements OnInit {
  companyrefid:any;
  branchrefid:any;
  locname:any;
  locrefid:any;
  UserreportForm:FormGroup;
  constructor(private userservice:UserroleService,
              private appcomponent:AppComponent,
              private domsanitizer:DomSanitizer) { }

  ngOnInit() {
    this.companyrefid = AppComponent.companyID;
    this.branchrefid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
  
  }





  //Reports
reportshow:boolean;
reportlink:any="https://secure.medeil.io";
getuserlist(){

  this.reportshow=true;
  let rlink ="https://secure.medeil.io/birt/frameset?__report=MedeilReports/NUser_List/UserList.rptdesign&companyrefid="+this.companyrefid+"&shopid="+this.locrefid+"&__format=PDF";
  this.reportlink = this.domsanitizer.bypassSecurityTrustResourceUrl(rlink);
}

}




