import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-taxsettings',
  templateUrl: './taxsettings.component.html',
  styleUrls: ['./taxsettings.component.css']
})
export class TaxsettingsComponent implements OnInit {
  taxForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
