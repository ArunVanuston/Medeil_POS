import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {

  constructor(public translate: TranslateService) { translate.setDefaultLang('en'); }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
  }

}
