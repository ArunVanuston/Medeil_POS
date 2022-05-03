import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-chartaccount',
  templateUrl: './chartaccount.component.html',
  styleUrls: ['./chartaccount.component.css']
})
export class ChartaccountComponent implements OnInit {
  myForm:FormGroup;
  constructor(private formBuilder: FormBuilder,private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      from_date: [],
      to_date: []
     });
  }
  reportvar;
  reportvar1;
  datefetch() {
    this.reportvar = this.myForm.get("from_date").value;
    this.reportvar1 = this.myForm.get("to_date").value;
  }
  reportshow: boolean;
  reportlink: any = "https://secure.medeil.io";
  Chartaccount() {
    this.reportshow = true;
    let rlink = "https://secure.medeil.io/birt/frameset?__report=MedeilReports/AccountsReports/chartofreport.rptdesign&locname=" + AppComponent.locRefName1 + "&locrefid=" + AppComponent.locrefID1 + "&fromdate=" + this.reportvar + "&todate=" + this.reportvar1 + "&__format=PDF"

    this.reportlink = this.domSanitizer.bypassSecurityTrustResourceUrl(rlink);
  }
}
