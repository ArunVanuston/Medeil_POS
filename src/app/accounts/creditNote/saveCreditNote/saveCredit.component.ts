
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {saveCreditService} from  './saveCredit.service'
import { TranslateService } from 'ng2-translate'


@Component({
  selector: 'app-saveCredit',
  templateUrl: './saveCredit.component.html',
  providers: [saveCreditService]
 
})
export class saveCreditComponent implements OnInit    {
  constructor(public translate: TranslateService){ translate.setDefaultLang('en'); }
  ngOnInit(): void {
    this.translate.use(localStorage.getItem('language'));
  }


 

}