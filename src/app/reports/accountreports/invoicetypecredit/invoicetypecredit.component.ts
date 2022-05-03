import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-invoicetypecredit',
  templateUrl: './invoicetypecredit.component.html',
  styleUrls: ['./invoicetypecredit.component.css']
})
export class InvoicetypecreditComponent implements OnInit {
  invoicetype;
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  invoicecredit(){
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/CredtNote/invoicetypecreditnote.rptdesign&locname=" + AppComponent.locRefName1 + "&locrefid=" + AppComponent.locrefID1 + "&invoicetype="+this.invoicetype+"&companyrefid=" + AppComponent.companyID +"&branchrefid=" + AppComponent.branchID +"&__format=PDF"
  
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

}




