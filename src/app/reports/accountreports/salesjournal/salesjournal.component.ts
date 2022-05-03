import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-salesjournal',
  templateUrl: './salesjournal.component.html',
  styleUrls: ['./salesjournal.component.css']
})
export class SalesjournalComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  salesjrnl(){
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/salesjournal.rptdesign&LocName=" + AppComponent.locRefName1 + "&Locrefid=" + AppComponent.locrefID1 + "&__format=PDF"
  
    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }

}


