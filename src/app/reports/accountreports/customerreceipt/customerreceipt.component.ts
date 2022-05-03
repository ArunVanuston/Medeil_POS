import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-customerreceipt',
  templateUrl: './customerreceipt.component.html',
  styleUrls: ['./customerreceipt.component.css']
})
export class CustomerreceiptComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  Receipt(){
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/Receipt/customerreceipt.rptdesign&LocName=" + AppComponent.locRefName1 + "&LocRefId=" + AppComponent.locrefID1 + "&__format=PDF"
  
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

}






