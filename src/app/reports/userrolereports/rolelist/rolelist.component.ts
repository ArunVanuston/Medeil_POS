import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { UserroleService } from '../userrole.service';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.css'],
  providers:[UserroleService]
})
export class RolelistComponent implements OnInit {
companyrefid:any;
branchrefid:any;
locname:any;
locrefid:any;
  constructor(private appComponent:AppComponent,
              private domSanitizer:DomSanitizer) { }

  ngOnInit() {
    this.companyrefid=AppComponent.companyID;
    this.branchrefid=AppComponent.branchID;
    this.locname=AppComponent.locRefName1;
    this.locrefid=AppComponent.locrefID1;
  }

  reportshow:boolean;
reportlink:any="https://secure.medeil.io";
getrolelist(){
  // alert("Raja")
  this.reportshow=true;
  let rlink ="https://secure.medeil.io/birt/frameset?__report=MedeilReports/NUser_List/rolelist.rptdesign&companyid="+this.companyrefid+"&shopid="+this.locrefid+"&__format=PDF";
  this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
}


}
