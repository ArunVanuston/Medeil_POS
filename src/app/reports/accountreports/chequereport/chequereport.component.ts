import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-chequereport',
  templateUrl: './chequereport.component.html',
  styleUrls: ['./chequereport.component.css']
})
export class ChequereportComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  cheque(){
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/chequereport.rptdesign&&shoprefid=" + AppComponent.locrefID1 + "&__format=PDF"
  
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

}



