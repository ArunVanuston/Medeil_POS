import {Component, OnInit,} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {providers} from 'ng2-toasty';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-employeeinfo',
  templateUrl: './emp.component.html'

})

export class empComponent {
  constructor(public translate: TranslateService) {   translate.setDefaultLang('en'); }

  ngOnInit() {
    this.translate.use(localStorage.getItem('language'));
  }


}